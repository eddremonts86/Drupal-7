<?php 
  //krumo($variables);

 render($page['content']);
 $node_queues = get_home_contents();
 ?>
<main>
<article class="main">
        <div class="row row-cols main">
          <div class="col-side">
            <?php  print render($page['home_sidebar_in_wrapper']); ?>
          </div>
          <div class="col-main">
            <section class="list-tops">

              <?php if(isset($node_queues[0])) { $node = $node_queues[0];
                $sponsor_class = '';
                $sponsor = wsn_get_sponsor($node);
                if($sponsor){
                  $sponsor_class = 'sp';
                }

              ?>
              <article class="featured">
                <div>
                  <div class="thumbnail"><a href="<?php echo wsn_get_link($node); ?>"><img src="<?php echo wsn_get_image($node,'horizontal_crop_image_big');?>"  alt="<?php echo wsn_get_image_alt($node,'horizontal_crop_image_big');?>"></a></div>
                  <div class="caption <?php echo $sponsor_class ?>">
                    <div class="label label-default test <?php echo wsn_get_type_css( $node->type); ?>"><?php echo wsn_get_type_text( $node->type); ?></div>
                    <h3> <a href="<?php echo wsn_get_link($node); ?>"><?php echo $node->title; ?></a></h3>
                    <?php echo $sponsor ?>
                    <p><?php echo wsn_get_summary($node); ?></p>
                    <time><?php echo wsn_get_date($node); ?></time>
                  </div>
                </div>
              </article>
              <?php } ?>


              <div class="row">
                <?php if(isset($node_queues[1])) { $node = $node_queues[1];
                  $sponsor_class = '';
                  $sponsor = wsn_get_sponsor($node);
                  if($sponsor){
                    $sponsor_class = 'sp';
                  }
                ?>
                <article>
                  <div>
                    <div class="thumbnail"><a href="<?php echo wsn_get_link($node); ?>"><img src="<?php echo wsn_get_image($node);?>"  alt="<?php echo wsn_get_image_alt($node,'horizontal_crop_image_big');?>"></a></div>
                    <div class="caption <?php echo $sponsor_class ?>">
                      <div class="label label-default <?php echo wsn_get_type_css( $node->type); ?>"><?php echo wsn_get_type_text( $node->type); ?></div>
                      <h3> <a href="<?php echo wsn_get_link($node); ?>"><?php echo $node->title; ?></a></h3>
                      <?php echo $sponsor ?>
                      <p><?php echo wsn_get_summary($node); ?></p>
                      <time><?php echo wsn_get_date($node); ?> </time>
                  </div>
                </div>
                </article>
                <?php } ?>

                <?php if(isset($node_queues[2])) { $node = $node_queues[2];
                  $sponsor_class = '';
                  $sponsor = wsn_get_sponsor($node);
                  if($sponsor){
                    $sponsor_class = 'sp';
                  }
                ?>
                <article>
                   <div>
                    <div class="thumbnail"><a href="<?php echo wsn_get_link($node); ?>"><img src="<?php echo wsn_get_image($node);?>"  alt="<?php echo wsn_get_image_alt($node,'horizontal_crop_image_big');?>"></a></div>
                    <div class="caption <?php echo $sponsor_class ?>">
                      <div class="label label-default <?php echo wsn_get_type_css( $node->type); ?>"><?php echo wsn_get_type_text( $node->type); ?></div>
                      <h3> <a href="<?php echo wsn_get_link($node); ?>"><?php echo $node->title; ?></a></h3>
                      <?php echo $sponsor ?>
                      <p><?php echo wsn_get_summary($node); ?></p>
                      <time><?php echo wsn_get_date($node); ?></time>
                    </div>
                  </div>
                </article>
                <?php } ?>

              </div>
            </section>
          </div>
        </div>
        <div class="row row-cols">
          <div class="col-main">
            <?php
              $region =  block_get_blocks_by_region('home_row2_main_content');
              print render($region);
            ?>
          </div>
          <div class="col-side">
            <section class="list-med">

              <?php if(isset($node_queues[3])) { $node = $node_queues[3];
                  $sponsor_class = '';
                  $sponsor = wsn_get_sponsor($node);
                  if($sponsor){
                    $sponsor_class = 'sp';
                  }
                ?>
              <article>
                <div>
                    <div class="thumbnail"><a href="<?php echo wsn_get_link($node); ?>"><img src="<?php echo wsn_get_image($node);?>"  alt="<?php echo wsn_get_image_alt($node,'horizontal_crop_image_big');?>"></a></div>
                    <div class="caption <?php echo $sponsor_class ?>">
                      <div class="label label-default <?php echo wsn_get_type_css( $node->type); ?>"><?php echo wsn_get_type_text( $node->type); ?></div>
                      <h3> <a href="<?php echo wsn_get_link($node); ?>"><?php echo $node->title; ?></a></h3>
                      <?php echo $sponsor ?>
                      <p><?php echo wsn_get_summary($node); ?></p>
                      <time><?php echo wsn_get_date($node); ?></time>
                    </div>
                  </div>
              </article>
              <?php } ?>

               <?php if(isset($node_queues[4])) { $node = $node_queues[4];
                  $sponsor_class = '';
                  $sponsor = wsn_get_sponsor($node);
                  if($sponsor){
                    $sponsor_class = 'sp';
                  }
                ?>
              <article>
                <div>
                    <div class="thumbnail"><a href="<?php echo wsn_get_link($node); ?>"><img src="<?php echo wsn_get_image($node);?>"  alt="<?php echo wsn_get_image_alt($node,'horizontal_crop_image_big');?>"></a></div>
                    <div class="caption <?php echo $sponsor_class ?>">
                      <div class="label label-default <?php echo wsn_get_type_css( $node->type); ?>"><?php echo wsn_get_type_text( $node->type); ?></div>
                      <h3> <a href="<?php echo wsn_get_link($node); ?>"><?php echo $node->title; ?></a></h3>
                      <?php echo $sponsor ?>
                      <p><?php echo wsn_get_summary($node); ?></p>
                      <time><?php echo wsn_get_date($node); ?></time>
                    </div>
                  </div>
              </article>
              <?php } ?>

            </section>
          </div>
        </div>
        <div class="row">
          <section class="list-last">

            <?php if(isset($node_queues[5])) { $node = $node_queues[5];
                  $sponsor_class = '';
                  $sponsor = wsn_get_sponsor($node);
                  if($sponsor){
                    $sponsor_class = 'sp';
                  }
                ?>
            <article>
              <div>
                    <div class="thumbnail"><a href="<?php echo wsn_get_link($node); ?>"><img src="<?php echo wsn_get_image($node);?>"  alt="<?php echo wsn_get_image_alt($node,'horizontal_crop_image_big');?>"></a></div>
                    <div class="caption <?php echo $sponsor_class ?>">
                      <div class="label label-default <?php echo wsn_get_type_css( $node->type); ?>"><?php echo wsn_get_type_text( $node->type); ?></div>
                      <h3> <a href="<?php echo wsn_get_link($node); ?>"><?php echo $node->title; ?></a></h3>
                      <?php echo $sponsor ?>
                      <p><?php echo wsn_get_summary($node); ?></p>
                      <time><?php echo wsn_get_date($node); ?></time>
                    </div>
                  </div>
            </article>
             <?php } ?>

            <?php if(isset($node_queues[6])) { $node = $node_queues[6];
                  $sponsor_class = '';
                  $sponsor = wsn_get_sponsor($node);
                  if($sponsor){
                    $sponsor_class = 'sp';
                  }
                ?>
            <article>
              <div>
                    <div class="thumbnail"><a href="<?php echo wsn_get_link($node); ?>"><img src="<?php echo wsn_get_image($node);?>"  alt="<?php echo wsn_get_image_alt($node,'horizontal_crop_image_big');?>"></a></div>
                    <div class="caption <?php echo $sponsor_class ?>">
                      <div class="label label-default <?php echo wsn_get_type_css( $node->type); ?>"><?php echo wsn_get_type_text( $node->type); ?></div>
                      <h3> <a href="<?php echo wsn_get_link($node); ?>"><?php echo $node->title; ?></a></h3>
                      <?php echo $sponsor ?>
                      <p><?php echo wsn_get_summary($node); ?></p>
                      <time><?php echo wsn_get_date($node); ?></time>
                    </div>
                  </div>
            </article>
             <?php } ?>

            <?php if(isset($node_queues[7])) { $node = $node_queues[7];
                  $sponsor_class = '';
                  $sponsor = wsn_get_sponsor($node);
                  if($sponsor){
                    $sponsor_class = 'sp';
                  }
                ?>
            <article>
              <div>
                    <div class="thumbnail"><a href="<?php echo wsn_get_link($node); ?>"><img src="<?php echo wsn_get_image($node);?>"  alt="<?php echo wsn_get_image_alt($node,'horizontal_crop_image_big');?>"></a></div>
                    <div class="caption <?php echo $sponsor_class ?>">
                      <div class="label label-default <?php echo wsn_get_type_css( $node->type); ?>"><?php echo wsn_get_type_text( $node->type); ?></div>
                      <h3> <a href="<?php echo wsn_get_link($node); ?>"><?php echo $node->title; ?></a></h3>
                      <?php echo $sponsor ?>
                      <p><?php echo wsn_get_summary($node); ?></p>
                      <time><?php echo wsn_get_date($node); ?></time>
                    </div>
                  </div>
            </article>
             <?php } ?>

          </section>
        </div>
        <?php  print render($page['content_bottom']); ?>
      </article>