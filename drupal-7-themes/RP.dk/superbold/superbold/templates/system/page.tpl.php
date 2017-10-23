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
        <menu class="menu_sb" id="menu_sb">
        <span class="menu_responsive" onclick="cambiarDisplay('btn-co_bady')">
                <div id="btn-co_id" class="btn-co"></div>
        </span>
            <h2>
                <a href='/' class='logo'/><span><?php echo $Title; ?></span><span><?= t('Review') ?></span></a>
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
        <menu class="sub_menu" id="sub_menu"></menu>
        <div id="btn-co_bady" style="display: none">
            <aside>
                <ul>
                    <?php print render($page['sidebar_first']); ?>
            </aside>
        </div>
    </header>
    
    <div class="pag-art"></div>
    <main id="content_page" class="home box-padding_up">
        <?php if (@$node->type == 'article') { ?>
            <div class="h3_to_h1_art center art_div_text" align="center">
                <?php echo $node->field_head_review['und'][0]['value']; ?>
            </div>
            <section class="seccition_block">
                <div class="div_img" align="center">
                    <img class="div_img_inside" src="https://www.superbold.dk/sites/default/files/field/image/<?php echo $node->field_image['und'][0]['filename'] ?>" alt="">
                </div>
                <div class="div_info">
                    <div class="art_div_head">
                        <div class="h3_to_h1_art_head left"><?php print render($title); ?></div>
                        <div class="h3_to_h1 right line"><?php echo $node->field_ranking['und'][0]['value']; ?>/10</div>
                        <div style="margin-bottom: 50px"><hr class="hr_trns"></div>
                    </div>
                    <div class="art_div_body">
                        <div class="art_div">
                            <div class="max">
                                <div class="field-content"><?php echo $node->field_bonus_code['und'][0]['value']; ?></div>
                            </div>
                            <div class="max_art">
                                <div class="field-content"><?php echo $node->field_video_quality['und'][0]['value']; ?></div>
                            </div>
                            <div class="max_art">
                                <div class="field-content"><?php echo $node->field_video_size['und'][0]['value']; ?></div>
                            </div>
                        </div>
                        <div class="art_div">
                            <div class="max_art">
                                <div class="field-content"><?php echo $node->field_price['und'][0]['value']; ?></div>
                            </div>
                            <div class="max_art">
                                <div class="field-content"><?php echo $node->field_bonus_info_['und'][0]['value']; ?></div>
                            </div>
                        </div>
                    </div>
                    <div class="art_div_foot" align="center">
                        <div class="center_art_7 ">
                            <a target="_blank" class="BET_art_rew hidde-sm col-xs-7 " href="/?redirect_node<?php print $node->nid?>"><?php echo $node->field_text_buttom['und'][0]['value']; ?></a>
                            <a target="_blank" class="BET_art_rew hidde-xs col-xs-12" href="/?redirect_node<?php print $node->nid?>"><span class="center">Create new account</span></a>
                        </div>
                    </div>
                </div>
            </section>
        <?php } ?>
        <section class="row reviews">
            <div class="reviews-inner">
                <aside class="aside_responsive col-xs-3">
                    <ul>
                        <?php print render($page['sidebar_first']); ?>
                </aside>
                <div class="content_style col-xs-7 col-xs-12 ">
                    <?php if ($messages): ?>
                        <div id="messages">
                            <div class="section clearfix">
                                <?php print $messages; ?>
                            </div>
                        </div> <!-- /.section, /#messages -->
                    <?php endif; ?>
                    <?php print render($page['content']); ?>
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
        <aside>
            Copyright © 2016 SportsbookReview.com. All rights reserved.
        </aside>
    </footer>
</div>







