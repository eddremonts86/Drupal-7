<?php
/**
 * @file
 * Theme implementation to display a single Drupal page.
 *
 * Available variables:
 *
 * General utility variables:
 * - $base_path: The base URL path of the Drupal installation. At the very
 *   least, this will always default to /.
 * - $directory: The directory the template is located in, e.g. themes/simpleclean.
 * - $is_front: TRUE if the current page is the front page.
 * - $logged_in: TRUE if the user is registered and signed in.
 * - $is_admin: TRUE if the user has permission to access administration pages.
 *
 * Site identity:
 * - $front_page: The URL of the front page. Use this instead of $base_path,
 *   when linking to the front page. This includes the language domain or
 *   prefix.
 * - $logo: The path to the logo image, as defined in theme configuration.
 * - $site_name: The name of the site, empty when display has been disabled
 *   in theme settings.
 * - $site_slogan: The slogan of the site, empty when display has been disabled
 *   in theme settings.
 * - $hide_site_name: TRUE if the site name has been toggled off on the theme
 *   settings page. If hidden, the "element-invisible" class is added to make
 *   the site name visually hidden, but still accessible.
 * - $hide_site_slogan: TRUE if the site slogan has been toggled off on the
 *   theme settings page. If hidden, the "element-invisible" class is added to
 *   make the site slogan visually hidden, but still accessible.
 *
 * Navigation:
 * - $main_menu (array): An array containing the Main menu links for the
 *   site, if they have been configured.
 * - $secondary_menu (array): An array containing the Secondary menu links for
 *   the site, if they have been configured.
 * - $breadcrumb: The breadcrumb trail for the current page.
 *
 * Page content (in order of occurrence in the default page.tpl.php):
 * - $title_prefix (array): An array containing additional output populated by
 *   modules, intended to be displayed in front of the main title tag that
 *   appears in the template.
 * - $title: The page title, for use in the actual HTML content.
 * - $title_suffix (array): An array containing additional output populated by
 *   modules, intended to be displayed after the main title tag that appears in
 *   the template.
 * - $messages: HTML for status and error messages. Should be displayed
 *   prominently.
 * - $tabs (array): Tabs linking to any sub-pages beneath the current page
 *   (e.g., the view and edit tabs when displaying a node).
 * - $action_links (array): Actions local to the page, such as 'Add menu' on the
 *   menu administration interface.
 * - $feed_icons: A string of all feed icons for the current page.
 * - $node: The node object, if there is an automatically-loaded node
 *   associated with the page, and the node ID is the second argument
 *   in the page's path (e.g. node/12345 and node/12345/revisions, but not
 *   comment/reply/12345).
 *
 * Regions:
 * - $page['header']: Items for the header region.
 * - $page['featured']: Items for the featured region.
 * - $page['highlighted']: Items for the highlighted content region.
 * - $page['help']: Dynamic help text, mostly for admin pages.
 * - $page['content']: The main content of the current page.
 * - $page['sidebar_first']: Items for the first sidebar.
 * - $page['footer']: Items for the footer region.
 *
 * @see template_preprocess()
 * @see template_preprocess_page()
 */
//dpm($variables);
?>

<?php if (@$node->type == 'review'){
  $name = user_load($node->uid);
  $ratingValue  = explode("/10",$node->field_review_points['und'][0]['value'] );
}?>
<?php if (@$node->type == 'review'):?>
  <script type="application/ld+json">
        {
        "@context": "http://schema.org/",
        "@type": "Review",
        "itemReviewed": {
                      "@type": "Thing",
                      "name": "<?php print @$node->title; ?>"
                      },
        "author": {
                "@type": "Person",
                "name": "<?php print $name->name;?>"
                },
        "reviewRating": {
                      "@type": "Rating",
                      "ratingValue": "<?php print $ratingValue[0];?>",
                      "bestRating": "10"
                      },
        "publisher": {
                   "@type": "Organization",
                   "name": "Superbold.dk"
                   }
        }
    </script>
<?php endif; ?>

