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

$title = $fields['title']->raw;
$summary = strip_tags($fields['body']->content);
$logo = $fields['field_logo']->content;
$link_affiliate = $fields['field_affiliate_link']->content;
$link_node = url(drupal_get_path_alias('node/'.$fields['nid']->content));
  if (geoip_country_code() == 'FR' && $title =='Unibet') {
      $link_affiliate = $fields['field_fr_affiliate_link']->content; ;
    }
 ?>


 <article class="bookmarkers">
    <header>
      <figure>
        <a target="_blank" rel="nofollow" href="<?php echo $link_affiliate  ?>"><?php echo $logo; ?></a>
      </figure>
    </header>
    <main>
      <h2>
        <a target="_blank" rel="nofollow" href="<?php echo $link_affiliate  ?>"><?php echo $summary; ?></a>
      </h2>
      <div class="options">
        <a href="<?php echo $link_node; ?>">Read review</a>
        <a target="_blank" rel="nofollow" role="button" href="<?php echo $link_affiliate  ?>" class="btn btn-default">Play</a>
      </div>
    </main>
  </article>
