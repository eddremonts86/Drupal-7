<?php
/*
if(isset($head_title) && $head_title!=''){
  $sufijo_page_title = $head_title_array['name'];
  $head_title = str_replace(" | ".$sufijo_page_title,"", $head_title)." | WSN";
  $total_page_title = (int) mb_strlen(trim(strip_tags($head_title)));  

  if(drupal_is_front_page()){
    //$head_title =  $head_title_array['name'];
 }

    if(!drupal_is_front_page())
    {
      $node = menu_get_object();
      if($node && isset($node->metatags) && isset($node->metatags['und']) && (trim($node->metatags['und']['title']['value']) != "")){
        $head_title = $node->metatags['und']['title']['value'];
        } 
    }

}
*/
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <link rel="stylesheet" href="<?php echo $path_to_theme ?>/css/styles.css">
    <link rel="manifest" href="<?php echo $path_to_theme ?>/files/img/favicons/manifest.json">
    <link rel="mask-icon" href="<?php echo $path_to_theme ?>/files/img/favicons/safari-pinned-tab.svg" color="#2F356F">
    <meta name="msapplication-TileColor" content="#da532c">
    <meta name="theme-color" content="#2f356f">
    <title><?php echo $head_title ?></title>
    <?php print $head; ?>
    <?php print $styles; ?>
    <?php print $scripts; ?>

    <script type="application/ld+json">
{
  "@context" : "http://schema.org",
  "@type" : "Organization",
  "name" : "WSN",
  "logo": "https://www.wsn.com/sites/all/themes/wsntheme/files/img/wsn-fb-card.png",
  "url" : "https://www.wsn.com",
  "sameAs" : [
    "https://www.facebook.com/worldsportsnetwork",
    "https://twitter.com/WSportNetwork",
    "https://plus.google.com/+WsnOfficial"
  ]
}

    </script>

    <!-- Facebook Pixel Code -->
    <script>
        !function (f, b, e, v, n, t, s) {
            if (f.fbq)return;
            n = f.fbq = function () {
                n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)
            };
            if (!f._fbq)f._fbq = n;
            n.push = n;
            n.loaded = !0;
            n.version = '2.0';
            n.queue = [];
            t = b.createElement(e);
            t.async = !0;
            t.src = v;
            s = b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t, s)
        }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '1740981162846923');
        fbq('track', "PageView");</script>
    <noscript><img height="1" width="1" style="display:none"
                   src="https://www.facebook.com/tr?id=1740981162846923&ev=PageView&noscript=1"/></noscript>
    <!-- End Facebook Pixel Code -->

