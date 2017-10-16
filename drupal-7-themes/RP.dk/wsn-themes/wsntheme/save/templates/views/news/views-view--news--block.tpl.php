<section class="list-items-simple-media">
  <header>
    <h2>Latest News</h2>
  </header>
  <main>
    <ul>
        <?php if ($rows){ ?>
          <?php print $rows; ?>
        <?php  } elseif ($empty){ ?>
        <li class="view-empty-rols">
          <?php print $empty; ?>
        </li>
      <?php } // endif; ?>
    </ul>
  </main>
</section>
        
