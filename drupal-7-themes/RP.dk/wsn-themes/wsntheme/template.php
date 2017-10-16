<?php
/*
 * @file
 */

$files = array(
  'elements.inc',
  'form.inc',
  'menu.inc',
  'theme.inc',
);

function _wsntheme_load($files) {
  $tp = drupal_get_path('theme', 'wsntheme');
  $file = '';
  $dir = dirname(__FILE__);

  // Check file path and '.inc' extension
  foreach($files as $file) {
    $file_path = $dir . '/templates/theme/' . $file;
    if (strpos($file,'.inc') > 0 && file_exists($file_path)) {
      require_once($file_path);
    }
  }
}

_wsntheme_load($files);

/**
 * Implements hook_html_head_alter().
 */
function wsntheme_html_head_alter(&$head_elements) {
  // HTML5 charset declaration.
  $head_elements['system_meta_content_type']['#attributes'] = array(
    'charset' => 'utf-8',
  );

  // Optimize mobile viewport.
  $head_elements['mobile_viewport'] = array(
    '#type' => 'html_tag',
    '#tag' => 'meta',
    '#attributes' => array(
      'name' => 'viewport',
      'content' => 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no',
    ),
  );

  // Force IE to use Chrome Frame if installed.
  $head_elements['chrome_frame'] = array(
    '#type' => 'html_tag',
    '#tag' => 'meta',
    '#attributes' => array(
      'content' => 'ie=edge, chrome=1',
      'http-equiv' => 'x-ua-compatible',
    ),
  );

  // Remove image toolbar in IE.
  $head_elements['ie_image_toolbar'] = array(
    '#type' => 'html_tag',
    '#tag' => 'meta',
    '#attributes' => array(
      'http-equiv' => 'ImageToolbar',
      'content' => 'false',
    ),
  );

  //delete metas 
  unset($head_elements['system_meta_generator']);

}

/**
 * Implements theme_breadrumb().
 *
 * Print breadcrumbs as a list, with separators.
 */
function wsntheme_breadcrumb($variables) {
  $breadcrumb = $variables['breadcrumb'];

  if (!empty($breadcrumb)) {
    // Provide a navigational heading to give context for breadcrumb links to
    // screen-reader users. Make the heading invisible with .element-invisible.
    $breadcrumbs = '<ol class="breadcrumb">';


    foreach ($breadcrumb as $key => $value) {
      $breadcrumbs .= '<li>' . $value . '</li>';
    }
   
    $node = menu_get_object();
    if(isset($node) && $node ){
        if($node->type =='news'){
           $view = views_get_view('news', TRUE);
           $view_title = $view->display['page']->display_options['menu']['title'];
           $view_path = $view->display['page']->display_options['path'];
           $breadcrumbs .= '<li class="active"><a href="/news">' . $view_title. '</a></li>';
        } else if($node->type =='tip'){
           $view = views_get_view('tips', TRUE);
           $view_title = $view->display['page']->display_options['menu']['title'];
           $view_path = $view->display['page']->display_options['path'];
           $breadcrumbs .= '<li class="active"><a href="/betting-tips">' . $view_title. '</a></li>';
        } else if($node->type =='post'){
           $view = views_get_view('blog', TRUE);
           $view_title = $view->display['page']->display_options['menu']['title'];
           $view_path = $view->display['page']->display_options['path'];
           $breadcrumbs .= '<li class="active"><a href="/blog">' . $view_title. '</a></li>';
        } else if($node->type =='bookmaker'){
           $view = views_get_view('bookmakers', TRUE);
           $view_title = $view->display['page']->display_options['menu']['title'];
           $view_path = $view->display['page']->display_options['path'];
           // $breadcrumbs .= '<li class="active"><a href="'.$view_path.'">' . $view_title. '</a></li>';
           $breadcrumbs .= '<li class="active"><a href="/bookmaker-reviews">' . $view_title. '</a></li>';
        }
    }
    $title = strip_tags(drupal_get_title());
    $breadcrumbs .= '<li class="active">' . $title. '</li>';
    $breadcrumbs .= '</ol>';

    return $breadcrumbs;
  }
}

