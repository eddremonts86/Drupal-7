<?php
/**
 * Created by PhpStorm.
 * User: edd
 * Date: 4/27/17
 * Time: 9:51 AM
 */
/**
 * @file
 * Admin page callbacks for the Admin Tools module.
 */
/**
 * Menu callback for the Admin Tools module to display its administration
 */

require_once dirname(__FILE__).'/importdatawordpress.php';

function wordpress_data_import_form($form, &$form_state) {
  $form = array('#attributes' => array('enctype' => 'multipart/form-data'));
  $form['submit_button'] = array(
    '#type' => 'submit',
    '#value' => t('Import Data from WordPress!'),
  );
  return $form;
}

function wordpress_data_import_form_submit($form, &$form_state) {
  $IMP = new importdatawordpress();
  $success =   $IMP->getPost();
  if($success){drupal_set_message(t('Form Submitted Successfully'), 'status', TRUE);}
  else{ drupal_set_message(t('An error occurred and processing did not complete.'), 'error');}
  return TRUE;
}

