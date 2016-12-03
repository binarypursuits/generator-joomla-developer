<?php
/**
 * @package     Joomla.Administrator
 * @subpackage	com_<%= component.name %>
 *
 * @copyright	<%= development.copyright %>
 * @license		<%= development.license %>
 */

defined('_JEXEC') or die;
JHtml::_('behavior.tabstate');

if (!JFactory::getUser()->authorise('core.manage', 'com_<%= component.name %>'))
{
	return JError::raiseWarning(404, JText::_('JERROR_ALERTNOAUTHOR'));
}

require_once JPATH_COMPONENT.'/helpers/com_<%= component.name %>.php';

$controller = JControllerLegacy::getInstance('<%= component.camelcase %>');
$controller->execute(JFactory::getApplication()->input->get('task'));
$controller->redirect();
