<?php

$summary ='';
if(isset($node->body) && is_array($node->body)&& isset($node->body['und'][0]['summary'])){
    $summary = $node->body['und'][0]['summary'];
}
$intro = field_get_items('node', $node, 'field_intro');
if($intro){
    $summary  = $intro[0]['value'];
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
//status
$class_status='';
if($node->status == 0){
    $class_status ='unpublished';
}
$SEOpanel =  block_get_blocks_by_region('SEOpanel_top_news');
$SEOpanel_bottom =  block_get_blocks_by_region('SEOpanel_bottom_news');

?>
<div class="row main-article <?php echo $class_status ?>">
    <header>
        <figure>
            <?php
            $limk= @$node->field_art_img_affiliate_link['und'][0]['value'];
            if(isset($limk)) {?>
                <a rel="nofollow" href="<?php echo $limk ?>">
                    <img src="<?php echo $field_image ?>"  alt="<?php echo $field_image_alt ;?>">
                </a>
            <?php }else{?>
                <img src="<?php echo $field_image ?>"  alt="<?php echo $field_image_alt ;?>">
            <?php }?>
            <ul class="link-socials">
                <?php echo wsn_social_buttons_share_custom_circle();?>
            </ul>
            <div class="caption">
                <div class="label label-default"><?php  print t("NYHETER")//echo $type_node;?></div>
            </div>
        </figure>
        <strong class="summary">
            <?php echo $summary;?>
        </strong>
        <aside class="user-info-detail">
            <div>
                <figure><img src="<?php echo $picture ?>" alt="<?php echo $user_name;?> "><strong><?php echo $user_name;?></strong></figure>
                <time><?php echo $date;?></time>
            </div>
        </aside>
    </header>
    <div class="<?php echo $class_sponsor ?>">
        <h1><?php echo $title;?></h1>

        <?php print render($SEOpanel);?>


        <?php if($sponsor && $sponsor_active){ ?>
            <strong class="sp"><em style="color: <?php echo $sponsor_color;?>;">Sponsored by </em>
                <a href="<?php echo $sponsor_link;?>"  target="_blank" rel="nofollow">
                    <img src="<?php echo $sponsor_image;?>" />
                </a>
                <span style="background-color: <?php echo $sponsor_color;?>;"></span>
            </strong>
        <?php } ?>
        <div class="cms">
            <?php
            //print $content;
            print render($content);
            ?>
        </div>

        <?php print render($SEOpanel_bottom);?>
    </div>

    <nav class="buttons-social-share">
        <ul>
            <?php //echo wsn_social_buttons_share_custom(); ?>
        </ul>
    </nav>
</div>
<?php
$allNodes = @$node->field_related_news['und'];
//$allNodes = @$node->field_related_news_blog['und'];
//$allNodes = @$node->field_related_news_tip['und'];
$data = count(@$allNodes);
$field_image = "https://images.sportal.se/cdn/farfuture/TAU7zmJT892l1o2g6RaqDZHgJOYgBaKwNMZz2kSiONI/mtime:1499371762/sites/default/files/styles/main_image_content/public/default_images/image-default-content_0.png?itok=Q7objCxb";
$nodeQuery = new EntityFieldQuery();
$nodesNew = $nodeQuery->entityCondition('entity_type', 'node')
  ->propertyCondition('status', 1)
  ->entityCondition('entity_id', $node->nid, '!=' )
  ->propertyOrderBy('created', 'DESC')
  ->range(0, (3 - @$data))
  ->execute();
?>

<div class="row" ><aside class="block-list block-list-articles" ><h2 class="uno" ><?php print t('Föreslagna inlägg'); ?>:</h2><section style="padding-top: 10px;" class="list-last">

      <?php if (@$data >= 1) {
        foreach ($allNodes as $relate) {
          $relateNode = $relate['entity'];
          $title = $relateNode->title;
          $alias = drupal_get_path_alias('node/' . $relateNode->nid);
          if (isset($relateNode->field_image) && is_array($relateNode->field_image) && isset($relateNode->field_image['und'])) {
            $field_image = image_style_url('main_image_content', $relateNode->field_image['und'][0]['uri']);
            $field_image_alt = $relateNode->field_image['und'][0]['alt'];
          } ?>
            <article style="height: 226px;">
                <div>
                    <div class="thumbnail">
                        <a href="/<?php echo $alias; ?>">
                            <img class="media-o-h" typeof="foaf:Image"
                                 src="<?php echo $field_image ?>"
                                 width="400" height="280"
                                 alt="<?php echo $field_image_alt ?>">
                        </a>
                    </div>
                    <div class="caption ">
                        <h4>
                            <a href="/<?php echo $alias; ?>"><?php echo $title ?></a>
                        </h4>
                    </div>
                </div>
            </article>
        <?php } ?>

      <?php } ?>

      <?php if ((3 - @$data) > 0) {
        foreach ($nodesNew['node'] as $node) {
          $node = node_load($node->nid);
          $title = $node->title;
          $alias = drupal_get_path_alias('node/' . $node->nid);
          if (isset($node->field_image) && is_array($node->field_image) && isset($node->field_image['und'])) {
            $field_image = image_style_url('main_image_content', $node->field_image['und'][0]['uri']);
            $field_image_alt = $node->field_image['und'][0]['alt'];
          } ?>
            <article style="height: 226px;">
                <div>
                    <div class="thumbnail">
                        <a href="/<?php echo $alias; ?>">
                            <img class="media-o-h" typeof="foaf:Image"
                                 src="<?php echo $field_image ?>"
                                 width="400" height="280"
                                 alt="<?php echo $field_image_alt ?>">
                        </a>
                    </div>
                    <div class="caption ">
                        <h4>
                            <a href="/<?php echo $alias; ?>"><?php echo $title ?></a>
                        </h4>
                    </div>
                </div>
            </article>
        <?php }} ?>

        </section></aside></div></row>


