<?php
/**
 * @package     Joomla.Administrator
 * @subpackage	com_<%= component.name %>
 *
 * @copyright	<%= development.copyright %>
 * @license		<%= development.license %>
 */

defined('_JEXEC') or die;

JHtml::addIncludePath(JPATH_COMPONENT . '/helpers/html');

JHtml::_('behavior.formvalidation');
JHtml::_('formbehavior.chosen', 'select');

?>
<script type="text/javascript">
	Joomla.submitbutton = function(task)
	{
		if (task == '<%= views.standard[index].detailview.lowercase %>.cancel' || document.formvalidator.isValid(document.id('<%= views.standard[index].detailview.lowercase %>-form'))) {<% if (db.fields.description) { %>
			<?php echo $this->form->getField('description')->save(); ?><% } %>
			Joomla.submitform(task, document.getElementById('<%= views.standard[index].detailview.lowercase %>-form'));
		}
	}
</script>

<form action="<?php echo JRoute::_('index.php?option=com_<%= component.name %>&layout=edit&id=' . (int) $this->item->id); ?>" method="post" name="adminForm" id="<%= views.standard[index].detailview.lowercase %>-form" class="form-validate">

	<?php echo JLayoutHelper::render('joomla.edit.title_alias', $this); ?>

	<div class="form-horizontal">
		<?php echo JHtml::_('bootstrap.startTabSet', 'myTab', array('active' => 'details')); ?>

		<?php echo JHtml::_('bootstrap.addTab', 'myTab', 'details', empty($this->item->id) ? JText::_('COM_<%= uppercase %>_NEW_<%= views.standard[index].detailview.uppercase %>', true) : JText::_('COM_<%= uppercase %>_EDIT_<%= views.standard[index].detailview.uppercase %>', true)); ?>
		<div class="row-fluid">
			<div class="span9">
				<div class="form-vertical"><% if (db.fields.url) { %>
					<?php echo $this->form->getControlGroup('url'); ?><% } %><% if (db.fields.description) { %>
					<?php echo $this->form->getControlGroup('description'); ?><% } %>
				</div>
			</div>
			<div class="span3">
				<?php echo JLayoutHelper::render('joomla.edit.global', $this); ?>
			</div>
		</div>
		<?php echo JHtml::_('bootstrap.endTab'); ?>
		<% if (db.fields.images) { %>
		<?php echo JHtml::_('bootstrap.addTab', 'myTab', 'images', JText::_('JGLOBAL_FIELDSET_IMAGE_OPTIONS', true)); ?>
			<div class="row-fluid">
				<div class="span6">
					<?php echo $this->form->getControlGroup('images'); ?>
					<?php foreach ($this->form->getGroup('images') as $field) : ?>
						<?php echo $field->getControlGroup(); ?>
					<?php endforeach; ?>
				</div>
			</div>
		<?php echo JHtml::_('bootstrap.endTab'); ?><% } %>
		<% if (db.fields.publish || db.fields.metadata) { %>
		<?php echo JHtml::_('bootstrap.addTab', 'myTab', 'publishing', JText::_('JGLOBAL_FIELDSET_PUBLISHING', true)); ?>
		<div class="row-fluid form-horizontal-desktop"><% if (db.fields.publish || db.fields.metadata) { %>
			<div class="span6">
				<?php echo JLayoutHelper::render('joomla.edit.publishingdata', $this); ?>
			</div><% } %><% if (db.fields.publish || db.fields.metadata) { %>
			<div class="span6">
				<?php echo JLayoutHelper::render('joomla.edit.metadata', $this); ?>
			</div><% } %>
		</div>
		<?php echo JHtml::_('bootstrap.endTab'); ?><% } %>
		<% if (db.fields.params) { %>
		<?php echo JLayoutHelper::render('joomla.edit.params', $this); ?>
		<% } %>
		<?php echo JHtml::_('bootstrap.endTabSet'); ?>

	</div>

	<input type="hidden" name="task" value="" />
	<?php echo JHtml::_('form.token'); ?>
</form>
