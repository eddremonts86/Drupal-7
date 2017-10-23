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


<header>
    <menu>
        <?php if ($page['logo_header']): ?>
            <?php print render($page['logo_header']); ?>
        <?php endif; ?>
        <?php if ($page['header_top']): ?>
            <?php print render($page['header_top']); ?>
        <?php endif; ?>

    <nav>
        <?php print theme('links__system_main_menu', array(
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
        )); ?>
    </nav>
    </menu>
    <div id="submenu">
    </div>
</header>
<main class="<?php drupal_is_front_page() ? print 'home' : print 'review'; ?>">
    <?php if ($page['highlighted']): ?>
        <section class="hero">
            <div class="hero-inner">
                <?php print render($page['highlighted']); ?>
            </div>
        </section>
    <?php endif; ?>

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
        <div class="reviews-inner page-type">
            <?php print render($page['content']); ?>
        </div>
    </section>
</main>
<footer>
    <menu>
        <?php if ($page['logo_footer']): ?>
            <?php print render($page['logo_footer']); ?>
        <?php endif; ?>
        <nav>
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
    </menu>
    <aside>
        <?php if ($page['footer']): ?>
            <?php print render($page['footer']); ?>
        <?php endif; ?>
    </aside>
</footer>
