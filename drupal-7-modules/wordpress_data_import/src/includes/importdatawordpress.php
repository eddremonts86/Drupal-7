<?php
/**
 * Created by PhpStorm.
 * User: edd
 * Date: 10/30/17
 * Time: 1:08 PM
 */

class importdatawordpress {

  /*------------------- Encoding  -------------------------*/

  function toUTF8($text) {
    /**
     * Function Encoding::toUTF8
     *
     * This function leaves UTF8 characters alone, while converting almost all non-UTF8 to UTF8.
     *
     * It assumes that the encoding of the original string is either Windows-1252 or ISO 8859-1.
     *
     * It may fail to convert characters to UTF-8 if they fall into one of these scenarios:
     *
     * 1) when any of these characters:   ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞß
     *    are followed by any of these:  ("group B")
     *                                    ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶•¸¹º»¼½¾¿
     * For example:   %ABREPRESENT%C9%BB. «REPRESENTÉ»
     * The "«" (%AB) character will be converted, but the "É" followed by "»" (%C9%BB)
     * is also a valid unicode character, and will be left unchanged.
     *
     * 2) when any of these: àáâãäåæçèéêëìíîï  are followed by TWO chars from group B,
     * 3) when any of these: ðñòó  are followed by THREE chars from group B.
     *
     * @name toUTF8
     *
     * @param string $text Any string.
     *
     * @return string  The same string, UTF8 encoded
     *
     */

    if (is_array($text)) {
      foreach ($text as $k => $v) {
        $text[$k] = self::toUTF8($v);
      }
      return $text;
    }
    elseif (is_string($text)) {

      $max = strlen($text);
      $buf = "";
      for ($i = 0; $i < $max; $i++) {
        $c1 = $text{$i};
        if ($c1 >= "\xc0") { //Should be converted to UTF8, if it's not UTF8 already
          $c2 = $i + 1 >= $max ? "\x00" : $text{$i + 1};
          $c3 = $i + 2 >= $max ? "\x00" : $text{$i + 2};
          $c4 = $i + 3 >= $max ? "\x00" : $text{$i + 3};
          if ($c1 >= "\xc0" & $c1 <= "\xdf") { //looks like 2 bytes UTF8
            if ($c2 >= "\x80" && $c2 <= "\xbf") { //yeah, almost sure it's UTF8 already
              $buf .= $c1 . $c2;
              $i++;
            }
            else { //not valid UTF8.  Convert it.
              $cc1 = (chr(ord($c1) / 64) | "\xc0");
              $cc2 = ($c1 & "\x3f") | "\x80";
              $buf .= $cc1 . $cc2;
            }
          }
          elseif ($c1 >= "\xe0" & $c1 <= "\xef") { //looks like 3 bytes UTF8
            if ($c2 >= "\x80" && $c2 <= "\xbf" && $c3 >= "\x80" && $c3 <= "\xbf") { //yeah, almost sure it's UTF8 already
              $buf .= $c1 . $c2 . $c3;
              $i = $i + 2;
            }
            else { //not valid UTF8.  Convert it.
              $cc1 = (chr(ord($c1) / 64) | "\xc0");
              $cc2 = ($c1 & "\x3f") | "\x80";
              $buf .= $cc1 . $cc2;
            }
          }
          elseif ($c1 >= "\xf0" & $c1 <= "\xf7") { //looks like 4 bytes UTF8
            if ($c2 >= "\x80" && $c2 <= "\xbf" && $c3 >= "\x80" && $c3 <= "\xbf" && $c4 >= "\x80" && $c4 <= "\xbf") { //yeah, almost sure it's UTF8 already
              $buf .= $c1 . $c2 . $c3;
              $i = $i + 2;
            }
            else { //not valid UTF8.  Convert it.
              $cc1 = (chr(ord($c1) / 64) | "\xc0");
              $cc2 = ($c1 & "\x3f") | "\x80";
              $buf .= $cc1 . $cc2;
            }
          }
          else { //doesn't look like UTF8, but should be converted
            $cc1 = (chr(ord($c1) / 64) | "\xc0");
            $cc2 = (($c1 & "\x3f") | "\x80");
            $buf .= $cc1 . $cc2;
          }
        }
        elseif (($c1 & "\xc0") == "\x80") { // needs conversion
          if (isset(self::$win1252ToUtf8[ord($c1)])) { //found in Windows-1252 special cases
            $buf .= self::$win1252ToUtf8[ord($c1)];
          }
          else {
            $cc1 = (chr(ord($c1) / 64) | "\xc0");
            $cc2 = (($c1 & "\x3f") | "\x80");
            $buf .= $cc1 . $cc2;
          }
        }
        else { // it doesn't need convesion
          $buf .= $c1;
        }
      }
      return $buf;
    }
    else {
      return $text;
    }
  }

