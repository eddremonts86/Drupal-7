<?php

function rp_books_css_alter(&$css) {
	// if (isset($css['core/misc/vertical-tabs.css'])) {
 //    $css['core/misc/vertical-tabs.css']['data'] = drupal_get_path('theme', 'mytheme') . '/vertical-tabs.css';
 //  }
 //  unset($css[drupal_get_path('module','system').'/system.theme.css']);
}

function rp_books_preprocess_node($v) {

    if(!isset($_SESSION["site_type"])){
        $_SESSION["site_type"]='organic';
    }

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

    if(!isset($_SESSION["site_type"])){
        $_SESSION["site_type"]='organic';
    }

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

    if(!isset($_SESSION["site_type"])){
        $_SESSION["site_type"]='organic';
    }

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