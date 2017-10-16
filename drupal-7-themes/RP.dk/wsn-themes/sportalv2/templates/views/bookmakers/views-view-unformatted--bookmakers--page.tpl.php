<?php

/**
 * @file
 * Default simple view template to display a list of rows.
 *
 * @ingroup views_templates
 */
?>

<?php 
  $i =0;
foreach ($rows as $id => $row): ?>
    <?php if($i==0){ ?>
      <div class="row list-cols cols3">
    <?php } ?>
      <?php print $row; ?>
    <?php if($i>=2){ ?>
      </div>
      <?php $i=-1;
    } ?>
    <?php $i++; ?>
<?php endforeach; ?>