function wsntheme_field($variables) {
  $output = '';

  // Render the label, if it's not hidden.
  if (!$variables['label_hidden']) {
    $output .= '<div ' . $variables['title_attributes'] . '>' . $variables['label'] . ':&nbsp;</div>';
  }

  // Edit module requires some extra wrappers to work.
  if (module_exists('edit')) {
    $output .= '<div class="field-items"' . $variables['content_attributes'] . '>';
    foreach ($variables['items'] as $delta => $item) {
      $classes = 'field-item ' . ($delta % 2 ? 'odd' : 'even');
      $output .= '<div class="' . $classes . '"' . $variables['item_attributes'][$delta] . '>' . drupal_render($item) . '</div>';
    }
    $output .= '</div>';
  }
  else {
    foreach ($variables['items'] as $item) {
      $output .= drupal_render($item);
    }
  }

  // Render the top-level DIV.
  $output = '<div class="' . $variables['classes'] . '"' . $variables['attributes'] . '>' . $output . '</div>';

  return $output;
}

/**
 * Implements theme_field__field_type().
 */
function wsntheme_field__taxonomy_term_reference($variables) {
  $output = '';

  // Render the label, if it's not hidden.
  if (!$variables['label_hidden']) {
    $output .= '<h2 class="field-label">' . $variables['label'] . ': </h2>';
  }

  // Render the items.
  $output .= ($variables['element']['#label_display'] == 'inline') ? '<ul class="links inline">' : '<ul class="links">';
  foreach ($variables['items'] as $delta => $item) {
    $output .= '<li class="taxonomy-term-reference-' . $delta . '"' . $variables['item_attributes'][$delta] . '>' . drupal_render($item) . '</li>';
  }
  $output .= '</ul>';

  // Render the top-level DIV.
  $output = '<div class="' . $variables['classes'] . (!in_array('clearfix', $variables['classes_array']) ? ' clearfix' : '') . '">' . $output . '</div>';

  return $output;
}

/**
 * Implements theme_links() targeting the main menu specifically.
 * Formats links for Top Bar http://foundation.zurb.com/docs/components/top-bar.html
 */
function wsntheme_links__topbar_main_menu($variables) {
  // We need to fetch the links ourselves because we need the entire tree.
  $links = menu_tree_output(menu_tree_all_data(variable_get('menu_main_links_source', 'main-menu')));
  $output = _wsntheme_links($links);
  $variables['attributes']['class'][] = 'left';

  return '<ul' . drupal_attributes($variables['attributes']) . '>' . $output . '</ul>';
}

/**
 * Implements theme_links() targeting the secondary menu specifically.
 * Formats links for Top Bar http://foundation.zurb.com/docs/components/top-bar.html
 */
function wsntheme_links__topbar_secondary_menu($variables) {
  // We need to fetch the links ourselves because we need the entire tree.
  $links = menu_tree_output(menu_tree_all_data(variable_get('menu_secondary_links_source', 'user-menu')));
  $output = _wsntheme_links($links);
  $variables['attributes']['class'][] = 'right';

  return '<ul' . drupal_attributes($variables['attributes']) . '>' . $output . '</ul>';
}

/**
 * Helper function to output a Drupal menu as a Foundation Top Bar.
 *
 * @param array
 *   An array of menu links.
 *
 * @return string
 *   A rendered list of links, with no <ul> or <ol> wrapper.
 *
 * @see wsntheme_links__system_main_menu()
 * @see wsntheme_links__system_secondary_menu()
 */
function _wsntheme_links($links) {
  $output = '';

  foreach (element_children($links) as $key) {
    $output .= _wsntheme_render_link($links[$key]);
  }

  return $output;
}

/**
 * Helper function to recursively render sub-menus.
 *
 * @param array
 *   An array of menu links.
 *
 * @return string
 *   A rendered list of links, with no <ul> or <ol> wrapper.
 *
 * @see _wsntheme_links()
 */
