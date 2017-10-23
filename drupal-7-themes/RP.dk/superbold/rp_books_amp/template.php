<?php
function rp_books_css_alter(&$css) {
    // if (isset($css['core/misc/vertical-tabs.css'])) {
    //    $css['core/misc/vertical-tabs.css']['data'] = drupal_get_path('theme', 'mytheme') . '/vertical-tabs.css';
    //  }
    //  unset($css[drupal_get_path('module','system').'/system.theme.css']);
}
function rp_books_preprocess_node($v) {
    $url = $_SERVER['REQUEST_URI'];
    $url_referal_parsed = parse_url($url);
    parse_str(@$url_referal_parsed['query'], $parameters);
    if(isset($parameters['gclid']) || isset($_COOKIE['superbold_REF']))
    {
        setcookie("superbold_REF", $url, time() + 60*30, "/");
        $_SESSION["site_type"]='adwords';
    }
    else if(isset($parameters['gclid']))
    {
        setcookie("superbold_REF", $url, time() + 60*30, "/");
        $_SESSION["site_type"]='adwords';
    }
    else{ $_SESSION["site_type"]='organic';}
}
function rp_books_preprocess_views_view($v) {
    $url = $_SERVER['REQUEST_URI'];
    $url_referal_parsed = parse_url($url);
    parse_str(@$url_referal_parsed['query'], $parameters);
    if(isset($parameters['gclid']) || isset($_COOKIE['superbold_REF']))
    {
        setcookie("superbold_REF", $url, time() + 60*30, "/");
        $_SESSION["site_type"]='adwords';
    }
    else if(isset($parameters['gclid']))
    {
        setcookie("superbold_REF", $url, time() + 60*30, "/");
        $_SESSION["site_type"]='adwords';
    }
    else{ $_SESSION["site_type"]='organic';}
}
function rp_books_preprocess_page($v) {
    $url = $_SERVER['REQUEST_URI'];
    $url_referal_parsed = parse_url($url);
    parse_str(@$url_referal_parsed['query'], $parameters);
    if(isset($parameters['gclid']) || isset($_COOKIE['superbold_REF']))
    {
        setcookie("superbold_REF", $url, time() + 60*30, "/");
        $_SESSION["site_type"]='adwords';
    }
    else if(isset($parameters['gclid']))
    {
        setcookie("superbold_REF", $url, time() + 60*30, "/");
        $_SESSION["site_type"]='adwords';
    }
    else{ $_SESSION["site_type"]='organic';}
}
function catagorize_url() {
    $url_referal = NULL;
    $url = $_SERVER['REQUEST_URI'];

    if($_SERVER['HTTP_REFERER']!= ""){ $url = $_SERVER['HTTP_REFERER'];}
    if(isset($url)) {
        if(strpos($_SERVER['HTTP_REFERER'], 'superbold.') == false) {
            setcookie("superbold_REF", $url, time() + 60*30, "/");
            $url_referal = $url;
        } else {
            if(isset($_COOKIE['superbold_REF'])) $url_referal = $_COOKIE['superbold_REF'];
        }
    }

    if(is_null($url_referal)) {
        setcookie("superbold_REF", "", time()-3600); //Remove the cookie return 'direct';
    }

    $url_referal_parsed = parse_url($url_referal);

    if(!isset($url_referal_parsed['query'])) return 'organic';
    parse_str($url_referal_parsed['query'], $parameters);

    if(isset($parameters['gclid']))
    {return 'adwords';}
    else if(isset($parameters['utm_source']))
    {return $parameters['utm_source'];}
    else{return 'organic';}

}

