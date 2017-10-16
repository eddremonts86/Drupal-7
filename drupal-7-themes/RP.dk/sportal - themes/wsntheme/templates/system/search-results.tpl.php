<?php

/**
 * @file
 * Default theme implementation for displaying search results.
 *
 * This template collects each invocation of theme_search_result(). This and
 * the child template are dependent to one another sharing the markup for
 * definition lists.
 *
 * Note that modules may implement their own search type and theme function
 * completely bypassing this template.
 *
 * Available variables:
 * - $search_results: All results as it is rendered through
 *   search-result.tpl.php
 * - $module: The machine-readable name of the module (tab) being searched, such
 *   as "node" or "user".
 *
 *
 * @see template_preprocess_search_results()
 *
 * @ingroup themeable
 */

//krumo($variables['results']);
?>

<article class="main">
<?php if ($search_results){ ?>
  <div class="row"> 
    <?php 
      $term = taxonomy_term_load(arg(2));
    ?>
    <div class="page-header">
      <h1><?php print t('Search results');?></h1>
      <div class="cms">
      </div>
    </div>
  </div>
  <div class="row">
    <section class="row-cw-cols">
        <?php 
          $i= 0;
        foreach ($variables['results'] as $id => $row){ 
            $node = $row['node'];
             $sponsor_class = '';
              $sponsor = wsn_get_sponsor($node);
              if($sponsor){
                $sponsor_class = 'sp';
              }
          ?>
          <?php 
            if($i == 0){ ?>
            <div class="row list-cols cols3">
           <?php }?>
            <article>
            <main>
              <div class="thumbnail"><a href="<?php echo wsn_get_link($node); ?>"><img src="<?php echo wsn_get_image($node);?>"  alt="<?php echo wsn_get_image_alt($node,'horizontal_crop_image_big');?>"></a></div>
              <div class="caption <?php echo $sponsor_class ?>">
                <div class="label label-default <?php echo wsn_get_type_css( $node->type); ?>"><?php echo wsn_get_type_text( $node->type); ?></div>
                <h3> <a href="<?php echo wsn_get_link($node); ?>"><?php echo $node->title; ?></a></h3>
                <?php echo $sponsor ?>
                <p><?php echo wsn_get_summary($node); ?></p>
                <time><?php echo wsn_get_date($node); ?></time>
            </div>
          </main>
          </article>
          <?php 
            if($i == 2) { $i =-1; ?>
            </div>
          <?php } ?>
        <?php $i++;} //endforeach; ?>

    </section>
  </div>
  <div class="row">
    <nav class="pager">
      <?php if ($pager): ?>
          <?php print $pager; ?>
      <?php endif; ?>
    </nav>
  </div>
<?php } else { ?>
  <h2><?php print t('Your search yielded no results');?></h2>
  <?php print search_help('search#noresults', drupal_help_arg()); ?>
<?php } // endif ?>

</article>