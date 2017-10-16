<div class="row"> 
  <?php 
    $term = taxonomy_term_load(arg(2));
  ?>
  <div class="page-header">
    <h1><?php print $term->name; ?></h1>
    <div class="cms">
      <?php print $term->description; ?>
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
  <nav class="pager">
    <?php if ($pager): ?>
        <?php print $pager; ?>
    <?php endif; ?>
  </nav>
</div>
