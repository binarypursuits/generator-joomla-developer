<?php
/**
 * @package     Joomla.Administrator
 * @subpackage  com_<%= component.name %>
 *
 * @copyright   Copyright (C) 2005 - 2014 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

defined('_JEXEC') or die;

/**
 * Weblinks helper.
 *
 * @package     Joomla.Administrator
 * @subpackage  com_<%= component.name %>
 * @since       1.6
 */
class <%= component.camelcase %>Helper extends JHelperContent
{
	/**
	 * Configure the Linkbar.
	 *
	 * @param   string  $vName  The name of the active view.
	 *
	 * @return  void
	 *
	 * @since   1.6
	 */
	public static function addSubmenu($vName = '<%= views.standard[0].listview.lowercase %>')
	{
		<% if (views.standard.length > 0) {
			for (var i = 0; i < views.standard.length; i++) { %>
			JHtmlSidebar::addEntry(
				JText::_('COM_<%= uppercase %>_SUBMENU_<%= views.standard[i].listview.uppercase %>'),
				'index.php?option=com_<%= component.name %>&view=<%= views.standard[i].listview.lowercase %>',
				$vName == '<%= views.standard[i].listview.lowercase %>'
			);
			<%}
		}
		if (db.fields.categories) { %>
		JHtmlSidebar::addEntry(
			JText::_('COM_<%= uppercase %>_SUBMENU_CATEGORIES'),
			'index.php?option=com_categories&extension=com_<%= component.name %>',
			$vName == 'categories'
		);<% } %>
	}
}
