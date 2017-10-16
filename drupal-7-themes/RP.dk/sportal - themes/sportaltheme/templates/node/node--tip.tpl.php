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
    //$odds_date = $odds_datetime->format('d.F.Y');
    $odds_date = format_date(strtotime($odds_date[0]['value']) ,'custom','d F Y');

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
if (@$node->field_tip_bonus_text['und'][0]['value'] != "" and @$node->field_tip_bonus_text['und'][0]['value'] != null) {
    $tip_text = $node->field_tip_bonus_text['und'][0]['value'];
}
$tip_link = @$node->field_tip_bonus_link['und'][0]['value'];

if ($tip_link == "" || $tip_link == null) {
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
                <?php if ($tip_title) { ?>
                    <a href="<?php echo $bookmaker_link[0]['value'] ?>" rel="nofollow" target="_blank">
                        <span><h2 class="tip"><?php echo $tip_title[0]['value'] ?></h2></span>
                    </a>
                <?php } ?>
                <?php if ($tip_desc) { ?><p class="text"><?php echo $tip_desc[0]['value'] ?></p><?php } ?>

                <h3><?php print t('Match Info'); ?>:
                    <small></small>
                </h3>
                <p class="team"><strong><?php echo $event_title[0]['value'] ?>:</strong>
                    <time><?php echo $event_date ?> <span><?php echo $event_time ?></span></time>
                </p>
                <p class="stake"><strong> <?php print t('Spilltips'); ?> :</strong> <span><?php echo $stake[0]['value'] ?></span></p>
                <p class="odds"><strong> <?php print t('Odds '); ?> :</strong>
                    <span><?php echo $odds[0]['value'] ?><?php if ($field_bookmaker) { ?> / <a
                            href="<?php echo $bookmaker_link[0]['value'] ?>" target="_blank"
                            rel="nofollow"><?php echo $bookmaker->title ?></a><?php } ?>
                        <time><?php echo $odds_date ?></time></span></p>
                <p><a class="bonus_link" href="<?php echo $tip_link; ?>" target="_blank" rel="nofollow"><b><?php print t('Bonus'); ?> :</b><?php echo $tip_text; ?></a></p>
                <a type="button" class="btn btn-warning btn-custom white_text"
                   href="<?php echo $bookmaker_link[0]['value'] ?>" rel="nofollow" target="_blank">
                    <?php print t('SPIL NU TIL ODDS '); ?><?php echo $odds[0]['value'] ?>
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
                <figure><img src="<?php echo $picture ?>" alt=""><strong><?php echo $user_name; ?></strong></figure>
                <time><?php echo $date; ?></time>
            </div>
        </aside>
    </header>
    <main class="<?php echo $class_sponsor ?>">
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
                            <h2 class="tip"><strong
                                        class="seo_tip_name"><?php print t('Spilltips'); ?>: </strong><?php echo $tip_title[0]['value'] ?>
                            </h2>
                        </a>
                    <?php } ?>
                    <?php if ($tip_desc) { ?><p class="text"><?php echo $tip_desc[0]['value'] ?></p><?php } ?>
                    <img class="img_seo_afflink_2" src="/sites/default/files/arrow_matchpage_dark.png"
                         alt="match page arrow">
                </div>
            </div>
            <div class="col-xs-12 col-md-5 content_tips">
                <h3><?php print t('Match Info'); ?>:
                    <small></small>
                </h3>
                <p class="team"><strong><?php echo $event_title[0]['value'] ?>:</strong>
                    <time><?php echo $event_date ?> <span><?php echo $event_time ?></span></time>
                </p>
                <p class="stake"><strong><?php print t('Spilltips'); ?>:</strong> <span><?php echo $stake[0]['value'] ?></span></p>
                <p class="odds"><strong><?php print t('Odds'); ?> :</strong>
                    <span><?php echo $odds[0]['value'] ?><?php if ($field_bookmaker) { ?> / <a
                            href="<?php echo $bookmaker_link[0]['value'] ?>" target="_blank"
                            rel="nofollow"><?php echo $bookmaker->title ?></a><?php } ?>
                        <time><?php echo $odds_date ?></time></span></p>
                <p><a href="<?php echo $tip_link; ?>" target="_blank" rel="nofollow"><b><?php print t('Bonus'); ?> :</b><?php echo $tip_text; ?></a></p>
                <a type="button" class="btn btn-warning btn-custom white_text"
                   href="<?php echo $bookmaker_link[0]['value'] ?>" rel="nofollow" target="_blank">
                    <?php print t('SPIL NU TIL ODDS '); ?><?php echo $odds[0]['value'] ?>
                </a>
            </div>
        </aside>
        <div class="cms">
            <?php echo $content; ?>
        </div>
    </main>
    <nav class="buttons-social-share">
        <ul>
            <?php //echo wsn_social_buttons_share_custom() ?>
        </ul>
    </nav>
    <main class="<?php echo $class_sponsor ?>">

        <aside class="row seo_afflink seo_afflink_tips">
            <div class="col-xs-12 col-md-7">
                <div class="col-lg-12 seo_tip_text_content">
                    <?php if ($tip_title) { ?>
                        <a href="<?php echo $bookmaker_link[0]['value'] ?>" rel="nofollow" target="_blank">
                            <h2 class="tip"><strong class="seo_tip_name"><?php print t('Spilltips'); ?>: </strong><?php echo $tip_title[0]['value'] ?>
                            </h2>
                        </a>
                    <?php } ?>
                    <?php if ($tip_desc) { ?><p class="text"><?php echo $tip_desc[0]['value'] ?></p><?php } ?>
                    <img class="img_seo_afflink_2" src="/sites/default/files/arrow_matchpage_dark.png"
                         alt="match page arrow">
                </div>

            </div>

            <div class="col-xs-12 col-md-5 content_tips">
                <h3><?php print t('Match Info'); ?>:
                    <small></small>
                </h3>
                <p class="team"><strong><?php echo $event_title[0]['value'] ?>:</strong>
                    <time><?php echo $event_date ?> <span><?php echo $event_time ?></span></time>
                </p>
                <p class="stake"><strong><?php print t('Spilltips'); ?>:</strong> <span><?php echo $stake[0]['value'] ?></span></p>
                <p class="odds"><strong><?php print t('Odds'); ?>:</strong>
                    <span><?php echo $odds[0]['value'] ?><?php if ($field_bookmaker) { ?> / <a
                            href="<?php echo $bookmaker_link[0]['value'] ?>" target="_blank"
                            rel="nofollow"><?php echo $bookmaker->title ?></a><?php } ?>
                        <time><?php echo $odds_date ?></time></span></p>
                <p><a class="bonus_link" href="<?php echo $tip_link; ?>" rel="nofollow" target="_blank"><b><?php print t('Bonus'); ?>:</b><?php echo $tip_text; ?></a></p>
                <a type="button" class="btn btn-warning btn-custom white_text"
                   href="<?php echo $bookmaker_link[0]['value'] ?>" rel="nofollow" target="_blank">
                    <?php print t('SPIL NU TIL ODDS '); ?><?php echo $odds[0]['value'] ?>
                </a>
            </div>
        </aside>
    </main>

</div>
<?php /*

<aside class="info-author-content">
    <div class="main">
        <figure><img src="<?php echo $picture ?>" alt=""></figure>
        <div class="data">
            <h2><?php echo $user_name; ?></h2>
            <p><?php print t("Antal tips"); ?>: <?php echo get_number_articles_author($node->uid, 'tip'); ?></p>
        </div>
    </div>
</aside>
*/ ?>