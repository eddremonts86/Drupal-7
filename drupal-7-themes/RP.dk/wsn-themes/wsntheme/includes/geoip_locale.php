<?php

    define('DRUPAL_ROOT', $_SERVER['DOCUMENT_ROOT']);
    $base_url = 'http://' . $_SERVER['HTTP_HOST'];
    require_once DRUPAL_ROOT . '/includes/bootstrap.inc';
    drupal_bootstrap(DRUPAL_BOOTSTRAP_FULL);
    $country = $_SERVER['GEOIP_COUNTRY_CODE'];
   /* echo "<!--  $country " . print_r($_SERVER) . " -->";*/
    $head='';
    $result = db_query("
                SELECT
                    node . title AS node_title,
                    node . nid AS nid,
                    field_data_eq_node . delta AS field_data_eq_node_delta,
                    'node' AS field_data_field_logo_node_entity_type,
                    'node' AS field_data_field_affiliate_link_node_entity_type,
                    'node' AS field_data_field_rating_node_entity_type,
                    'node' AS field_data_field_country_node_entity_type,
                    'node' AS field_data_field_fr_affiliate_link_node_entity_type            
                FROM
                    {node} node            
                INNER JOIN {field_data_eq_node} 
                    field_data_eq_node ON node . nid = field_data_eq_node . eq_node_target_id  AND  field_data_eq_node . entity_type = 'entityqueue_subqueue'
                INNER JOIN {entityqueue_subqueue} 
                    eq_node_node ON field_data_eq_node . entity_id = eq_node_node . subqueue_id                
                WHERE(((node . status = '1') AND (node . type IN('bookmaker')) ))            
                ORDER BY field_data_eq_node_delta ASC")->fetchAll();
    $node_array;
    $indesx = 0;
    foreach ($result as $r) {
        $node = node_load($r->nid);
        $node_array[$indesx]['title'] = $node->title;
        $node_array[$indesx]['nid'] = $node->nid;
        $node_array[$indesx]['url_alias'] = url(drupal_get_path_alias('node/' . $node->nid));
        $node_array[$indesx]['aff_fr'] = $node->field_fr_affiliate_link['und'][0]['value'];
        $node_array[$indesx]['aff_dk'] = $node->field_affiliate_link['und'][0]['value'];
        $node_array[$indesx]['logo'] = $node->field_logo['und'][0]['filename'];
        $indesx++;
    }

    if($country == 'FR'){$head = '<header class="geoip_ayax"><h2>Top Bookmakers Sponsored<img style="border-radius:100% " alt="Unibet" src="/sites/all/themes/wsntheme/files/img/france-flag.png" width="16" height="16"></h2></header><main><ul>';}
    else{$head = '<header class="geoip_ayax"><h2>Top Bookmakers Sponsored</h2></header><main><ul>';}
    $foot = '</ul></main>';
    $body = '';
    foreach ($node_array as $node) {
        if($country == 'FR' && $node['aff_fr'] != '' && $node['aff_fr'] != null ){
            $body .= '<li class="view-empty-rols">
                <div class="book_se">
                <a href="' . $node['aff_fr'] . '"><img class="media-o-h" src="https://www.wsn.com/sites/default/files/styles/bookmaker_min/public/' . $node['logo'] . '?itok=LbPDxD_n" width="65" height="35" alt="' . $node['logo'] . '"></a>
                <strong><a href="' . $node['aff_fr'] . '">' . $node['title'] . '</a></strong>
                <a href="' . $node['aff_fr'] . '" target="_blank" rel="nofollow" role="button" class="btn_boock btn btn-default">Bet now</a>
                </div>
            </li>';
            continue;
        }

        if($country == 'DK' && $node['aff_dk'] != '' && $node['aff_dk'] != null ){
            $body .= '<li class="view-empty-rols">
                <div class="book_se">
                <a href="' . $node['url_alias'] . '">
                <img class="media-o-h" src="https://www.wsn.com/sites/default/files/styles/bookmaker_min/public/' . $node['logo'] . '?itok=LbPDxD_n" width="65" height="35" alt="' . $node['logo'] . '"></a>
                <strong><a href="' . $node['url_alias'] . '">' . $node['title'] . '</a></strong>
                <a href="' . $node['aff_dk'] . '" target="_blank" rel="nofollow" role="button" class="btn_boock btn btn-default">Bet now</a>
                </div>
            </li>';
            continue;
        }
        if($country != 'DK' && $country != 'FR' ){
            $body .= '<li class="view-empty-rols">
                <div class="book_se">
                <a href="' . $node['url_alias'] . '">
                <img class="media-o-h" src="https://www.wsn.com/sites/default/files/styles/bookmaker_min/public/' . $node['logo'] . '?itok=LbPDxD_n" width="65" height="35" alt="' . $node['logo'] . '"></a>
                <strong><a href="' . $node['url_alias'] . '">' . $node['title'] . '</a></strong>
                <a href="' . $node['aff_dk'] . '" target="_blank" rel="nofollow" role="button" class="btn_boock btn btn-default">Bet now</a>
                </div>
            </li>';
            continue;
        }
    }
    if ($country == 'FR') {
        $body .= ' <li>
                    <div class="book_se">
                        <a target="_blank" rel="nofollow" href="https://banners.livepartners.com/click.php?z=37885"><img src="/sites/all/themes/wsntheme/files/img/netbet.png"/></a>
                        <strong><a target="_blank" rel="nofollow" href="https://banners.livepartners.com/click.php?z=37885">Netbet</a></strong>
                        <a href="https://banners.livepartners.com/click.php?z=37885" target="_blank" rel="nofollow" role="button" class="btn_boock btn btn-default">Bet now</a>
                    </div>
                </li>';
    }

    $result_ = $head . $body . $foot;
    header('Content-type: application/json; charset=utf-8');
    echo json_encode($result_);
    exit();
?>
