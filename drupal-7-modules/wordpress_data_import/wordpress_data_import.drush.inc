
<?php
require_once dirname(__FILE__).'/src/includes/importdatawordpress.php';
/**
 * @file
 * Drush integration for the redirect module.
 */

/**
 * Implements hook_drush_command().
 */
function wordpress_data_import_drush_command() {
  $items = array();
  $items['WDI_wordpressImport'] = array(
    'description' => 'Demonstrate how Drush commands work.',
    'callback' => 'drush_IDFWpres',
    'aliases' => array('wordpressImport'));

  $items['WDI_clearMetadata'] = array(
    'description' => 'Demonstrate how Drush commands work.',
    'callback' => 'drush_CHUrl',
    'aliases' => array('clearMetadata'));

  $items['WDI_delete'] = array(
    'description' => 'Demonstrate how Drush commands work.',
    'callback' => 'drush_delete',
    'aliases' => array('deleteOldArticles'));


  return $items;
}

/**
 * Command callback.
 */
function drush_IDFWpres() {
  $obj = new importdatawordpress();
  $obj->getPost();
}

function drush_CHUrl() {
  $obj = new importdatawordpress();
  $obj->getNodebyExpresion();
}

function drush_delete() {
  $obj = new importdatawordpress();
  $obj->deleteNodesByType();
}

