<?php
/**
 * Created by PhpStorm.
 * User: edd
 * Date: 9/26/18
 * Time: 9:37 AM
 */
require_once dirname(__FILE__).'/elements.php';

class redirectImages
{
    public function redirect($dir = null) {
    $elements = new elements();
    $imagesDir = $elements->arrayElements();   
    $newRedirect = 'sites/default/files/image-default-content.jpg';
        $index=0;
        foreach($imagesDir as $dir){
            echo $index ." - " . $dir."\n";
            $file = explode('/', $dir);
            $filename = end($file);
            $dir_ = DRUPAL_ROOT."/sites/default";
            $requested_url= 'sites'.$dir;

        if(!redirect_load_by_source($requested_url)) {          
            $redirect = new stdClass();
            $redirect->source = $requested_url;      
            $redirect->source_options = array();
            $redirect->redirect = $newRedirect;         
            $redirect->redirect_options = array();
            $redirect->status_code = 0;             
            $redirect->type = 'redirect';
            $redirect->language = LANGUAGE_NONE;
            $result = redirect_save($redirect);

            $files =  file_scan_directory($dir_, '/'.$filename.'/');   
            foreach($files as $file){
                $dir = $file->uri;                
                $redir = rename($dir, $dir.'_old');
                }
            }
           $index++; 
        }    
      return $result;
    }

    public function getSourceByFile($file)
    {
        $result = db_select('file_managed', 'n')
            ->fields('n', array('fid', 'filename','uri'))
            ->condition('uri', '%'.$file.'%','like')
            ->execute()
            ->fetchAssoc();
        return $result;
    }

}

