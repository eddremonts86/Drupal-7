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

function wordpress_data_import_settings($form, $form_state) {}
function wordpress_data_import_form($form, &$form_state) {
  $IMP = new importdatawordpress();
  $IMP->getPost();
  //$IMP->getImgPost();

  /*
  $form['url_api'] = array(
    '#type' => 'textfield', //you can find a list of available types in the form api
    '#title' => 'API URL - ( " http://www.mesterbold.dk/Scripts/download.articles.php " )',
    '#size' => 30,
    '#maxlength' => 255,
  );
  $form['vocavulay'] = array(
    '#type' => 'textfield', //you can find a list of available types in the form api
    '#title' => 'Vocavolary to import the new categories. ( " nyheder " )',
    '#size' => 30,
    '#maxlength' => 25,
    '#required' => false, //make this field required
  );
  $form['type'] = array(
    '#title' => t('Content Type'),
    '#type' => 'select',
    '#description' => "Select the count type.",
    '#options' => $IMP->getAllNodesType(),
  );
  $form['delete'] = array(
    '#title' => t('Delete actual content ?'),
    '#type' => 'checkboxes',
    '#description' => t('You want delete all content (all nodes) of this conten type .'),
    '#options' => array(
      'delete' => t('Delete all.'),
    ),
  );
  $form['submit_button'] = array(
    '#type' => 'submit',
    '#value' => t('Save Data!'),
  );*/

  return $form;
}
function wordpress_data_import_form_validate($form, &$form_state) {

}
function wordpress_data_import_form_submit($form, &$form_state) {
  $IMP = new  importadatarige();
  $vocabulary = $form_state['values']['vocavulay'];
  $url = $form_state['values']['url_api'];
  $delete = $form_state['values']['delete'];
  $type = $form_state['values']['type'];
  //---------------------------------------------------Start - C Type - Articles  ---------------------------------//
  if($type == 'article'){
    if(!$url){
      $url = $_SERVER['DOCUMENT_ROOT'].'/sites/all/modules/custom/importdatarige/src/includes/download.articles.json';
      $data = $IMP->getLocalJson($url);
    }
    else{ $data = $IMP->apiConect($url); }
    if(!$data){ drupal_set_message(t('No data.'), 'error'); }
    /*
          if($data and $delete == 'delete' ){
          $IMP->deleteNodesbyType($type); }*/
    $succese =  $IMP->importData($data,$vocabulary,$type);
  }
  else{$succese = false;}
  //---------------------------------------------------End - C Type - Articles  ---------------------------------//

  if($succese){
    drupal_set_message(t('Form Submitted Successfully'), 'status', TRUE);
  }
  else{
    drupal_set_message(t('An error occurred and processing did not complete.'), 'error');
  }

}

