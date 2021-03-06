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
 * View class for a list of <%= listmvc.name %>.
 *
 * @package     Joomla.Administrator
 * @subpackage  com_<%= component.name %>
 * @since       1.5
 */
class <%= component.camelcase %>View<%= listmvc.camelcase %> extends JViewLegacy
{
	protected $items;
	protected $pagination;
	protected $state;

	/**
	 * Display the view
	 *
	 * @return  void
	 */
	public function display($tpl = null)
	{
		$this->state		= $this->get('State');
		$this->items		= $this->get('Items');
		$this->pagination	= $this->get('Pagination');

		<%= component.camelcase %>Helper::addSubmenu('<%= listmvc.name %>');

		// Check for errors.
		if (count($errors = $this->get('Errors')))
		{
			JError::raiseError(500, implode("\n", $errors));
			return false;
		}

		$this->addToolbar();
		$this->sidebar = JHtmlSidebar::render();
		parent::display($tpl);
	}

	/**
	 * Add the page title and toolbar.
	 *
	 * @since   1.6
	 */
	protected function addToolbar()
	{
		require_once JPATH_COMPONENT . '/helpers/<%= component.name %>.php';

		$state	= $this->get('State');
		$canDo	= JHelperContent::getActions('com_<%= component.name %>'<% if (db.fields.categories) { %>, 'category', $state->get('filter.category_id')<% } %>);
		$user	= JFactory::getUser();

		// Get the toolbar object instance
		$bar = JToolBar::getInstance('toolbar');

		JToolbarHelper::title(JText::_('COM_<%= uppercase %>_MANAGER_<%= views.standard[index].listview.uppercase %>'));
		<% if (db.fields.categories) { %>if (count($user->getAuthorisedCategories('com_<%= component.name %>', 'core.create')) > 0)<% } else { %>
		if ($canDo->get('core.create'))<% } %>
		{
			JToolbarHelper::addNew('<%= views.standard[index].detailview.lowercase %>.add');
		}
		if ($canDo->get('core.edit'))
		{
			JToolbarHelper::editList('<%= views.standard[index].detailview.lowercase %>.edit');
		}
		if ($canDo->get('core.edit.state')) {

			JToolbarHelper::publish('<%= listmvc.name %>.publish', 'JTOOLBAR_PUBLISH', true);
			JToolbarHelper::unpublish('<%= listmvc.name %>.unpublish', 'JTOOLBAR_UNPUBLISH', true);

			JToolbarHelper::archiveList('<%= listmvc.name %>.archive');
			JToolbarHelper::checkin('<%= listmvc.name %>.checkin');
		}
		if ($state->get('filter.state') == -2 && $canDo->get('core.delete'))
		{
			JToolbarHelper::deleteList('', '<%= listmvc.name %>.delete', 'JTOOLBAR_EMPTY_TRASH');
		} elseif ($canDo->get('core.edit.state'))
		{
			JToolbarHelper::trash('<%= listmvc.name %>.trash');
		}
		// Add a batch button
		if ($user->authorise('core.create', 'com_<%= component.name %>') && $user->authorise('core.edit', 'com_<%= component.name %>') && $user->authorise('core.edit.state', 'com_<%= component.name %>'))
		{
			JHtml::_('bootstrap.modal', 'collapseModal');
			$title = JText::_('JTOOLBAR_BATCH');

			// Instantiate a new JLayoutFile instance and render the batch button
			$layout = new JLayoutFile('joomla.toolbar.batch');

			$dhtml = $layout->render(array('title' => $title));
			$bar->appendButton('Custom', $dhtml, 'batch');
		}
		if ($user->authorise('core.admin', 'com_<%= component.name %>'))
		{
			JToolbarHelper::preferences('com_<%= component.name %>');
		}

		JToolbarHelper::help('JHELP_COMPONENTS_WEBLINKS_LINKS');

		JHtmlSidebar::setAction('index.php?option=com_<%= component.name %>&view=<%= listmvc.name %>');
		<% if (db.fields.publish) { %>
		JHtmlSidebar::addFilter(
			JText::_('JOPTION_SELECT_PUBLISHED'),
			'filter_state',
			JHtml::_('select.options', JHtml::_('jgrid.publishedOptions'), 'value', 'text', $this->state->get('filter.state'), true)
		);<% } %>
		<% if (db.fields.categories) { %>
		JHtmlSidebar::addFilter(
			JText::_('JOPTION_SELECT_CATEGORY'),
			'filter_category_id',
			JHtml::_('select.options', JHtml::_('category.options', 'com_<%= component.name %>'), 'value', 'text', $this->state->get('filter.category_id'))
		);<% } %>

		JHtmlSidebar::addFilter(
			JText::_('JOPTION_SELECT_ACCESS'),
			'filter_access',
			JHtml::_('select.options', JHtml::_('access.assetgroups'), 'value', 'text', $this->state->get('filter.access'))
		);
		<% if (db.fields.language) { %>
		JHtmlSidebar::addFilter(
			JText::_('JOPTION_SELECT_LANGUAGE'),
			'filter_language',
			JHtml::_('select.options', JHtml::_('contentlanguage.existing', true, true), 'value', 'text', $this->state->get('filter.language'))
		);<% } %>
		<% if (db.fields.tags) { %>
		JHtmlSidebar::addFilter(
			JText::_('JOPTION_SELECT_TAG'),
			'filter_tag',
			JHtml::_('select.options', JHtml::_('tag.options', true, true), 'value', 'text', $this->state->get('filter.tag'))
		);<% } %>

	}

	/**
	 * Returns an array of fields the table can be sorted by
	 *
	 * @return  array  Array containing the field name to sort by as the key and display text as value
	 *
	 * @since   3.0
	 */
	protected function getSortFields()
	{
		return array(<% if (db.fields.ordering) { %>
			'a.ordering' => JText::_('JGRID_HEADING_ORDERING'),<% } %><% if (db.fields.publish) { %>
			'a.state' => JText::_('JSTATUS'),<% } %>
			'a.title' => JText::_('JGLOBAL_TITLE'),
			'a.access' => JText::_('JGRID_HEADING_ACCESS'),<% if (db.fields.hits) { %>
			'a.hits' => JText::_('JGLOBAL_HITS'),<% } %><% if (db.fields.language) { %>
			'a.language' => JText::_('JGRID_HEADING_LANGUAGE'),<% } %>
			'a.id' => JText::_('JGRID_HEADING_ID')
		);
	}
}