function _wsntheme_render_link($link) {
  $output = '';

  // This is a duplicate link that won't get the dropdown class and will only
  // show up in small-screen.
  $small_link = $link;

  if (!empty($link['#below'])) {
    $link['#attributes']['class'][] = 'has-dropdown';
  }

  // Render top level and make sure we have an actual link.
  if (!empty($link['#href'])) {
    $rendered_link = NULL;

    // Foundation offers some of the same functionality as Special Menu Items;
    // ie: Dividers and Labels in the top bar. So let's make sure that we
    // render them the Foundation way.
    if (module_exists('special_menu_items')) {
      if ($link['#href'] === '<nolink>') {
        $rendered_link = '<label>' . $link['#title'] . '</label>';
      }
      else if ($link['#href'] === '<separator>') {
        $link['#attributes']['class'][] = 'divider';
        $rendered_link = '';
      }
    }

    if (!isset($rendered_link)) {
      $rendered_link = theme('wsntheme_menu_link', array('link' => $link));
    }

    // Test for localization options and apply them if they exist.
    if (isset($link['#localized_options']['attributes']) && is_array($link['#localized_options']['attributes'])) {
      $link['#attributes'] = array_merge($link['#attributes'], $link['#localized_options']['attributes']);
    }
    $output .= '<li' . drupal_attributes($link['#attributes']) . '>' . $rendered_link;

    if (!empty($link['#below'])) {
      // Add repeated link under the dropdown for small-screen.
      $small_link['#attributes']['class'][] = 'show-for-small';
      $sub_menu = '<li' . drupal_attributes($small_link['#attributes']) . '>' . l($link['#title'], $link['#href'], $link['#localized_options']);

      // Build sub nav recursively.
      foreach ($link['#below'] as $sub_link) {
        if (!empty($sub_link['#href'])) {
          $sub_menu .= _wsntheme_render_link($sub_link);
        }
      }

      $output .= '<ul class="dropdown">' . $sub_menu . '</ul>';
    }

    $output .=  '</li>';
  }

  return $output;
}

/**
 * Theme function to render a single top bar menu link.
 */
function theme_wsntheme_menu_link($variables) {
  $link = $variables['link'];
  return l($link['#title'], $link['#href'], $link['#localized_options']);
}
/*
 * Implements hook_preprocess_block()
 */
function wsntheme_preprocess_block(&$variables) {
  // Convenience variable for block headers.
  $title_class = &$variables['title_attributes_array']['class'];

  // Generic block header class.
  $title_class[] = 'block-title';

  // In the header region visually hide block titles.
  if ($variables['block']->region == 'header') {
    $title_class[] = 'element-invisible';
  }

  // Add a unique class for each block for styling.
  $variables['classes_array'][] = $variables['block_html_id'];

  // Add classes based on region.
  switch ($variables['elements']['#block']->region) {
    // Clear blocks in this region
    case 'sidebar_first':
      $variables['classes_array'][] = 'clearfix';
      break;
    // Add a striping class & clear blocks in this region
    case 'sidebar_second':
      $variables['classes_array'][] = 'block-' . $variables['zebra'];
      $variables['classes_array'][] = 'clearfix';
      break;

    case 'header':
      $variables['classes_array'][] = 'header';
      break;

    default;
  }
  //agregamos sugerencias de plantilla por desdcripcion del bloque
  if($variables['block']->module ==='block'){
    // Fetch all results.
    $sql = "SELECT * FROM {block_custom} bc WHERE bc.bid = :bid";
    $result = db_query( $sql, array(':bid' => $variables['block']->delta));
    // Fetch next row as a stdClass object.
    $record = $result->fetchObject();
    $block_info =  trim(preg_replace('/[-]{2,}/', '_', preg_replace('/[^a-z0-9]+/', '_', strtolower($record->info))), '_');  
    $variables['theme_hook_suggestions'][] = 'block__' . $block_info; 
  }
}
/**
 * Implements template_preprocess_field().
 */
