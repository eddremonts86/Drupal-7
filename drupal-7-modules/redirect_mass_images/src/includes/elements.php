<?php

class elements {

public function arrayElements(){
$data = array(
    "cdn.images.express.co.uk/img/dynamic/galleries/x701/141463.jpg",
    "cdn.images.express.co.uk/img/dynamic/galleries/x701/141463.jpg",
    "__CqAraadotBueF20lMrTz9xKFZUAkKda_EUTTdGmUA/mtime:1536322728/sites/default/files/styles/horizontal_crop_image_big/public/articles/frankrike_holland_live_stream.jpg?itok=hlT37Zyw&ampc=4d5ea68a58569ff3a5e58b4af793b2f7",
    "https://www.thesun.co.uk/wp-content/uploads/2017/05/nintchdbpict0003198363152.jpg?strip=all&ampw=960",
    "https://www.thesun.co.uk/wp-content/uploads/2017/05/nintchdbpict0003198363152.jpg?strip=all&ampw=960");


$data2 = array();
foreach ($data as $d) {
   
        $a =explode('sites',$d);
        $z =explode('?',end($a));
        if(!in_array($z[0],$data2 )){
        $data2 [] =$z[0];
    }   
}
return $data2;
    }
}
?>