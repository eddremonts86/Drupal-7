<section>
	<h2><?php print $block->subject ?></h2>
	<?php
	 print theme('links', array('links' => menu_navigation_links('menu-main-menu-footer'), 'attributes' => array('class'=> array('nav nav-pills nav-stacked')) ));
	?>
</section>
