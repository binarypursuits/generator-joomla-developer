<?php
/**
 * @package     Joomla.Site
 * @subpackage  com_<%= component.camelcase %>
 *
 * @copyright   Copyright (C) 2005 - 2014 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

defined('_JEXEC') or die;

JTable::addIncludePath(JPATH_COMPONENT_ADMINISTRATOR . '/tables');

/**
 * <%= component.camelcase %> Component Model for a Weblink record
 *
 * @package     Joomla.Site
 * @subpackage  com_<%= component.camelcase %>
 * @since       1.5
 */
class <%= component.camelcase %>Model<%= editmvc.camelcase %> extends JModelItem
{
	/**
	 * Model context string.
	 *
	 * @access	protected
	 * @var		string
	 */
	protected $_context = 'com_<%= component.camelcase %>.<%= views.standard[index].detailview.lowercase %>';

	/**
	 * Method to auto-populate the model state.
	 *
	 * Note. Calling getState in this method will result in recursion.
	 *
	 * @since   1.6
	 */
	protected function populateState()
	{
		$app = JFactory::getApplication();
		$params	= $app->getParams();

		// Load the object state.
		$id	= $app->input->getInt('id');
		$this->setState('<%= views.standard[index].detailview.lowercase %>.id', $id);

		// Load the parameters.
		$this->setState('params', $params);
	}

	/**
	 * Method to get an object.
	 *
	 * @param   integer	The id of the object to get.
	 *
	 * @return  mixed  Object on success, false on failure.
	 */
	public function getItem($id = null)
	{
		if ($this->_item === null)
		{
			$this->_item = false;

			if (empty($id))
			{
				$id = $this->getState('<%= views.standard[index].detailview.lowercase %>.id');
			}

			// Get a level row instance.
			$table = JTable::getInstance('<%= editmvc.camelcase %>', '<%= component.camelcase %>Table');

			// Attempt to load the row.
			if ($table->load($id))
			{<% if (db.fields.publish) { %>
				// Check published state.
				if ($published = $this->getState('filter.published'))
				{
					if ($table->state != $published)
					{
						return $this->_item;
					}
				}
				<% } %>
				// Convert the JTable to a clean JObject.
				$properties = $table->getProperties(1);
				$this->_item = JArrayHelper::toObject($properties, 'JObject');
			}
			elseif ($error = $table->getError())
			{
				$this->setError($error);
			}
		}

		return $this->_item;
	}

	/**
	 * Returns a reference to the a Table object, always creating it.
	 *
	 * @param	type	The table type to instantiate
	 * @param	string	A prefix for the table class name. Optional.
	 * @param	array	Configuration array for model. Optional.
	 * @return	JTable	A database object
	 * @since	1.6
	 */
	public function getTable($type = '<%= editmvc.camelcase %>', $prefix = '<%= component.camelcase %>Table', $config = array())
	{
		return JTable::getInstance($type, $prefix, $config);
	}
	<% if (db.fields.hits) { %>
	/**
	 * Method to increment the hit counter for the weblink
	 *
	 * @param   integer  $id  Optional ID of the weblink.
	 *
	 * @return  boolean  True on success
	 */
	public function hit($id = null)
	{
		if (empty($id))
		{
			$id = $this->getState('<%= component.camelcase %>.id');
		}

		$<%= views.standard[index].detailview.lowercase %> = $this->getTable();
		return $<%= views.standard[index].detailview.lowercase %>->hit($id);
	}<% } %>
}

