 <?php 
 /**
 * @file
 * Default simple view template to all the fields as a row.
 *
 * - $view: The view in use.
 * - $fields: an array of $field objects. Each one contains:
 *   - $field->content: The output of the field.
 *   - $field->raw: The raw data for the field, if it exists. This is NOT output safe.
 *   - $field->class: The safe class id to use.
 *   - $field->handler: The Views field handler object controlling this field. Do not use
 *     var_export to dump this object, as it can't handle the recursion.
 *   - $field->inline: Whether or not the field should be inline.
 *   - $field->inline_html: either div or span based on the above flag.
 *   - $field->wrapper_prefix: A complete wrapper containing the inline_html to use.
 *   - $field->wrapper_suffix: The closing tag for the wrapper.
 *   - $field->separator: an optional separator that may appear before a field.
 *   - $field->label: The wrap label text to use.
 *   - $field->label_html: The full HTML of the label to use including
 *     configured element type.
 * - $row: The raw result object from the query, with all data it fetched.
 *
 * @ingroup views_templates
 */

//krumo($fields);
$title = $fields['title']->raw;
$image = $fields['field_image']->content;
$summary = strip_tags($fields['body']->content,'<a>,<strong>');
$type_node = $fields['type']->raw;
$sec_label ='';
if($type_node =='news' || $type_node =='article' ){
  $type_node = 'NYHETER';
  $sec_label ='sec-news';
} else if($type_node =='tip'){
  $type_node = 'Tip';
  $sec_label ='sec-tips';
} else if($type_node =='post'){
  $type_node = 'Blog';
  $sec_label ='sec-blog';
}

$class_sponsor='';
if(isset($fields['field_active']) && $fields['field_active']->content =='Yes'){
  $sponsor_active = $fields['field_active']->content;
  $sponsor_image = $fields['field_sponsor_image']->content;
  $sponsor_link =  $fields['field_sponsor_link']->content;
  $sponsor_color =  $fields['field_sponsor_color']->content;
  $class_sponsor ='sp';
}

$date = $fields['created']->content;
$link_node = url(drupal_get_path_alias('node/'.$fields['nid']->content));
?>
<article>
  <div>
      <div class="thumbnail">
          <a href="<?php echo $link_node; ?>">
           <?php echo $image ?>
          </a>
      </div>
      <div class="caption <?php echo  $class_sponsor ?>">
        <div class="label label-default <?php echo  $sec_label; ?>"><?php echo wsn_get_type_text( $type_node); ?></div>
        <h4>
          <a href="<?php echo $link_node; ?>"><?php echo $title; ?></a>
        </h4>
        <?php if(isset($fields['field_active']) && $fields['field_active']->content =='Yes'){?>
          <strong class="sp b3"><em style="color: <?php echo $sponsor_color ?>">Sponsored by </em>
            <a href="<?php echo $sponsor_link ?>" target="_blank" rel="nofollow">
              <?php echo $sponsor_image ?>
            </a>
            <span style="background-color: <?php echo $sponsor_color ?>"></span>
          </strong>
        <?php } ?>
        <p><?php //echo $summary; ?></p>
        <time><?php //echo $date; ?></time>
      </div>
</div>
</article>