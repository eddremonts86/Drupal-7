<?php

//krumo($variables);
$summary = '';
if (isset($node->body) && is_array($node->body) && isset($node->body['und'][0]['summary'])) {
    $summary = $node->body['und'][0]['summary'];
}

$content = '';
if (isset($node->body) && is_array($node->body) && isset($node->body['und'])) {
    $content = $node->body['und'][0]['value'];
}


$field_image = '';
$field_image_alt = '';
if (isset($node->field_image) && is_array($node->field_image) && isset($node->field_image['und'])) {
    $field_image = image_style_url('main_image_content', $node->field_image['und'][0]['uri']);
    $field_image_alt = $node->field_image['und'][0]['alt'];
}

$type_node = $node->type;
if ($type_node == 'news' || $type_node == 'article') {
    $type_node = 'Article';
} else if ($type_node == 'tip') {
    $type_node = 'Tip';
} else if ($type_node == 'post') {
    $type_node = 'Blog';
}


$date = '';
if (isset($node->created)) {
    $date = format_date($node->created, 'custom', 'd F Y');
}

//event
$event_title = field_get_items('node', $node, 'field_title_event');
$event_date = field_get_items('node', $node, 'field_date_event');
$event_time = '';
if ($event_date) {
    $event_datetime = new DateTime($event_date[0]['value']);
    /*$event_date = $event_datetime->format('Y.m.j');
    $event_time = $event_datetime->format('h.i');*/
    $event_date = $event_datetime->format('j/m/Y');
    $event_time = $event_datetime->format('H:i');
}
$event_link = field_get_items('node', $node, 'field_link_event');
//stake
$stake = field_get_items('node', $node, 'field_stake');
//odds
$odds = field_get_items('node', $node, 'field_odds');
$odds_date = field_get_items('node', $node, 'field_date_odds');
if ($odds_date) {
    $odds_datetime = new DateTime($odds_date[0]['value']);
    $odds_date = $odds_datetime->format('d.F.Y');
}

//tip
$tip_title = field_get_items('node', $node, 'field_title_tip');
$tip_desc = field_get_items('node', $node, 'field_tip_description');

//bookmaker
$field_bookmaker = field_get_items('node', $node, 'field_bookmaker');
if ($field_bookmaker) {
    $bookmaker = $field_bookmaker[0]['node'];
    $bookmaker_link = field_get_items('node', $bookmaker, 'field_affiliate_link_tips_');

}

$user_name = $node->name;
$picture = ''; //TODO add default image for users
if ($node->picture) {
    //$picture = file_load($node->picture);
    $picture = $node->picture;
    $picture = file_create_url($picture->uri);
}
if (null == $picture) {
    $picture = '/' . variable_get('user_picture_default');
}

//sponsor
$sponsor = field_get_items('node', $node, 'field_sponsor');
$sponsor_active = false;
$class_sponsor = '';
if ($sponsor) {
    $term = $sponsor[0]['taxonomy_term'];
    $sponsor_image = field_get_items('taxonomy_term', $term, 'field_sponsor_image');
    if ($sponsor_image) {
        $sponsor_image = file_create_url($sponsor_image[0]['uri']);
    }
    $sponsor_link = field_get_items('taxonomy_term', $term, 'field_sponsor_link');
    if ($sponsor_link) {
        $sponsor_link = $sponsor_link[0]['value'];
    }
    $sponsor_color = field_get_items('taxonomy_term', $term, 'field_sponsor_color');
    if ($sponsor_color) {
        $sponsor_color = $sponsor_color[0]['rgb'];
    }
    //active field sponsor
    $sponsor_active_value = field_get_items('taxonomy_term', $term, 'field_active');
    if ($sponsor_active_value[0]['value'] == 'Yes') {
        $sponsor_active = true;
        $class_sponsor = 'sp';
    }
}
//status
$class_status = '';
if ($node->status == 0) {
    $class_status = 'unpublished';
}

$tip_text = " 100% upp till 1000kr";
if(@$node->field_tip_bonus_text['und'][0]['value']!="" and @$node->field_tip_bonus_text['und'][0]['value'] != null )
{
    $tip_text = $node->field_tip_bonus_text['und'][0]['value'];
}
$tip_link = @$node->field_tip_bonus_link['und'][0]['value'];

if($tip_link == "" || $tip_link == null ){
    $tip_link = $bookmaker_link[0]['value'];
}
?>
<div class="row main-article <?php echo $class_status ?>">
    <header>
        <figure>
		
            <?php
            $limk = @$node->field_img_affiliate_link['und'][0]['value'];
            if (isset($limk)) { ?>
                <a rel="nofollow" href="<?php echo $limk ?>">
                    <img src="<?php echo $field_image ?>" alt="<?php echo $field_image_alt; ?>">
                </a>
            <?php } else {
                ?>
                <img src="<?php echo $field_image ?>" alt="<?php echo $field_image_alt; ?>">
            <?php } ?>
            <div class="new_cta col-xs-12 col-md-5 col-md-offset-7 hidden-xs hidden-sm">
