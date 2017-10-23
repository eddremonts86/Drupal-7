<?php

$field_title = $row->node_title;
$field_nid = $row->nid;
$field_url = "node/" . $field_nid;
$path_alias = drupal_get_path_alias($field_url);
$url = request_uri();
$class = 'none';
if ($url == '/' . $path_alias . '?amp' or $url == '/' . $path_alias . '?amp=' or $url == '/' . $path_alias) {
    $class = 'active';
}
?>
<a href="<?php echo $path_alias.'?amp'; ?>" class="<?php echo $class; ?>">
    <span>
        <?php echo $field_title; ?>
    </span>
</a>
 