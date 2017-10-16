<?php
  //krumo($user);
  $summary ='';
  if(isset($node->body) && is_array($node->body)&& isset($node->body['und'][0]['summary'])){
   $summary = $node->body['und'][0]['summary'];
  }

  $content = '';
  if(isset($node->body) && is_array($node->body) && isset($node->body['und'])){
   $content = $node->body['und'][0]['value'];
  }
  //status
  $class_status='';
  if($node->status == 0){
    $class_status ='unpublished';
  }
?>
<div class="row main-article <?php echo $class_status ?>">
  <div class="page-header detail">
    <h1><?php echo $title ;?></h1>
    <div class="cms">
      <?php echo $summary ;?>
    </div>
  </div>
  <div class="main">
    <div class="cms">
      <?php echo $content ;?>
    </div>
  </div>
</div>
