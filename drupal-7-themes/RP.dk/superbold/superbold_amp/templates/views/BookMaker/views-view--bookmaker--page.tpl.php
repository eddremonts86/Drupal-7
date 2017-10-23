
<div class="row">
    <section>
        <?php if ($rows){ ?>
            <?php print $rows; ?>
        <?php  } elseif ($empty){ ?>
            <div class="view-empty-rols">
                <?php print $empty; ?>
            </div>
        <?php }?>
    </section>
</div>
<div class="row">
    <nav class="pager">
        <?php if ($pager): ?>
            <?php print $pager; ?>
        <?php endif; ?>
    </nav>
</div>


