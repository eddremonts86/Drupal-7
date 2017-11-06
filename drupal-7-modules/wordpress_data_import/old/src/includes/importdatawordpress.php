<?php
/**
 * Created by PhpStorm.
 * User: edd
 * Date: 10/30/17
 * Time: 1:08 PM
 */

class importdatawordpress extends drupal7_default_functions {

  public function externalConnetion($sql,$local= true) {

    if(!$local){
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

  public function getPost() {
    $sql = 'SELECT * FROM `wp_posts` WHERE post_status = "publish" and post_type ="post"  ORDER BY ID Desc';
    $post = $this->externalConnetion($sql);
    $this->createNodes($post);
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
      ->fields('n', ['nid'])
      ->condition('type', $Type, '=')
      ->execute();
    if (isset($results) and !empty($result)) {
      foreach ($results as $result) {
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

  public function createNodes($AllData,$type = 'old_articles', $delete = TRUE) {
    if ($delete == TRUE) {
      $this->deleteNodesByType();
    }
    $i=0;
    echo "<h2>New Post</h2>";
    foreach ($AllData as $data) {
      $i++;
      if($i == 5){break;}
      $post_content = $this->imgToShortCodes($data[4]);
      $id = $this->toUTF8($data[0]);
      $wordpress_post_author = $this->toUTF8($data[1]);
      $drupal_post_author = $this->getDrupalAuthor($wordpress_post_author);
      $post_date = $this->toUTF8($data[2]);
      $post_date_url = format_date(strtotime($post_date), 'custom', 'Y/m/d/');
      $post_date_gmt = $this->toUTF8($data[3]);
      $post_title = $this->toUTF8($data[5]);
      $post_excerpt = $this->toUTF8($data[6]);
      $post_status = $this->toUTF8($data[7]);
      $comment_status = $this->toUTF8($data[8]);
      $ping_status = $this->toUTF8($data[9]);
      $post_password = $this->toUTF8($data[10]);
      $post_name = 'nyheter/' . $this->toUTF8($data[11]); //alias
      $to_ping = $this->toUTF8($data[12]);
      $pinged = $this->toUTF8($data[13]);
      $post_modified = $this->toUTF8($data[14]);
      $post_modified_gmt = $this->toUTF8($data[15]);
      $post_parent = $this->toUTF8($data[17]);
      $guid = $this->toUTF8($data[18]);
      $menu_order = $this->toUTF8($data[19]);
      $post_type = $this->toUTF8($data[20]);
      $post_mime_type = $this->toUTF8($data[21]);
      $comment_count = $this->toUTF8($data[22]);

      echo $i .' - '.$post_title.'<br>';
      node_types_rebuild();
      $node = new stdClass();  // Create a new node object
      $node->type = $type;  // Content type
      $node->path['pathauto'] = FALSE; //autopath false
      $node->language = LANGUAGE_NONE;  // Or e.g. 'en' if locale is enabled
      $node->status = 1;   // (1 or 0): published or unpublished
      $node->promote = 1;  // (1 or 0): promoted to front page or not
      $node->sticky = 0;  // (1 or 0): sticky at top of lists or not
      $node->comment = 1;  // 2 = comments open, 1 = comments closed, 0 = comments hidden

      //----------------------- Save the node ---------------------------------------------
      $node->uid = $drupal_post_author;
      $node->path['alias'] = $post_name;
      $node->title = $post_title;
      $node->body[$node->language][0]['value'] = $post_content;
      $node->body[$node->language][0]['summary'] = $post_content;
      $node->body[$node->language][0]['format'] = 'shortcodes';

      //----------------------- Save the node ---------------------------------------------

      $img = $this->getImgPost($id, $post_date);
      if ($img) {
        $node->field_article_img = $img['img'];
        $node->field_article_img_copyrighth‎ = @$img['copyrigth'];
      }
      $node = node_submit($node);
      node_save($node);
      $old_url = $post_date_url.$this->toUTF8($data[11]);
      $this->redirect($old_url, $node->nid);

    }
    return TRUE;
  }

  public function imgToShortCodes($data) {
    $data = $this->changeToHtmlTags($data);
    $data = str_replace("[caption", "<span style='width:500px;height:100px;position:relative;' class='img_text'", $data);
    $data = str_replace("[/caption]", "</span> ", $data);
    $data = str_replace("]", " > ", $data);
    $data = $this->toUTF8($data);
    return $this->urlToShortCodes($data);

  }

  public function urlToShortCodes($text) {
    $text = preg_replace("/(.*)(https\:\/\/twitter.com\/[a-zA-Z0-9\/]+\/status\/\d+)(.*)/", "$1[twitter]$2[/twitter]$3", $text);
    $text = preg_replace("/(.*)(https\:\/\/www.youtube.com\/(.*)+)(.*)/", "$1[video]$2[/video]$3", $text);
    $text = preg_replace("/(.*)(https\:\/\/youtu.be\/(.*)+)(.*)/", "$1[video]$2[/video]$3", $text);
    $text = preg_replace("/(.*)(https\:\/\/soundcloud.com\/(.*)+)(.*)/", "$1[soundcloud]$2[/soundcloud]$3", $text);
    return $text;
  }

}
