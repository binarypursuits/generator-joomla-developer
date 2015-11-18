<?php
/**
 * @package		Joomla.Site
 * @subpackage	mod_<%= module %>
 *
 * @copyright	<%= copyright %>
 * @license		<%= license %>
 */

defined('_JEXEC') or die;

// Include the syndicate functions only once
require_once __DIR__ . '/helper.php';

$moduleclass_sfx = htmlspecialchars($params->get('moduleclass_sfx'));

require JModuleHelper::getLayoutPath('mod_<%= module %>', $params->get('layout', 'default'));
