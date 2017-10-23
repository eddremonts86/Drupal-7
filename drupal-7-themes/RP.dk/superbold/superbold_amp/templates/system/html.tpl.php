<?php
/**
 * Created by PhpStorm.
 * User: edd
 * Date: 4/7/16
 * Time: 10:41
 */
$path_alias = drupal_get_path_alias(current_path());
$front = drupal_is_front_page();
?>
<!doctype html>
<html lang="en" amp>
<head>
    <meta charset="utf-8">
    <meta name="superbold_amp">
    <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
    <link rel="canonical" href="<?php echo $GLOBALS['base_url'] . '/' . $path_alias; ?>">

    <script async custom-element="amp-carousel" src="https://cdn.ampproject.org/v0/amp-carousel-0.1.js"></script>
    <script async custom-template="amp-carousel"  src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>

    <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
    <script async src="https://cdn.ampproject.org/v0.js"></script>
    <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Ubuntu:400,300,300italic,400italic,500italic,500,700italic,700">
    <style amp-custom>
        html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio, video {
            margin: 0;
            padding: 0;
            border: 0;
            font-size: 100%;
            font: inherit;
            vertical-align: baseline
        }

        .content_article h1 {
            font-size: 1.6em;
            font-weight: bold;
            color: #4f4f51;
        }
        .h3_to_h1{
            font-size: 1.6em;
            text-transform: capitalize;
            font-weight: bold;
            color: rgba(0, 0, 0, 0.7);
            background-image: -webkit-linear-gradient(top, rgba(42, 138, 225, 0) 50%, rgba(42, 138, 225, 0) 50%)!important;
            background-image: linear-gradient(to bottom, rgba(42, 138, 225, 0) 50%, rgba(42, 138, 225, 0) 50%)!important;
        }
        .h3_to_h1_art{
            font-size: 2em;
            text-transform: capitalize;
            color: #4f4f51;
            background-image: -webkit-linear-gradient(top, rgba(42, 138, 225, 0) 50%, rgba(42, 138, 225, 0) 50%)!important;
            background-image: linear-gradient(to bottom, rgba(42, 138, 225, 0) 50%, rgba(42, 138, 225, 0) 50%)!important;
        }
        .content_article h3 {
            font-size: 1.1em;
            background-image: -webkit-linear-gradient(top, rgba(42, 138, 225, 0.9) 50%, rgba(42, 138, 225, 1) 50%);
            background-image: linear-gradient(to bottom, rgba(42, 138, 225, 0.9) 50%, rgba(42, 138, 225, 1) 50%);
            background-repeat: no-repeat;
            background-size: 3px 1.3em;;
            padding-left: 11px;
            color: rgba(0, 0, 0, 0.7);
            text-transform: uppercase;
            font-weight: bold;

        }

        .non_h3 {
            font-size: 1.8em !important;
            background-image: -webkit-linear-gradient(top, rgba(42, 138, 225, 0.9) 0%, rgba(42, 138, 225, 1) 0%) !important;
            background-image: linear-gradient(to bottom, rgba(42, 138, 225, 0.9) 0%, rgba(42, 138, 225, 1) 0%) !important;
            background-repeat: no-repeat;
            background-size: 0px 1.3em !important;
            padding-left: 0px !important;
            text-transform: uppercase;
        }

        .content_article img {
            width: auto;
            max-width: 800px;
        }

        article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section {
            display: block
        }

        body {
            line-height: 1
        }

        ol, ul {
            list-style: none
        }

        blockquote, q {
            quotes: none
        }

        blockquote:before, blockquote:after, q:before, q:after {
            content: '';
            content: none
        }

        table {
            border-collapse: collapse;
            border-spacing: 0
        }

        html,
        html a {
            -webkit-font-smoothing: antialiased !important;
        }

        body {
            background-color: #fff;
            font-family: 'Ubuntu';
            -moz-osx-font-smoothing: grayscale;
        }

        footer {
            background-color: #338D29;
            text-align: center;
        }

        article a {
            font-size: 1.1em;
            white-space: nowrap;
            color: #2a8ae1;
            text-decoration: none;
            background-color: transparent;
            background-image: -webkit-linear-gradient(top, rgba(42, 138, 225, 0) 50%, rgba(42, 138, 225, 0.6) 50%);
            background-image: linear-gradient(to bottom, rgba(42, 138, 225, 0) 50%, rgba(42, 138, 225, 0.6) 50%);
            background-repeat: repeat-x;
            background-size: 2px 2px;
            -webkit-transition: ease-in-out all 100ms;
            transition: ease-in-out all 100ms;
            background-position: 0 17px;
        }

        span.hero-item-title.title > a {
            color: rgba(0, 0, 0, 0.7);
            background-image: -webkit-linear-gradient(top, rgba(42, 138, 225, 0) 50%, rgba(42, 138, 225, 0) 50%);
            background-image: linear-gradient(to bottom, rgba(42, 138, 225, 0) 50%, rgba(42, 138, 225, 0) 50%);
            background-repeat: repeat-x;
        }

        article a:hover {
            background-position: 0 15px;
            background-size: 4px 4px;
        }

        article a.button {
            display: inline-block;
            padding: 1em 2.5em;
            font-size: 0.9em;
            margin-right: 2em;
            letter-spacing: 0.1em;
            font-weight: 700;
            text-transform: uppercase;
            color: white;
            border: 0;
            background: #2a8ae1;
            box-shadow: 2px 2px 0 #5fb5fe;
            white-space: nowrap;
            -webkit-transition: 100ms ease-in-out all;
            transition: 100ms ease-in-out all;
            cursor: pointer;
        }

        article a.button_rew {
            display: inline-block;
            padding: 2em 1.5em;
            font-size: 0.9em;
            letter-spacing: 0.1em;
            font-weight: 700;
            text-transform: uppercase;
            color: #2a8ae1;
            border: 0;
            background: rgba(250, 255, 243, 0);
            box-shadow: 2px 2px 0 rgba(209, 209, 209, 0);
            white-space: nowrap;
            -webkit-transition: 100ms ease-in-out all;
            transition: 100ms ease-in-out all;
            cursor: pointer;
        }

        article a.button:active {
            box-shadow: -2px -2px 0 #5fb5fe;
        }

        article a.button.green {
            background: #00b061;
            box-shadow: 2px 2px 0 #14c97a;
        }

        article a.button.green:active {
            box-shadow: -2px -2px 0 #14c97a;
        }

        .pag-art{
            background: #ffffff; margin: 0 auto !important;
            text-align: center;
            padding-top: 70px;
        }
        p {
            font-weight: 400;
            color: rgba(0, 0, 0, 0.7);
            font-size: 1.15em;
            margin: 1.5em 0;
            line-height: 1.4em;
        }
        .top-mar{
            padding-top: 70px
        }
        .menu {
            max-width: 1180px;
            margin: 0 auto;
            padding: 0 1em;
            display: -webkit-box;
            display: -webkit-flex;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-pack: justify;
            -webkit-justify-content: space-between;
            -ms-flex-pack: justify;
            justify-content: space-between;
            -webkit-box-align: center;
            -webkit-align-items: center;
            -ms-flex-align: center;
            align-items: center;
        }

        .menu nav {
            border-left: 2px solid rgba(0, 0, 0, 0.1);
        }

        .menu nav ul {
            display: -webkit-box;
            display: -webkit-flex;
            display: -ms-flexbox;
            display: flex;
        }

        .menu nav ul li a {
            display: block;
            color: white;
            padding: 2em 3em;
            font-size: 0.93em;
            letter-spacing: 0.04em;
            padding-right: 0;
            text-transform: uppercase;
            text-decoration: none;
            font-weight: 400;
            margin-right: 15px;
        }

        body > .container > footer > aside {
            color: white;
            text-align: right;
            margin: 0 auto;
            max-width: 1180px;
            padding-bottom: 3em;
            font-size: 1em;
            font-weight: 200;
        }

        body > .container > footer > .menu > nav {
            padding-top: 2em;
            border: 0;
        }

        body > .container > main section.hero {
            background-color: #ffffff ;
            padding: 4em 1em;
        }

        body > .container > main section.hero .hero-inner {
            margin: 0 auto;
            max-width: 1180px;
            padding-top: 25px;
        }

        body > .container > main section.hero .hero-item {
            padding-left: 1%;
            padding-right: 1%;
        }

        body > .container > main section.hero .hero-inner > img {
            margin: 3em auto;
            margin-bottom: 4em;
            display: block;
        }

        body > .container > main section.hero .hero-text1,
        body > .container > main section.hero .hero-text2 {
            text-align: center;
        }

        body > .container > main section.hero .hero-text1 {
            font-size: 2.25em;
            color: rgba(0, 0, 0, 0.7);
        }

        body > .container > main section.hero .hero-text2 {
            color: #2a8ae1;
            font-size: 2.1em;
            margin-top: 0.75em;
            margin-bottom: 1.5em;
            letter-spacing: 0.05em;
            text-transform: uppercase;
            font-weight: 600;
        }

        body > .container > main section.hero .hero-item {
            background: white;
            position: relative;
            min-height: 350px;
            display: -webkit-box;
            display: -webkit-flex;
            display: -ms-flexbox;
            display: flex;
            -webkit-flex-flow: row wrap;
            -ms-flex-flow: row wrap;
            flex-flow: row wrap;
            -webkit-box-align: center;
            -webkit-align-items: center;
            -ms-flex-align: center;
            align-items: center;
            padding-left: 0em;
        }

        @media (min-width: 960px) {
            body > .container > main section.hero .hero-item {
                -webkit-flex-flow: row nowrap;
                -ms-flex-flow: row nowrap;
                flex-flow: row nowrap;
            }
        }

        @media (min-width: 1480px) {
            body > .container > main section.hero .hero-item {
                *padding-left: 20%;
                display: block;
            }
        }

        body > .container > main section.hero .hero-item img {
            margin: 0 auto;
            height: auto;
        }

        @media (min-width: 1180px) {
            body > .container > main section.hero .hero-item img {
                max-width: 100%;
            }
        }

        @media (min-width: 1480px) {
            body > .container > main section.hero .hero-item img {
                *position: absolute;
                max-width: none;
                top: 50%;
                height: auto;
                width: auto;
                max-width: 100%;
                left: -12.5%;
                *-webkit-transform: translateY(-50%);
                *transform: translateY(-50%);
                box-shadow: 0 0 30px -5px black;
            }
        }

        @media (min-width: 1180px) {
            .linck {
                margin-right: 0;
            }
        }

        body > .container > main section.hero .hero-item .hero-item-body {
            padding: 1.5em;
        }

        body > .container > main section.hero .hero-item .hero-item-body header {
            display: -webkit-box;
            display: -webkit-flex;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-pack: justify;
            -webkit-justify-content: space-between;
            -ms-flex-pack: justify;
            justify-content: space-between;
            -webkit-box-align: center;
            -webkit-align-items: center;
            -ms-flex-align: center;
            align-items: center;
            font-size: 1.75em;
        }

        body > .container > main section.hero .hero-item .hero-item-body header .hero-item-rating {
            color: #2a8ae1;
            font-weight: 500;
            font-size: 1.25em;
        }

        body > .container > main section.hero .hero-item .hero-item-body header .hero-item-rating::before {
            color: #5fb5fe;
            content: '🏆';
            font-size: 0.75em;
            margin-right: 0.5em;
        }

        body > .container > main section.hero .hero-item .hero-item-body ul {
            border-top: solid 2px rgba(0, 0, 0, 0.2);
            border-bottom: solid 2px rgba(0, 0, 0, 0.2);
            margin: 1em 0;
            display: -webkit-box;
            display: -webkit-flex;
            display: -ms-flexbox;
            display: flex;
            -webkit-flex-flow: row wrap;
            -ms-flex-flow: row wrap;
            flex-flow: row wrap;
            -webkit-justify-content: space-around;
            -ms-flex-pack: distribute;
            justify-content: space-around;
        }

        body > .container > main section.hero .hero-item .hero-item-body ul li {
            padding: 0.5em 1em;
            display: -webkit-inline-flex;
            display: -webkit-inline-flex;
            display: -ms-inline-flex;
            display: inline-flex;
            -webkit-box-align: center;
            -webkit-align-items: center;
            -ms-flex-align: center;
            align-items: center;
            white-space: nowrap;
        }

        body > .container > main section.hero .hero-item .hero-item-body ul li strong {
            font-weight: bold;
            margin-right: 0.2em;
        }

        body > .container > main section.hero .hero-item .hero-item-body ul li::before {
            content: '✓';
            color: #5fb5fe;
            font-size: 1.25em;
            margin-right: 0.5em;
        }

        body > .container > main section.hero .hero-item .hero-item-body ul li.bonus {
            color: #00b061;
        }

        body > .container > main section.hero .hero-item .hero-item-body ul li.bonus::before {
            color: inherit;
        }

        body > .container > main section.hero .hero-item .hero-item-body > a {
            font-size: 1.1em;
            white-space: nowrap;
        }

        body > .container > main section.reviews {
            background-color: white;
            padding: 1em;
            display: -webkit-box;
            display: -webkit-flex;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-pack: center;
            -webkit-justify-content: center;
            -ms-flex-pack: center;
            justify-content: center;
        }

        body > .container > main section.reviews .reviews-inner {
            margin: 0 auto;
            max-width: 1180px;
            margin-right: -1em;
            margin-left: -1em;
            display: -webkit-box;
            display: -webkit-flex;
            display: -ms-flexbox;
            display: flex;
            -webkit-flex-flow: row wrap;
            -ms-flex-flow: row wrap;
            flex-flow: row wrap;
        }

        @media (min-width: 1180px) {
            body > .container > main section.reviews .reviews-inner {
                -webkit-flex-flow: row nowrap;
                -ms-flex-flow: row nowrap;
                flex-flow: row nowrap;
            }
        }

        body > .container > main section.reviews .reviews-inner > * {
            /*padding-right: 1em;*/
            padding-left: 1em;
        }

        body > .container > main section.reviews .reviews-inner > aside {
            -webkit-box-flex: 1;
            -webkit-flex: 1;
            -ms-flex: 1;
            flex: 1;
            display: -webkit-box;
            display: -webkit-flex;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-pack: start;
            -webkit-justify-content: flex-start;
            -ms-flex-pack: start;
            justify-content: flex-start;
            padding: 0px !important;
        }

        @media (min-width: 1180px) {
            body > .container > main section.reviews .reviews-inner > aside {
                -webkit-flex-flow: column nowrap;
                -ms-flex-flow: column nowrap;
                flex-flow: column nowrap;
                max-width: 360px;
                padding: 0px !important;
            }
        }

        body > .container > main section.reviews .reviews-inner > aside > ul {
            display: block;
        }

        body > .container > main section.reviews .reviews-inner > aside > ul::after {
            content: '';
            -webkit-box-flex: 1;
            -webkit-flex: 1;
            -ms-flex: 1;
            flex: 1;
        }

        @media (min-width: 1180px) {
            body > .container > main section.reviews .reviews-inner > aside > ul::after {
                display: none;
            }
        }

        body > .container > main section.reviews .reviews-inner > aside > ul > li {
            -webkit-box-flex: 1;
            -webkit-flex: 1;
            -ms-flex: 1;
            flex: 1;
            display: inline-block;
        }

        @media (min-width: 1180px) {
            body > .container > main section.reviews .reviews-inner > aside > ul > li {
                display: block;
            }
        }

        body > .container > main section.reviews .reviews-inner > aside > ul > li > a {
            display: block;
            background-color: #ffffff ;
            color: #3b4858;
            text-decoration: none;
            padding: 1em;
            font-size: 1.2em;
            white-space: nowrap;
            font-weight: 500;
            margin-bottom: 0.5em;
            margin-right: 0.5em;
            position: relative;
        }

        @media (min-width: 1180px) {
            body > .container > main section.reviews .reviews-inner > aside > ul > li > a {
                margin-right: 0;
            }
        }

        body > .container > main section.reviews .reviews-inner > aside > ul > li > a::after {
            -webkit-transition: 200ms ease-out all;
            transition: 200ms ease-out all;
            right: 0;
            content: '';
            position: absolute;
            bottom: 0;
            border: 0 solid transparent;
            border-right: 0 solid #2a8ae1;
            border-bottom: 0 solid #2a8ae1;
        }

        body > .container > main section.reviews .reviews-inner > aside > ul > li > a:hover::after, body > .container > main section.reviews .reviews-inner > aside > ul > li > a.active::after {
            border: 0.75em solid transparent;
            border-right: 0.75em solid #2a8ae1;
            border-bottom: 0.75em solid #2a8ae1;
        }

        body > .container > main section.reviews .reviews-inner > aside > ul > li > a.active {
            color: white;
            background: #5fb5fe;
        }

        body > .container > main section.reviews .reviews-inner > aside img {
            height: auto;
            margin-bottom: 0.5em;
            display: none;
        }

        @media (min-width: 1180px) {
            body > .container > main section.reviews .reviews-inner > aside img {
                display: block;
            }
        }

        body > .container > main section.reviews article {
            border: 4px solid #ffffff ;
            padding: 1.5em 0.75em;
            display: -webkit-box;
            display: -webkit-flex;
            display: -ms-flexbox;
            display: flex;
            -webkit-flex-flow: row wrap;
            -ms-flex-flow: row wrap;
            flex-flow: row wrap;
            margin-right: -0.5em;
            margin-left: -0.5em;
            min-width: 320px;
        }

        body > .container > main section.reviews article > * {
            padding-right: 0.5em;
            padding-left: 0.5em;
        }

        body > .container > main section.reviews article .reviews-item-figure {
            text-align: center;
            -webkit-box-flex: 1;
            -webkit-flex: 1;
            -ms-flex: 1;
            flex: 1;
            min-width: 200px;
        }

        body > .container > main section.reviews article .reviews-item-figure img {
            max-width: 100%;
            height: auto;
        }

        body > .container > main section.reviews article .reviews-item-figure ul {
            margin: 1em 0;
            padding: 0.5em 0;
            display: -webkit-box;
            display: -webkit-flex;
            display: -ms-flexbox;
            display: flex;
            -webkit-justify-content: space-around;
            -ms-flex-pack: distribute;
            justify-content: space-around;
        }

        body > .container > main section.reviews article .reviews-item-figure ul li {
            display: -webkit-box;
            display: -webkit-flex;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-align: center;
            -webkit-align-items: center;
            -ms-flex-align: center;
            align-items: center;
            white-space: nowrap;
        }

        body > .container > main section.reviews article .reviews-item-figure ul li strong {
            font-weight: bold;
            margin-right: 0.2em;
        }

        body > .container > main section.reviews article .reviews-item-figure ul li::before {
            content: '✓';
            color: #5fb5fe;
            font-size: 1.25em;
            margin-right: 0.5em;
        }

        body > .container > main section.reviews article .reviews-item-figure ul li.bonus {
            color: #00b061;
        }

        body > .container > main section.reviews article .reviews-item-figure ul li.bonus::before {
            color: inherit;
        }

        body > .container > main section.reviews article .reviews-item-body {
            min-width: 70%;
            -webkit-box-flex: 3;
            -webkit-flex: 3;
            -ms-flex: 3;
            flex: 3;
        }

        body > .container > main section.reviews article .reviews-item-body header {
            display: -webkit-box;
            display: -webkit-flex;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-pack: justify;
            -webkit-justify-content: space-between;
            -ms-flex-pack: justify;
            justify-content: space-between;
            -webkit-box-align: center;
            -webkit-align-items: center;
            -ms-flex-align: center;
            align-items: center;
            font-size: 1.75em;
        }

        body > .container > main section.reviews article .reviews-item-body header .reviews-item-rating {
            color: #5fb5fe;
            font-weight: 500;
            font-size: 1em;
        }

        body > .container > main.review section.hero article.hero-item {
            padding-left: 1em;
        }

        @media (min-width: 1480px) {
            body > .container > main.review section.hero article.hero-item {
                padding-left: 43.5%;
            }
        }

        body > .container > main.review section.hero article.hero-item img {
            max-width: 50%;
            height: auto;
        }

        @media (min-width: 1480px) {
            body > .container > main.review section.hero article.hero-item img {
                max-width: none;
            }
        }

        body > .container > main.review section.hero .hero-item-rating::before {
            display: none;
        }

        body > .container > main.review section.hero .hero-item-body > a.button {
            font-size: 1em;
            margin-right: 0;
            white-space: normal;
            text-align: center;
        }

        body > .container > main.review section.hero .hero-item-body ul {
            border: 0;
            margin: 1em 0;
            margin-bottom: -2em;
            padding: 0.5em 0;
            display: -webkit-box;
            display: -webkit-flex;
            display: -ms-flexbox;
            display: flex;
            -webkit-flex-flow: row wrap;
            -ms-flex-flow: row wrap;
            flex-flow: row wrap;
            -webkit-box-pack: justify;
            -webkit-justify-content: space-between;
            -ms-flex-pack: justify;
            justify-content: space-between;
        }

        body > .container > main.review section.hero .hero-item-body ul li {
            -webkit-box-flex: 50%;
            -webkit-flex: 50%;
            -ms-flex: 50%;
            flex: 50%;
            font-size: 1.2em;
            margin-bottom: 0.5em;
            display: -webkit-box;
            display: -webkit-flex;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-align: center;
            -webkit-align-items: center;
            -ms-flex-align: center;
            align-items: center;
            white-space: nowrap;
        }

        body > .container > main.review section.hero .hero-item-body ul li strong {
            font-weight: bold;
            margin-right: 0.2em;
        }

        body > .container > main.review section.hero .hero-item-body ul li::before {
            font-weight: bold;
            content: '✓';
            color: #5fb5fe;
            font-size: 1.25em;
            margin-right: 0.5em;
        }

        body > .container > main.review section.hero .hero-item-body ul li.bonus {
            color: #00b061;
        }

        body > .container > main.review section.hero .hero-item-body ul li.bonus::before {
            color: inherit;
        }

        body > .container > main.review section.hero .hero-item-body ul li.fail::before {
            content: '✗';
            color: #e3201c;
        }

        body > .container > main.review article.review {
            display: block;
            border: 0;
            padding-left: 2em;
            padding-top: 0;
        }

        body > .container > main.review article.review > * {
            padding: 0;
        }

        body > .container > main.review article.review h2 {
            font-size: 2em;
        }

        body > .container > main.review article.review h3 {
            font-size: 1.1em;
            font-weight: 500;
            border-left: 2px solid #2a8ae1;
            padding-left: 0.8em;
            text-transform: uppercase;
            margin: 1.5em 0;
        }

        body > .container > main.review article.review table {
            margin: 1.5em 0;
            width: 100%;
            border: 4px solid #d5e2e8;
            border-collapse: collapse;
            font-size: 1.1em;
        }

        body > .container > main.review article.review table.margin {
            font-weight: 500;
        }

        body > .container > main.review article.review table.margin td {
            padding: 0.75em 1em;
            text-align: right;
        }

        body > .container > main.review article.review table.margin tr:nth-child(odd) {
            background: #f8f9fb;
        }

        body > .container > main.review article.review table.margin tr td:nth-child(even) {
            background: #eeeff3;
            color: rgba(0, 0, 0, 0.7);
            width: 1%;
        }

        body > .container > main.review article.review table.margin tr:last-child td:first-child {
            color: #2a8ae1;
            background: #e8f4ff;
        }

        body > .container > main.review article.review table.margin tr:last-child td:last-child {
            color: white;
            background: #5fb5fe;
        }

        body > .container > main.review article.review table.ginfo tr td {
            border: 2px solid #d5e2e8;
            padding: 2.5%;
        }

        body > .container > main.review article.review table.ginfo tr td:first-child {
            font-weight: 500;
            border-right: 0;
            white-space: nowrap;
            vertical-align: top;
        }

        body > .container > main.review article.review table.ginfo tr td:last-child {
            border-left: 0;
            color: rgba(0, 0, 0, 0.7);
        }

        body > .container > main.review article.review table.ginfo tr td ul {
            display: -webkit-box;
            display: -webkit-flex;
            display: -ms-flexbox;
            display: flex;
            -webkit-flex-flow: row wrap;
            -ms-flex-flow: row wrap;
            flex-flow: row wrap;
        }

        body > .container > main.review article.review table.ginfo tr td ul li {
            display: -webkit-box;
            display: -webkit-flex;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-align: center;
            -webkit-align-items: center;
            -ms-flex-align: center;
            align-items: center;
            width: 100%;
            line-height: 1.7;
        }

        @media (min-width: 640px) {
            body > .container > main.review article.review table.ginfo tr td ul li {
                width: 50%;
            }
        }

        body > .container > main.review article.review table.ginfo tr td ul li::before {
            content: '·';
            margin-right: 0.3em;
            font-weight: bolder;
            font-size: 2em;
            line-height: 0;
            color: #5fb5fe;
        }

        body > .container > main.review article.review p {
            color: rgba(0, 0, 0, 0.7);
        }

        body > .container > main.review article.review > a {
            display: inline-block;
            padding: 1em 2.5em;
        }

        body > .container > main.review article.review > figure {
            margin: 1.5em 0;
            display: -webkit-inline-box;
            display: -webkit-inline-flex;
            display: -ms-inline-flexbox;
            display: inline-flex;
            -webkit-flex-flow: column;
            -ms-flex-flow: column;
            flex-flow: column;
            -webkit-box-align: center;
            -webkit-align-items: center;
            -ms-flex-align: center;
            align-items: center;
            width: 100%;
        }

        @media (min-width: 840px) {
            body > .container > main.review article.review > figure {
                width: 50%;
            }
        }

        body > .container > main.review article.review > figure > img {
            box-shadow: 0 0 30px -5px black;
        }

        body > .container > main.review article.review > figure > figcaption {
            color: rgba(0, 0, 0, 0.3);
            margin-top: 0.75em;
            font-size: 1.2em;
            font-weight: 400;
        }

        .linck {
            display: block;
            background-color: rgba(226, 226, 226, 0.88);
            color: #3b4858;
            text-decoration: none;
            padding: 1em;
            font-size: 1.2em;
            white-space: nowrap;
            font-weight: 500;
            margin-bottom: 0.5em;
            margin-right: 0.5em;
            position: relative;
        }

        a.linck:hover::after, .linck.active::after {
            border: 0.75em solid transparent;
            border-right: 0.75em solid #2a8ae1;
            border-bottom: 0.75em solid #2a8ae1;
        }

        a.linck.active {
            color: white;
            background: #5fb5fe;
        }

        a.linck::after {
            -webkit-transition: 200ms ease-out all;
            transition: 200ms ease-out all;
            right: 0;
            content: '';
            position: absolute;
            bottom: 0;
            border: 0 solid transparent;
            border-right: 0 solid #2a8ae1;
            border-bottom: 0 solid #2a8ae1;
        }

        .givemeyouremail {
            display: -webkit-box;
            display: -webkit-flex;
            display: -ms-flexbox;
            display: flex;
            overflow: hidden;
            -webkit-flex-flow: row wrap;
            -ms-flex-flow: row wrap;
            flex-flow: row wrap;
            min-height: 90px;
        }

        .givemeyouremail-text, .givemeyouremail-input {
            -webkit-box-flex: 1;
            -webkit-flex: 1;
            -ms-flex: 1;
            flex: 1;
        }

        .givemeyouremail-text {
            padding-left: 1em;
            font-size: 1.4em;
            display: -webkit-box;
            display: -webkit-flex;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-pack: end;
            -webkit-justify-content: flex-end;
            -ms-flex-pack: end;
            justify-content: flex-end;
            color: white;
            background: #2a8ae1;
            position: relative;
            -webkit-box-align: center;
            -webkit-align-items: center;
            -ms-flex-align: center;
            align-items: center;
        }

        .givemeyouremail-text > span {
            -webkit-box-flex: 1;
            -webkit-flex: 1;
            -ms-flex: 1;
            flex: 1;
            max-width: 590px;
            z-index: 3;
            display: -webkit-box;
            display: -webkit-flex;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-align: center;
            -webkit-align-items: center;
            -ms-flex-align: center;
            align-items: center;
        }

        .givemeyouremail-text > span::before {
            content: '✉';
            font-size: 1.5em;
            margin-right: 0.25em;
            font-weight: 100;
        }

        .givemeyouremail-text::after {
            -webkit-transform: rotate(22.5deg);
            transform: rotate(22.5deg);
            content: '';
            position: absolute;
            right: -20px;
            top: -25%;
            z-index: 2;
            background: #2a8ae1;
            width: 75px;
            height: 200%;
        }

        .givemeyouremail-input {
            padding-right: 1em;
            background: #5fb5fe;
            display: -webkit-box;
            display: -webkit-flex;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-pack: start;
            -webkit-justify-content: flex-start;
            -ms-flex-pack: start;
            justify-content: flex-start;
        }

        .givemeyouremail-input > input {
            font-size: 1.4em;
            padding-left: 90px;
            position: relative;
            max-width: 590px;
            color: white;
            background: #5fb5fe;
            border: 0;
            outline: 0;
        }

        .givemeyouremail-input > input::-webkit-input-placeholder {
            color: white;
        }

        .givemeyouremail-input > input::-moz-placeholder {
            color: white;
        }

        .linck {
            display: block;
            background-color: rgba(226, 226, 226, 0.88);
            color: #3b4858;
            text-decoration: none;
            padding: 1em;
            font-size: 1.2em;
            white-space: nowrap;
            font-weight: 500;
            margin-bottom: 0.5em;
            margin-right: 0.5em;
            position: relative;
        }

        a.linck:hover::after, .linck.active::after {
            border: 0.75em solid transparent;
            border-right: 0.75em solid #2a8ae1;
            border-bottom: 0.75em solid #2a8ae1;
        }

        a.linck.active {
            color: white;
            background: #5fb5fe;
        }

        a.linck::after {
            -webkit-transition: 200ms ease-out all;
            transition: 200ms ease-out all;
            right: 0;
            content: '';
            position: absolute;
            bottom: 0;
            border: 0 solid transparent;
            border-right: 0 solid #2a8ae1;
            border-bottom: 0 solid #2a8ae1;
        }

        .givemeyouremail-input > input:-ms-input-placeholder {
            color: white;
        }

        .givemeyouremail-input > input::placeholder {
            color: white;
        }

        .logo {
            font-size: 1.2rem;
            text-decoration: none;
            text-transform: uppercase;
            letter-spacing: 2px;
        }

        .logo span:first-child {
            color: white;
        }

        .logo span:last-child {
            color: #5fb5fe;
            font-weight: 100;
        }

        .content_style {
            background: none;
            width: auto;
            margin-left: 0px;
            padding: 5px;
        }

        .center {
            margin: 0 auto !important;
            -}
        table{
            border-radius: 4px;
        }
        .margin_block {
            font-weight: 500;
            margin: 0 0;
            width: 100%;
            border: 0px solid #2a8ae1;
            border-collapse: collapse;
            font-size: 1.1em;
            text-align: center;
        }
        .margin_block tr {
            border: 1px solid rgba(42, 138, 225, 1);
        }
        .margin_block thead th {
            background: #2a8ae1;
            padding: 25px;
            color: #fff;
            margin: 0 auto !important;
        }
        .margin_block tbody td {
            padding: 20px;
            margin: 0 auto !important;
        }


        .content_article table {
            font-weight: 500;
            margin: 0 0;
            width: 100%;
            border: 7px solid #B4D1E3;
            border-collapse: collapse;
            font-size: 1.1em;
            text-align: center;
        }

        .content_article thead th {
            background: #fefefe;
            padding: 25px;
            color: rgba(0, 0, 0, 0.7);
            margin: 0 auto !important;
        }

        .content_article tbody td {
            background: #fefefe;
            padding: 25px;
            color: rgba(0, 0, 0, 0.5);
            margin: 0 auto !important;
        }

        .content_article tbody .active {
            background: #3aa9e3 !important;
            color: #fff !important;
            margin: 0 auto !important;
        }

        .content_article tbody .sub_active {
            background: #B4D1E3 !important;
            color: #fff !important;
            margin: 0 auto !important;
        }

        ._th_resp > .field-content {
            margin-top: -10px !important;
        }

        .button_block {
            display: inline-block;
            padding: 1em 2.5em;
            font-size: 0.9em;
            /*margin-right: 2em;*/
            /*letter-spacing: 0.1em;*/
            font-weight: 700;
            text-transform: uppercase;
            color: white;
            border: 0;
            background: #2a8ae1;
            box-shadow: 2px 2px 0 #5fb5fe;
            white-space: nowrap;
            -webkit-transition: 100ms ease-in-out all;
            transition: 100ms ease-in-out all;
            cursor: pointer;
            min-width: 100px;
        }


        form {
            padding: 25px;
            background: #2E3D50;
            width: 100%;
        }

        form > div > div {
            /*margin: 25px;*/
            color: rgba(209, 209, 209, 0.88);
            width: 100%;
        }

        label {
            #2E3D50 display: block;
            float: left;
            font-size: 18px;
            font-weight: bold;
            height: 24px;
            margin: 0 10px 0 0;
            padding: 3px 7px;
            width: 100%;
            color: rgba(209, 209, 209, 0.88);
            margin-top: 15px;
        }

        input[type="text"] {
            background-color: #F3F3F3;
            border: 1px solid #CCCCCC;
            height: 16px;
            padding: 7px;
            width: 100%;
        }

        input[type="password"] {
            background-color: #F3F3F3;
            border: 1px solid #CCCCCC;
            height: 16px;
            padding: 7px;
            width: 100%;
        }

        textarea {
            border: 1px solid #CCCCCC;
            height: 16px;
            padding: 7px;
            width: 100%;
            height: 150px;
        }

        input[type="submit"] {
            display: inline-block;
            padding: 1em 2.5em;
            font-size: 0.9em;
            margin-right: 2em;
            margin-top: 2em;
            letter-spacing: 0.1em;
            font-weight: 700;
            text-transform: uppercase;
            color: rgba(209, 209, 209, 0.88);
            border: 0;
            background: #2a8ae1;
            box-shadow: 2px 2px 0 #2E3D50;
            white-space: nowrap;
            -webkit-transition: 100ms ease-in-out all;
            transition: 100ms ease-in-out all;
            cursor: pointer;
            min-width: 150px;
        }

        select {
            background-color: #F3F3F3;
            border: 1px solid #CCCCCC;
            height: 32px;
            padding: 4px;
            width: 451px;
        }

        .region-page-top {
            background: white;
            padding: 25px;
            max-width: 400px;
            margin: 15px;
        }

        .region-page-top h2 {
            margin-top: 10px;
            margin-bottom: 10px;
        }

        .toolbar-drawer {
            margin-top: 10px;
        }

        .menu_responsive {
            display: none;
            cursor: pointer;
        }

        .btn_co_bady {
            display: none;
        }

        .btn-co {
            padding-top: 5px;
            *background: #2A8AE1;
            background-image: url("/sites/all/themes/superbold/img/menu-bar-list-round-mobile-512.png");
            background-repeat: no-repeat;
            min-width: 45px;
            min-height: 45px;
            border-radius: 100%;
            color: #fff;
            text-decoration: none;
            text-align: center
        }

        .TVores h1 {
            font-size: 1.6em;
        }

        .TVores h3 {
            font-size: 1.1em;
            background-image: -webkit-linear-gradient(top, rgba(42, 138, 225, 0.9) 50%, rgba(42, 138, 225, 1) 50%);
            background-image: linear-gradient(to bottom, rgba(42, 138, 225, 0.9) 50%, rgba(42, 138, 225, 1) 50%);
            background-repeat: no-repeat;
            background-size: 2px 1.3em;;
            padding-left: 11px;
            text-transform: uppercase;

        }

        .hero_div {
            width: 100%;
            margin: 0 auto !important;
            padding-top: 15px;
            padding-bottom: 15px;
        }

        .hero-img {
            display: inline-block;
            width: 30%;
            margin-top: 20px;
        }

        .hero-img img {
            margin: 0 auto !important;
        }

        .hero-item-body {
            display: inline-block;
            width: 62%;
            margin: 20px;
            padding-left: 25px;
        }

        .TVores img, .content_style img {
            max-width: 96%;
        }
        .TVores .margin_block img, .content_style .margin_block img {
            margin-bottom: -25px;
        }
        .fixed-bar {
            position: fixed;
            right: 0;
            left: 0;
            z-index: 1030;
            /* background: rgb(46, 61, 80);
             background-color: rgb(46, 61, 80);*/
            background: #338D29;
            background-color: #338D29;
            font-family: 'Ubuntu';
            min-height: 70px;
        }

        .home {
            padding-left: -10px;
            padding-right: -10px;
            padding-top: 20px !important;
            margin: 0 auto !important;
        }

        .box-padding {
            padding-left: 12px;
            padding-right: 12px;
        }

        .box-padding_up {
            padding-top: 75px;
        }

        .col-xs-3 {
            width: 33.3%;
            margin: 0 auto !important;
        }

        .col-xs-7 {
            width: 66.6%;
            margin: 0 auto !important;
        }


        .messages{
            background: blanchedalmond;
            padding: 15px;
        }

        #toolbar{
            margin-top: -600px;
            margin-left: 0;
            background: #2E3D50;
            padding: 15px;
            color: whitesmoke;
        }
        #toolbar a {
            color:#5399D5
        }
        .col-xs-9{
            width: 90%;
        }

        .max_art .field-content::before {
            content: '✓';
            color: #077ab0;
            font-size: 1.25em;
            margin-right: 0.3em;
            font-weight: bold;
        }
        .max_art .field-content {
            color: #2E3D50;
            font-weight: bold;
            display: -webkit-box;
            padding-left: 15px;
            padding-bottom: 15px;
        }
        .center_art_7{
            margin: 0 auto !important;
        }
        .center_art_5{
            margin: 0 auto !important;
            width: 50%;
        }


        #toolbar ul li{
        }
        .line{

        }
        .back_box {
            border:2px solid rgba(95, 181, 254, 0.51);
        }
        .back_box_art {
            border:0px solid rgba(95, 181, 254, 0.51);
        }
        .back_img {
            display: inline-block;
            width: 30%;
            padding: 15px;
            margin-top: 20px;
        }
        .content_style .back_img img {
            width: 100%;
            height: 100%;
            max-height: 300px;
            max-width: 300px;
            margin-top: -70px;
        }
        .back_body {
            display: inline-block;
            width: 65%;
            margin-top: 30px;
            margin-bottom: 30px;
        }
        .BET_rew {
            display: inline-block;
            padding: 1em 2.5em;
            font-size: 0.9em;
            margin-right: 2em;
            letter-spacing: 0.1em;
            font-weight: 700;
            text-transform: uppercase;
            color: white;
            border: 0;
            background: #2a8ae1;
            box-shadow: 2px 2px 0 #5fb5fe;
            white-space: nowrap;
            -webkit-transition: 100ms ease-in-out all;
            transition: 100ms ease-in-out all;
            cursor: pointer;
            text-align: center;
        }
        .BET_art_rew {
            display: inline-block;
            padding: 1em 2.5em;
            font-size: 0.9em;
            margin-right: 2em;
            letter-spacing: 0.1em;
            font-weight: 700;
            text-transform: uppercase;
            color: white;
            border: 0;
            background: #338D29;
            box-shadow: 2px 2px 0 #00b061;
            white-space: nowrap;
            -webkit-transition: 100ms ease-in-out all;
            transition: 100ms ease-in-out all;
            cursor: pointer;
            text-align: center;
        }
        .Read_rew {
            display: inline-block;
            padding: 2em 1.5em;
            font-size: 0.9em;
            letter-spacing: 0.1em;
            font-weight: 700;
            text-transform: uppercase;
            color: #2a8ae1;
            border: 0;
            background: rgba(250, 255, 243, 0);
            box-shadow: 2px 2px 0 rgba(209, 209, 209, 0);
            white-space: nowrap;
            -webkit-transition: 100ms ease-in-out all;
            transition: 100ms ease-in-out all;
            cursor: pointer;
        }
        .text_view {
            font-weight: 400;
            color: rgba(0, 0, 0, 0.7);
            font-size: 1.15em;
            margin: 1.5em 0;
            line-height: 1.4em;
        }
        .left {
            float: left;
            display: inline
        }
        .left a {
            text-decoration: none;
            color: rgba(0, 0, 0, 0.7);
        }
        .right {
            float: right;
            display: inline;
            color: #5fb5fe;
        }
        .mar_boot{
            margin-bottom: 25px !important;
        }
        .hr_trns{
            border: 1px solid transparent;
            width: 5%;
        }
        .max .field-content::before {
            content: '✓';
            color: #00b061;
            font-size: 1.25em;
            margin-right: 0.3em;
            font-weight: bold;
        }
        .max .field-content {
            color: #00b061;
            font-weight: bold;
            display: -webkit-box;
            padding-left: 15px;
            padding-bottom: 15px;
        }
        .scroller{
            width: 90%;
            overflow-x: auto;
            white-space: nowrap;
            margin: 0 auto !important;
        }
        .scroller_before:before{
            content: '<';
            color: #fff;
            font-size: 1.25em;
            margin-right: 0.3em;
            font-weight: bold;
            display: inline-flex;
        }
        .scroller_after:after{
            content: '>';
            color: #fff;
            font-size: 1.25em;
            margin-right: 0.3em;
            font-weight: bold;
            display: inline-flex;
        }
        .plus_padd{
            margin: 0 auto !important;
            padding-top: 15px !important;
            padding-bottom: 10px !important;
        }
        .sub_menu{
            margin: 0 auto !important;
            text-align: center;
        }
        .sub_menu .if_main{
            display: inline-flex;
            background: none;
            margin-top: -15px;
        }
        .sub_menu .if_main a{
            background: none;
            color: #fff;
            font-weight: normal;
            text-decoration: none;
            padding-left: 1em;
            font-size: 0.8em;
            white-space: nowrap;


        }
        .sub_menu .if_main a.linck:hover::after, .sub_menu .if_main .linck.active::after {
            border: 0.75em solid transparent;
            border-right: transparent !important;
            border-bottom: transparent !important;
        }

        .hidde-xs{
            display: none;
        }
        @media (max-width: 1200px) {
            #footer_menu {
                display: none;
            }
            .center {
                margin: 0 auto !important;
                text-align: center !important;
            }

            .col-xs-12 {
                width: 96% !important;
                padding-right: 2%;
                padding-left: 2%;
                margin: 10px auto !important;
            }


            .menu_sb {
                min-height: 70px;
            }

            #head_menu {
                display: none;
            }

            .menu_responsive {
                display: inline;
                cursor: pointer;
            }

            .aside_responsive {
                display: none !important;
            }

            .head_responsive {
                position: fixed;
                right: 0;
                left: 0;
                top: 0;
                z-index: 1030;
                background-color: #2e3d50;
                font-family: 'Ubuntu';
            }

            .hero {
                padding: 4em 0em 0em 0em !important;
            }

            #btn-co_bady {
                height: auto;
                width: 80%;
                background: white;
                top: 75px;
                position: absolute;
                z-index: auto;
                padding: 0px;
                left: 10px;
            }

            .content_article img {
                width: auto;
                max-width: 500px;
                max-height: 400px;
            }

            body > .container > main section.hero .hero-item img {
                margin: 0;
                height: auto;
                max-width: 500px;
                max-height: 400px;
            }

            .hero-img {
                display: inline-block;
                width: 100%;
                margin: 0 auto;
            }

            .hero-item-body {
                display: inline-block;
                width: auto;
                height: auto;
                margin: 0 auto;
            }
            .hidde-sm{
                display: none;
            }
            .hidde-xs{
                display: flex;
            }

        }

        @media (max-width: 992px) {
            .TVores img, .content_style img {
                height: auto !important;
                max-width: 96% !important;
            }
            .content_article img {
                width: auto;
                max-width: 300px;
                max-height: 250px;
            }
            body > .container > main section.hero .hero-item img {
                margin: 0;
                height: auto;
                max-width: 300px;
                max-height: 250px;
            }
            .th_resp {
                display: none;
            }
            .button_block {
                display: inline-block;
                padding: 25px;
                font-size: 0.9em;
                margin-right: 2em;
                letter-spacing: 0.1em;
                font-weight: 700;
                text-transform: uppercase;
                color: white;
                border: 0;
                background: #2a8ae1;
                box-shadow: 2px 2px 0 #5fb5fe;
                white-space: nowrap;
                -webkit-transition: 100ms ease-in-out all;
                transition: 100ms ease-in-out all;
                cursor: pointer;
                min-width: 100px;
            }
            .col-xs-12 {
                width: 96% !important;
                padding-right: 2%;
                padding-left: 2%;
                margin: 10px auto !important;
            }
            .hidde-sm{
                display: none;
            }
            .hidde-xs{
                display: flex;
            }

            .div_info, .div_img{
                display: inline-block !important;
                width: 100% !important;
                margin: 0 auto !important;
            }
            .seccition_block{
                display: inline-block !important;
            }
            .art_div{
                display: table-cell;
                width: 33% !important;
                margin-top: 0px !important;
                margin-bottom: 0px !important;
            }

        }

        @media (max-width: 768px) {
            .art_div{
                display: inline-block;
                width: 70% !important;
                margin-top: 0px !important;
                margin-bottom: 0px !important;
            }
            .hidde-sm{
                display: none;
            }
            .menu nav ul li a {
                font-size: 12px;
                margin-right: 0px;
                display: inline-flex;
            }
            .hidde-xs{
                display: flex;
            }
            .back_img {
                width: 90% !important;
            }
            .content_style .back_img img {
                max-height: 300px;
                max-width: 80%;
                margin: 0 auto !important;
                padding: 0 !important;
            }
            .back_body {
                width: 100% !important;
            }
            .col-xs-12_plus {
                width: 96% !important;
                margin: 0 auto !important;
            }
            .content_article img {
                width: auto;
                max-width: 250px;
                max-height: 200px;
            }
            body > .container > main section.hero .hero-item img {
                margin: 0;
                height: auto;
                max-width: 250px;
                max-height: 500px;
            }
            .th_resp {
                display: none;
            }
            .button_block {
                display: inline-block;
                padding: 15px;
                font-size: 0.6em;
                letter-spacing: 0.1em;
                font-weight: 700;
                text-transform: uppercase;
                color: white;
                border: 0;
                background: #2a8ae1;
                box-shadow: 2px 2px 0 #5fb5fe;
                white-space: nowrap;
                -webkit-transition: 100ms ease-in-out all;
                transition: 100ms ease-in-out all;
                cursor: pointer;
                min-width: 70px;
            }
            article a.button{
                margin-right:0;
                padding: 1em;
            }
            .Read_rew{
                padding: 0;
            }
        }
        .row{
            padding-right: 0px;
            padding-left: 0px;
        }

        ::-webkit-scrollbar{
            width: 1px;
            height: 5px;
            background: transparent;

        }
        ::-webkit-scrollbar-button{
            width:2px;
            height: 2px;
        }
        ::-webkit-scrollbar-track{
            background:transparent;
            border:thin solid transparent;
            -webkit-box-shadow: transparent;
            -webkit-border-radius: 10px;
            border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb{
            background: transparent;
            -webkit-box-shadow:   inset 0 1px 0 rgba(255,255,225,0),
            inset 1px 0 0 rgba(255,255,255,0),
            inset 0 1px 2px rgba(255,255,255,0);
            border:transparent;
            border-radius: 10px;
            -webkit-border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover{
            background: -webkit-linear-gradient(top, transparent,transparent);
        }
        /* Pseudo-clase */
        ::-webkit-scrollbar-thumb:window-inactive {
            background: rgba(77,161,112,0);
        }


        .h1_head{
            font-weight: normal;
            font-family: 'Ubuntu' !important;
        }
        .row {
            margin-right: 0px;
            margin-left: 0px;
        }

        .active_menu a {
            position: relative;
            background: #57A3E4;
            color: #fff !important;
        }
        .active_menu a:after, .active_menu a:before {
            left: 100%;
            top: 100%;
            margin-left: -30px;
            margin-top: -30px;
            border: solid transparent;
            content: " ";
            height: 0;
            width: 0;
            position: absolute;
            pointer-events: none;
        }
        .active_menu a:after {
            border-color: rgba(75, 213, 88, 0);
            /*border-left-color: #4bd558;
            border-top-color: #4bd558;*/
            border-bottom-color: #2a8ae1;
            border-right-color: #2a8ae1;
            border-width: 15px;
            margin-top: -30px;
        }
        .active_menu a:before {
            border-color: rgba(86, 245, 91, 0);
            border-bottom-color: #2a8ae1;
            border-right-color: #2a8ae1;
            border-width: 15px;
            margin-top: -30px;
        }
         header a .linck  {
            position: relative;
            background: #57A3E4;
            color: #fff !important;
        }

        .art_div_text{
            width:80%; display:inline-block; padding-top: 40px; padding-bottom: 20px; margin-left: 8%!important;
        }
        .seccition_block{
            display: inline-flex; width: 80%; margin-left: 8%!important; padding-bottom: 80px
        }
        .div_img{
            width: 45%; display: inline-block
        }
        .div_img_inside{
            width: 80% ; min-height: 200px
        }
        .div_info{
            width: 55%; display: inline-block; padding-top:2%; float: right
        }
        .art_div_head{
            padding-left: 15px;width: 80%
        }
        a{
            text-decoration: none !important;font-weight: normal
        }
        .art_div{
            display: inline-block;
            width: 34%;
            margin-top: 10px;
            margin-bottom: 20px;
        }


        .h3_to_h1_art_head {
            font-size: 1.7em !important;
            font-weight: normal !important;
            text-transform: capitalize;
            color: rgba(0, 0, 0, 0.7);
            background-image: -webkit-linear-gradient(top, rgba(42, 138, 225, 0) 50%, rgba(42, 138, 225, 0) 50%)!important;
            background-image: linear-gradient(to bottom, rgba(42, 138, 225, 0) 50%, rgba(42, 138, 225, 0) 50%)!important;
        }
        .dvi_flex{
            display: inline-flex;
            padding-left: 15px;
            margin-bottom: 15px;
            padding-top: 8px;
            cursor: pointer;
        }
        .dvi_flex a{
            color: #fff;
            margin: 0 auto !important;
        }
        .dvi_flex .active{
            color: #1d84c3;
        }

    </style>
</head>
<body <?php if (!$front) { ?> onload="cambiarDisplaytofalse('btn-co_bady')" onscroll="scroller()"<?php } else { ?> onload="cambiarDisplaytofalse_('btn-co_bady')" <?php } ?> >
<?php print $page; ?>
<?php print $page_top; ?>
<?php print $page_bottom; ?>


</body>
</html>
