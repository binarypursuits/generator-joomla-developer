<?php
/**
 * @package     Joomla.Plugin
 * @subpackage  <%= plugin.type.camelcase %>.<%= plugin.camelcase %>
 *
 * @copyright   Copyright (C) 2005 - 2014 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

defined('_JEXEC') or die;

/**
 * <%= plugin.camelcase %> <% plugin.type.camelcase %> Plugin
 *
 * @package     Joomla.Plugin
 * @subpackage  <%= plugin.type.camelcase %>.<%= plugin.camelcase %>
 * @since       1.6
 */
class Plg<%= plugin.type.camelcase %><%= plugin.camelcase %> extends JPlugin
{<% if (methods.indexOf('onUserAuthenticate') > -1) { %>
	/**
	 * This method should handle any authentication and report back to the subject
	*
	* @param   array   $credentials  Array holding the user credentials
	* @param   array   $options      Array of extra options
	* @param   object  &$response    Authentication response object
	*
	* @return  JAuthenticateResponse
	*
	* @since   1.5
	*/
	public function onUserAuthenticate($credentials, $options, &$response)
	{
		return true;
	}<% } %><% if (methods.indexOf('onInit-Captcha') > -1) { %>
		
	/**
	 * Initialise the captcha
	 *
	 * @param   string  $id  The id of the field.
	 *
	 * @return  Boolean	True on success, false otherwise
	 *
	 * @throws  Exception
	 *
	 * @since  2.5
	 */
	public function onInit($id = 'dynamic_recaptcha_1')
	{
	}<% } %><% if (methods.indexOf('onDisplay') > -1) { %>
		
	/**
	 * Gets the challenge HTML
	 *
	 * @param   string  $name   The name of the field. Not Used.
	 * @param   string  $id     The id of the field.
	 * @param   string  $class  The class of the field. This should be passed as
	 *                          e.g. 'class="required"'.
	 *
	 * @return  string  The HTML to be embedded in the form.
	 *
	 * @since  2.5
	 */
	public function onDisplay($name = null, $id = 'dynamic_recaptcha_1', $class = '')
	{
	}<% } %><% if (methods.indexOf('onCheckAnswer') > -1) { %>
		
	/**
	 * Calls an HTTP POST function to verify if the user's guess was correct
	 *
	 * @param   string  $code  Answer provided by user. Not needed for the Recaptcha implementation
	 *
	 * @return  True if the answer is correct, false otherwise
	 *
	 * @since  2.5
	 */
	public function onCheckAnswer($code = null)
	{	
	}<% } %><% if (methods.indexOf('onContentPrepare') > -1) { %>
		
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
	}<% } %><% if (methods.indexOf('onContentAfterTitle') > -1) { %>
		
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
	}<% } %><% if (methods.indexOf('onContentBeforeDisplay') > -1) { %>
		
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
	}<% } %><% if (methods.indexOf('onContentAfterDisplay') > -1) { %>
		
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
	}<% } %><% if (methods.indexOf('onContentBeforeSave') > -1) { %>
		
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
	}<% } %><% if (methods.indexOf('onContentAfterSave') > -1) { %>
		
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
	}<% } %><% if (methods.indexOf('onContentPrepareForm') > -1) { %>
		
		
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
	}<% } %><% if (methods.indexOf('onContentPrepareData') > -1) { %>
		
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
	}<% } %><% if (methods.indexOf('onContentBeforeDelete') > -1) { %>
		
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
	}<% } %><% if (methods.indexOf('onContentAfterDelete') > -1) { %>
		
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
	}<% } %><% if (methods.indexOf('onContentChangeState') > -1) { %>
		
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
	}<% } %><% if (methods.indexOf('onContentSearch') > -1) { %>
		
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
	}<% } %><% if (methods.indexOf('onContentSearchAreas') > -1) { %>
		
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
	}<% } %><% if (methods.indexOf('onInit-Editors') > -1) { %>
		
	/**
	 * Method to handle the onInitEditor event.
	 *  - Initialises the Editor
	 *
	 * @return  string	JavaScript Initialization string
	 *
	 * @since 1.5
	 */
	public function onInit()
	{
	}<% } ?><% if (methods.indexOf('onSave') > -1) { %>
	
	/**
	 * Copy editor content to form field.
	 *
	 * Not applicable in this editor.
	 *
	 * @return  void
	 */
	public function onSave()
	{
		return;
	}<% } ?><% if (methods.indexOf('onSetContent') > -1) { %>
	
	/**
	 * Set the editor content.
	 *
	 * @param   string  $id    The id of the editor field.
	 * @param   string  $html  The content to set.
	 *
	 * @return  string
	 */
	public function onSetContent($id, $html)
	{
		return;
	}
	<% } ?><% if (methods.indexOf('onDisplay') > -1) { %>
	
	/**
	 * Display the editor area.
	 *
	 * @param   string   $name     The control name.
	 * @param   string   $content  The contents of the text area.
	 * @param   string   $width    The width of the text area (px or %).
	 * @param   string   $height   The height of the text area (px or %).
	 * @param   integer  $col      The number of columns for the textarea.
	 * @param   integer  $row      The number of rows for the textarea.
	 * @param   boolean  $buttons  True and the editor buttons will be displayed.
	 * @param   string   $id       An optional ID for the textarea (note: since 1.6). If not supplied the name is used.
	 * @param   string   $asset    The object asset
	 * @param   object   $author   The author.
	 * @param   array    $params   Associative array of editor parameters.
	 *
	 * @return  string
	 */
	public function onDisplay($name, $content, $width, $height, $col, $row, $buttons = true,
		$id = null, $asset = null, $author = null, $params = array())
	{
	}<% } ?><% if (methods.indexOf('onGetContent') > -1) { %>
	
	/**
	 * Get the editor content.
	 *
	 * @param   string  $id  The id of the editor field.
	 *
	 * @return  string
	 */
	public function onGetContent($id)
	{
		return;
	}<% } ?><% if (methods.indexOf('onGetInsertMethod') > -1) { %>

	/**
	 * Inserts html code into the editor
	 *
	 * @param   string  $id  The id of the editor field
	 *
	 * @return  boolean  returns true when complete
	 */
	public function onGetInsertMethod($id)
	{
	}<% } ?><% if (methods.indexOf('onExtensionAfterInstall') > -1) { %>
		
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
	}<% } %><% if (methods.indexOf('onExtensionAfterUninstall') > -1) { %>
		
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
	}<% } %><% if (methods.indexOf('onExtensionAfterUpdate') > -1) { %>
		
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
	}<% } %><% if (methods.indexOf('onFinderCategoryChangeState') > -1) { %>
	
	/**
	 * Method to update the item link information when the item category is
	 * changed. This is fired when the item category is published or unpublished
	 * from the list view.
	 *
	 * @param   string   $extension  The extension whose category has been updated.
	 * @param   array    $pks        A list of primary key ids of the content that has changed state.
	 * @param   integer  $value      The value of the state that the content has been changed to.
	 *
	 * @return  void
	 *
	 * @since   2.5
	 */
	public function onFinderCategoryChangeState($extension, $pks, $value)
	{
	}<% } %><% if (methods.indexOf('onFinderChangeState') > -1) { %>
		
	/**
	 * Method to update the link information for items that have been changed
	 * from outside the edit screen. This is fired when the item is published,
	 * unpublished, archived, or unarchived from the list view.
	 *
	 * @param   string   $context  The context for the content passed to the plugin.
	 * @param   array    $pks      An array of primary key ids of the content that has changed state.
	 * @param   integer  $value    The value of the state that the content has been changed to.
	 *
	 * @return  void
	 *
	 * @since   2.5
	 */
	public function onFinderChangeState($context, $pks, $value)
	{
	}<% } %><% if (methods.indexOf('onFinderBeforeDelete') > -1) { %>
	
	/**
	 * Method to remove the link information for items that have been deleted.
	 *
	 * @param   string  $context  The context of the action being performed.
	 * @param   JTable  $table    A JTable object containing the record to be deleted
	 *
	 * @return  boolean  True on success.
	 *
	 * @since   2.5
	 * @throws  Exception on database error.
	 */
	public function onFinderAfterDelete($context, $table)
	{
	}<% } %><% if (methods.indexOf('onFinderBeforeSave') > -1) { %>
	
	/**
	 * Smart Search before content save method.
	 * This event is fired before the data is actually saved.
	 *
	 * @param   string   $context  The context of the content passed to the plugin.
	 * @param   JTable   $row      A JTable object.
	 * @param   boolean  $isNew    If the content is just about to be created.
	 *
	 * @return  boolean  True on success.
	 *
	 * @since   2.5
	 * @throws  Exception on database error.
	 */
	public function onFinderBeforeSave($context, $row, $isNew)
	{
	}<% } %><% if (methods.indexOf('onFinderAfterSave') > -1) { %>
		
	/**
	 * Smart Search after save content method.
	 * Reindexes the link information for an article that has been saved.
	 * It also makes adjustments if the access level of an item or the
	 * category to which it belongs has changed.
	 *
	 * @param   string   $context  The context of the content passed to the plugin.
	 * @param   JTable   $row      A JTable object.
	 * @param   boolean  $isNew    True if the content has just been created.
	 *
	 * @return  boolean  True on success.
	 *
	 * @since   2.5
	 * @throws  Exception on database error.
	 */
	public function onFinderAfterSave($context, $row, $isNew)
	{
	}<% } %><% if (methods.indexOf('onGetIcons') > -1) { %>
		
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
	}<% } %><% if (methods.indexOf('onAfterInitialise') > -1) { %>
		
	<% } %><% if (methods.indexOf('onAfterRoute') > -1) { %>
		
	<% } %><% if (methods.indexOf('onAfterDispatch') > -1) { %>
		
	<% } %><% if (methods.indexOf('onAfterRender') > -1) { %>
		
	<% } %><% if (methods.indexOf('onBeforeRender') > -1) { %>
		
	<% } %><% if (methods.indexOf('onBeforeCompileHead') > -1) { %>
		
	<% } %><% if (methods.indexOf('onSearch') > -1) { %>
		
	<% } %><% if (methods.indexOf('onSearchArea') > -1) { %>
		
	<% } %><% if (methods.indexOf('onGetWebServices') > -1) { %>
	
	<% } %><% if (methods.indexOf('onUserBeforeSave') > -1) { %>
		
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
	}<% } %><% if (methods.indexOf('onUserAfterSave') > -1) { %>
		
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
	}<% } %><% if (methods.indexOf('onUserBeforeDelete') > -1) { %>
		
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
	}<% } %><% if (methods.indexOf('onUserAfterDelete') > -1) { %>
		
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
	}<% } %><% } %><% if (methods.indexOf('onUserLogin') > -1) { %>
		
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
	}<% } %><% if (methods.indexOf('onUserLoginFailure') > -1) { %>
		
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
	}<% } %><% if (methods.indexOf('onUserAfterLogin') > -1) { %>
		
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
	}<% } %><% if (methods.indexOf('onUserLogout') > -1) { %>
		
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
	}<% } %><% if (methods.indexOf('onUserAuthenticate') > -1) { %>
		
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
	}<% } %><% if (methods.indexOf('onUserAuthorisation') > -1) { %>
	<!-- NO EXAMPLE OF METHOD IN JOOMLA CODE BASE [onUserAuthorisation] -->
	<% } %><% if (methods.indexOf('onUserAuthorisationFailure') > -1) { %>
	<!-- NO EXAMPLE OF METHOD IN JOOMLA CODE BASE [onUserAuthorisationFailure] -->	
	<% } %><% if (methods.indexOf('onValidateContact') > -1) { %>
		
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
	}<% } %><% if (methods.indexOf('onSubmitContact') > -1) { %>
		
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
	{
	}<% } %><% if (methods.indexOf('onInstallerBeforeInstallation') > -1) { %>
		
	<% } %><% if (methods.indexOf('onInstallerBeforeInstaller') > -1) { %>
		
	<% } %><% if (methods.indexOf('onInstallerAfterInstaller') > -1) { %>
		
	<% } %><% if (methods.indexOf('onAfterGetMenuTypeOptions') > -1) { %>
	
	<% } %>
}
