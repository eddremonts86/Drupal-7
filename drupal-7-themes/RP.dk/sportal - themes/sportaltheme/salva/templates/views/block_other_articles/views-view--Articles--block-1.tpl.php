<div class="row">
  <aside class="block-list block-list-articles">
    <h2><?php print t("Föreslagna inlägg");?>:</h2>
    <section class="list-last">
       <?php if ($rows){ ?>
            <?php print $rows; ?>
        <?php  } elseif ($empty){ ?>
          <div class="view-empty-rols">
            <?php print $empty; ?>
          </div>
        <?php } // endif; ?>
    </section>
  </aside>
</div>
