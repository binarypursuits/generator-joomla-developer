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
 * Methods supporting a list of weblink records.
 *
 * @package     Joomla.Administrator
 * @subpackage  com<%= component %>
 * @since       1.6
 */
class <%= camelcase %>Model<%= views.standard[index].listview.camelcase %> extends JModelList
{
	/**
	 * Constructor.
	 *
	 * @param   array  An optional associative array of configuration settings.
	 * @see     JController
	 * @since   1.6
	 */
	public function __construct($config = array())
	{
		if (empty($config['filter_fields']))
		{
			$config['filter_fields'] = array(
				'id', 'a.id',
				'title', 'a.title',
				'alias', 'a.alias',<% if (db.fields.timestamp) { %>
				'checked_out', 'a.checked_out',
				'checked_out_time', 'a.checked_out_time',
				'created', 'a.created',
				'created_by', 'a.created_by',<% } %><% if (db.fields.categories) { %>
				'catid', 'a.catid', 'category_title',<% } %>
				'access', 'a.access', 'access_level',<% if (db.fields.ordering) { %>
				'ordering', 'a.ordering',<% } %><% if (db.fields.featured) { %>
				'featured', 'a.featured',<% } %><% if (db.fields.language) { %>
				'language', 'a.language',<% } %><% if (db.fields.hits) { %>
				'hits', 'a.hits',<% } %><% if (db.fields.publish) { %>
				'state', 'a.state',
				'publish_up', 'a.publish_up',
				'publish_down', 'a.publish_down',<% } %><% if (db.fields.url) { %>
				'url', 'a.url',<% } %>
			);
		}

		parent::__construct($config);
	}

	/**
	 * Method to auto-populate the model state.
	 *
	 * Note. Calling getState in this method will result in recursion.
	 *
	 * @since   1.6
	 */
	protected function populateState($ordering = null, $direction = null)
	{
		// Load the filter state.
		$search = $this->getUserStateFromRequest($this->context . '.filter.search', 'filter_search');
		$this->setState('filter.search', $search);

		$accessId = $this->getUserStateFromRequest($this->context . '.filter.access', 'filter_access', null, 'int');
		$this->setState('filter.access', $accessId);
		<% if (db.fields.publish) { %>
		$published = $this->getUserStateFromRequest($this->context . '.filter.state', 'filter_state', '', 'string');
		$this->setState('filter.state', $published);<% } %>
		<% if (db.fields.categories) { %>
		$categoryId = $this->getUserStateFromRequest($this->context . '.filter.category_id', 'filter_category_id', '');
		$this->setState('filter.category_id', $categoryId);<% } %>
		<% if (db.fields.language) { %>
		$language = $this->getUserStateFromRequest($this->context . '.filter.language', 'filter_language', '');
		$this->setState('filter.language', $language);<% } %>
		<% if (db.fields.tags) { %>
		$tag = $this->getUserStateFromRequest($this->context . '.filter.tag', 'filter_tag', '');
		$this->setState('filter.tag', $tag);
		<% } %>
		// Load the parameters.
		$params = JComponentHelper::getParams('com_<%= component %>');
		$this->setState('params', $params);

		// List state information.
		parent::populateState('a.title', 'asc');
	}

	/**
	 * Method to get a store id based on model configuration state.
	 *
	 * This is necessary because the model is used by the component and
	 * different modules that might need different sets of data or different
	 * ordering requirements.
	 *
	 * @param   string  $id    A prefix for the store id.
	 * @return  string  A store id.
	 * @since   1.6
	 */
	protected function getStoreId($id = '')
	{
		// Compile the store id.
		$id .= ':' . $this->getState('filter.search');
		$id .= ':' . $this->getState('filter.access');<% if (db.fields.publish) { %>
		$id .= ':' . $this->getState('filter.state');<% } %><% if (db.fields.categories) { %>
		$id .= ':' . $this->getState('filter.category_id');<% } %><% if (db.fields.categories) { %>
		$id .= ':' . $this->getState('filter.language');<% } %>

		return parent::getStoreId($id);
	}

