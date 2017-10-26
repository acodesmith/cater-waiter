<?php
/**
 * The main template file.
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists.
 * Learn more: http://codex.wordpress.org/Template_Hierarchy
 *
 * @package storefront
 */

do_action( 'cater_waiter_template_before_header' );

get_header();
?>

    <div id="primary" class="content-area">
        <main id="main" class="site-main" role="main">
            <?php do_action( 'cater_waiter_template_before_content' ); ?>

            <h1>Get Started with your online catering order!</h1>

            <div class="cater_waiter_template_content cater_waiter_online_order">
                <div class="step_one">
                    <h3><strong>Step One</strong> Select your order type:</h3>
                    <button>
                        Pick Up
                    </button>
                    <button>
                        Delivery
                    </button>
                </div>
                <div class="step_two">
                    <h3><strong>Step Two</strong> Enter Your Location:</h3>
                    <button>
                        Pick Up
                    </button>
                    <button>
                        Delivery
                    </button>
                </div>
            </div>

            <?php do_action( 'cater_waiter_template_after_content' ); ?>
        </main><!-- #main -->
    </div><!-- #primary -->

<?php

do_action( 'cater_waiter_template_before_footer' );

get_footer();
