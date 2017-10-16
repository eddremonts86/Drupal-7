<div class="row"> 
          <?php 
            $region =  block_get_blocks_by_region('header_tips_list'); 
            if(!empty($region)){
              $region = array_values($region);
            }
          ?>
          <div class="page-header">
            <h1><?php print $region['0']['#block']->subject ?></h1>
            <div class="cms">
              <?php print $region['0']['#markup'] ?>
            </div>
          </div>

        </div>
        <div class="row">
          <section>
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
           <?php if ($pager): ?>
                <?php print $pager; ?>
            <?php endif; ?>
        </div>