<?php

add_action( 'init', 'my_cake_cpt' );
function my_cake_cpt() {
	$labels = array(
		'name'               => _x( 'Cakes', 'post type general name', 'jstc' ),
		'singular_name'      => _x( 'Cake', 'post type singular name', 'jstc' ),
		'menu_name'          => _x( 'Cakes', 'admin menu', 'jstc' ),
		'name_admin_bar'     => _x( 'Cake', 'add new on admin bar', 'jstc' ),
		'add_new'            => _x( 'Add New', 'Cake', 'jstc' ),
		'add_new_item'       => __( 'Add New Cake', 'jstc' ),
		'new_item'           => __( 'New Cake', 'jstc' ),
		'edit_item'          => __( 'Edit Cake', 'jstc' ),
		'view_item'          => __( 'View Cake', 'jstc' ),
		'all_items'          => __( 'All Cakes', 'jstc' ),
		'search_items'       => __( 'Search Cakes', 'jstc' ),
		'parent_item_colon'  => __( 'Parent Cakes:', 'jstc' ),
		'not_found'          => __( 'No Cakes found.', 'jstc' ),
		'not_found_in_trash' => __( 'No Cakes found in Trash.', 'jstc' )
	);

	$args = array(
		'labels'             => $labels,
		'description'        => __( 'Cakes are sweet.', 'jstc' ),
		'public'             => true,
		'publicly_queryable' => true,
		'show_ui'            => true,
		'show_in_menu'       => true,
		'query_var'          => true,
		'rewrite'            => array( 'slug' => 'cake' ),
		'capability_type'    => 'post',
		'has_archive'        => true,
		'hierarchical'       => false,
		'menu_position'      => null,
		'show_in_rest'       => true,
		'rest_base'          => 'cakes',
		'rest_controller_class' => 'WP_REST_Posts_Controller',
		'supports'           => array( 'title', 'editor', 'author', 'thumbnail', 'excerpt', 'comments' )
	);

	register_post_type( 'cake', $args );
}