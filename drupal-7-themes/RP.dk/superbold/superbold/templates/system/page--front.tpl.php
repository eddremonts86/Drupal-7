<?php
/**
 * Created by PhpStorm.
 * User: edd
 * Date: 4/7/16
 * Time: 10:41
 */
$Title = "Superbold.dk";
?>
<div class="container">
    <header class="head_responsive fixed-bar">
        <menu class="menu_sb">
            <span class="menu_responsive" onclick="cambiarDisplay('btn-co_bady')">
                    <div id="btn-co_id" class="btn-co"></div>
            </span>
            <h2>
                <a href='/' class='logo'/><span><?php echo $Title; ?></span><span><?=t('Review')?></span></a>
            </h2>
            <nav id="head_menu">
                <?php if ($main_menu): ?>
                    <?php print theme('links__system_main_menu', array(
                        'links' => $main_menu,
                        'attributes' => array(
                            'id' => 'main-menu-links',
                            'class' => array('nav', 'navbar-nav', 'navbar-right'),
                        ),
                    )); ?>
                <?php endif; ?>
            </nav>

        </menu>
        <div id="btn-co_bady" style="display: none">
            <aside>
                <ul>
                    <?php print render($page['sidebar_first']);  ?>
            </aside>
        </div>
    </header>
    <main class="home">
        <section class="hero">
            <div class="hero-inner" >
                <div class="hero-text1"><?php print t("Looking for The Best Online Sportsbook?")?></div>
                <div class="hero-text2"><?php print t("Our top pick")?></div>
                <?php if ($page['header']): ?>
                    <article class="hero-item">
                        <?php print render($page['header']); ?>
                    </article>
                <?php endif; ?>
            </div>
        </section>


        <section class="reviews  ">
            <div class="reviews-inner">

                <aside class="aside_responsive col-xs-3">
                    <ul>
                    <?php print render($page['sidebar_first']);  ?>
                </aside>

                <div class="box-padding content_style col-xs-7 col-xs-12 " >
                    <?php print render($page['content_frompage']);  ?>
                </div>
            </div>
        </section>
    </main>
    <footer>
        <menu class="menu_sb">
            <a href='/' class='logo'/><span><?php echo $Title; ?></span> <span>Review</span></a>
            <nav id="footer_menu">
                <?php if ($main_menu): ?>
                    <?php print theme('links__system_main_menu', array(
                        'links' => $main_menu,
                        'attributes' => array(
                            'id' => 'main-menu-links',
                            'class' => array('nav', 'navbar-nav', 'navbar-right'),
                        ),
                    )); ?>
                <?php endif; ?>
            </nav>
        </menu>
        <aside class="center">
            Copyright © 2016 SportsbookReview.com. All rights reserved.
        </aside>
    </footer>
</div>