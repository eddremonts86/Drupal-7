<?php
$summary ='';
if(isset($node->body) && is_array($node->body)&& isset($node->body['und'][0]['summary'])){
  $summary = $node->body['und'][0]['summary'];
}

$content = '';
if(isset($node->body) && is_array($node->body) && isset($node->body['und'])){
  $content = $node->body['und'][0]['value'];
}


$field_image ='';
$field_image_alt ='';
if(isset($node->field_image) && is_array($node->field_image) && isset($node->field_image['und'])){
  $field_image = image_style_url('main_image_content',$node->field_image['und'][0]['uri']);
  $field_image_alt = $node->field_image['und'][0]['alt'];
}

$type_node = $node->type;
if($type_node =='news' || $type_node =='article' ){
  $type_node = 'Article';
} else if($type_node =='tip'){
  $type_node = 'Tip';
} else if($type_node =='post'){
  $type_node = 'Blog';
}


$date ='';
if(isset($node->created) ){
  $date = format_date($node->created, 'custom', 'd F Y');
}

//$body = field_get_items('node', $node, 'body');
//krumo($body);
$user_name = $node->name;
$picture =''; //TODO add default image for users
if($node->picture){
  //$picture = file_load($node->picture);
  $picture = $node->picture;
  $picture = file_create_url($picture->uri);
}
if(null == $picture) {
  $picture = '/'.variable_get('user_picture_default');
}
//sponsor
$sponsor = field_get_items('node', $node, 'field_sponsor');
$sponsor_active = false;
$class_sponsor='';
if($sponsor){
  $term = $sponsor[0]['taxonomy_term'];
  $sponsor_image = field_get_items('taxonomy_term', $term, 'field_sponsor_image');
  if($sponsor_image){
    $sponsor_image =  file_create_url($sponsor_image[0]['uri']);
  }
  $sponsor_link = field_get_items('taxonomy_term', $term, 'field_sponsor_link');
  if($sponsor_link){
    $sponsor_link =  $sponsor_link[0]['value'];
  }
  $sponsor_color = field_get_items('taxonomy_term', $term, 'field_sponsor_color');
  if($sponsor_color){
    $sponsor_color =  $sponsor_color[0]['rgb'];
  }
  //active field sponsor
  $sponsor_active_value = field_get_items('taxonomy_term', $term, 'field_active');
  if($sponsor_active_value[0]['value'] =='Yes'){
    $sponsor_active = true;
    $class_sponsor='sp';
  }
}
$SEOpanel =  block_get_blocks_by_region('SEOpanel');
$SEOpanel_bottom =  block_get_blocks_by_region('SEOpanel_bottom');
//status
$class_status='';
if($node->status == 0){
  $class_status ='unpublished';
}
?>
<div class="row main-article <?php echo $class_status ?>">
  <header>
    <figure>


      <?php
      $limk= @$node->field_post_img_affiliate_link['und'][0]['value'];
      if(isset($limk)) {?>
        <a rel="nofollow" href="<?php echo $limk ?>">
          <img src="<?php echo $field_image ?>" alt="<?php echo $field_image_alt ;?>">
        </a>
      <?php }else{?>
        <img src="<?php echo $field_image ?>" alt="<?php echo $field_image_alt ;?>">
      <?php }?>


      <ul class="link-socials">
        <?php echo wsn_social_buttons_share_custom_circle();?>
      </ul>
      <div class="caption">
        <div class="label label-default"><?php echo $type_node;?></div>
      </div>
    </figure>
    <strong class="summary">
      <?php echo $summary;?>
    </strong>
    <aside class="user-info-detail">
      <div>
        <figure><img src="<?php echo $picture ?>" alt="<?php echo $user_name; ?>"><strong><?php echo $user_name;?></strong></figure>
        <time><?php echo $date;?></time>
      </div>
    </aside>
  </header>
  <div class="<?php echo $class_sponsor ?>">
    <h1><?php echo $title;?></h1>
      <?php print render($SEOpanel);?>
    <?php /*
        <div class="row general">
          <div class="general_son_sponsor col-xs-12 header_cta">
              <h2>Se fotboll med Unibet </h2>
              <h4> - Du kan bl.a. se: La Liga, Bundesliga och Serie A</h4>
          </div>
          <div class="general_son col-lg-3  col-md-4 text-style">
              <span class="badge">1</span> Besök Unibet
          </div>
          <div class="general_son col-lg-3  col-md-4  text-style">
              <span class="badge">2</span> Skapa <b>gratis</b> konto
          </div>
          <div class="general_son_arrow general_son col-lg-3  col-md-4  text-style">
              <span class="badge">3</span>  se fotboll live
          </div>
          <div class="general_son col-lg-3  col-md-12 btn_cta">
              <a class="btn btn-danger btn-lg bn_book" href="http://adserving.unibet.com/redirect.aspx?pid=2936352&bid=25348"
                 rel="nofollow" target="_blank" role="button">Börja här</a>
          </div>
      </div>
    */?>

    <?php if($sponsor && $sponsor_active){ ?>
      <strong class="sp"><em style="color: <?php echo $sponsor_color;?>;">Sponsored by </em>
        <a href="<?php echo $sponsor_link;?>"  target="_blank" rel="nofollow">
          <img src="<?php echo $sponsor_image;?>" />
        </a>
        <span style="background-color: <?php echo $sponsor_color;?>;"></span>
      </strong>
    <?php } ?>
    <div class="cms">
      <?php echo $content;?>
    </div>
      <?php print render($SEOpanel_bottom);?>
      <?php /*
        <div class="row general">
          <div class="general_son_sponsor col-xs-12 header_cta">
              <h2>Se fotboll med Unibet </h2>
              <h4> - Du kan bl.a. se: La Liga, Bundesliga och Serie A</h4>
          </div>
          <div class="general_son col-lg-3  col-md-4 text-style">
              <span class="badge">1</span> Besök Unibet
          </div>
          <div class="general_son col-lg-3  col-md-4  text-style">
              <span class="badge">2</span> Skapa <b>gratis</b> konto
          </div>
          <div class="general_son_arrow general_son col-lg-3  col-md-4  text-style">
              <span class="badge">3</span>  se fotboll live
          </div>
          <div class="general_son col-lg-3  col-md-12 btn_cta">
              <a class="btn btn-danger btn-lg bn_book" href="http://adserving.unibet.com/redirect.aspx?pid=2936352&bid=25348"
                 rel="nofollow" target="_blank" role="button">Börja här</a>
          </div>
      </div>
        */?>
  </div>

  <nav class="buttons-social-share">
    <ul>
      <?php //echo wsn_social_buttons_share_custom() ?>
    </ul>
  </nav>
</div>
<?php /*

<aside class="info-author-content">
  <div class="main">
    <figure><img src="<?php echo $picture ?>" alt=""></figure>
    <div class="data">
      <h2><?php echo $user_name;?></h2>
      <p><?php print t("Number of blog posts"); ?> : <?php echo get_number_articles_author($node->uid,'post'); ?></p>
    </div>
  </div>
</aside>
*/?>
