<?php 
 /**
 * @file
 * Main view template.
 *
 * Variables available:
 * - $classes_array: An array of classes determined in
 *   template_preprocess_views_view(). Default classes are:
 *     .view
 *     .view-[css_name]
 *     .view-id-[view_name]
 *     .view-display-id-[display_name]
 *     .view-dom-id-[dom_id]
 * - $classes: A string version of $classes_array for use in the class attribute
 * - $css_name: A css-safe version of the view name.
 * - $css_class: The user-specified classes names, if any
 * - $header: The view header
 * - $footer: The view footer
 * - $rows: The results of the view query, if any
 * - $empty: The empty text to display if the view is empty
 * - $pager: The pager next/prev links to display, if any
 * - $exposed: Exposed widget form/info to display
 * - $feed_icon: Feed icon to display, if any
 * - $more: A link to view more, if any
 *
 * @ingroup views_templates
 */
 ?>
        <div class="row"> 

          <?php 
            $region =  block_get_blocks_by_region('header_bookmakers_list'); 
            if(!empty($region)){
              $region = array_values($region);
            }
          ?>
          <div class="page-header media-header">
            <header>
              <h1><?php print $region['0']['#block']->subject ?></h1>
              <div class="cms">
                <?php print $region['0']['#markup'] ?>
              </div>
            </header>
            <figure class="mda">
              <?php if(isset($region['1']) && !empty($region['1'])){ ?>
                <?php print $region['1']['#markup'] ?>
              <?php } ?>
            </figure>
          </div>

        </div>
        <div class="row">
          <section class="row-cw-cols">

                <?php if ($rows){ ?>
                    <?php print $rows; ?>
                <?php  } elseif ($empty){ ?>
                  <div class="view-empty-rols">
                    <?php print $empty; ?>
                  </div>
                <?php } // endif; ?>

          </section>
        </div>
        <div class="row">
          <nav class="pager">
            <?php if ($pager): ?>
                <?php print $pager; ?>
            <?php endif; ?>
          </nav>
        </div>
