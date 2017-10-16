<?php 
  $i=-1;
foreach ($rows as $id => $row): ?>
    
    <?php if($i==-1){ ?>
        <div class="row list-tops">
          <article class="featured">
            <div class="main">
              <?php print $row; ?>
            </div>
          </article>
        </div>
         <?php $i=0; ?>
    <?php } ?>
     <?php if($i==1){ ?>
       <div class="row list-cols cols3">
          
      <?php } ?>
              <?php if($i>0){ ?>
              <article>
                <div class="main">
                  <?php print $row; ?>
                </div>
              </article>
              <?php } ?>
      <?php if($i>=3){ ?>
        </div>
      <?php 
          $i=0;
      } ?>
    <?php $i++; ?>
<?php endforeach; ?>
