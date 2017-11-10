<?php
/**
 * Created by PhpStorm.
 * User: edd
 * Date: 10/30/17
 * Time: 1:08 PM
 */
require_once dirname(__FILE__).'/drupal7_default_functions.php';

class importdatawordpress extends drupal7_default_functions {

  public function externalConnetion($sql,$local = 'true') {


    if($local = 'false'){
      $host = "localhost";
      $user = "root";
      $password = "jGAWpPIU55Jo";
      $bd = "fotballkanalen";
      $port = "3306";}
    else{
      $host = "localhost";
      $user = "root";
      $password = "root";
      $bd = "fotbajyi_test";
      $port = "3306";
    }


    $mysqli = new mysqli($host, $user, $password, $bd, $port);
    if (mysqli_connect_errno()) {
      echo "Failed to connect to MySQL: " . mysqli_connect_error();
    }
    else {
      if ($result = $mysqli->query($sql)) {
        for ($res = array(); $tmp = $result->fetch_array();) $res[] = $tmp;
        return $res;

      }

    }

  }

  public function getPost($context = 'true') {
    $sql = 'SELECT * FROM `wp_posts` WHERE post_status = "publish" and post_type ="post"  ORDER BY ID Desc';
    $post = $this->externalConnetion($sql,$context);
    $this->createNodes($post);
    return true;
  }

  public function getImgPost($idPost, $uid) {

    $sql = 'SELECT * FROM `wp_postmeta` WHERE meta_key = "_thumbnail_id" and  post_id = "' . $idPost . '"';
    $tund = $this->externalConnetion($sql);

    $sql = 'SELECT * FROM `wp_postmeta` WHERE meta_key = "_wp_attached_file" and  post_id = "' . $tund[0][3] . '"';
    $img = $this->externalConnetion($sql);

    $sql = 'SELECT * FROM `wp_posts` WHERE post_status = "inherit" and post_type ="attachment" and ID = "' . $tund[0][3] . '" ';
    $post = $this->externalConnetion($sql);


    $copyRigth = $this->toUTF8($post[0][6]);


    if (isset($img[0][3]) and !empty($img[0][3])) {
      $base_url = "https://www.fotballkanalen.com/wp-content/uploads/";
      $field_images['img'] = $this->importImg($img[0][3],$base_url,$uid);
      $field_images['copyrigth'] = $copyRigth;
      return $field_images;
    }
    return FALSE;


  }

  public function deleteNodesByType($Type = 'old_articles') {
    set_time_limit(600);

    $results = db_select('node', 'n')
      ->fields('n', ['nid','title'])
      ->condition('type', $Type, '=')
      ->execute()->fetchAll();
    if (isset($results)) {
      foreach ($results as $result) {
        var_dump($result->title);
        node_delete($result->nid);
        $nids[] = $result->nid;
      }
      drupal_set_message(t('Deleted %count nodes.', ['%count' => count($nids)]));
    }
    return TRUE;
  }

  public function getDrupalAuthor($created_by){
    $sql = "SELECT * FROM `wp_users` where ID = '$created_by'";
    $data = $this->externalConnetion($sql);
    $data = $data[0];

    $objuserName = @user_load_by_name($this->toUTF8($data[9]));
    if (!$objuserName) {
      $newUser = array(
        'name' => $this->toUTF8($data[9]),
        'pass' => $data[2],
        'mail' => $data[4],
        'status' => 1,
        'roles' => array(DRUPAL_AUTHENTICATED_RID => 'author'),
        'init' => $data[1],
      );
      $objuserName = @user_save(NULL, $newUser);
    }
    return $objuserName->uid;
  }