function wsntheme_preprocess_field(&$variables) {
  $variables['title_attributes_array']['class'][] = 'field-label';

  // Edit classes for taxonomy term reference fields.
  if ($variables['field_type_css'] == 'taxonomy-term-reference') {
    $variables['content_attributes_array']['class'][] = 'comma-separated';
  }
  // Convenience variables.
  $name = $variables['element']['#field_name'];
  $bundle = $variables['element']['#bundle'];
  $mode = $variables['element']['#view_mode'];

  $classes = &$variables['classes_array'];
  $title_classes = &$variables['title_attributes_array']['class'];
  $content_classes = &$variables['content_attributes_array']['class'];
  $item_classes = array();

  // Global field classes.
  $classes[] = 'field-wrapper';
  $content_classes[] = 'field-items';
  $item_classes[] = 'field-item';


  // Add specific classes to targeted fields.
  if(isset($field)) {
    switch ($mode) {
      // All teasers.
      case 'teaser':
        switch ($field) {
          // Teaser read more links.
          case 'node_link':
            $item_classes[] = 'more-link';
            break;
          // Teaser descriptions.
          case 'body':
          case 'field_description':
            $item_classes[] = 'description';
            break;
        }
        break;
    }
  }

  // Apply odd or even classes along with our custom classes to each item.
  foreach ($variables['items'] as $delta => $item) {
    $item_classes[] = $delta % 2 ? 'odd' : 'even';
    $variables['item_attributes_array'][$delta]['class'] = $item_classes;
  }

  // Add class to a specific fields across content types.
  switch ($variables['element']['#field_name']) {
    case 'body':
      $variables['classes_array'] = array('body');
      break;

    case 'field_summary':
      $variables['classes_array'][] = 'text-teaser';
      break;

    case 'field_link':
    case 'field_date':
      // Replace classes entirely, instead of adding extra.
      $variables['classes_array'] = array('text-content');
      break;

    case 'field_image':
      // Replace classes entirely, instead of adding extra.
      $variables['classes_array'] = array('image');
      break;

    default:
      break;
  }
  // Add classes to body based on content type and view mode.
  if ($variables['element']['#field_name'] == 'body') {

    // Add classes to Foobar content type.
    if ($variables['element']['#bundle'] == 'foobar') {
      $variables['classes_array'][] = 'text-secondary';
    }

    // Add classes to other content types with view mode 'teaser';
    elseif ($variables['element']['#view_mode'] == 'teaser') {
      $variables['classes_array'][] = 'text-secondary';
    }

    // The rest is text-content.
    else {
      $variables['classes_array'][] = 'field';
    }
  }


  //recuperamos solo el nombre del dominio, recurrimos a la variable site_mail ya que que site name puede contener más texto.
  preg_match("/@(\w+)\./",  variable_get('site_mail'), $matches);
  $sitename =$matches[1];
  // Add field--field-name--view-mode.tpl.php suggestions.
  $variables['theme_hook_suggestions'][] = 'field__' . $variables['element']['#field_name'] . '__'.$variables['element']['#view_mode'];   
  $variables['theme_hook_suggestions'][] = 'field__' . $variables['element']['#field_name'] . '__'.$variables['element']['#bundle'] . '__'.$variables['element']['#view_mode'];   
  $variables['theme_hook_suggestions'][] = 'field__' . $variables['element']['#field_name'] . '__'.$variables['element']['#bundle'] . '__'.$variables['element']['#view_mode'].'__'.$sitename;
}

/**
 * Implements template_preprocess_html().
 *
 * Adds additional classes.
 */