<?php if (@$node->type != 'bonuscode_popup'): ?>
    <header>
        <div class="menu">
            <?php if ($page['header_top']): ?>
                <?php print render($page['header_top']); ?>
            <?php endif; ?>

            <?php if ($page['logo_header']): ?>
                <?php print render($page['logo_header']); ?>
            <?php endif; ?>
            <nav>
      <?php /* print theme('links__system_main_menu', array(
      'links' => $main_menu,
      'attributes' => array(
        'id' => 'main-menu-links',
        'class' => array('links', 'clearfix'),
      ),
      'heading' => array(
        'text' => t('Main menu'),
        'level' => 'h2',
        'class' => array('element-invisible'),
      ),
    )); */ ?>
            </nav>
        </div>
        <div id="_submenu"></div>
    </header>
    <main class="<?php drupal_is_front_page() ? print 'home' : print 'review'; ?>">
        <section class="hero">
            <div class="hero-inner">
                <?php if ($page['highlighted']): ?>
                    <?php print render($page['highlighted']); ?>
                <?php endif; ?>

            </div>
        </section>
        <section class="helpers">
            <?php print render($title_prefix); ?>
            <?php if (arg(0) != 'node' && !drupal_is_front_page() && $title): ?>
                <h1 class="node-title"><?php print $title; ?></h1>
            <?php endif; ?>
            <?php print render($title_suffix); ?>
            <?php if ($tabs): ?>
                <div class="tabs"><?php print render($tabs); ?></div>
            <?php endif; ?>
            <?php if ($show_messages): ?>
                <?php print $messages; ?>
            <?php endif; ?>
            <?php print render($page['help']); ?>
            <?php if ($action_links): ?>
                <ul class="action-links">
                    <?php print render($action_links); ?>
                </ul>
            <?php endif; ?>
        </section>
        <section class="reviews">
            <div class="reviews-inner">
                <?php if ($page['sidebar_first']): ?>
                    <aside>
                        <?php print render($page['sidebar_first']); ?>
                    </aside>
                <?php endif; ?>
                <?php print render($page['content']); ?>

            </div>
        </section>
        <?php if (@$node->type == 'review'): ?>
            <section class="hero">
                <div class="hero-inner" id="hero_buttom">
                    <?php if ($page['highlighted']): ?>
                        <?php print render($page['highlighted']); ?>
                    <?php endif; ?>
                </div>
            </section>
        <?php endif; ?>
        <?php if ($page['content_art']): ?>
            <section class="reviews top_articles">
                <div class="reviews-inner">
                    <aside class="gost"></aside>
                    <div class="articles_front">
                        <?php print render($page['content_art']); ?>
                        <?php if ($page['cta_links']): ?>
                            <?php print render($page['cta_links']); ?>
                        <?php endif; ?>
                    </div>
                </div>
            </section>
        <?php endif; ?>
    </main>
    <footer class="footer">
        <div class="menu">

            <nav class="nav_footer">
                <?php print theme('links__system_main_menu', array(
                    'links' => $main_menu,
                    'attributes' => array(
                        'id' => 'main-menu-links-footer',
                        'class' => array('links', 'clearfix'),
                    ),
                    'heading' => array(
                        'text' => t('Main menu'),
                        'level' => 'h2',
                        'class' => array('element-invisible'),
                    ),
                )); ?>
            </nav>
            <div class="no_desk">
                <div class="ins-plus-desk">
            <span >
            <a href="/alderspolitik"><amp-img  layout="responsive" class="round" src="https://www.superbold.dk/sites/all/themes/rp_books/img/18+.jpg"  width="320" height="256"></amp-img></a>
            <a href="http://ludomani.dk/"><amp-img  layout="responsive" class="round" src="https://www.superbold.dk/sites/all/themes/rp_books/img/Center_for_ludomani.jpg"  width="320" height="256"></amp-img></a>
            <a href="https://spillemyndigheden.dk/"><amp-img  layout="responsive" class="round" src="https://www.superbold.dk/sites/all/themes/rp_books/img/spillemyndigheden.jpg"  width="320" height="256"></amp-img></a>
            <a rel="nofollow" href="https://www.ingenco2.dk/crt/dispcust/c/4426/l/2"><img class="round" src="https://www.superbold.dk/sites/all/themes/rp_books/img/co2.png" /></a>
            </span>
                </div>
                <?php if ($page['logo_footer']): ?>
                    <?php print render($page['logo_footer']); ?>
                <?php endif; ?>
                <aside class="text-center">
                    <?php if ($page['footer']): ?>
                        <?php print render($page['footer']); ?>
                    <?php endif; ?>
                </aside>
            </div>
        </div>
        <div class="desk plus-desk">
            <div class="ins-plus-desk">
            <span >
            <a href="http://ludomani.dk/"><amp-img  layout="responsive" class="round_rectangle" src="https://www.superbold.dk/sites/all/themes/rp_books/img/Center_for_ludomani.jpg"  width="320" height="256"></amp-img></a>
            <a href="/alderspolitik"><amp-img  layout="responsive" class="round_rectangle" src="https://www.superbold.dk/sites/all/themes/rp_books/img/18+.jpg"  width="320" height="256"></amp-img></a>
            <a href="https://spillemyndigheden.dk/"><amp-img  layout="responsive" class="round_rectangle" src="https://www.superbold.dk/sites/all/themes/rp_books/img/spillemyndigheden.jpg"  width="320" height="256"></amp-img></a>
            <a rel="nofollow" href="https://www.ingenco2.dk/crt/dispcust/c/4426/l/2"><img class="round_rectangle" src="https://www.superbold.dk/sites/all/themes/rp_books/img/co2.png" /></a>
            </span>
            </div>
            <?php if ($page['logo_footer']): ?>
                <?php print render($page['logo_footer']); ?>
            <?php endif; ?>

            <aside class="text-center">
                <?php if ($page['footer']): ?>
                    <?php print render($page['footer']); ?>
                <?php endif; ?>
            </aside>
        </div>
    </footer>
<?php endif; ?>

<?php if (@$node->type == 'bonuscode_popup'): ?>
    <?php print render($page['content']); ?>
<?php endif; ?>
