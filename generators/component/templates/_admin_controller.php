<?php
/**
 * @package     Joomla.Administrator
 * @subpackage	com_<%= component.name %>
 *
 * @copyright	<%= development.copyright %>
 * @license		<%= development.license %>
 */

defined('_JEXEC') or die;

/**
 * Component Controller
 *
 * @package     Joomla.Administrator
 * @subpackage  com_<%= component.name %>
 */
class <%= component.camelcase %>Controller extends JControllerLegacy
{
	/**
	 * @var		string	The default view.
	 * @since   1.6
	 */
	protected $default_view = '<%= views.standard[0].listview.lowercase %>';

	/**
	 * Method to display a view.
	 *
	 * @param   boolean			If true, the view output will be cached
	 * @param   array  			An array of safe url parameters and their variable types, for valid values see {@link JFilterInput::clean()}.
	 *
	 * @return  JController		This object to support chaining.
	 * @since   1.5
	 */
	public function display($cachable = false, $urlparams = false)
	{

		$view   = $this->input->get('view', '<%= views.standard[0].listview.lowercase %>');
		$layout = $this->input->get('layout', 'default');
		$id     = $this->input->getInt('id');

		// Check for edit form.
		if ($view == '<%= views.standard[0].detailview.lowercase %>' && $layout == 'edit' && !$this->checkEditId('com_<%= component.name %>.edit.<%= views.standard[0].detailview.lowercase %>', $id)) {

			// Somehow the person just went to the form - we don't allow that.
			$this->setError(JText::sprintf('JLIB_APPLICATION_ERROR_UNHELD_ID', $id));
			$this->setMessage($this->getError(), 'error');
			$this->setRedirect(JRoute::_('index.php?option=com_<%= component.name %>&view=<%= views.standard[0].listview.lowercase %>', false));

			return false;
		}

		parent::display();

		return $this;
	}
}
