<?php

if (!function_exists('jstc_register_nav_menu')) {

	function jstc_register_nav_menu()
	{
		register_nav_menus(array(
			'header_menu' => __('Header Menu', 'jstc'),
			'footer_menu' => __('Footer Menu', 'jstc'),
		));
	}

	add_action('after_setup_theme', 'jstc_register_nav_menu', 0);
}

// create custom function to return nav menu
function retrieve_header_menu()
{
	$menuLocations = get_nav_menu_locations();
	$menuObject = wp_get_nav_menu_object($menuLocations['header_menu']);
	$menuItems = wp_get_nav_menu_items($menuObject);

	function add_top_level_items($menuItem) {
		return $menuItem->menu_item_parent === "0";
	}

	function init_nested_menu_arrays($menuItem) {
		$menuItem->children = array();
		return $menuItem;
	}

	$nestedMenu = array_filter($menuItems, 'add_top_level_items');
	array_walk($nestedMenu, 'init_nested_menu_arrays');


	foreach ($menuItems as $m) {
		if ($m->menu_item_parent !== "0") {
			$submenuID = intval($m->menu_item_parent);
			foreach ($nestedMenu as $menuItem) {
				if ( $menuItem->ID === $submenuID ) {
					array_push( $menuItem->children, $m );
				}
			}
		}
	}

	return $nestedMenu;
}

function retrieve_footer_menu()
{
	$menuLocations = get_nav_menu_locations();
	$menuObject = wp_get_nav_menu_object($menuLocations['footer_menu']);
	return wp_get_nav_menu_items($menuObject);
}

// create new endpoint route
add_action('rest_api_init', function () {
	register_rest_route('wp/v2', 'navigation/header_menu', array(
		'methods' => 'GET',
		'callback' => 'retrieve_header_menu',
	));
});

add_action('rest_api_init', function () {
	register_rest_route('wp/v2', 'navigation/footer_menu', array(
		'methods' => 'GET',
		'callback' => 'retrieve_footer_menu',
	));
});