  function toWin1252($text) {
    if (is_array($text)) {
      foreach ($text as $k => $v) {
        $text[$k] = self::toWin1252($v);
      }
      return $text;
    }
    elseif (is_string($text)) {
      return utf8_decode(str_replace(array_keys(self::$utf8ToWin1252), array_values(self::$utf8ToWin1252), self::toUTF8($text)));
    }
    else {
      return $text;
    }
  }

  function toISO8859($text) {
    return self::toWin1252($text);
  }

  function toLatin1($text) {
    return self::toWin1252($text);
  }

  function fixUTF8($text) {
    if (is_array($text)) {
      foreach ($text as $k => $v) {
        $text[$k] = self::fixUTF8($v);
      }
      return $text;
    }

    $last = "";
    while ($last <> $text) {
      $last = $text;
      $text = self::toUTF8(utf8_decode(str_replace(array_keys(self::$utf8ToWin1252), array_values(self::$utf8ToWin1252), $text)));
    }
    $text = self::toUTF8(utf8_decode(str_replace(array_keys(self::$utf8ToWin1252), array_values(self::$utf8ToWin1252), $text)));
    return $text;
  }

  function UTF8FixWin1252Chars($text) {
    // If you received an UTF-8 string that was converted from Windows-1252 as it was ISO8859-1
    // (ignoring Windows-1252 chars from 80 to 9F) use this function to fix it.
    // See: http://en.wikipedia.org/wiki/Windows-1252

    return str_replace(array_keys(self::$brokenUtf8ToUtf8), array_values(self::$brokenUtf8ToUtf8), $text);
  }

  function removeBOM($str = "") {
    if (substr($str, 0, 3) == pack("CCC", 0xef, 0xbb, 0xbf)) {
      $str = substr($str, 3);
    }
    return $str;
  }

  function remplase($subject) {
    $subject = '<p>' . str_replace('\r\n\r\n', '<br>', $subject);
    //$subject = str_replace('\r\n\r\n', '<p>', $subject);
    $subject = str_replace('.', '</p><p>', $subject);
    $subject = $subject . '</p>';
    return $subject;
  }

  protected static $win1252ToUtf8 = [
    128 => "\xe2\x82\xac",

    130 => "\xe2\x80\x9a",
    131 => "\xc6\x92",
    132 => "\xe2\x80\x9e",
    133 => "\xe2\x80\xa6",
    134 => "\xe2\x80\xa0",
    135 => "\xe2\x80\xa1",
    136 => "\xcb\x86",
    137 => "\xe2\x80\xb0",
    138 => "\xc5\xa0",
    139 => "\xe2\x80\xb9",
    140 => "\xc5\x92",

    142 => "\xc5\xbd",


    145 => "\xe2\x80\x98",
    146 => "\xe2\x80\x99",
    147 => "\xe2\x80\x9c",
    148 => "\xe2\x80\x9d",
    149 => "\xe2\x80\xa2",
    150 => "\xe2\x80\x93",
    151 => "\xe2\x80\x94",
    152 => "\xcb\x9c",
    153 => "\xe2\x84\xa2",
    154 => "\xc5\xa1",
    155 => "\xe2\x80\xba",
    156 => "\xc5\x93",

    158 => "\xc5\xbe",
    159 => "\xc5\xb8",
  ];

  protected static $brokenUtf8ToUtf8 = [
    "\xc2\x80" => "\xe2\x82\xac",

    "\xc2\x82" => "\xe2\x80\x9a",
    "\xc2\x83" => "\xc6\x92",
    "\xc2\x84" => "\xe2\x80\x9e",
    "\xc2\x85" => "\xe2\x80\xa6",
    "\xc2\x86" => "\xe2\x80\xa0",
    "\xc2\x87" => "\xe2\x80\xa1",
    "\xc2\x88" => "\xcb\x86",
    "\xc2\x89" => "\xe2\x80\xb0",
    "\xc2\x8a" => "\xc5\xa0",
    "\xc2\x8b" => "\xe2\x80\xb9",
    "\xc2\x8c" => "\xc5\x92",

    "\xc2\x8e" => "\xc5\xbd",


    "\xc2\x91" => "\xe2\x80\x98",
    "\xc2\x92" => "\xe2\x80\x99",
    "\xc2\x93" => "\xe2\x80\x9c",
    "\xc2\x94" => "\xe2\x80\x9d",
    "\xc2\x95" => "\xe2\x80\xa2",
    "\xc2\x96" => "\xe2\x80\x93",
    "\xc2\x97" => "\xe2\x80\x94",
    "\xc2\x98" => "\xcb\x9c",
    "\xc2\x99" => "\xe2\x84\xa2",
    "\xc2\x9a" => "\xc5\xa1",
    "\xc2\x9b" => "\xe2\x80\xba",
    "\xc2\x9c" => "\xc5\x93",

    "\xc2\x9e" => "\xc5\xbe",
    "\xc2\x9f" => "\xc5\xb8",
  ];

