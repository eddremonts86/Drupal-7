<?php
  //krumo($variables);
  $summary ='';
  if(isset($variables['body']) && is_array($variables['body'])&& isset($variables['body'][0]['summary'])){
   $summary = $variables['body'][0]['summary'];
  }

  $content = '';
  if(isset($variables['body']) && is_array($variables['body']) && isset($variables['body'][0])){
   $content = $variables['body'][0]['value'];
  }

  $field_image_bg ='';
  if(isset($variables['field_image']) && is_array($variables['field_image']) && isset($variables['field_image'][0])){
   $field_image_bg = image_style_url('main_image_content',$node->field_image['und'][0]['uri']);
  }

  $field_live_suppport  ='no';
  if(isset($variables['field_live_suppport']) && is_array($variables['field_live_suppport']) && isset($variables['field_live_suppport'][0])){
   $field_live_suppport  = $variables['field_live_suppport'][0]['value'];
  }

  $field_mobile_friendly  ='no';
  if(isset($variables['field_mobile_friendly']) && is_array($variables['field_mobile_friendly']) && isset($variables['field_mobile_friendly'][0])){
   $field_mobile_friendly  = $variables['field_mobile_friendly'][0]['value'];
  }

  $field_payments_methods  ='no';
  if(isset($variables['field_payments_methods']) && is_array($variables['field_payments_methods']) && isset($variables['field_payments_methods'][0])){
   $field_payments_methods  = $variables['field_payments_methods'][0]['value'];
  }
 
  $field_players_from_denmark_accep  ='no';
  if(isset($variables['field_players_from_denmark_accep']) && is_array($variables['field_players_from_denmark_accep']) && isset($variables['field_players_from_denmark_accep'][0])){
   $field_players_from_denmark_accep  = $variables['field_players_from_denmark_accep'][0]['value'];
  }
 
  $field_affiliate_link  ='';
  if(isset($variables['field_affiliate_link']) && is_array($variables['field_affiliate_link']) && isset($variables['field_affiliate_link'][0])){
   $field_affiliate_link  = $variables['field_affiliate_link'][0]['value'];
  }

  $field_rating  =0;
  if(isset($variables['field_rating']) && is_array($variables['field_rating']) && isset($variables['field_rating'][0])){
   $field_rating  = (int) $variables['field_rating'][0]['value'];
  }

  $total_rating = 5;
  if($field_rating > 0){

    $stars_full= floor($field_rating / 2);
    $stars_min = $field_rating % 2;
    $stars_empty = 5 - ($stars_full + $stars_min);
  } else {
    $stars_empty = 5;
    $stars_full= 0;
    $stars_min= 0;
  }


  $field_image ='';
  $field_image_alt ='';
  if(isset($node->field_image) && is_array($node->field_image) && isset($node->field_image['und'])){
   $field_image = image_style_url('main_image_content',$node->field_image['und'][0]['uri']);
   $field_image_alt = $node->field_image['und'][0]['alt'];
  }

  if (geoip_country_code() == 'FR' && $title =='Unibet') {
    $field_affiliate_link = $variables['field_fr_affiliate_link'][0]['value'];
  }

 if(isset($node->field_t_c['und'][0]['nid']) and $node->field_t_c['und'][0]['nid'] != '' ){
	$tc = $node->field_t_c['und'][0]['nid'];
	$path = 'node/'.$tc;
    	$alias = drupal_get_path_alias($path); 
	$tc = '<div class="tc"><a href="/'.$alias.'">T&C</a></div>';
	  } 
 else{$tc = '';}


  ?>
<div class="row main-article main-bookmarker">
  <header>
    <figure><img src="<?php echo $field_image_bg ?>" alt="<?php echo $field_image_alt ?>">
      <div class="caption">
        <div class="label label-default">Bookmaker</div>
      </div>
    </figure>
    <aside class="info-bookmarker">
      <h1><?php echo $title;?></h1>
      <div class="points">
        <?php for( $i=0; $i< $stars_full; $i++){ ?>
         <i aria-hidden="true" class="fa fa-star"></i>
        <?php } ?>
        <?php for( $i=0; $i< $stars_min; $i++){ ?>
         <i aria-hidden="true" class="fa fa-star-half-o"></i>
        <?php } ?>
        <?php for( $i=0; $i < $stars_empty; $i++){ ?>
         <i aria-hidden="true" class="fa fa-star-o"></i>
        <?php } ?>
      </div>
      <ul class="options">
        <li><strong>Live Support</strong><span><?php echo ucfirst($field_live_suppport); ?></span></li>
        <li><strong>Mobile Friendly</strong><span><?php echo ucfirst($field_mobile_friendly); ?></span></li>
        <li><strong>Welcome Bonus</strong><span><?php echo ucfirst($field_payments_methods); ?></span></li>
      </ul>
      <?php if($field_players_from_denmark_accep =='yes'){ ?>
        <div class="info-country"><img src="<?php echo $path_to_theme ?>/files/img/ico-flag.png" alt="">Players from Denmark accepted </div>
      <?php } ?>
    </aside>
  </header>
  <main>
    <h2 class="main-title"><?php echo $title;?></h2>
    <p class="summary"><?php echo strip_tags($summary,'strong');?></p>
    <nav class="steps">
      <ul>
        <li>Go to website</li>
        <li>Create a user</li>
        <li>Start betting</li>
        <li class="play"><a href="<?php echo $field_affiliate_link ?>" class="btn btn-play"  target="_blank" rel="nofollow">Bet now</a></li>
      </ul>
      <?php echo $tc;?>
    </nav>
    <aside class="bookmarkers-vs-content">
      <div class="row list-cols">
        <article>
          <h2>Pros</h2>
          <ul>
             <?php foreach ($variables['field_good_things'] as $option) { ?>
              <li><?php echo $option['value']; ?></li>
            <?php } ?>
          </ul>
        </article>
        <article>
          <h2>Cons</h2>
          <ul>
            <?php foreach ($variables['field_bad_things'] as $option) { ?>
              <li><?php echo $option['value']; ?></li>
            <?php } ?>
          </ul>
        </article>
      </div>
    </aside>
    <div class="cms"> 
      <?php echo $content;?>
    </div>
    <div class="cms cw-btn-play">
		<a href="<?php echo $field_affiliate_link ?>" class="btn btn-play"  target="_blank" rel="nofollow">Bet now</a></div>
  </main>
</div>
