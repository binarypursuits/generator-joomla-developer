<?php
/**
 * @package     Joomla.Site
 * @subpackage  Templates.<%= template %>
 *
 * @copyright   <%= copyright %>
 * @license     <%= license %>
 */

defined('_JEXEC') or die;

$app = JFactory::getApplication();
$doc = JFactory::getDocument();
$user = JFactory::getUser();
$lang = JFactory::getLanguage();

$doc->addStyleSheet(JUri::root() . 'media/tpl_<%= template %>/css/normalize.css');
$doc->addStyleSheet(JUri::root() . 'media/tpl_<%= template %>/css/style.css');
$doc->addScript(JUri::root() . 'media/tpl_<%= template %>/js/modernizr-2.8.3.min.js');

// Getting params from template
$params = $app->getTemplate(true)->params;
?>
<!DOCTYPE html>
<html lang="<?php echo $lang->getTag(); ?>">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<title></title>
		<meta name="description" content="">
		<meta name="viewport" content="width=device-width, initial-scale=1">

		<link rel="apple-touch-icon" href="apple-touch-icon.png">
		<!-- Place favicon.ico in the root directory -->

	</head>
<body>

	<!-- Add your site or application content here -->
	<p>Hello world! This is HTML5 Boilerplate.</p>

</body>
</html>