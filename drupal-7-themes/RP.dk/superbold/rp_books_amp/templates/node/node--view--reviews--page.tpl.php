<?php
/**
 * @file
 * Theme implementation to display a node.
 *
 * Available variables:
 * - $title: the (sanitized) title of the node.
 * - $content: Node body or teaser depending on $teaser flag.
 * - $picture: The authors picture of the node output from
 *   theme_user_picture().
 * - $date: Formatted creation date (use $created to reformat with
 *   format_date()).
 * - $links: Themed links like "Read more", "Add new comment", etc. output
 *   from theme_links().
 * - $name: Themed username of node author output from theme_username().
 * - $node_url: Direct url of the current node.
 * - $terms: the themed list of taxonomy term links output from theme_links().
 * - $submitted: themed submission information output from
 *   theme_node_submitted().
 *
 * Other variables:
 * - $node: Full node object. Contains data that may not be safe.
 * - $type: Node type, i.e. story, page, blog, etc.
 * - $comment_count: Number of comments attached to the node.
 * - $uid: User ID of the node author.
 * - $created: Time the node was published formatted in Unix timestamp.
 * - $zebra: Outputs either "even" or "odd". Useful for zebra striping in
 *   teaser listings.
 * - $id: Position of the node. Increments each time it's output.
 *
 * Node status variables:
 * - $teaser: Flag for the teaser state.
 * - $page: Flag for the full page state.
 * - $promote: Flag for front page promotion state.
 * - $sticky: Flags for sticky post setting.
 * - $status: Flag for published status.
 * - $comment: State of comment settings for the node.
 * - $readmore: Flags true if the teaser content of the node cannot hold the
 *   main body content.
 * - $is_front: Flags true when presented in the front page.
 * - $logged_in: Flags true when the current user is a logged-in member.
 * - $is_admin: Flags true when the current user is an administrator.
 *
 * @see template_preprocess()
 * @see template_preprocess_node()
 */
$img_url = $node->field_image['und'][0]['uri'];
if(@$_SESSION["site_type"]=='adwords'){
    @$img_url_img = $node->field_affiliate_link_adwords['und'][0]['url'];
}
else if(@$_SESSION["site_type"]=='ppc'){
    @$img_url_img = $node->field_affiliate_link_ppc['und'][0]['url'];
}
else{
    @$img_url_img = $node->field_affiliate_link_1['und'][0]['url'];
}
?>
<article class="reviews-item">
    <div class="reviews-figure col-md-3 col-lg-3 ">
        <a href="<?php print $img_url_img ?>">
            <amp-img layout="fixed"  alt="img" src="<?php print image_style_url("square_400", $img_url) ?>" width="320" height="256"></amp-img>
        </a>
        <ul>
            <li class="bonus">
                <?php print render($content['field_feature_top']) ?>
            </li>
        </ul>
    </div>
    <div class="reviews-body col-md-8 col-lg-8">
        <header>
            <h2 class="reviews-item-title"><?php print $title ?></h2>
            <span class="reviews-item-rating"><?php print render($content['field_review_points']) ?></span>
        </header>
        <p>
         <?php print render($content['field_summary']) ?>
        </p>
        <?php
        if(@$_SESSION["site_type"]=='adwords'){
            print render($content['field_affiliate_link_adwords']);
        }
        else if(@$_SESSION["site_type"]=='ppc'){
            print render($content['field_affiliate_link_ppc']);
        }
        else{
            print render($content['field_affiliate_link_1']);
        }
        ?>
        <a  class="button" href="<?php print $node_url.'?amp' ?>"><?php print t("Få "). $title . t(" bonuskode"); ?></a>
    </div>
</article>
