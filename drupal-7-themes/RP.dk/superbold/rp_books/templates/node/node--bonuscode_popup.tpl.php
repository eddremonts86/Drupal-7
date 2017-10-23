<?php
/**
 * Created by PhpStorm.
 * User: edd
 * Date: 11/29/16
 * Time: 2:22 PM
 *
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
//dpm($variables);
?>

<main class="review redirect" >
    <section class="hero">
    <div class="hero-inner">
        <article class="hero-item box">
            <div class="title">
                <?php echo $node->title ?>
            </div>
            <div class="img">
                <img src="https://www.superbold.dk/sites/default/files/styles/thumbnail/public/<?php echo $node->field_provider_img['und'][0]['filename']; ?>" width="100" height="100" alt="">
            </div>
            <div class="body">
                <?php echo $node->body['und'][0]['value'] ?>
                <div class="buttom">
                    <a class="btn btn-default" target="_blank" href="<?php echo $node->field_bonus_url['und'][0]['value']; ?>"><?php echo $node->field_bonus_code['und'][0]['value']; ?></a>
                </div>
            </div>
            <div class="load-bar">
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
            </div>
        </article>
    </div>
</section>
</main>

<script>
   var  mivarJS = "<?php echo $node->field_bonus_url['und'][0]['value']; ?>";
   setTimeout("location.href = mivarJS",5000)
</script>