  protected static $utf8ToWin1252 = [
    "\xe2\x82\xac" => "\x80",

    "\xe2\x80\x9a" => "\x82",
    "\xc6\x92" => "\x83",
    "\xe2\x80\x9e" => "\x84",
    "\xe2\x80\xa6" => "\x85",
    "\xe2\x80\xa0" => "\x86",
    "\xe2\x80\xa1" => "\x87",
    "\xcb\x86" => "\x88",
    "\xe2\x80\xb0" => "\x89",
    "\xc5\xa0" => "\x8a",
    "\xe2\x80\xb9" => "\x8b",
    "\xc5\x92" => "\x8c",

    "\xc5\xbd" => "\x8e",


    "\xe2\x80\x98" => "\x91",
    "\xe2\x80\x99" => "\x92",
    "\xe2\x80\x9c" => "\x93",
    "\xe2\x80\x9d" => "\x94",
    "\xe2\x80\xa2" => "\x95",
    "\xe2\x80\x93" => "\x96",
    "\xe2\x80\x94" => "\x97",
    "\xcb\x9c" => "\x98",
    "\xe2\x84\xa2" => "\x99",
    "\xc5\xa1" => "\x9a",
    "\xe2\x80\xba" => "\x9b",
    "\xc5\x93" => "\x9c",

    "\xc5\xbe" => "\x9e",
    "\xc5\xb8" => "\x9f",
  ];

  /*------------------- Import Data  -------------------------*/

  public function externalConnetion($sql) {
    $host = "localhost";
    $user = "root";
    $password = "root";
    $bd = "fotbajyi_test";
    $port = "3306";

    $mysqli = new mysqli($host, $user, $password, $bd, $port);
    if (mysqli_connect_errno()) {
      echo "Failed to connect to MySQL: " . mysqli_connect_error();
    }
    else {
      if ($result = $mysqli->query($sql)) {
        $row = $result->fetch_all();
        $result->close();
        return $row;
      }

    }

  }

