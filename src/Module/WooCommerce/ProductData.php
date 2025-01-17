<?php


namespace CaterWaiter\Module\WooCommerce;


class ProductData
{
	public static function get()
	{
		$terms_in_taxonomy = get_terms(ProductTaxonomy::CATERING_CATEGORY_NAMESPACE, [
			'hide_empty' => false,
			'fields' => 'ids',
		]);

		$query = new \WP_Query([
			'post_type' => 'product',
			'posts_per_page' => -1,
			'tax_query' => [
				[
					'taxonomy' => ProductTaxonomy::CATERING_CATEGORY_NAMESPACE,
					'terms' => $terms_in_taxonomy,
					'operator' => 'IN',
				]
			],
			'orderby' => 'menu_order',
			'order' => 'DESC'
		]);

		if (!$query->have_posts()) {
			return new \WP_Error('No products found.');
		}

		$ids = array_map( function($post) {
			return $post->ID;
		}, $query->posts );

		$rest_product_data = new RestProductData();

		$products = array_map( function($product) use($rest_product_data) {
			return $rest_product_data->data( $product );
		}, (new \WC_Product_Query( [ 'include' => $ids, 'limit' => -1 ] ))->get_products() );

		$grouped_products = [];

		foreach ($products as $product) {

			if( ! empty( $product['catering_categories'] ) ) {

				$first_category = $product['catering_categories'][0];

				if( empty( $grouped_products[ $first_category['slug'] ] ) )
					$grouped_products[ $first_category['slug'] ] = [];

				$grouped_products[ $first_category['slug'] ][] = $product;

				usort($grouped_products[ $first_category['slug'] ], function ($a, $b) {
					return $a['menu_order'] - $b['menu_order'];
				});

				$grouped_products[ $first_category['slug'] ] = array_reverse($grouped_products[ $first_category['slug'] ]);
			}
		}


		return [
			'grouped_products' => $grouped_products,
			'products' => $products,
			'catering_categories' => ProductTaxonomy::get_terms()
		];
	}
}