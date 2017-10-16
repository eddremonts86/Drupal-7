<section>
	<h2><?php print $block->subject ?></h2>
	<?php
	 print theme('links', array('links' => menu_navigation_links('menu-info-menu'), 'attributes' => array('class'=> array('nav nav-pills nav-stacked')) ));
	?>
	<a href="/" class="logo"><img src="/sites/all/themes/sportaltheme/files/img/logo.png" alt=""></a>
</section>
