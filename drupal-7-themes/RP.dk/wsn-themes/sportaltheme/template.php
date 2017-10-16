<?php 


/* main ul */
function sportaltheme_menu_tree__main_menu($variables) {
  return '<ul class="nav navbar-nav main-menu">' . $variables['tree'] . '</ul>';
}


/* inner ui */
function sportaltheme_menu_tree__main_menu_inner($variables) {
    return '<ul class="dropdown-menu">' . $variables['tree'] . '</ul>';
}


/* inner li */
function sportaltheme_menu_link__main_menu_inner($variables) {
  $element = $variables['element'];
  $sub_menu = '';

  if ($element['#below']) {
    $sub_menu = drupal_render($element['#below']);
  }
  $output = l($element['#title'], $element['#href'], $element['#localized_options']);
  $class_submenu = ($sub_menu)? 'class="dropdown"' :  '';
  return '<li '.$class_submenu.'>' . $output . $sub_menu . "</li>\n";
}

/* main li */
function sportaltheme_menu_link__main_menu(array $variables) {
  $element = $variables['element'];
  $sub_menu = '';

  if ($element['#below']) {
    foreach ($element['#below'] as $key => $val) {
      if (is_numeric($key)) {             
        $element['#below'][$key]['#theme'] = 'menu_link__main_menu_inner'; // 2 lavel 
      }
    }
    $element['#below']['#theme_wrappers'][0] = 'menu_tree__main_menu_inner';  // 2 lavel 
    $sub_menu = drupal_render($element['#below']);
     
  }
  if($sub_menu) {
    $output = l($element['#title'], $element['#href'], array('attributes' => 
      array(
        'class' => array('dropdown-toggle'),
        'data-toggle' => array('dropdown'),
        'role' => array('button'),
        'aria-haspopup' => array('true'),
        'aria-expanded' => array('true'),
      )));
  } else {
     $output = l($element['#title'], $element['#href'], $element['#localized_options']);
  }
  $class_submenu = ($sub_menu)? 'class="dropdown"' :  '';
  return '<li '.$class_submenu.'>' . $output . $sub_menu . "</li>\n";
}


/*   breadcrumb  */
function sportaltheme_breadcrumb($variables) {
    $breadcrumb = $variables['breadcrumb'];

    if (!empty($breadcrumb)) {
        // Provide a navigational heading to give context for breadcrumb links to
        // screen-reader users. Make the heading invisible with .element-invisible.
        $breadcrumbs = '<ol class="breadcrumb" itemscope itemtype="http://schema.org/BreadcrumbList">';
        foreach ($breadcrumb as $key => $value) {
            //$breadcrumbs .= '<li itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem" >' . $value . '<meta itemprop="position" content="1" /></li>';
            $breadcrumbs .= '<li itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem"><a itemscope itemtype="http://schema.org/Thing" itemprop="item" href="/"><span itemprop="name">Home</span></a> <meta itemprop="position" content="1" /></li>';
        }


        $node = menu_get_object();
        if(isset($node) && $node ){

            if($node->type =='article'){
                $view = views_get_view('Articles', TRUE);
                $view_title = $view->display['page']->display_options['menu']['title'];
                $view_path = $view->display['page']->display_options['path'];

                $tid= @$node->field_topic['und']['0']['tid'];
                $term = @taxonomy_term_load($tid);
                $tags = @$term->name;

                $term_uri = @taxonomy_term_uri($term); // get array with path
                $term_path = $term_uri['path'];
                $tags_url = drupal_get_path_alias($term_path);

                $breadcrumbs .= '<li class="active" itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">
                                 <a itemscope itemtype="http://schema.org/Thing" itemprop="item" href="/nyheter"><span itemprop="name">' . $view_title. '</span></a><meta itemprop="position" content="2" /></li>';

                $breadcrumbs .= '<li itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem" >
                                 <a itemscope itemtype="http://schema.org/Thing" itemprop="item" href=/'.$tags_url.'><span itemprop="name">' .$tags. '</span></a><meta itemprop="position" content="3" /></li>';
            }

            else if($node->type =='tip'){
                $view = views_get_view('tips', TRUE);
                $view_title = $view->display['page']->display_options['menu']['title'];
                $view_path = $view->display['page']->display_options['path'];
                $breadcrumbs .= '<li class="active" itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">
                                 <a itemscope itemtype="http://schema.org/Thing" itemprop="item" href="/tips"><span itemprop="name">' . $view_title. '</span></a><meta itemprop="position" content="2" /></li>';
            }

            else if($node->type =='post'){
                $view = views_get_view('blog', TRUE);
                $view_title = $view->display['page']->display_options['menu']['title'];
                $view_path = $view->display['page']->display_options['path'];
                $breadcrumbs .= '<li class="active" itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">
                                 <a itemscope itemtype="http://schema.org/Thing" itemprop="item" href="/blog" itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem"><span itemprop="name">' . $view_title. '</span></a><meta itemprop="position" content="2" /></li>';
            }

            else if($node->type =='bookmaker'){
                $view = views_get_view('bookmakers', TRUE);
                $view_title = $view->display['page']->display_options['menu']['title'];
                $view_path = $view->display['page']->display_options['path'];
                // $breadcrumbs .= '<li class="active"><a href="'.$view_path.'">' . $view_title. '</a></li>';
                $breadcrumbs .= '<li class="active"itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">
                                <a itemscope itemtype="http://schema.org/Thing" itemprop="item" href="/bookmaker-recensioner" ><span itemprop="name">' . $view_title. '</span></a><meta itemprop="position" content="2" /></li>';
            }
        }
        $title = strip_tags(drupal_get_title());
        $breadcrumbs .= '<li class="active">' . $title. '</li>';
        $breadcrumbs .= '</ol>';

        @$breadcrumbs_total= explode('<li><span class="nolink">Bloggen</span></li>',$breadcrumbs);
        $breadcrumbs_total = @$breadcrumbs_total[0].@$breadcrumbs_total[1];
        //var_dump($breadcrumbs_total);
        if($breadcrumbs_total != ''){$breadcrumbs= $breadcrumbs_total;}

        return $breadcrumbs;
    }
}
