<?php
/**
 * @package     Joomla.Plugin
 * @subpackage  <%= formalType %>.<%= formal %>
 *
 * @copyright   Copyright (C) 2005 - 2014 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

defined('_JEXEC') or die;

/**
 * <%= camelcase %> <% formalType %> Plugin
 *
 * @package     Joomla.Plugin
 * @subpackage  <%= formalType %>.<%= formal %>
 * @since       1.6
 */
class Plg<%= formalType %><%= camelcase %> extends JPlugin
{

	<% if (triggers.onUserLogin) { %>
	/**
	 * This method should handle any login logic and report back to the subject
	 *
	 * @param   array  $user     Holds the user data
	 * @param   array  $options  Array holding options (remember, autoregister, group)
	 *
	 * @return  boolean  True on success
	 *
	 * @since   1.5
	 */
	public function onUserLogin($user, $options = array())
	{
		return true;
	}
	<% } %>
	<% if (triggers.onUserLogout) { %>
	/**
	 * This method should handle any logout logic and report back to the subject
	 *
	 * @param   array  $user     Holds the user data.
	 * @param   array  $options  Array holding options (client, ...).
	 *
	 * @return  object  True on success
	 *
	 * @since   1.5
	 */
	public function onUserLogout($user, $options = array())
	{
		return true;
	}
	<% } %>
	<% if (triggers.onUserAuthenticate) { %>
	/**
	 * This method should handle any authentication and report back to the subject
	*
	* @param   array   $credentials  Array holding the user credentials
	* @param   array   $options      Array of extra options
	* @param   object  &$response    Authentication response object
	*
	* @return  boolean
	*
	* @since   1.5
	*/
	public function onUserAuthenticate($credentials, $options, &$response)
	{
		return true;
	}<% } %>
	<% if (triggers.onUserLoginFailure) { %>
	/**
	 * This method should handle any logout logic and report back to the subject
	 *
	 * @param   array   $credentials  Array holding the user credentials
	 * @param   object  &$response    Authentication response object
	 *
	 * @return  void
	 *
	 * @since   1.5
	 */
	public function onUserLoginFailure($user, $options = array())
	{
		return true;
	}
	<% } %>
	<% if (triggers.onUserAfterLogin) { %>
	/**
	 * This event is triggered whenever a user is successfully logged in.
	 *
	 * @param   array   $options	Array of extra options
	 *
	 * @return  void
	 *
	 * @since   1.5
	 */
	public function onUserAfterLogin($options = array())
	{
		return true;
	}
	<% } %>
	<% if (triggers.onUserBeforeSave) { %>
	/**
	 * Method is called before user data is stored in the database
	 *
	 * @param   array    $user   Holds the old user data.
	 * @param   boolean  $isnew  True if a new user is stored.
	 * @param   array    $data   Holds the new user data.
	 *
	 * @return    boolean
	 *
	 * @since   3.1
	 * @throws    InvalidArgumentException on invalid date.
	 */
	public function onUserBeforeSave($user, $isnew, $data)
	{
		return true;
	}
	<% } %>
	<% if (triggers.onUserAfterSave) { %>
	/**
	 * Utility method to act on a user after it has been saved.
	 *
	 * This method sends a registration email to new users created in the backend.
	 *
	 * @param   array    $user     Holds the new user data.
	 * @param   boolean  $isnew    True if a new user is stored.
	 * @param   boolean  $success  True if user was succesfully stored in the database.
	 * @param   string   $msg      Message.
	 *
	 * @return  void
	 *
	 * @since   1.6
	 */
	public function onUserAfterSave($user, $isnew, $success, $msg)
	{
	}
	}<% } %>
	<% if (triggers.onUserBeforeDelete) { %>
	/**
	 * Process checks before deleting user account.
	 *
	 * The event is triggered when a user is about to be deleted from the system
	 *
	 * @param   array    $user     Holds the user data
	 *
	 * @return  void
	 */
	public function onUserBeforeDelete($user)
	{
	}
	<% } %>
	<% if (triggers.onUserAfterDelete) { %>
	/**
	 * Remove all sessions for the user name
	 *
	 * Method is called after user data is deleted from the database
	 *
	 * @param   array    $user     Holds the user data
	 * @param   boolean  $success  True if user was succesfully stored in the database
	 * @param   string   $msg      Message
	 *
	 * @return  boolean
	 *
	 * @since   1.6
	 */
	public function onUserAfterDelete($user, $success, $msg)
	{
		return true;
	}<% } %>

	<% if (triggers.onExtensionAfterInstall) { %>
	/**
	 * Handle post extension install update sites
	*
	* @param   JInstaller  $installer  Installer object
	* @param   integer     $eid        Extension Identifier
	*
	* @return  void
	*
	* @since   1.6
	*/
	public function onExtensionAfterInstall($installer, $eid )
	{
	}<% } %>
	<% if (triggers.onExtensionAfterUninstall) { %>
	/**
	 * Handle extension uninstall
	*
	* @param   JInstaller  $installer  Installer instance
	* @param   integer     $eid        Extension id
	* @param   integer     $result     Installation result
	*
	* @return  void
	*
	* @since   1.6
	*/
	public function onExtensionAfterUninstall($installer, $eid, $result)
	{
	}<% } %>
	<% if (triggers.onExtensionAfterUpdate) { %>
	/**
	 * After update of an extension
	*
	* @param   JInstaller  $installer  Installer object
	* @param   integer     $eid        Extension identifier
	*
	* @return  void
	*
	* @since   1.6
	*/
	public function onExtensionAfterUpdate($installer, $eid)
	{
	}<% } %>

	<% if (triggers.onContentPrepare) { %>
	/**
	 * Plugin that loads module positions within content
	 *
	 * @param   string   $context   The context of the content being passed to the plugin.
	 * @param   object   &$article  The article object.  Note $article->text is also available
	 * @param   mixed    &$params   The article params
	 * @param   integer  $page      The 'page' number
	 *
	 * @return  mixed   true if there is an error. Void otherwise.
	 *
	 * @since   1.6
	 */
	public function onContentPrepare($context, &$article, &$params, $page = 0)
	{
	}<% } %>
	<% if (triggers.onContentAfterTitle) { %>
	/**
	 * This event only exists in Joomla Joomla 3.x. This is a request for
	 * information that should be placed between the content title and the
	 * content body. Although parameters are passed by reference, this is
	 * not the event to modify article data. Use onPrepareContent for
	 * that purpose. Note this event has special purpose in com_content for
	 * use in handling the introtext.
	 *
	 * @param   string		$context	The context of the content being passed to the
	 * 									plugin.
	 * @param   object	 	&$article	The article object.  Note $article->text is
	 * 									also available
	 * @param   mixed	 	&$params	The article params
	 * @param   integer		$page		The 'page' number
	 *
	 * @return	string		Returned value from this event will be displayed in a
	 * 						placeholder. Most templates display this placeholder
	 * 						after the article separator.
	 */
	public function onContentAfterTitle()
	{
	}<% } %>
	<% if (triggers.onContentBeforeDisplay) { %>
	/**
	 * If in the article view and the parameter is enabled shows the page navigation
	 *
	 * @param   string   $context  The context of the content being passed to the plugin
	 * @param   object   &$row     The article object
	 * @param   mixed    &$params  The article params
	 * @param   integer  $page     The 'page' number
	 *
	 * @return  mixed  void or true
	 *
	 * @since   1.6
	 */
	public function onContentBeforeDisplay($context, &$row, &$params, $page = 0)
	{
	}<% } %>
	<% if (triggers.onContentAfterDisplay) { %>
	/**
	 * This is a request for information that should be placed immediately after
	 * the generated content. For views that generate HTML, this might include the
	 * closure of styles that are specified as part of the content or related
	 * parameters. Although parameters are passed by reference, this is not the
	 * event to modify article data. Use onPrepareContent for that purpose.
	 *
	 * See the onPrepareContent event for additional discussion of these parameters.
	 * Note that unlike onPrepareContent, these parameters are passed by value.
	 *
	 * @param   string   $context	The context of the content being passed to the
	 * 								plugin - this is the component name and view - or
	 * 								name of module (e.g. com_content.article). Use
	 * 								this to check whether you are in the desired context
	 * 								for the plugin.
	 * @param   object   &$article  The article that is being rendered by the view.
	 * @param   mixed    &$params   A JRegistry object of merged article and menu item
	 * 								params.
	 * @param   integer  $page      An integer that determines the "page" of the
	 * 								content that is to be generated.
	 *
	 * @return  string  			Returned value from this event will be displayed in
	 * 								a placeholder. Most templates display this placeholder
	 * 								after the article separator.
	 *
	 * @since   1.6
	 */
	public function onContentAfterDisplay($context, &$row, &$params, $page = 0)
	{
	}<% } %>
	<% if (triggers.onContentBeforeSave) { %>
	/**
	 * Smart Search before save content method.
	 * Content is passed by reference. Method is called before the content is saved.
	 *
	 * @param   string  $context  The context of the content passed to the plugin (added in 1.6).
	 * @param   object  $article  A JTableContent object.
	 * @param   bool    $isNew    If the content is just about to be created.
	 *
	 * @return  void
	 *
	 * @since   2.5
	 */
	public function onContentBeforeSave($context, $article, $isNew)
	{
	}<% } %>
	<% if (triggers.onContentAfterSave) { %>
	/**
	 * Example after save content method
	 * Article is passed by reference, but after the save, so no changes will be saved.
	 * Method is called right after the content is saved
	 *
	 * @param   string   $context  The context of the content passed to the plugin (added in 1.6)
	 * @param   object   $article  A JTableContent object
	 * @param   boolean  $isNew    If the content is just about to be created
	 *
	 * @return  boolean   true if function not enabled, is in front-end or is new. Else true or
	 *                    false depending on success of save function.
	 *
	 * @since   1.6
	 */
	public function onContentAfterSave($context, $article, $isNew)
	{
	}<% } %>
	<% if (triggers.onContentPrepareForm) { %>
	/**
	 * Called before a JForm is rendered. It can be used to modify the JForm object in
	 * memory before rendering. For example, use JForm->loadFile() to add fields or
	 * JForm->removeField() to remove fields. Or use JForm->setFieldAttribute() or
	 * other JForm methods to modify fields for the form.
	 *
	 * @param	JForm	$form	The JForm object to be displayed. Use the $form->getName()
	 * 							method to check whether this is the form you want to work with.
	 * @param	mixed	$data	An object containing the data for the form.
	 *
	 * @return	boolean			True if method succeeds.
	 *
	 * @since	1.6
	 */
	public function onContentPrepareForm($form, $data)
	{
	}<% } %>
	<% if (triggers.onContentPrepareData) { %>
	/**
	 * Called after the data for a JForm has been retrieved. It can be used to modify the data
	 * for a JForm object in memory before rendering. This is usually used in tandem with the
	 * onContentPrepareForm method - this event adds the data to the already altered JForm.
	 *
	 * @param	string	$context	The context of the content being passed to the plugin - this
	 * 								is the component name and view - or name of module
	 * 								(e.g. com_content.article). Use this to check whether you
	 * 								are in the desired context for the plugin.
	 * @param	object	$data		An object containing the data for the form.
	 *
	 * @return	boolean				True if method succeeds.
	 *
	 * @since	1.6
	 */
	public function onContentPrepareData($context, $data)
	{
	}<% } %>
	<% if (triggers.onContentBeforeDelete) { %>
	/**
	 * Don't allow categories to be deleted if they contain items or subcategories with items
	 *
	 * @param   string  $context  The context for the content passed to the plugin.
	 * @param   object  $data     The data relating to the content that was deleted.
	 *
	 * @return  boolean
	 *
	 * @since   1.6
	 */
	public function onContentBeforeDelete($context, $data)
	{
	}<% } %>
	<% if (triggers.onContentAfterDelete) { %>
	/**
	 * Smart Search after delete content method.
	 * Content is passed by reference, but after the deletion.
	 *
	 * @param   string  $context  The context of the content passed to the plugin (added in 1.6).
	 * @param   object  $article  A JTableContent object.
	 *
	 * @return  void
	 *
	 * @since   2.5
	 */
	public function onContentAfterDelete($context, $article)
	{
	}<% } %>
	<% if (triggers.onContentChangeState) { %>
	/**
	 * Change the state in core_content if the state in a table is changed
	 *
	 * @param   string   $context  The context for the content passed to the plugin.
	 * @param   array    $pks      A list of primary key ids of the content that has changed state.
	 * @param   integer  $value    The value of the state that the content has been changed to.
	 *
	 * @return  boolean
	 *
	 * @since   3.1
	 */
	public function onContentChangeState($context, $pks, $value)
	{
	}<% } %>
	<% if (triggers.onContentSearch) { %>
	/**
	 * This event is triggered by a variety of search related operations. It is a request
	 * for a plugin to return the result of a search request. The rows must return the
	 * following fields, which are used in a common display routine:
	 *
	 * 		- browsernav		- catslug		- created
	 * 		- href	 			- section 		- slug
	 * 		- text		 		- title
	 *
	 * @param	string		$text		The target search string.
	 * @param	string		$phrase		A string matching option (exact|any|all). Default is "any".
	 * @param	string		$odering	A string ordering option (newest|oldest|popular|alpha|category). Default is "newest".
	 * @param	array		$areas		An array if restricted to areas, null if search all.
	 *
	 * @return	array		Array of stdClass objects with members as described above.
	 */
	public function onContentSearch($text, $phrase = "any", $ordering = "newest", $areas = null)
	{
	}<% } %>
	<% if (triggers.onContentSearchAreas) { %>
	/**
	 * This appears to be a request for plugins to identify which "areas"
	 * they provide search facilities for.
	 *
	 * @return 	array 	An associative array of area names, indexed by the
	 * 					area identifier. For example, array( 'categories' => 'Categories' ).
	 *
	 * @since	3.3
	 */
	public function onContentSearchAreas()
	{
	}<% } %>
	<% if (triggers.onCategoryChangeState) { %>
	/**
	 * Smart Search change category state content method.
	 * Method is called when the state of the category to which the
	 * content item belongs is changed.
	 *
	 * @param   string   $extension  The extension whose category has been updated.
	 * @param   array    $pks        A list of primary key ids of the content that has changed state.
	 * @param   integer  $value      The value of the state that the content has been changed to.
	 *
	 * @return  void
	 *
	 * @since   2.5
	 */
	public function onCategoryChangeState($extension, $pks, $value)
	{
	}<% } %>

	<% if (triggers.onValidateContact) { %>
	/**
	 * This event is triggered after a contact form has been submitted. An example use
	 * case would be validating a captcha. If you return a Exception object form submission
	 * will be terminated.
	 *
	 * @param	object	&$contact		A reference to the person who will receive the form.
	 * @param	array	&$data			A reference to the data in the $_POST variable.
	 *
	 * @return 	mixed					None on success or Exception on failure.
	 *
	 * @since 	2.5
	 */
	public function onValidateContact(&$contact, &$data)
	{
	}<% } %>
	<% if (triggers.onSubmitContact) { %>
	/**
	 * This event is triggered after a contact form has been submitted. An example use case
	 * would be validating a captcha. If you return a Exception object form submission
	 * will be terminated.
	 *
	 * @param	object	&$contact		A reference to the person who will receive the form.
	 * @param	array	&$data			A reference to the data in the $_POST variable.
	 *
	 * @return 	void
	 *
	 * @since 	2.5
	 */
	public function onSubmitContact(&$contact, &$data)
	<% } %>

	<% if (triggers.onGetIcons) { %>
	/**
	 * This method is called when the Quick Icons module is constructing its set of
	* icons. You can return an array which defines a single icon and it will be
	* rendered right after the stock Quick Icons.
	*
	* @param	string	$context	The context of the content being passed to the
	* 								plugin - this is the component name and view - or
	* 								name of module (e.g. com_content.article). Use
	* 								this to check whether you are in the desired
	* 								context for the plugin.
	*
	* @return array					A list of icon definition associative arrays,
	* 								consisting of the keys link, image, text and access.
	*/
	public function onGetIcons($context)
	{
	}
	<% } %>
}
