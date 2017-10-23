<?php

foreach ($rows as $id => $row): ?>
    <div class="row">
        <div class="col-xs-12">
            <div class="thumbnail">
                <div class="caption">
                    <?php print $row; ?>
                </div>
            </div>
        </div>
    </div>
<?php endforeach; ?>
