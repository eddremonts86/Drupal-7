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
<html lang="sv">
<head>
    <style>.async-hide { opacity: 0 !important} </style>
    <script>(function(a,s,y,n,c,h,i,d,e){s.className+=' '+y;h.start=1*new Date;
            h.end=i=function(){s.className=s.className.replace(RegExp(' ?'+y),'')};
            (a[n]=a[n]||[]).hide=h;setTimeout(function(){i();h.end=null},c);h.timeout=c;
        })(window,document.documentElement,'async-hide','dataLayer',4000,
            {'GTM-M75337S':true});</script>

    <!-- Google Tag Manager -->
    <script type="text/javascript">(function (w, d, s, l, i) {
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
        })(window, document, 'script', 'dataLayer', 'GTM-KWD9L4');</script>
    <!-- End Google Tag Manager -->

   <!-- <link rel="stylesheet" href="<?php /*echo $path_to_theme */?>/css/styles.css">-->
    <link rel="mask-icon"
          href="<?php echo $path_to_theme ?>/files/img/favicons/safari-pinned-tab.svg"
          color="#2F356F">
    <meta name="msapplication-TileColor" content="#da532c">
    <meta name="theme-color" content="#2f356f">
    <title><?php echo $head_title ?></title>

  <?php $social = @$_GET['var'];
  if ($social == 'social') {
    ?>
      <META NAME="ROBOTS" CONTENT="NOINDEX, NOFOLLOW">
  <?php } ?>
  <?php print $head; ?>
  <?php print $styles; ?>
  <?php print $scripts; ?>

  <!--  <script type="text/javascript">
        (function (p, u, s, h) {
                p._pcq = p._pcq || [];
                p._pcq.push(['_currentTime', Date.now()]);
                s = u.createElement('script');
                s.type = 'text/javascript';
                s.async = true;
                s.src = 'https://cdn.pushcrew.com/js/84dcae8e8cee3d736bbbbf45a211101e.js';
                h = u.getElementsByTagName('script')[0];
                h.parentNode.insertBefore(s, h);
            })(window, document);
    </script>-->

</head>
<body class="<?php print $classes; ?>" <?php print $attributes; ?>>
<!-- Google Tag Manager (noscript) -->
<noscript>
    <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KWD9L4"
            height="0" width="0"
            style="display:none;visibility:hidden"></iframe>
</noscript>
<!-- End Google Tag Manager (noscript) -->
<?php print render($after_body); ?>
<div class="container">
    <header>
        <nav class="navbar navbar-default">
            <div class="container-fluid">
                <!-- Brand and toggle get grouped for better mobile display-->
                <div class="navbar-header">
                    <button type="button" data-toggle="collapse"
                            data-target="#wsn-main-menu" aria-expanded="false"
                            class="navbar-toggle collapsed"><span
                                class="sr-only">Toggle navigation</span><span
                                class="icon-bar"></span><span
                                class="icon-bar"></span><span
                                class="icon-bar"></span></button>
                  <?php if (drupal_is_front_page()){ ?><h1><?php } ?>
                        <a href="/" class="navbar-brand"><img
                                    src="<?php echo $path_to_theme ?>/files/img/logo.png"
                                    alt="Sportal"></a>
                    <?php if (drupal_is_front_page()){ ?></h1><?php } ?>
                </div>
                <!-- Collect the nav links, forms, and other content for toggling-->
                <div id="wsn-main-menu" class="collapse navbar-collapse">
                    <nav class="nav navbar-nav main-menu">
                      <?php
                      $main_menu = variable_get('menu_main_links_source', 'main-menu');
                      $tree = menu_tree($main_menu);
                      print render($tree);
                      //print theme('links', array('links' => menu_navigation_links('main-menu'), 'attributes' => array('class'=> array('nav navbar-nav main-menu')) ));
                      ?>
                    </nav>

                    <div class="navbar-form navbar-right">
                      <?php
                      /* $search_box = drupal_get_form('search_form');
                      print drupal_render($search_box);
                     */ ?>
                    </div>

                    <ul class="nav navbar-nav navbar-right icons-social">
                        <li>
                            <a href="<?php echo variable_get('wsn_url_facebook'); ?>"
                               target="_blank" rel="nofollow"> <span
                                        class="fa-stack fa-lg cw-btn-circle cw-btn-facebook"><i
                                            class="fa fa-circle fa-stack-2x"></i><i
                                            class="fa fa-stack-1x fa-facebook "></i></span></a>
                        </li>
                        <!-- li><a href="<?php echo variable_get('wsn_url_google_plus'); ?>" target="_blank" rel="nofollow"> <span class="fa-stack fa-lg cw-btn-circle cw-btn-google-plus"><i class="fa fa-circle fa-stack-2x"></i><i class="fa fa-stack-1x fa-google-plus "></i></span></a></li -->
                        <li>
                            <a href="<?php echo variable_get('wsn_url_twitter'); ?>"
                               target="_blank" rel="nofollow"> <span
                                        class="fa-stack fa-lg cw-btn-circle cw-btn-twitter"><i
                                            class="fa fa-circle fa-stack-2x"></i><i
                                            class="fa fa-stack-1x fa-twitter "></i></span></a>
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
            </div>

            <div class="col-sm-6 col-md-3">
              <?php print render($footer_col4); ?>
            </div>

        </div>

        <div class="row copy">
            <ul class="link-socials">
                <li><a href="<?php echo variable_get('wsn_url_facebook'); ?>"
                       target="_blank" rel="nofollow"> <span
                                class="fa-stack fa-lg cw-btn-circle cw-btn-facebook"><i
                                    class="fa fa-circle fa-stack-2x"></i><i
                                    class="fa fa-stack-1x fa-facebook "></i></span></a>
                </li>
                <!-- li> <a href="<?php echo variable_get('wsn_url_google_plus'); ?>" target="_blank" rel="nofollow"> <span class="fa-stack fa-lg cw-btn-circle cw-btn-google-plus"><i class="fa fa-circle fa-stack-2x"></i><i class="fa fa-stack-1x fa-google-plus "></i></span></a></li -->
                <li><a href="<?php echo variable_get('wsn_url_twitter'); ?>"
                       target="_blank" rel="nofollow"> <span
                                class="fa-stack fa-lg cw-btn-circle cw-btn-twitter"><i
                                    class="fa fa-circle fa-stack-2x"></i><i
                                    class="fa fa-stack-1x fa-twitter "></i></span></a>
                </li>
            </ul>
          <?php print render($copyright_last); ?>
        </div>

    </footer>
</div>
</body>
</html>
