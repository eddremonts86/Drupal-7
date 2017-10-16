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