<?php
/**
 * @file
 * Default theme implementation to display the basic html structure of a single
 * Drupal page.
 *
 * Variables:
 * - $css: An array of CSS files for the current page.
 * - $language: (object) The language the site is being displayed in.
 *   $language->language contains its textual representation.
 *   $language->dir contains the language direction. It will either be 'ltr' or 'rtl'.
 * - $rdf_namespaces: All the RDF namespace prefixes used in the HTML document.
 * - $grddl_profile: A GRDDL profile allowing agents to extract the RDF data.
 * - $head_title: A modified version of the page title, for use in the TITLE
 *   tag.
 * - $head_title_array: (array) An associative array containing the string parts
 *   that were used to generate the $head_title variable, already prepared to be
 *   output as TITLE tag. The key/value pairs may contain one or more of the
 *   following, depending on conditions:
 *   - title: The title of the current page, if any.
 *   - name: The name of the site.
 *   - slogan: The slogan of the site, if any, and if there is no title.
 * - $head: Markup for the HEAD section (including meta tags, keyword tags, and
 *   so on).
 * - $styles: Style tags necessary to import all CSS files for the page.
 * - $scripts: Script tags necessary to load the JavaScript files and settings
 *   for the page.
 * - $page_top: Initial markup from any modules that have altered the
 *   page. This variable should always be output first, before all other dynamic
 *   content.
 * - $page: The rendered page content.
 * - $page_bottom: Final closing markup from any modules that have altered the
 *   page. This variable should always be output last, after all other dynamic
 *   content.
 * - $classes String of classes that can be used to style contextually through
 *   CSS.
 *
 * @see template_preprocess()
 * @see template_preprocess_html()
 * @see template_process()
 *
 * @ingroup themeable
 */
$path_alias = drupal_get_path_alias(current_path());
$front = drupal_is_front_page();
?>
<!DOCTYPE html>
<html lang="dk">
<head>
    <script>(function (w, d, s, l, i) {
            w[l] = w[l] || [];
            w[l].push({
                'gtm.start': new Date().getTime(), event: 'gtm.js'
            });
            var f = d.getElementsByTagName(s)[0],
                j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : '';
            j.async = true;
            j.src =
                'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
            f.parentNode.insertBefore(j, f);
        })(window, document, 'script', 'dataLayer', 'GTM-PCP3D3');</script>
    <title><?php echo $head_title; ?></title>
    <?php print $head ?>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <link rel="shortcut icon" href="https://www.superbold.dk/misc/favicon.ico" type="image/vnd.microsoft.icon">
    <meta name="profile" content="<?php print $grddl_profile; ?>"/>
    <link rel="amphtml"  href="<?php echo $GLOBALS['base_url'] ?>/<?php $front ? print '?amp' : print $path_alias . '?amp'; ?>">
</head>
<body class="<?php print $classes; ?>" <?php print $attributes; ?>>
<noscript>
    <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PCP3D3" height="0" width="0"  style="display:none;visibility:hidden"></iframe>
</noscript>
<div id="skip-link">
    <a href="#main-content" class="element-invisible element-focusable"><?php print t('Skip to main content'); ?></a>
</div>
<?php print $page_top; ?>
<?php print $page; ?>
<?php print $page_bottom; ?>
<link rel='stylesheet prefetch' href='https://fonts.googleapis.com/css?family=Ubuntu:400,300,300italic,400italic,500italic,500,700italic,700'/>
<?php print $styles; ?>
<?php print $scripts; ?>
<script>
    jQuery(document).ready(function () {
        jQuery(".blur").click(function () {
            jQuery(".blur").find("a").css('filter', 'inherit')
        });
        var test = document.createElement('div');
        test.innerHTML = '&nbsp;';
        test.className = 'adsbox';
        document.body.appendChild(test);
        window.setTimeout(function () {
            if (test.offsetHeight === 0) {
                document.body.classList.add('adblock');
                var date = new Date();
                location.href = "#popup1";
            }
            test.remove();
        }, 400);
    });
</script>
<div id="popup1" class="overlay">
    <div class="popup">
        <h1>Vigtig meddelelse</h1>
        <a class="close" href="#">&times;</a>
        <hr>
        <div class="content">
            <h2>Kære bruger</h2>
            <p>Du har installeret en adblocker og blokerer dermed vigtige elementer, som Superbold eksponerer.
            For at kunne modtage alle vores bonuskoder, beder vi dig derfor venligst om at deaktivere din adblocker på
                superbold.dk</p>

            <h2>Sådan gør du</h2>
            <p>For at deaktivere din adblocker på superbold.dk kræver det blot, at du klikker på adblock-ikonet i din
            browser, godkender domænet superbold.dk og opdaterer siden. Derved får du adgang til alle bonuskoder og
                andet indhold</p>

        </div>
    </div>
</div>
</body>
</html>