function wsntheme_preprocess_html(&$variables) {
  global $language;

  // Clean up the lang attributes
  $variables['html_attributes'] = 'lang="' . $language->language . '" dir="' . $language->dir . '"';

  // Add language body class.
  if (function_exists('locale')) {
    $variables['classes_array'][] = 'lang-' . $variables['language']->language;
  }

  
  // Classes for body element. Allows advanced theming based on context
  if (!$variables['is_front']) {

    // Add unique class for each page.
    $path = drupal_get_path_alias($_GET['q']);

    // Add unique class for each website section.
    list($section, ) = explode('/', $path, 2);
    $arg = explode('/', $_GET['q']);
    if ($arg[0] == 'node' && isset($arg[1])) {
      if ($arg[1] == 'add') {
        $section = 'node-add';
      }
      elseif (isset($arg[2]) && is_numeric($arg[1]) && ($arg[2] == 'edit' || $arg[2] == 'delete')) {
        $section = 'node-' . $arg[2];
      }
    }
    $variables['classes_array'][] = drupal_html_class('section-' . $section);
  }

  // Store the menu item since it has some useful information.
  $variables['menu_item'] = menu_get_item();
  if ($variables['menu_item']) {
    switch ($variables['menu_item']['page_callback']) {
      case 'views_page':
        $variables['classes_array'][] = 'views-page';
        break;
      case 'page_manager_page_execute':
      case 'page_manager_node_view':
      case 'page_manager_contact_site':
        $variables['classes_array'][] = 'panels-page';
        break;
    }
  }

    // Fetch a list of regions for the current theme.
    $all_regions = system_region_list('wsntheme');

    // Load all region content assigned via blocks.
    foreach (array_keys($all_regions) as $region) {
      // Assign blocks to region.
      if ($blocks = block_get_blocks_by_region($region)) {
        $variables[$region] = $blocks;
      }
    }


  //variable que apunta al tema.
  $variables['path_to_theme'] = '/'.drupal_get_path('theme', variable_get('theme_default', NULL));

  //node como variable
  $node = menu_get_object();
  $variables['node'] = $node;


  //añadimos sugerencias de plantillas para el nodo
  if ($node && $node->nid) {
    $variables['theme_hook_suggestions'][] = 'html__' . $node->type;
  }
  
  //Agregando iconos para la manzanita
  $apple_icon =  array('#tag' => 'link','#attributes' => array('href' => $variables['path_to_theme'].'/files/ios/apple-touch-icon.png','rel' => 'apple-touch-icon-precomposed',),);
  $apple_icon_sizes = array(57,72,76,114,120,144,152,180);
  foreach($apple_icon_sizes as $size){
    $apple = array(
      '#tag' => 'link',
      '#attributes' => array(
        'href' => $variables['path_to_theme'].'/files/ios/apple-touch-icon-'.$size.'x'.$size.'.png',
        'rel' => 'apple-touch-icon-precomposed',
        'sizes' => $size . 'x' . $size,
      ),
    );
    drupal_add_html_head($apple, 'apple-touch-icon-'.$size);
    $apple = array(
      '#tag' => 'link',
      '#attributes' => array(
        'href' => $variables['path_to_theme'].'/files/ios/apple-touch-icon-'.$size.'x'.$size.'-precomposed.png',
        'rel' => 'apple-touch-icon-precomposed',
        'sizes' => $size . 'x' . $size,
      ),
    );
    drupal_add_html_head($apple, 'apple-touch-icon-'.$size.'-precomposed');
  }


  
}

/**
 * Implements template_preprocess_node
 *
 * Add template suggestions and classes.
 */
function wsntheme_preprocess_node(&$variables) {
  // Add node--node_type--view_mode.tpl.php suggestions.
  $variables['theme_hook_suggestions'][] = 'node__' . $variables['type'] . '__' . $variables['view_mode'];
  $variables['theme_hook_suggestions'][] = $variables['type'] . '__' . $variables['nid'];

  // Add node--view_mode.tpl.php suggestions.
  $variables['theme_hook_suggestions'][] = 'node__' . $variables['view_mode'];
  // Add node--node_type__view_mode.tpl.php suggestions.
  $variables['theme_hook_suggestions'][] = 'node__' . $variables['node']->type . '__'.$variables['view_mode'];   


  // Add a class for the view mode.
  if (!$variables['teaser']) {
    $variables['classes_array'][] = 'view-mode-' . $variables['view_mode'];
  }

  $variables['title_attributes_array']['class'][] = 'node-title';

 //add var path_to_theme
 $variables['path_to_theme'] = '/'.drupal_get_path('theme', variable_get('theme_default', NULL));

}