	/**
	 * Build an SQL query to load the list data.
	 *
	 * @return  JDatabaseQuery
	 * @since   1.6
	 */
	protected function getListQuery()
	{
		// Create a new query object.
		$db = $this->getDbo();
		$query = $db->getQuery(true);
		$user = JFactory::getUser();

		// Select the required fields from the table.
		$query->select(
			$this->getState(
				'list.select',
				'a.id, a.title, a.alias,' .<% if (db.fields.timestamp) { %>
				'a.checked_out, a.checked_out_time,' .<% } %><% if (db.fields.publish) { %>
				'a.state, a.publish_up, a.publish_down,' .<% } %><% if (db.fields.categories) { %>
				'a.catid,' .<% } %><% if (db.fields.hits) { %>
				'a.hits,' .<% } %>
				'a.access,' . <% if (db.fields.ordering) { %>
				'a.ordering,' .<% } %><% if (db.fields.language) { %>
				'a.language'<% } %>
			)
		);
		$query->from($db->quoteName('#__<%= component %>_<%= views.standard[index].detailview.lowercase %>') . ' AS a');
		<% if (db.fields.language) { %>
		// Join over the language
		$query->select('l.title AS language_title')
			->join('LEFT', $db->quoteName('#__languages') . ' AS l ON l.lang_code = a.language');<% } %>

		// Join over the users for the checked out user.
		$query->select('uc.name AS editor')
			->join('LEFT', '#__users AS uc ON uc.id=a.checked_out');

		// Join over the asset groups.
		$query->select('ag.title AS access_level')
			->join('LEFT', '#__viewlevels AS ag ON ag.id = a.access');
		<% if (db.fields.categories) { %>
		// Join over the categories.
		$query->select('c.title AS category_title')
			->join('LEFT', '#__categories AS c ON c.id = a.catid');<% } %>

		// Filter by access level.
		if ($access = $this->getState('filter.access'))
		{
			$query->where('a.access = ' . (int) $access);
		}

		// Implement View Level Access
		if (!$user->authorise('core.admin'))
		{
			$groups = implode(',', $user->getAuthorisedViewLevels());
			$query->where('a.access IN (' . $groups . ')');
		}
		<% if (db.fields.publish) { %>
		// Filter by published state
		$published = $this->getState('filter.state');
		if (is_numeric($published))
		{
			$query->where('a.state = ' . (int) $published);
		}
		elseif ($published === '')
		{
			$query->where('(a.state IN (0, 1))');
		}<% } %>
		<% if (db.fields.categories) { %>
		// Filter by category.
		$categoryId = $this->getState('filter.category_id');
		if (is_numeric($categoryId))
		{
			$query->where('a.catid = ' . (int) $categoryId);
		}<% } %>

		// Filter by search in title
		$search = $this->getState('filter.search');
		if (!empty($search))
		{
			if (stripos($search, 'id:') === 0)
			{
				$query->where('a.id = ' . (int) substr($search, 3));
			}
			else
			{
				$search = $db->quote('%' . $db->escape($search, true) . '%');
				$query->where('(a.title LIKE ' . $search . ' OR a.alias LIKE ' . $search . ')');
			}
		}
		<% if (db.fields.language) { %>
		// Filter on the language.
		if ($language = $this->getState('filter.language'))
		{
			$query->where('a.language = ' . $db->quote($language));
		}<% } %>
		<% if (db.fields.tags) { %>
		$tagId = $this->getState('filter.tag');
		// Filter by a single tag.
		if (is_numeric($tagId))
		{
			$query->where($db->quoteName('tagmap.tag_id') . ' = ' . (int) $tagId)
				->join(
					'LEFT', $db->quoteName('#__contentitem_tag_map', 'tagmap')
					. ' ON ' . $db->quoteName('tagmap.content_item_id') . ' = ' . $db->quoteName('a.id')
					. ' AND ' . $db->quoteName('tagmap.type_alias') . ' = ' . $db->quote('com<%= component %>.weblink')
				);
		}<% } %>

		// Add the list ordering clause.
		$orderCol = $this->state->get('list.ordering');
		$orderDirn = $this->state->get('list.direction');<% if (db.fields.ordering) { %>
		if ($orderCol == 'a.ordering' || $orderCol == 'category_title')
		{
			$orderCol = 'c.title ' . $orderDirn . ', a.ordering';
		}<% } %>
		$query->order($db->escape($orderCol . ' ' . $orderDirn));

		//echo nl2br(str_replace('#__','jos_',$query));
		return $query;
	}
}
