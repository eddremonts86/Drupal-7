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
$field_image = $fields['field_image']->content;
$field_bonus_code = $fields['field_bonus_code']->content;
$field_bonus_info_ = $fields['field_bonus_info_']->content;
$field_bet_button = $fields['field_bet_button']->content;
?>

<!--<tr>
    <td>
         <?php /*echo $field_image; */?>
    </td>
    <td>
        <?php /*echo $field_bonus_info_ */?>
    </td>
    <td>
        <a href="<?php /*echo $field_bet_button; */?>" target="_blank" rel="nofollow" class="btn  btn-primary" style="min-width: 100px"><?php /*echo $field_bonus_code */?></a>
    </td>
</tr>-->


<img src="http://lorempixel.com/400/400/cats/"/>
<div class="hero-item-body">
    <header>
        <span class="hero-item-title">Bet365</span>
        <span class="hero-item-rating">9/10</span>
    </header>
    <ul>
        <li class="bonus">
            <strong>£200</strong> DEPOSIT bonus
        </li>
        <li>BET365 Mobile App</li>
        <li>Safe & Secure</li>
        <li>Licensed in the UK</li>
    </ul>
    <p>
        Bet365 is widely held as the world's best in-play betting sportsbook and in many ways has
        revolutionized the technology. Bet365 is a publicly traded sportsbook and online betting site
        which also has an excellent mobile platform.
    </p>
    <a href="#" class="button">Bet Now</a>
    <a href="#">Læs Anmeldelse</a>
</div>






