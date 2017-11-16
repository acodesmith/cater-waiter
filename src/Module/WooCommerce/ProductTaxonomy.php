<?php


namespace CaterWaiter\Module\WooCommerce;


class ProductTaxonomy
{
    const CATERING_CATEGORY_NAMESPACE = 'catering_category';

    public function __construct()
    {
        add_action( 'init', [ $this, 'register_taxonomy' ] );
    }

    public function register_taxonomy()
    {

        $labels = array(
            'name' => 'Catering Categories',
            'singular_name' => 'Catering Category',
            'menu_name' => 'Catering Category',
            'all_items' => 'All Catering Categories',
            'parent_item' => 'Parent Catering Category',
            'parent_item_colon' => 'Parent Catering Category:',
            'new_item_name' => 'New Catering Category Name',
            'add_new_item' => 'Add Catering Category Item',
            'edit_item' => 'Edit Catering Category',
            'update_item' => 'Update Catering Category',
            'separate_items_with_commas' => 'Separate Catering Category with commas',
            'search_items' => 'Search Catering Categories',
            'add_or_remove_items' => 'Add or remove Catering Categories',
            'choose_from_most_used' => 'Choose from the most used Catering Categories',
        );
        $args = array(
            'labels' => $labels,
            'hierarchical' => false,
            'public' => true,
            'show_ui' => true,
            'show_admin_column' => true,
            'show_in_nav_menus' => true,
            'show_tagcloud' => true,
        );

        register_taxonomy( self::CATERING_CATEGORY_NAMESPACE, 'product', $args );
        register_taxonomy_for_object_type( self::CATERING_CATEGORY_NAMESPACE, 'product' );
    }
}