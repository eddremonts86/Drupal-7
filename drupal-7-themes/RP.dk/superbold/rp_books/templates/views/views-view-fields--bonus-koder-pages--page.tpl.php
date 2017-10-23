<?php
/**
 * Created by PhpStorm.
 * User: edd
 * Date: 1/17/17
 * Time: 1:13 PM
 * /**
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
?>


    <div class="row adw_list">

            <div class="col-md-4 col-xs-5 adw_list_first">
               <a href="<?php echo($fields['field_aff_link__1']->content); ?>">
                <?php print render($fields['field_aflp_logo']->content); ?>
               </a>
            </div>

            <div class="col-md-4 col-xs-4 adw_list_center">
                <?php print render($fields['body']->content); ?>
            </div>

            <div class="col-md-4 col-xs-12 adw_list_last">

                <div style="min-width: 100%"><span class="inline">KODE: </span><?php print render($fields['field_kode']->content); ?></div>
                <?php //print render($fields['field_aff_link_']->content); ?>

                <a class="cta_btn_adw" href="<?php echo($fields['field_aff_link__1']->content); ?>">→ AKTIVÉR BONUSKODE HER</a>
            </div>

    </div>