/**
 * Implements template_preprocess_page
 *
 * Add convenience variables and template suggestions.
 */
function wsntheme_preprocess_page(&$variables) {
  // Add page--node_type.tpl.php suggestions
  if (!empty($variables['node'])) {
    $variables['theme_hook_suggestions'][] = 'page__' . $variables['node']->type;
  }

  $variables['logo_img'] = '';
  if (!empty($variables['logo'])) {
    $variables['logo_img'] = theme('image', array(
      'path'  => $variables['logo'],
      'alt'   => strip_tags($variables['site_name']) . ' ' . t('logo'),
      'title' => strip_tags($variables['site_name']) . ' ' . t('Home'),
      'attributes' => array(
        'class' => array('logo'),
      ),
    ));
  }

  $variables['linked_logo']  = '';
  if (!empty($variables['logo_img'])) {
    $variables['linked_logo'] = l($variables['logo_img'], '<front>', array(
      'attributes' => array(
        'rel'   => 'home',
        'title' => strip_tags($variables['site_name']) . ' ' . t('Home'),
      ),
      'html' => TRUE,
    ));
  }

  $variables['linked_site_name'] = '';
  if (!empty($variables['site_name'])) {
    $variables['linked_site_name'] = l($variables['site_name'], '<front>', array(
      'attributes' => array(
        'rel'   => 'home',
        'title' => strip_tags($variables['site_name']) . ' ' . t('Home'),
      ),
    ));
  }

  // Top bar.
  if ($variables['top_bar'] = theme_get_setting('wsntheme_top_bar_enable')) {
    $top_bar_classes = array();

    if (theme_get_setting('wsntheme_top_bar_grid')) {
      $top_bar_classes[] = 'contain-to-grid';
    }

    if (theme_get_setting('wsntheme_top_bar_sticky')) {
      $top_bar_classes[] = 'sticky';
    }

    if ($variables['top_bar'] == 2) {
      $top_bar_classes[] = 'show-for-small';
    }

    $variables['top_bar_classes'] = implode(' ', $top_bar_classes);
    $variables['top_bar_menu_text'] = theme_get_setting('wsntheme_top_bar_menu_text');

    $top_bar_options = array();

    if (!theme_get_setting('wsntheme_top_bar_custom_back_text')) {
      $top_bar_options[] = 'custom_back_text:false';
    }

    if ($back_text = theme_get_setting('wsntheme_top_bar_back_text')) {
      if ($back_text !== 'Back') {
        $top_bar_options[] = "back_text:'{$back_text}'";
      }
    }

    if (!theme_get_setting('wsntheme_top_bar_is_hover')) {
      $top_bar_options[] = 'is_hover:false';
    }

    if (!theme_get_setting('wsntheme_top_bar_scrolltop')) {
      $top_bar_options[] = 'scrolltop:false';
    }

    $variables['top_bar_options'] = ' data-options="' . implode('; ', $top_bar_options) . '"';
  }

  // Alternative header.
  // This is what will show up if the top bar is disabled or enabled only for
  // mobile.
  if ($variables['alt_header'] = ($variables['top_bar'] != 1)) {
    // Hide alt header on mobile if using top bar in mobile.
    $variables['alt_header_classes'] = $variables['top_bar'] == 2 ? ' hide-for-small' : '';
  }

  // Menus for alternative header.
  $variables['alt_main_menu'] = '';

  if (!empty($variables['main_menu'])) {
    $variables['alt_main_menu'] = theme('links__system_main_menu', array(
      'links' => $variables['main_menu'],
      'attributes' => array(
        'id' => 'main-menu-links',
        'class' => array('links', 'inline-list', 'clearfix'),
      ),
      'heading' => array(
        'text' => t('Main menu'),
        'level' => 'h2',
        'class' => array('element-invisible'),
      ),
    ));
  }

  $variables['alt_secondary_menu'] = '';

  if (!empty($variables['secondary_menu'])) {
    $variables['alt_secondary_menu'] = theme('links__system_secondary_menu', array(
      'links' => $variables['secondary_menu'],
      'attributes' => array(
        'id' => 'secondary-menu-links',
        'class' => array('links', 'clearfix'),
      ),
      'heading' => array(
        'text' => t('Secondary menu'),
        'level' => 'h2',
        'class' => array('element-invisible'),
      ),
    ));
  }

  // Top bar menus.
  $variables['top_bar_main_menu'] = '';
  if (!empty($variables['main_menu'])) {
    $variables['top_bar_main_menu'] = theme('links__topbar_main_menu', array(
      'links' => $variables['main_menu'],
      'attributes' => array(
        'id' => 'main-menu',
        'class' => array('main-nav'),
      ),
      'heading' => array(
        'text' => t('Main menu'),
        'level' => 'h2',
        'class' => array('element-invisible'),
      ),
    ));
  }

  $variables['top_bar_secondary_menu'] = '';
  if (!empty($variables['secondary_menu'])) {
    $variables['top_bar_secondary_menu'] = theme('links__topbar_secondary_menu', array(
      'links' => $variables['secondary_menu'],
      'attributes' => array(
        'id'    => 'secondary-menu',
        'class' => array('secondary', 'link-list'),
      ),
      'heading' => array(
        'text' => t('Secondary menu'),
        'level' => 'h2',
        'class' => array('element-invisible'),
      ),
    ));
  }

  // Messages in modal.
  $variables['wsntheme_messages_modal'] = theme_get_setting('wsntheme_messages_modal');

  // Convenience variables
  
  $left = isset($variables['page']['sidebar_first'])? $variables['page']['sidebar_first'] : '';
  $right =isset($variables['page']['sidebar_second'])? $variables['page']['sidebar_second'] : '';

  // Dynamic sidebars
  if (!empty($left) && !empty($right)) {
    $variables['main_grid'] = 'large-6 push-3';
    $variables['sidebar_first_grid'] = 'large-3 pull-6';
    $variables['sidebar_sec_grid'] = 'large-3';
  } elseif (empty($left) && !empty($right)) {
    $variables['main_grid'] = 'large-9';
    $variables['sidebar_first_grid'] = '';
    $variables['sidebar_sec_grid'] = 'large-3';
  } elseif (!empty($left) && empty($right)) {
    $variables['main_grid'] = 'large-9 push-3';
    $variables['sidebar_first_grid'] = 'large-3 pull-9';
    $variables['sidebar_sec_grid'] = '';
  } else {
    $variables['main_grid'] = 'large-12';
    $variables['sidebar_first_grid'] = '';
    $variables['sidebar_sec_grid'] = '';
  }

  //variable que apunta al tema.
  $variables['path_to_theme'] = '/'.drupal_get_path('theme', variable_get('theme_default', NULL));
  //si estamos en un tipo de contenido página lo marcamos
  if(isset($variables['node'])){
    if( $variables['node']->type === 'page' || $variables['node']->type === 'webform' ){
      $variables["is_page"] = 1;
    }
  }

}

