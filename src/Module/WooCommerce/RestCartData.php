<?php


namespace CaterWaiter\Module\WooCommerce;


class RestCartData extends \WC_REST_Products_Controller
{
    /**
     * @param \WC_Cart $cart_item
     * @param string $context
     * @return array
     */
    public function data( $cart_item, $context = 'view' )
    {
        $variable_product = new \WC_Product_Variable( $cart_item->get_id() );

        $data = array(
            'id'                    => $cart_item->get_id(),
            'name'                  => $cart_item->get_name( $context ),
            'slug'                  => $cart_item->get_slug( $context ),
            'permalink'             => $cart_item->get_permalink(),
            'type'                  => $cart_item->get_type(),
            'status'                => $cart_item->get_status( $context ),
            'description'           => 'view' === $context ? wpautop( do_shortcode( $product->get_description() ) ) : $product->get_description( $context ),
            'short_description'     => 'view' === $context ? apply_filters( 'woocommerce_short_description', $product->get_short_description() ) : $product->get_short_description( $context ),
            'sku'                   => $product->get_sku( $context ),
            'price'                 => $product->get_price( $context ),
            'regular_price'         => $product->get_regular_price( $context ),
            'sale_price'            => $product->get_sale_price( $context ) ? $product->get_sale_price( $context ) : '',
            'price_html'            => $product->get_price_html(),
            'on_sale'               => $product->is_on_sale( $context ),
            'parent_id'             => $product->get_parent_id( $context ),
            'purchase_note'         => 'view' === $context ? wpautop( do_shortcode( wp_kses_post( $product->get_purchase_note() ) ) ) : $product->get_purchase_note( $context ),
            'categories'            => $this->get( 'get_taxonomy_terms', [ $product ] ),
            'tags'                  => $this->get( 'get_taxonomy_terms', [ $product, 'tag' ] ),
            'images'                => $this->get( 'get_images', [ $product, 'tag' ] ),
            'attributes'            => $this->get( 'get_attributes', [ $product, 'tag' ] ),
            'default_attributes'    => $this->get( 'get_default_attributes', [ $product, 'tag' ] ),
            'variations'            => $variable_product->get_available_variations(),
            'grouped_products'      => array(),
            'menu_order'            => $product->get_menu_order( $context ),
            'meta_data'             => $product->get_meta_data(),
        );

        return $this->catering_data( $data );
    }

	/**
	 * @param $function
	 * @param $args
	 *
	 * @return mixed
	 */
    private function get($function, $args)
    {
        switch( count($args) )
        {
            case 0:
                return $this->$function();
                break;
	        default:
                return $this->$function(...$args);
                break;
        }
    }

    /**
     * @param array $product
     * @return array
     */
    private function catering_data($product)
    {
        if( ! empty( $product['attributes'] ) ) {

            foreach( $product['attributes'] as $key => $attributes ) {
                $product['attributes'][ $key ]['attribute_slug'] = 'attribute_pa_' . sanitize_title( $attributes['name'] );
            }
        }

	    $terms = [];

	    foreach ( wc_get_object_terms( $product['id'], 'catering_category' ) as $term ) {
		    $terms[] = [
			    'id'   => $term->term_id,
			    'name' => $term->name,
			    'slug' => $term->slug,
		    ];
	    }

	    $product['catering_categories'] = $terms;

        return $product;
    }
}