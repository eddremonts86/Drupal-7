
<?php

require_once dirname(__FILE__).'/src/includes/redirectImages.php';
/**
 * @file
 * Drush integration for the redirect module.
 */

/**
 * Implements hook_drush_command().
 */
function redirect_mass_images_drush_command() {
    $items = array();
    $items['redirect_mass_images_images'] = array(
        'description' => 'Demonstrate how Drush commands work.',
        'callback' => 'drush_IDFimages',
        'aliases' => array('images'));
    return $items;
}

/**
 * Command callback.
 */
function drush_IDFimages() {
    $obj = new redirectImages();
    $obj->redirect();
    return true;
}