/**
 * Implements hook_css_alter()
 */
function wsntheme_css_alter(&$css) {
  // Remove defaults.css file.
  unset($css[drupal_get_path('module', 'system') . '/system.menus.css']);

  // Remove Drupal core CSS.
  if (theme_get_setting('wsntheme_disable_core_css')) {
    foreach($css as $path => $values) {
      if(strpos($path, 'modules/') === 0) {
        unset($css[$path]);
      }
    }
  }
}

/**
 * Implements hook_js_alter()
 */
function wsntheme_js_alter(&$js) {
  // Display warning if jQuery Update not present.
  if (!module_exists('jquery_update')) {
    drupal_set_message(t('Incorrect jQuery version detected. wsntheme requires jQuery 1.7 or higher. Please install jQuery Update.'), 'error', FALSE);
  }
  // If it is present, check for correct jQuery version.
  else {
    $jquery_version = variable_get('jquery_update_jquery_version', '1.5');

    if (!version_compare($jquery_version, '1.7', '>=')) {
      drupal_set_message(t('Incorrect jQuery version detected. wsntheme requires jQuery 1.7 or higher. Please change your <a href="!settings">jQuery Update settings</a>.', array('!settings' => url('admin/config/development/jquery_update'))), 'error', FALSE);
    }
  }

  // Make summary always expanded for field of "Long text and summary" type.
  $js_path = drupal_get_path('module', 'text') . '/text.js';

  if (isset($javascript[$js_path])) {
    unset($javascript[$js_path]);
  }

  // @TODO moving scripts to footer possibly remove?
  // foreach ($js as $key => $js_script) {
  //   $js[$key]['scope'] = 'footer';
  // }
}



