<?php
  //krumo($variables);
  $summary = field_get_items('node', $node, 'field_description_webform');
  //status
  $class_status='';
  if($node->status == 0){
    $class_status ='unpublished';
  }
?>
<div class="row main-article <?php echo $class_status ?>">
  <div class="page-header detail">
    <h1><?php echo $title ;?></h1>
      <?php 
$block = module_invoke('block', 'block_view', '11');
print render($block['content']);
	?>
    <div class="cms">
    </div>
  </div>
  <div class="main">
    <div class="cms">
      <?php print render($content) ;?>
    </div>
  </div>
</div>
