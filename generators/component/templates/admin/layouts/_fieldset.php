<?php
/**
 * @package     Joomla.Administrator
 * @subpackage	com_<%= component.name %>
 *
 * @copyright	<%= development.copyright %>
 * @license		<%= development.license %>
 */

defined('_JEXEC') or die;
?>

<?php foreach ($displayData as $name => $fieldSet) : ?>

	<div class="tab-pane" id="params-<?php echo $name;?>">

		<?php if (isset($fieldSet->description) && trim($fieldSet->description)) : ?>
			<p class="alert alert-info">
				<?php echo $this->escape(JText::_($fieldSet->description)); ?>
			</p>
		<?php endif; ?>

		<?php foreach ($this->form->getFieldset($name) as $field) : ?>

			<?php if ($field->hidden) : ?>
				<?php echo $field->input; ?>
			<?php else : ?>
				<div class="control-group">
					<div class="control-label"><?php echo $field->label; ?></div>
					<div class="controls"><?php echo $field->input; ?></div>
				</div>
			<?php endif; ?>

		<?php endforeach; ?>

	</div>
<?php endforeach; ?>