<div id="id" style="margin-top: 5px;">
  <img class="imgdown" src="/sites/default/files/ENG-image-1.png" hspace="30" vspace="0">
  <img class="imgup" style="left: 119px;" src="/sites/default/files/ENG-image-2.png">
 </div>





   <?php if ($tip_title) { ?>
               
		 <a href="<?php echo $bookmaker_link[0]['value'] ?>" rel="nofollow" target="_blank">
                        <span><h2 class="tip"><?php echo $tip_title[0]['value'] ?></h2></span>
                    </a>
                <?php } ?>
                <?php if ($tip_desc) { ?><p class="text"><?php echo $tip_desc[0]['value'] ?></p><?php } ?>

                <h3>Match Info:
                    <small></small>
                </h3>
                <p class="team"><strong><?php echo $event_title[0]['value'] ?>:</strong>
                    <time><?php echo $event_date ?> <span><?php echo $event_time ?></span></time>
                </p>
                <p class="stake"><strong>BET NOW:</strong> <span><?php echo $stake[0]['value'] ?></span></p>
                <p class="odds"><strong>Odds:</strong>
                    <span><?php echo $odds[0]['value'] ?><?php if ($field_bookmaker) { ?> / <a
                            href="<?php echo $bookmaker_link[0]['value'] ?>" target="_blank"
                            rel="nofollow"><?php echo $bookmaker->title ?></a><?php } ?>
                        <time><?php echo $odds_date ?></time></span></p>
                <a type="button" class="btn btn-warning btn-custom white_text"
                   href="<?php echo $bookmaker_link[0]['value'] ?>" rel="nofollow" target="_blank">
                    <?php print t('BET NOW AT'); ?>  <?php echo $odds[0]['value'] ?> <?php print t('ODDS'); ?> 
                </a>
            </div>

            <ul class="link-socials">
                <?php echo wsn_social_buttons_share_custom_circle(); ?>
            </ul>
            <div class="caption">
                <div class="label label-default"><?php echo $type_node; ?></div>
            </div>
        </figure>
        <strong class="summary"><?php echo $title; ?></strong>
        <aside class="user-info-detail">
            <div>
                <figure><img src="<?php echo $picture ?>" alt="<?php echo $user_name; ?>"><strong><?php echo $user_name; ?></strong></figure>
                <time><?php echo $date; ?></time>
            </div>
        </aside>
    </header>
    <div class="<?php echo $class_sponsor ?>">
        <h1><?php echo $title; ?></h1>
        <?php if ($sponsor && $sponsor_active) { ?>
            <strong class="sp"><em style="color: <?php echo $sponsor_color; ?>;">Sponsored by </em>
                <a href="<?php echo $sponsor_link; ?>" target="_blank" rel="nofollow">
                    <img src="<?php echo $sponsor_image; ?>"/>
                </a>
                <span style="background-color: <?php echo $sponsor_color; ?>;"></span>
            </strong>
        <?php } ?>
        <aside class="row seo_afflink seo_afflink_tips hidden-md hidden-lg ">
            <div class="col-xs-12 col-md-7">
                <div class="col-lg-12 seo_tip_text_content">
                    <?php if ($tip_title) { ?>
                        <a href="<?php echo $bookmaker_link[0]['value'] ?>" rel="nofollow" target="_blank">
                            <h2 class="tip"><strong class="seo_tip_name">BET NOW: </strong><?php echo $tip_title[0]['value'] ?></h2>
                        </a>
                    <?php } ?>
                    <?php if ($tip_desc) { ?><p class="text"><?php echo $tip_desc[0]['value'] ?></p><?php } ?>
                    <img class="img_seo_afflink_2" src="/sites/default/files/arrow_matchpage_dark.png" alt="match page arrow">
                </div>
            </div>
            <div class="col-xs-12 hidden-lg hidden-md">
                <a href="<?php echo $bookmaker_link[0]['value'] ?>" rel="nofollow" target="_blank">
                    <div class="seo_tip_buttom">
                        <div class="seo_tip_buttom_one">
                            <img src="https://www.sportal.se/sites/default/files/bet365_sportal.gif" alt="bet365" width="82px">
                        </div>
                        <div class="seo_tip_buttom_two"><?php echo $odds[0]['value'] ?></div>
                    </div>
                </a>
            </div>
            <div class="col-xs-12 col-md-5 content_tips">
                <h3>Match Info: <small></small></h3>
                <p class="team"><strong><?php echo $event_title[0]['value'] ?>:</strong>
                    <time><?php echo $event_date ?> <span><?php echo $event_time ?></span></time>
                </p>
                <p class="stake"><strong>Speltips:</strong> <span><?php echo $stake[0]['value'] ?></span></p>
                <p class="odds"><strong>Odds:</strong>
                    <span><?php echo $odds[0]['value'] ?><?php if ($field_bookmaker) { ?> / <a
                            href="<?php echo $bookmaker_link[0]['value'] ?>" target="_blank"
                            rel="nofollow"><?php echo $bookmaker->title ?></a><?php } ?>
                        <time><?php echo $odds_date ?></time></span></p>
                <a href="<?php echo $bookmaker_link[0]['value'] ?>" rel="nofollow" target="_blank">
                    <div class="seo_tip_buttom hidden-sm hidden-xs">
                        <div class="seo_tip_buttom_one">
                            <img src="https://www.sportal.se/sites/default/files/bet365_sportal.gif" alt="bet365" width="82px">
                        </div>
                        <div class="seo_tip_buttom_two"><?php echo $odds[0]['value'] ?></div>
                    </div>
                </a>
            </div>
        </aside>
        <div class="cms">
            <?php echo $content; 
                $block = block_load('block', '14');
                $output =_block_get_renderable_array(_block_render_blocks(array($block)));
                $output = drupal_render($output);
                print $output;
		?>
        </div>
        <?php /*if ($field_bookmaker) { ?>
            <div class="cms cw-btn-play"><a href="<?php echo $bookmaker_link[0]['value'] ?>" class="btn btn-play"
                                            target="_blank" rel="nofollow"><?php print t("Play"); ?></a></div>
        <?php } */?>
    </div>
    <nav class="buttons-social-share">
        <ul>
            <?php //echo wsn_social_buttons_share_custom() ?>
        </ul>
    </nav>
    <div class="<?php echo $class_sponsor ?>">

        <aside class="row seo_afflink seo_afflink_tips">
            <div class="col-xs-12 col-md-7">
                <div class="col-lg-12 seo_tip_text_content">
                    <?php if ($tip_title) { ?>
                        <a href="<?php echo $bookmaker_link[0]['value'] ?>" rel="nofollow" target="_blank">
                            <h2 class="tip"><strong class="seo_tip_name">SPELTIPS: </strong><?php echo $tip_title[0]['value'] ?></h2>
                        </a>
                    <?php } ?>
                    <?php if ($tip_desc) { ?><p class="text"><?php echo $tip_desc[0]['value'] ?></p><?php } ?>
                    <img class="img_seo_afflink_2" src="/sites/default/files/arrow_matchpage_dark.png" alt="match page arrow">
                </div>

            </div>
            <div class="col-xs-12 hidden-lg hidden-md">
                <a href="<?php echo $bookmaker_link[0]['value'] ?>" rel="nofollow" target="_blank">
                    <div class="seo_tip_buttom">
                        <div class="seo_tip_buttom_one">
                            <img src="https://www.sportal.se/sites/default/files/bet365_sportal.gif" alt="bet365" width="82px">
                        </div>
                        <div class="seo_tip_buttom_two"><?php echo $odds[0]['value'] ?></div>
                    </div>
                </a>
            </div>

            <div class="col-xs-12 col-md-5 content_tips">
                <h3>Match Info: <small></small></h3>
                <p class="team"><strong><?php echo $event_title[0]['value'] ?>:</strong>
                    <time><?php echo $event_date ?> <span><?php echo $event_time ?></span></time>
                </p>
                <p class="stake"><strong>Speltips:</strong> <span><?php echo $stake[0]['value'] ?></span></p>
                <p class="odds"><strong>Odds:</strong>
                    <span><?php echo $odds[0]['value'] ?><?php if ($field_bookmaker) { ?> / <a
                            href="<?php echo $bookmaker_link[0]['value'] ?>" target="_blank"
                            rel="nofollow"><?php echo $bookmaker->title ?></a><?php } ?>
                        <time><?php echo $odds_date ?></time></span></p>
                <!--<a href="<?php /*echo $bookmaker_link[0]['value'] */?>" rel="nofollow" target="_blank">

                    <div class="seo_tip_buttom hidden-sm hidden-xs">
                        <div class="seo_tip_buttom_one">
                            <img src="https://www.sportal.se/sites/default/files/bet365_sportal.gif" alt="bet365" width="82px">
                        </div>
                        <div class="seo_tip_buttom_two"><?php /*echo $odds[0]['value'] */?></div>
                    </div>
                </a>-->

                <a type="button" class="btn btn-warning btn-custom white_text"
                   href="<?php echo $bookmaker_link[0]['value'] ?>" rel="nofollow" target="_blank">
                    <?php print t('BET NOW AT'); ?>  <?php echo $odds[0]['value'] ?> ODDS
                </a>
            </div>
        </aside>
    </div>

</div>


<?php
//$allNodes = @$node->field_related_news['und'];
//$allNodes = @$node->field_related_news_blog['und'];
$allNodes = @$node->field_related_news_tip['und'];
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
 
 