/**
 * Implements hook_theme().
 */
function wsntheme_theme() {
  $return = array();

  $return['wsntheme_reveal'] = array(
    'variables' => array(
      // The text to display in the link.
      'text' => '',
      // Whether the text uses HTML.
      'html' => FALSE,
      // Whether the reveal uses AJAX content.
      // This can either be set to true, to use the link's href property or be
      // a URL to load the content from. Note that setting this parameter will
      // override the contents of the "reveal" variable.
      'ajax' => FALSE,
      // The path for the link's href property. This is only really useful if
      // you want to set 'ajax' to TRUE (see above).
      'path' => FALSE,
      // The content for the reveal modal. Can be either a string or a render
      // array.
      'reveal' => '',
      // Extra classes to add to the link.
      'link_classes_array' => array('zurb-foundation-reveal'),
      // Extra classes to add to the reveal modal.
      'reveal_classes_array' => array('expand'),
    ),
    'function' => 'theme_wsntheme_reveal',
  );

  $return['wsntheme_menu_link'] = array(
    'variables' => array('link' => NULL),
    'function' => 'theme_wsntheme_menu_link',
  );
  return $return;
}






function wsntheme_image_formatter($variables) {
  $item = $variables['item'];
  $image = array(
    'path' => $item['uri'],
  );

  if (array_key_exists('alt', $item)) {
    $image['alt'] = $item['alt'];
  }

  if (isset($item['attributes'])) {
    $image['attributes'] = $item['attributes'];
  }
  $img_orientation = 'media-o-h';
  if($item['height'] > $item['width']) {
    $img_orientation = 'media-o-v';
  }
  if (isset($item['attributes'])) {
    $item['attributes']['class'] = $item['attributes']['class'].' '.$img_orientation;
  } else {
     $item['attributes']['class'] = $img_orientation;
  }
  $image['attributes']['class'] = $item['attributes']['class'] ;


  if (isset($item['width']) && isset($item['height'])) {
    $image['width'] = $item['width'];
    $image['height'] = $item['height'];
  }

  // Do not output an empty 'title' attribute.
  if (isset($item['title']) && drupal_strlen($item['title']) > 0) {
    $image['title'] = $item['title'];
  }

  if ($variables['image_style']) {
    $image['style_name'] = $variables['image_style'];
    $output = theme('image_style', $image);
  }
  else {
    $output = theme('image', $image);
  }

  // The link path and link options are both optional, but for the options to be
  // processed, the link path must at least be an empty string.
  if (isset($variables['path']['path'])) {
    $path = $variables['path']['path'];
    $options = isset($variables['path']['options']) ? $variables['path']['options'] : array();
    // When displaying an image inside a link, the html option must be TRUE.
    $options['html'] = TRUE;
    $output = l($output, $path, $options);
  }

  return $output;
} 

function wsntheme_preprocess_views_view(&$vars) {
  $vars['path_to_theme'] = '/'.drupal_get_path('theme', variable_get('theme_default', NULL));
}



