<?php
/**
 * @package     Joomla.Site
 * @subpackage  Templates.<%= template.template %>
 *
 * @copyright   <%= development.copyright %>
 * @license     <%= development.license %>
 */

defined('_JEXEC') or die;

$app = JFactory::getApplication();
$doc = JFactory::getDocument();
$user = JFactory::getUser();
$lang = JFactory::getLanguage();

// Getting params from template
$params = $app->getTemplate(true)->params;
?>
<!DOCTYPE html>
<html lang="<?php echo $lang->getTag(); ?>">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<jdoc:include name="head" />
		<link rel="apple-touch-icon" href="apple-touch-icon.png">
		<!-- bower:js -->
        <!-- endbower -->
	</head>
	<body>
		<header>
			
		</header>
		<nav><jdoc:include type="module" name="main-menu" style="html5" /></nav>
		
		
		<jdoc:include type="module" name="message" />
		<jdoc:include type="module" name="component" />
		
		<footer>
			
		</footer>
		<!-- bower:js -->
        <!-- endbower -->
	</body>
</html>