</head>
<body class="<?php print $classes; ?>"<?php print $attributes; ?>>
<?php print render($after_body); ?>
<div class="container">
    <header>
        <nav class="navbar navbar-default">
            <div class="container-fluid">
                <!-- Brand and toggle get grouped for better mobile display-->
                <div class="navbar-header">
                    <button type="button" data-toggle="collapse" data-target="#wsn-main-menu" aria-expanded="false"
                            class="navbar-toggle collapsed"><span class="sr-only">Toggle navigation</span><span
                            class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span>
                    </button>
                    <?php if (drupal_is_front_page()){ ?><h1><?php } ?>
                        <a href="/" class="navbar-brand"><img src="<?php echo $path_to_theme ?>/files/img/logo-wsn.png"
                                                              alt="WSN"></a>
                        <?php if (drupal_is_front_page()){ ?></h1><?php } ?>
                </div>
                <!-- Collect the nav links, forms, and other content for toggling-->
                <div id="wsn-main-menu" class="collapse navbar-collapse">
                    <nav class="nav navbar-nav main-menu">
                        <?php
                        print theme('links', array('links' => menu_navigation_links('main-menu'), 'attributes' => array('class' => array('nav navbar-nav main-menu'))));
                        ?>
                    </nav>

                    <?php /*
            <form role="search" class="navbar-form navbar-right">
              <div class="form-group">
                <input type="text" placeholder="Search" class="form-control">
              </div>
              <button type="submit" class="btn btn-default"><span aria-hidden="true" class="glyphicon glyphicon-search"></span>
              </button>
            </form>
            */ ?>

                    <ul class="nav navbar-nav navbar-right icons-social">
                        <li><a href="<?php echo variable_get('wsn_url_facebook'); ?>" target="_blank" rel="nofollow">
                                <span class="fa-stack fa-lg cw-btn-circle cw-btn-facebook"><i
                                        class="fa fa-circle fa-stack-2x"></i><i class="fa fa-stack-1x fa-facebook "></i></span></a>
                        </li>
                        <li><a href="<?php echo variable_get('wsn_url_google_plus'); ?>" target="_blank" rel="nofollow">
                                <span class="fa-stack fa-lg cw-btn-circle cw-btn-google-plus"><i
                                        class="fa fa-circle fa-stack-2x"></i><i
                                        class="fa fa-stack-1x fa-google-plus "></i></span></a></li>
                        <li><a href="<?php echo variable_get('wsn_url_twitter'); ?>" target="_blank" rel="nofollow">
                                <span class="fa-stack fa-lg cw-btn-circle cw-btn-twitter"><i
                                        class="fa fa-circle fa-stack-2x"></i><i class="fa fa-stack-1x fa-twitter "></i></span></a>
                        </li>
                    </ul>
                </div>
                <!-- /.navbar-collapse-->
            </div>
            <!-- /.container-fluid-->
        </nav>
    </header>
    <?php print $page_top; ?>
    <?php print $page; ?>
    <?php print $page_bottom; ?>
    <sidebar class="main">
        <?php print render($sidebar); ?>
    </sidebar>
    </main>

    <footer>
        <div class="row navs">
            <div class="col-sm-6 col-md-3">
                <?php print render($footer_col1); ?>
            </div>

            <div class="col-sm-6 col-md-3">
                <?php print render($footer_col2); ?>
            </div>

            <div class="col-sm-6 col-md-3">
                <?php print render($footer_col3); ?>
                <section class="se_adv"><p id="adv">Advertiser Disclosure </p></section>
            </div>

            <div class="col-sm-6 col-md-3">
                <?php print render($footer_col4); ?>
            </div>

        </div>

        <div class="row copy">
            <ul class="link-socials">
                <li><a href="<?php echo variable_get('wsn_url_facebook'); ?>" target="_blank" rel="nofollow"> <span
                            class="fa-stack fa-lg cw-btn-circle cw-btn-facebook"><i
                                class="fa fa-circle fa-stack-2x"></i><i class="fa fa-stack-1x fa-facebook "></i></span></a>
                </li>
                <li><a href="<?php echo variable_get('wsn_url_google_plus'); ?>" target="_blank" rel="nofollow"> <span
                            class="fa-stack fa-lg cw-btn-circle cw-btn-google-plus"><i
                                class="fa fa-circle fa-stack-2x"></i><i
                                class="fa fa-stack-1x fa-google-plus "></i></span></a></li>
                <li><a href="<?php echo variable_get('wsn_url_twitter'); ?>" target="_blank" rel="nofollow"> <span
                            class="fa-stack fa-lg cw-btn-circle cw-btn-twitter"><i class="fa fa-circle fa-stack-2x"></i><i
                                class="fa fa-stack-1x fa-twitter "></i></span></a></li>
            </ul>
            <?php print render($copyright_last); ?>
        </div>

    </footer>
</div>

<div class="under-age-new">
    <h3>Advertiser Disclosure</h3>
    <hr>
    <p>This site is supported by payment from some of the operators who are ranked on the site and the payment can impact the ranking of
        the sites listed.</p>
    <p>The reviews might be a promotional features and the site will be paid by some of the providers to provide the following positive
        reviews about them – the reviews is not provided by an independent consumer.</p>
</div>

</body>
</html>
