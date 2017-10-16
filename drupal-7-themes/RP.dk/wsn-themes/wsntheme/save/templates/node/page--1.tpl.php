<?php
  $summary ='';
  if(isset($variables['body']) && is_array($variables['body']) && ""!= $variables['body'][0]['summary']){
   $summary = $variables['body'][0]['summary'];
  }

  $content = '';
  if(isset($variables['body']) && is_array($variables['body']) && ""!= $variables['body'][0]['value']){
   $content = $variables['body'][0]['value'];
  }
?>
<div class="row"> 
  <div class="page-header detail">
    <h1><?php echo $title ;?></h1>
    <div class="cms">
      <?php echo $summary ;?>
    </div>
  </div>
</div>
<div class="row">
   <?php echo $content ;?>
  
</div>