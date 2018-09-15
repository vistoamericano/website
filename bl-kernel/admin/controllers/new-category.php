<?php defined('BLUDIT') or die('Bludit CMS.');

// ============================================================================
// Check role
// ============================================================================

checkRole(array('admin'));

// ============================================================================
// Functions
// ============================================================================

// ============================================================================
// Main before POST
// ============================================================================

// ============================================================================
// POST Method
// ============================================================================

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
	if (createCategory($_POST['category'])) {
		Redirect::page('categories');
	}
}

// ============================================================================
// Main after POST
// ============================================================================

// Title of the page
$layout['title'] .= ' - '.$L->g('New category');