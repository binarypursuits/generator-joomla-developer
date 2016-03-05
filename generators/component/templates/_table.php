<?php
/**
 * @package     Joomla.Administrator
 * @subpackage	com_<%= component.name %>
 *
 * @copyright	<%= development.copyright %>
 * @license		<%= development.license %>
 */
<%
var jsonEncode = [];
if (db.fields.params)
{
	jsonEncode.push('params');
}

if (db.fields.metadata)
{
	jsonEncode.push('metadata');
}

if (db.fields.images)
{
	jsonEncode.push('images');
}

if (jsonEncode.length > 1)
{
	jsonEncode = jsonEncode.join("','");
}
else
{
	jsonEncode = false;
}
%>

defined('_JEXEC') or die;

/**
 * <%= editmvc.camelcase %> Table class
 *
 * @package     Joomla.Administrator
 * @subpackage  com_<%= component.name %>
 * @since       1.5
 */
class <%= component.camelcase %>Table<%= editmvc.camelcase %> extends JTable
{<% if (jsonEncode) { %>
	/**
	 * Ensure the params, metadata and images are json encoded in the bind method
	 *
	 * @var    array
	 * @since  3.3
	 */
	protected $_jsonEncode = array('<%= jsonEncode %>');
<% } %>
	/**
	 * Constructor
	 *
	 * @param   JDatabaseDriver  &$db  A database connector object
	 */
	public function __construct(&$db)
	{
		parent::__construct('#__<%= component.name %>_<%= views.standard[index].detailview.lowercase %>', 'id', $db);<% if (db.fields.tags) { %>
		JTableObserverTags::createObserver($this, array('typeAlias' => 'com_<%= component.name %>.<%= views.standard[index].detailview.lowercase %>'));
		JTableObserverContenthistory::createObserver($this, array('typeAlias' => 'com_<%= component.name %>.<%= views.standard[index].detailview.lowercase %>'));<% } %>
	}

	/**
	 * Overload the store method for the Weblinks table.
	 *
	 * @param   boolean	Toggle whether null values should be updated.
	 * @return  boolean  True on success, false on failure.
	 * @since   1.6
	 */
	public function store($updateNulls = false)
	{<% if (db.fields.timestamps) { %>
			$date	= JFactory::getDate();
			$user	= JFactory::getUser();

			if ($this->id)
			{
				// Existing item
				$this->modified		= $date->toSql();
				$this->modified_by	= $user->get('id');
			}
			else
			{
				// New weblink. A weblink created and created_by field can be set by the user,
				// so we don't touch either of these if they are set.
				if (!(int) $this->created)
				{
				$this->created = $date->toSql();
				}
				if (empty($this->created_by))
				{
					$this->created_by = $user->get('id');
				}
			}<% } %>

			<% if (db.fields.publish) { %>
			// Set publish_up to null date if not set
			if (!$this->publish_up)
			{
			$this->publish_up = $this->_db->getNullDate();
			}

			// Set publish_down to null date if not set
			if (!$this->publish_down)
			{
			$this->publish_down = $this->_db->getNullDate();
			}<% } %>
			<% if (db.fields.alias) {  %>
			// Verify that the alias is unique
				$table = JTable::getInstance('<%= views.standard[index].detailview.lowercase %>', '<%= component.camelcase %>Table');

			if ($table->load(array('alias' => $this->alias<% if (db.fields.categories) { %>, 'catid' => $this->catid)<% } %>) && ($table->id != $this->id || $this->id == 0))
				{
				$this->setError(JText::_('COM_<%= uppercase %>_ERROR_UNIQUE_ALIAS'));
				return false;
			}<% } %>
			<% if (db.fields.url) { %>
				// Convert IDN urls to punycode
			$this->url = JStringPunycode::urlToPunycode($this->url);<% } %>

			return parent::store($updateNulls);
	}

