<?php

/**
 * @file
 * Default simple view template to display a list of rows.
 *
 * @ingroup views_templates
 */
?>


<table class="margin_block" style="margin-bottom:15px">
    <thead>
        <tr>
        <th>Bookmaker</th>
        <th class="th_resp">Bonus</th>
        <th>Bonuskode</th>
    </tr>
    </thead>
    <tbody>

    <?php foreach ($rows as $id => $row): ?><?php print $row; ?><?php endforeach; ?>

    </tbody>
</table>
