<?php
  //krumo($variables);
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
  if($type_node =='news'){
    $type_node = 'News';
  } else if($type_node =='tip'){
    $type_node = 'Tip';
  } else if($type_node =='post'){
    $type_node = 'Blog';
  }

  $date ='';
  if(isset($node->created) ){
   $date = format_date($node->created, 'custom', 'j M Y');
  }

  //event
  $event_title = field_get_items('node', $node, 'field_title_event');
  $event_date = field_get_items('node', $node, 'field_date_event');
  $event_time ='';
  if($event_date){
     $event_datetime = new DateTime($event_date[0]['value']);
     $event_date = $event_datetime->format('j.m.y');
     $event_time = $event_datetime->format('h.i');
  }
  $event_link = field_get_items('node', $node, 'field_link_event');
  //stake
  $stake = field_get_items('node', $node, 'field_stake');
  //odds
  $odds = field_get_items('node', $node, 'field_odds');
  $odds_date = field_get_items('node', $node, 'field_date_odds');
  if($odds_date){
     $odds_datetime = new DateTime($odds_date[0]['value']);
     $odds_date = $odds_datetime->format('j.m.y');
  }

  //tip
  $tip_title = field_get_items('node', $node, 'field_title_tip');
  $tip_desc = field_get_items('node', $node, 'field_tip_description');

  //bookmaker
  $field_bookmaker = field_get_items('node', $node, 'field_bookmaker');
  if($field_bookmaker){
    $bookmaker = $field_bookmaker[0]['node'];
    $bookmaker_link = field_get_items('node', $bookmaker, 'field_affiliate_link');
  }

  $user_name = $node->name;
  $picture =''; //TODO add default image for users
  if($node->picture){
    $picture = file_load($node->picture);
    $picture = file_create_url($picture->uri);
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
?>
<div class="row main-article <?php echo $class_status ?>">
  <header>
    <figure><img src="<?php echo $field_image ?>" alt="<?php echo $field_image_alt ;?>">
      <ul class="link-socials">
        <?php echo wsn_social_buttons_share_custom_circle();?>
      </ul>
      <div class="caption">
        <div class="label label-default"><?php echo $type_node;?></div>
      </div>
    </figure>
    <strong class="summary"><?php echo $title;?></strong>
    <aside class="user-info-detail">
      <div>
        <figure><img src="<?php echo $picture ?>" alt=""><strong><?php echo $user_name;?></strong></figure>
        <time><?php echo $date;?></time>
      </div>
    </aside>
  </header>
  <main class="<?php echo $class_sponsor ?>">
    <h1><?php echo $title;?></h1>
    <?php if($sponsor && $sponsor_active){ ?>
      <strong class="sp"><em style="color: <?php echo $sponsor_color;?>;">Sponsored by </em>
          <a href="<?php echo $sponsor_link;?>"  target="_blank" rel="nofollow">
            <img src="<?php echo $sponsor_image;?>" />
          </a>
          <span style="background-color: <?php echo $sponsor_color;?>;"></span>
      </strong>
    <?php } ?>
    <aside class="info-tip">
      <div class="col">
        <p class="team"><strong><?php echo $event_title[0]['value'] ?>:</strong> <time><?php echo $event_date ?> <span><?php echo $event_time ?></span></time>
        </p>
        <p class="stake"><strong>Stake:</strong> <span><?php echo $stake[0]['value'] ?></span></p>
        <p class="odds"><strong>Odds:</strong> <span><?php echo $odds[0]['value'] ?><?php if($field_bookmaker){ ?> / <a href="<?php echo $bookmaker_link[0]['value'] ?>" target="_blank" rel="nofollow"><?php echo $bookmaker->title ?></a><?php } ?> <time><?php echo $odds_date ?></time></span></p>
      </div>
      <div class="col">
        <?php if($tip_title){ ?>
          <p class="tip"><strong><?php echo $tip_title[0]['value']  ?></strong></p>
        <?php } ?>
        <?php if($tip_desc){ ?>
           <p class="text">
            <?php echo $tip_desc[0]['value'] ?>
          </p>
        <?php } ?>
        <?php if($field_bookmaker){ ?>
        <div class="play"><a href="<?php echo $bookmaker_link[0]['value'] ?>" rel="nofollow" target="_blank" class="btn btn-play">Bet now</a></div>
        <?php } ?>
      </div>
    </aside>
    <div class="cms"> 
      <?php echo $content;?>
    </div>
    <?php if(FALSE && ($field_bookmaker)){ ?>
      <div class="cms cw-btn-play"><a href="<?php echo $bookmaker_link[0]['value'] ?>" class="btn btn-play"  target="_blank" rel="nofollow">Bet now</a></div>
    <?php } ?>
  </main>
  <nav class="buttons-social-share">
    <ul>
      <?php echo wsn_social_buttons_share_custom() ?>
    </ul>
  </nav>
    <aside class="info-tip">
      <div class="col">
        <p class="team"><strong><?php echo $event_title[0]['value'] ?>:</strong> <time><?php echo $event_date ?> <span><?php echo $event_time ?></span></time>
        </p>
        <p class="stake"><strong>Stake:</strong> <span><?php echo $stake[0]['value'] ?></span></p>
        <p class="odds"><strong>Odds:</strong> <span><?php echo $odds[0]['value'] ?><?php if($field_bookmaker){ ?> / <a href="<?php echo $bookmaker_link[0]['value'] ?>" target="_blank" rel="nofollow"><?php echo $bookmaker->title ?></a><?php } ?> <time><?php echo $odds_date ?></time></span></p>
      </div>
      <div class="col">
        <?php if($tip_title){ ?>
          <p class="tip"><strong><?php echo $tip_title[0]['value']  ?></strong></p>
        <?php } ?>
        <?php if($tip_desc){ ?>
           <p class="text">
            <?php echo $tip_desc[0]['value'] ?>
          </p>
        <?php } ?>
        <?php if($field_bookmaker){ ?>
        <div class="play"><a href="<?php echo $bookmaker_link[0]['value'] ?>" rel="nofollow" target="_blank" class="btn btn-play">Bet now</a></div>
        <?php } ?>
      </div>
    </aside>
</div>
<aside class="info-author-content">
    <div class="main">
      <figure><img src="<?php echo $picture ?>" alt=""></figure>
      <div class="data">
        <h2><?php echo $user_name;?></h2>
        <p>Number of tips: <?php echo get_number_articles_author($node->uid,'tip'); ?></p>
      </div>
    </div>
  </aside>
