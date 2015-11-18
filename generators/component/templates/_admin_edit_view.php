<?php
/**
 * @package     Joomla.Administrator
 * @subpackage	com_<%= component %>
 *
 * @copyright	<%= copyright %>
 * @license		<%= license %>
 */

defined('_JEXEC') or die;

/**
 * View to edit a <%= views.standard[index].detailview.lowercase %>.
 *
 * @package     Joomla.Administrator
 * @subpackage  com_<%= component %>
 * @since       1.5
 */
class <%= camelcase %>View<%= views.standard[index].detailview.camelcase %> extends JViewLegacy
{
	protected $state;
	protected $item;
	protected $form;

	/**
	 * Display the view
	 */
	public function display($tpl = null)
	{
		$this->state	= $this->get('State');
		$this->item		= $this->get('Item');
		$this->form		= $this->get('Form');

		// Check for errors.
		if (count($errors = $this->get('Errors')))
		{
			JError::raiseError(500, implode("\n", $errors));
			return false;
		}

		$this->addToolbar();
		parent::display($tpl);
	}

	/**
	 * Add the page title and toolbar.
	 *
	 * @since   1.6
	 */
	protected function addToolbar()
	{
		JFactory::getApplication()->input->set('hidemainmenu', true);

		$user		= JFactory::getUser();
		$isNew		= ($this->item->id == 0);
		$checkedOut	= !($this->item->checked_out == 0 || $this->item->checked_out == $user->get('id'));

		// Since we don't track these assets at the item level, use the category id.
		$canDo		= JHelperContent::getActions('com_<%= component %>'<% if (db.fields.categories) { %>, 'category', $this->item->catid<% } %>);

		JToolbarHelper::title(JText::_('COM_<%= uppercase %>_MANAGER_<%= views.standard[index].detailview.uppercase %>'));

		// If not checked out, can save the item.
		if (!$checkedOut && ($canDo->get('core.edit')||<% if (db.fields.categories) { %>(count($user->getAuthorisedCategories('com_<%= component %>', 'core.create'))))<% } else { %>($canDo->get('core.create')<% } %>)
		{
			JToolbarHelper::apply('<%= views.standard[index].detailview.lowercase %>.apply');
			JToolbarHelper::save('<%= views.standard[index].detailview.lowercase %>.save');
		}
		if (!$checkedOut && (count($user->getAuthorisedCategories('com_<%= component %>', 'core.create'))))
		{
			JToolbarHelper::save2new('<%= views.standard[index].detailview.lowercase %>.save2new');
		}
		// If an existing item, can save to a copy.
		if (!$isNew && (count($user->getAuthorisedCategories('com_<%= component %>', 'core.create')) > 0))
		{
			JToolbarHelper::save2copy('<%= views.standard[index].detailview.lowercase %>.save2copy');
		}
		if (empty($this->item->id))
		{
			JToolbarHelper::cancel('<%= views.standard[index].detailview.lowercase %>.cancel');
		}
		else
		{
			if ($this->state->params->get('save_history', 0) && $user->authorise('core.edit'))
			{
				JToolbarHelper::versions('com_<%= component %>.<%= views.standard[index].detailview.lowercase %>', $this->item->id);
			}

			JToolbarHelper::cancel('<%= views.standard[index].detailview.lowercase %>.cancel', 'JTOOLBAR_CLOSE');
		}

		JToolbarHelper::divider();
		JToolbarHelper::help('JHELP_COMPONENTS_<%= uppercase %>_<%= views.standard[index].detailview.uppercase %>_EDIT');
	}
}
