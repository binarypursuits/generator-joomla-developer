<?php
/**
 * @package     Joomla.Site
 * @subpackage  com_<%= views.standard[index].detailview.lowercase %>s
 *
 * @copyright   Copyright (C) 2005 - 2014 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

defined('_JEXEC') or die;

/**
 * HTML View class for the <%= component.camelcase %> component
 *
 * @package     Joomla.Site
 * @subpackage  com_<%= views.standard[index].detailview.lowercase %>s
 * @since       1.0
 */
class <%= component.camelcase %>ViewCategory extends JViewCategoryfeed
{
	/**
	 * @var    string  The name of the view to link individual items to
	 * @since  3.2
	 */
	protected $viewName = '<%= views.standard[index].detailview.lowercase %>';
}