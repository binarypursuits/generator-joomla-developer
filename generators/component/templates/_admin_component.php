<?php
/**
 * @package     Joomla.Administrator
 * @subpackage	com_<%= component %>
 *
 * @copyright	<%= copyright %>
 * @license		<%= license %>
 */

defined('_JEXEC') or die;
JHtml::_('behavior.tabstate');

if (!JFactory::getUser()->authorise('core.manage', 'com_<%= component %>'))
{
	return JError::raiseWarning(404, JText::_('JERROR_ALERTNOAUTHOR'));
}

require_once JPATH_COMPONENT.'/helpers/<%= component %>.php';

$controller = JControllerLegacy::getInstance('<%= component %>');
$controller->execute(JFactory::getApplication()->input->get('task'));
$controller->redirect();