	/**
	 * Overloaded check method to ensure data integrity.
	 *
	 * @return  boolean  True on success.
	 */
	public function check()
	{<% if (db.fields.url) { %>
		if (JFilterInput::checkAttribute(array ('href', $this->url)))
		{
			$this->setError(JText::_('COM_<%= uppercase %>_ERR_TABLES_PROVIDE_URL'));
			return false;
		}<% } %>

		// check for valid name
		if (trim($this->title) == '')
		{
			$this->setError(JText::_('COM_<%= uppercase %>_ERR_TABLES_TITLE'));
			return false;
		}

		// Check for existing name
		$query = $this->_db->getQuery(true)
			->select($this->_db->quoteName('id'))
			->from($this->_db->quoteName('#__<%= component.name %>_<%= views.standard[index].detailview.lowercase %>'))
			->where($this->_db->quoteName('title') . ' = ' . $this->_db->quote($this->title))<% if (db.fields.category) { %>
			->where($this->_db->quoteName('catid') . ' = ' . (int) $this->catid)<% } %>;

		$this->_db->setQuery($query);

		$xid = (int) $this->_db->loadResult();
		if ($xid && $xid != (int) $this->id)
		{
			$this->setError(JText::_('COM_<%= uppercase %>_ERR_TABLES_NAME'));
			return false;
		}
		<% if (db.fields.alias) {  %>
		if (empty($this->alias))
		{
			$this->alias = $this->title;
		}
		$this->alias = JApplication::stringURLSafe($this->alias);
		if (trim(str_replace('-', '', $this->alias)) == '')
		{
			$this->alias = JFactory::getDate()->format("Y-m-d-H-i-s");
		}<% } %>

		<% if (db.fields.publish) {  %>
		// Check the publish down date is not earlier than publish up.
		if ($this->publish_down > $this->_db->getNullDate() && $this->publish_down < $this->publish_up)
		{
			$this->setError(JText::_('JGLOBAL_START_PUBLISH_AFTER_FINISH'));
			return false;
		}<% } %>
		<% if (db.fields.metadata) {  %>
		// clean up keywords -- eliminate extra spaces between phrases
		// and cr (\r) and lf (\n) characters from string
		if (!empty($this->metakey))
		{
			// only process if not empty
			$bad_characters = array("\n", "\r", "\"", "<", ">"); // array of characters to remove
			$after_clean = JString::str_ireplace($bad_characters, "", $this->metakey); // remove bad characters
			$keys = explode(',', $after_clean); // create array using commas as delimiter
			$clean_keys = array();

			foreach ($keys as $key)
			{
				if (trim($key)) {  // ignore blank keywords
					$clean_keys[] = trim($key);
				}
			}
			$this->metakey = implode(", ", $clean_keys); // put array back together delimited by ", "
		}<% } %>

		return true;
	}

	<% if (db.fields.publish) { %>
	/**
	 * Method to set the publishing state for a row or list of rows in the database
	* table.  The method respects checked out rows by other users and will attempt
	* to checkin rows that it can after adjustments are made.
	*
	* @param   mixed	An optional array of primary key values to update.  If not
	*					set the instance property value is used.
	* @param   integer The publishing state. eg. [0 = unpublished, 1 = published]
	* @param   integer The user id of the user performing the operation.
	* @return  boolean  True on success.
	* @since   1.0.4
	*/
	public function publish($pks = null, $state = 1, $userId = 0)
	{
		$k = $this->_tbl_key;

		// Sanitize input.
		JArrayHelper::toInteger($pks);
		$userId = (int) $userId;
		$state  = (int) $state;

		// If there are no primary keys set check to see if the instance key is set.
		if (empty($pks))
		{
			if ($this->$k)
			{
				$pks = array($this->$k);
			}
			// Nothing to set publishing state on, return false.
			else {
				$this->setError(JText::_('JLIB_DATABASE_ERROR_NO_ROWS_SELECTED'));
				return false;
			}
		}

		// Build the WHERE clause for the primary keys.
		$where = $k.'='.implode(' OR '.$k.'=', $pks);
		<% if (db.fields.timestamps) { %>
		// Determine if there is checkin support for the table.
		if (!property_exists($this, 'checked_out') || !property_exists($this, 'checked_out_time'))
		{
			$checkin = '';
		}
		else
		{
			$checkin = ' AND (checked_out = 0 OR checked_out = '.(int) $userId.')';
		}<% } %>

		// Update the publishing state for rows with the given primary keys.
		$this->_db->setQuery(
			'UPDATE '.$this->_db->quoteName($this->_tbl) .
			' SET '.$this->_db->quoteName('state').' = '.(int) $state .
			' WHERE ('.$where.')' .
			$checkin
		);

		try
		{
			$this->_db->execute();
		}
		catch (RuntimeException $e)
		{
			$this->setError($e->getMessage());
			return false;
		}
		<% if (db.fields.timestamps) { %>
		// If checkin is supported and all rows were adjusted, check them in.
		if ($checkin && (count($pks) == $this->_db->getAffectedRows()))
		{
			// Checkin the rows.
			foreach ($pks as $pk)
			{
				$this->checkin($pk);
			}
		}<% } %>

		// If the JTable instance value is in the list of primary keys that were set, set the instance.
		if (in_array($this->$k, $pks))
		{
			$this->state = $state;
		}

		$this->setError('');
		return true;
	}<% } %>
}