  public function getPost() {
    $sql = 'SELECT * FROM `wp_posts` WHERE post_status = "publish" and post_type ="post"';
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
      $field_images['img'] = $this->importIMGS($img[0][3], $uid);
      $field_images['copyrigth'] = $copyRigth;
      return $field_images;
    }
    return FALSE;


  }

  function createNodes($Alldata, $vocabulary = 'Old_Articles', $type = 'article') {
    foreach ($Alldata as $data) {
      $id = $this->toUTF8($data[0]);
      $post_author = $this->toUTF8($data[1]);
      $post_date = $this->toUTF8($data[2]);
      $post_date_url = format_date(strtotime($post_date), 'custom', 'Y/m/d/');
      $post_date_gmt = $this->toUTF8($data[3]);
      $post_content = $this->toUTF8($data[4]);
      $post_title = $this->toUTF8($data[5]);
      $post_excerpt = $this->toUTF8($data[6]);
      $post_status = $this->toUTF8($data[7]);
      $comment_status = $this->toUTF8($data[8]);
      $ping_status = $this->toUTF8($data[9]);
      $post_password = $this->toUTF8($data[10]);
      $post_name = $post_date_url . $this->toUTF8($data[11]); //alias
      $to_ping = $this->toUTF8($data[12]);
      $pinged = $this->toUTF8($data[13]);
      $post_modified = $this->toUTF8($data[14]);
      $post_modified_gmt = $this->toUTF8($data[15]);
      $post_content_filtered = $this->toUTF8($data[16]);
      $post_parent = $this->toUTF8($data[17]);
      $guid = $this->toUTF8($data[18]);
      $menu_order = $this->toUTF8($data[19]);
      $post_type = $this->toUTF8($data[20]);
      $post_mime_type = $this->toUTF8($data[21]);
      $comment_count = $this->toUTF8($data[22]);

      node_types_rebuild();
      $node = new stdClass();  // Create a new node object
      $node->type = $type;  // Content type
      $node->path['pathauto'] = FALSE; //autopath false
      $node->language = LANGUAGE_NONE;  // Or e.g. 'en' if locale is enabled
      $node->status = 1;   // (1 or 0): published or unpublished
      $node->promote = 1;  // (1 or 0): promoted to front page or not
      $node->sticky = 0;  // (1 or 0): sticky at top of lists or not
      $node->comment = 1;  // 2 = comments open, 1 = comments closed, 0 = comments hidden
      $node->path['alias'] = $post_name;
      $node->title = $post_title;
      $node->body[$node->language][0]['value'] = $post_content;
      $node->body[$node->language][0]['summary'] = $this->remplase($post_content);
      $node->body[$node->language][0]['format'] = 'full_html';

      //----------------------- Save the node ---------------------------------------------
      $img = $this->getImgPost($id, $post_date);
      if ($img) {
        $node->field_image = $img['img'];
        $node = node_submit($node);
        node_save($node);
      }
    }


    /*
           $title = $this->toUTF8($data["label"]);
           $alias = $this->toUTF8($data["token"]);
           //$catid = $this->toUTF8($data["catid"]);
           $introtext = $this->toUTF8($data["showcase_text"]);
           $fulltext = $this->toUTF8($data["content"]);
           $created = $this->toUTF8($data[2]);
           $created_by = $this->toUTF8($data["author"]);
           $modified = $this->toUTF8($data["updated"]);
           $publish_up = $this->toUTF8($data["enabled"]);
           $metadesc = $this->toUTF8($data["showcase_caption"]);
           $metakey = $this->toUTF8($data["name"]);
           $name_cat = $this->toUTF8($data["type"]);
           $created_by = $this->createUsers($created_by);
           $field_images = $this->importIMGS($id, $created_by);
           if (trim($fulltext) == '') {
             $fulltext = $introtext;
             $introtext = text_summary($fulltext);
           }
           if ($introtext == '') {
             $introtext = $title;
           }

           //========================================Basic Node Creation ========================================
           node_types_rebuild();
           $node = new stdClass();  // Create a new node object
           $node->type = $type;  // Content type
           $node->path['pathauto'] = FALSE; //autopath false
           $node->language = LANGUAGE_NONE;  // Or e.g. 'en' if locale is enabled
           $node->path['alias'] = substr($alias, 1, strlen($alias));

           node_object_prepare($node);  //Set some default values
           $node->title = $title;
           $node->field_intro[$node->language][0]['value'] = $this->remplase($introtext);
           $node->field_intro[$node->language][0]['safe_value '] = $this->remplase($introtext);
           $node->field_intro[$node->language][0]['format'] = 'full_html';
           $node->body[$node->language][0]['value'] = $this->remplase($fulltext);
           $node->body[$node->language][0]['summary'] = $this->remplase($introtext);
           $node->body[$node->language][0]['format'] = 'full_html';
           $node->status = 1;   // (1 or 0): published or unpublished
           $node->promote = 1;  // (1 or 0): promoted to front page or not
           $node->sticky = 0;  // (1 or 0): sticky at top of lists or not
           $node->comment = 1;  // 2 = comments open, 1 = comments closed, 0 = comments hidden
           $node->uid = user_load($created_by)->uid;
           $node->date = $created;
           $node->created = strtotime($created);
           $node->field_image = $field_images;
           //----------------------- Save the node ---------------------------------------------
           $node = node_submit($node);
           node_save($node);
         }
         $this->onlyRedirect($type);*/
    return TRUE;
  }

  function importIMGS($id, $uid) {

    $extImg = $id;
    $base_url = "https://www.fotballkanalen.com/wp-content/uploads/";
    $path = $base_url . $extImg;
    $filename = $id . '.png';
    $file_temp = @file_get_contents($path);

    echo"<div><img width='450' height='250' src='$path'></div>";

    if (!$file_temp) {
      $path = $_SERVER['DOCUMENT_ROOT'] . '/sites/all/modules/custom/importdatarige/imgs/mesterbold.dk/default-img.png';
      $filename = 'default-img.png';
      $file_temp = file_get_contents($path);
    }
    $saved_file = file_save_data($file_temp, 'public://field/image/' . $filename, FILE_EXISTS_RENAME);
    $field_images = [
      'und' => [
        0 => [
          'fid' => $saved_file->fid,
          'uid' => $uid,
          'filename' => $saved_file->filename,
          'uri' => $saved_file->uri,
          'filemime' => $saved_file->filemime,
          'status' => 1,
          'timestamp ' => $saved_file->timestamp,
          'filesize' => $saved_file->filesize,
          'alt' => $saved_file->filename,
          'title' => $saved_file->filename,
        ],
      ],
    ];
    return $field_images;

  }

}