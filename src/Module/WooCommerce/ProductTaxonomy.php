<?php


namespace CaterWaiter\Module\WooCommerce;


class ProductTaxonomy
{
	const CATERING_CATEGORY_NAMESPACE = 'catering_category';

	const CATERING_CATEGORY_ORDER_NAMESPACE = 'catering_menu_order';

	const CATERING_CATEGORY_DISPLAY_NAME_NAMESPACE = 'catering_display_menu_name';

	public static $_terms = [];

	public function __construct()
    {
		add_action( 'init', [ $this, 'register_taxonomy' ] );
		add_action( 'init', [ $this, 'register_term_meta' ] );

	    add_action( self::CATERING_CATEGORY_NAMESPACE . '_add_form_fields', [ $this, 'add_form_field_term_meta_text' ], 100 );
	    add_action( self::CATERING_CATEGORY_NAMESPACE . '_edit_form_fields', [ $this, 'add_form_field_term_meta_text' ], 100, 1 );

        add_action( 'create_' . self::CATERING_CATEGORY_NAMESPACE, [ $this, 'save_tax_field' ] );
        add_action( 'edited_' . self::CATERING_CATEGORY_NAMESPACE, [ $this, 'save_tax_field' ] );
	}

	/**
	 * @return array|int|\WP_Error
	 */
	public static function get_terms()
    {
        if( empty( self::$_terms ) ){

	        self::$_terms = get_terms( [
		        'taxonomy' =>  self::CATERING_CATEGORY_NAMESPACE,
		        'orderby' =>  'meta_value_num',
		        'order' =>  'ASC',
		        'hierarchical' =>  false,
		        'parent' =>  0,
		        'meta_query' => [[
			        'key' => self::CATERING_CATEGORY_ORDER_NAMESPACE,
			        'type' => 'NUMERIC',
		        ]],
            ] );
        }

        return self::$_terms;
    }


	public function register_taxonomy()
    {

		$labels = array(
			'name'                       => 'Catering Categories',
			'singular_name'              => 'Catering Category',
			'menu_name'                  => 'Catering Category',
			'all_items'                  => 'All Catering Categories',
			'parent_item'                => 'Parent Catering Category',
			'parent_item_colon'          => 'Parent Catering Category:',
			'new_item_name'              => 'New Catering Category Name',
			'add_new_item'               => 'Add Catering Category Item',
			'edit_item'                  => 'Edit Catering Category',
			'update_item'                => 'Update Catering Category',
			'separate_items_with_commas' => 'Separate Catering Category with commas',
			'search_items'               => 'Search Catering Categories',
			'add_or_remove_items'        => 'Add or remove Catering Categories',
			'choose_from_most_used'      => 'Choose from the most used Catering Categories',
		);
		$args   = array(
			'labels'            => $labels,
			'hierarchical'      => false,
			'public'            => true,
			'show_ui'           => true,
			'show_admin_column' => true,
			'show_in_nav_menus' => true,
			'show_tagcloud'     => true,
		);

		register_taxonomy( self::CATERING_CATEGORY_NAMESPACE, 'product', $args );
		register_taxonomy_for_object_type( self::CATERING_CATEGORY_NAMESPACE, 'product' );
	}

	// REGISTER TERM META
    public function register_term_meta()
    {
		register_meta( 'term', self::CATERING_CATEGORY_ORDER_NAMESPACE, [
            'type' => 'integer',
            'sanitize_callback' => [ $this, 'sanitize_term_meta_value' ],
            'single' => true
        ] );
	}

    // SANITIZE DATA
	public function sanitize_term_meta_value( $value )
    {
		return floatval( $value );
	}

    // GETTER (will be sanitized)
	public function get_term_meta_text( $term_id )
    {
		$value = get_term_meta( $term_id, self::CATERING_CATEGORY_ORDER_NAMESPACE, true );
		$value = $this->sanitize_term_meta_value( $value );

		return $value;
	}

	/**
     * ADD FIELD TO CATEGORY TERM PAGE
     *
	 * @param \WP_Term|null $term
	 */
	public function add_form_field_term_meta_text($term = null)
    {
        if( ! empty( $term->term_id ) ) {
            $value = get_term_meta( $term->term_id, self::CATERING_CATEGORY_ORDER_NAMESPACE, true );
        }

        if( ! isset( $value ) || empty( $value ) )
	        $value = 0;

        ?>
        <table class="form-table">
            <tbody>
            <tr class="form-field form-required term-name-wrap">
                <th scope="row">
                    <label for="<?= self::CATERING_CATEGORY_ORDER_NAMESPACE; ?>">
                        <?php _e( 'Order', 'cater_waiter' ); ?>
                    </label>
                </th>
                <td>
                    <input type="number"
                           name="<?= self::CATERING_CATEGORY_ORDER_NAMESPACE; ?>"
                           id="<?= self::CATERING_CATEGORY_ORDER_NAMESPACE; ?>"
                           value="<?= $value; ?>"
                           class="term-meta-text-field"/>
                    <p class="description"><?php _e( 'The order of your catering menu sections.', 'cater_waiter' ); ?></p>
                </td>
            </tr>
            <?php

            $checked = false;
            if( ! empty( $term->term_id ) ) {
	            $checked = get_term_meta( $term->term_id, self::CATERING_CATEGORY_DISPLAY_NAME_NAMESPACE, true );
            }

            ?>
            <tr class="form-field form-required term-name-wrap">
                <th scope="row">
                    <label for="<?= self::CATERING_CATEGORY_DISPLAY_NAME_NAMESPACE; ?>">
                        <?php _e( 'Display Name in Menu?', 'cater_waiter' ); ?>
                    </label>
                </th>
                <td>
                    <input type="checkbox"
                           name="<?= self::CATERING_CATEGORY_DISPLAY_NAME_NAMESPACE; ?>"
                           id="<?= self::CATERING_CATEGORY_DISPLAY_NAME_NAMESPACE; ?>"
                           <?= $checked ? 'checked="checked"' : ''; ?>
                           value="1"
                           class="term-meta-text-field"/>
                </td>
            </tr>
            </tbody>
        </table>
	<?php }

	public function save_tax_field($term_id)
    {
        if( ! empty( $_POST[self::CATERING_CATEGORY_ORDER_NAMESPACE ]) ) {
            update_term_meta( $term_id, self::CATERING_CATEGORY_ORDER_NAMESPACE, $_POST[self::CATERING_CATEGORY_ORDER_NAMESPACE] );
        }

        if( ! empty( $_POST[self::CATERING_CATEGORY_DISPLAY_NAME_NAMESPACE ]) ) {
            update_term_meta( $term_id, self::CATERING_CATEGORY_DISPLAY_NAME_NAMESPACE, $_POST[self::CATERING_CATEGORY_DISPLAY_NAME_NAMESPACE] );
        }else{
            delete_term_meta( $term_id, self::CATERING_CATEGORY_DISPLAY_NAME_NAMESPACE );
        }
    }

}