  public function createNodes($AllData,$type = 'old_articles') {
    $i=0;
    var_dump("New Post\n");
    foreach ($AllData as $data) {
      $i++;
      if($i == 10){break;}
      $post_content = $this->imgToShortCodes($data[4]);
      $id = $this->toUTF8($data[0]);
      $wordpress_post_author = $this->toUTF8($data[1]);
      $drupal_post_author = $this->getDrupalAuthor($wordpress_post_author);
      $post_date = $this->toUTF8($data[2]);
      $post_date_url = format_date(strtotime($post_date), 'custom', 'Y/m/d/');
      $post_title = $this->toUTF8($data[5]);
      $post_name = 'nyheter/' . $this->toUTF8($data[11]); //alias
      //----------------------- Save the node ---------------------------------------------
      node_types_rebuild();
      $node = new stdClass();  // Create a new node object
      $node->type = $type;  // Content type
      $node->path['pathauto'] = FALSE; //autopath false
      $node->language = LANGUAGE_NONE;  // Or e.g. 'en' if locale is enabled
      $node->status = 1;   // (1 or 0): published or unpublished
      $node->promote = 1;  // (1 or 0): promoted to front page or not
      $node->sticky = 0;  // (1 or 0): sticky at top of lists or not
      $node->comment = 1;  // 2 = comments open, 1 = comments closed, 0 = comments hidden
      $node->uid = $drupal_post_author;
      $node->path['alias'] = $post_name;
      $node->title = $post_title;
      $node->created = $post_date;
      $node->date = $post_date;
      $node->body[$node->language][0]['value'] = '<p>'.$post_content .'</p>';
      $node->body[$node->language][0]['summary'] = '';
      $node->body[$node->language][0]['format'] = 'shortcodes';
      $nodeSummary = explode('.', $post_content);
      $metaDescription = strip_tags($nodeSummary[0], '<a><img>');
      $node->metatags['nb']['description']['value'] = $metaDescription;
      $node->metatags['und']['description']['value'] = $metaDescription;
      $node->metatags['nb']['description']['value'] = $post_title;
      $node->metatags['und']['description']['value'] = $post_title;
      $img = $this->getImgPost($id, $post_date);
      if ($img) {
        $node->field_image = $img['img'];
        $node->field_article_img_copyrighth‎ = @$img['copyrigth'];
      }
      $node = node_submit($node);
      node_save($node);
      //----------------------- Save the node ---------------------------------------------
      var_dump($i .' - '.$post_title);
      $old_url = $post_date_url.$this->toUTF8($data[11]);
      $this->redirect($old_url, $node->nid);

    }
    return TRUE;
  }

  public function toUTF8($text) {
    return parent::toUTF8($text); // TODO: Change the autogenerated stub
  }

  public function imgToShortCodes($data) {

    $data = $this->changeToHtmlTags($data);
    $data = str_replace("[caption", "<span style='width:500px;height:100px;position:relative;' class='img_text'", $data);
    $data = str_replace("[/caption]", "</span><br> ", $data);
    $data = str_replace("]", " > ", $data);
    $data = str_replace("</blockquote>", " </blockquote><br>", $data);
    $data = str_replace("</strong>", " </strong><br>", $data);
    $data = str_replace("<strong>-", " <br><strong>-", $data);
    $data = $this->urlToShortCodes($data);
    $data = $this->toUTF8($data);
    return $data;
  }

  public function urlToShortCodes($text) {
    $text = preg_replace("/(.*)(https\:\/\/twitter.com\/[a-zA-Z0-9\/]+\/status\/\d+)(.*)/", "$1[twitter]$2[/twitter]<br>$3", $text);
    $text = preg_replace("/(.*)(https\:\/\/www.youtube.com\/(.*)+)(.*)/", "$1[video]$2[/video]<br>$3", $text);
    $text = preg_replace("/(.*)(https\:\/\/youtu.be\/(.*)+)(.*)/", "$1[video]$2[/video]<br>$3", $text);
    $text = preg_replace("/(.*)(https\:\/\/soundcloud.com\/(.*)+)(.*)/", "$1[soundcloud]$2[/soundcloud]<br>$3", $text);
    return $text;
  }

  public function getNodebyExpresion($contenType = ['article','post','tip','bookmaker','old_articles'])
  {
    foreach ($contenType as $type) {
      $query = db_select('node', 'n')->fields('n', ['nid'])->condition('type', $type, '=')->execute()->fetchAll();
      $this->changeSiteUrl($query);
    }
    return true;
  }

  public function changeSiteUrl($nodeIdArray, $exp = "sportal.no", $replase = "fotballkanalen.com") {
    foreach ($nodeIdArray as $nodeId) {
      $node = node_load($nodeId->nid);
      var_dump($node->title."\n");
      $node->metatags['nb']['title']['value'] = $this->searchAndReplease($exp,$replase,  $node->metatags['nb']['title']['value']);
      $node->metatags['und']['title']['value'] = $this->searchAndReplease($exp,$replase,  $node->metatags['und']['title']['value']);
      $node->metatags['nb']['description']['value'] = $this->searchAndReplease($exp,$replase,$node->metatags['nb']['description']['value']);
      $node->metatags['und']['description']['value'] =$this->searchAndReplease($exp,$replase,$node->metatags['und']['description']['value']);

      $exp = "https://www.sportal.no";
      $replase = "";

      $node->body['und'][0]['value'] =$this->searchAndReplease($exp,$replase,$node->body['und'][0]['value']);
      $node->body['und'][0]['summary'] =$this->searchAndReplease($exp,$replase,$node->body['und'][0]['summary']);
      $node->field_intro['und'][0]['value'] = $this->searchAndReplease($exp,$replase,$node->field_intro['und'][0]['value']);

      $node = node_submit($node);
      node_save($node);
    }
    return true;
  }

  public function searchAndReplease($search,$replese,$data){
    $data = str_replace($search, $replese, $data);
    return $data;
  }

}
