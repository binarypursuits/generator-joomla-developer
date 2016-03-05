<% for (var i = 0; i < views.standard.length; i++) { %>
CREATE TABLE IF NOT EXISTS `#__<%= component.name %>_<%= views.standard[i].detailview.lowercase %>` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,<% if (views.standard[i].db.fields.categories) { %>
  `catid` int(11) NOT NULL DEFAULT '0',
  `sid` int(11) NOT NULL DEFAULT '0',
  `title` varchar(250) NOT NULL DEFAULT '',
  `alias` varchar(255) NOT NULL DEFAULT '',<% if (views.standard[i].db.fields.description) { %>
  `description` text NOT NULL,<% } %><% if (views.standard[i].db.fields.hits) { %>
  `hits` int(11) NOT NULL DEFAULT '0',<% } %><% if (views.standard[i].db.fields.publish) { %>
  `state` tinyint(1) NOT NULL DEFAULT '0',
  `checked_out` int(11) NOT NULL DEFAULT '0',
  `checked_out_time` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',<% } %><% if (views.standard[i].db.fields.ordering) { %>
  `ordering` int(11) NOT NULL DEFAULT '0',<% } %>
  `archived` tinyint(1) NOT NULL DEFAULT '0',
  `access` int(11) NOT NULL DEFAULT '1',<% if (views.standard[i].db.fields.params) { %>
  `params` text NOT NULL,<% } %><% if (views.standard[i].db.fields.urls) { %>
  `urls` text NOT NULL,<% } %><% if (views.standard[i].db.fields.images) { %>
  `images` text NOT NULL,<% } %>
  `language` char(7) NOT NULL DEFAULT '',<% } %><% if (views.standard[i].db.fields.timestamp) { %>
  `created` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `created_by` int(10) unsigned NOT NULL DEFAULT '0',
  `created_by_alias` varchar(255) NOT NULL DEFAULT '',
  `modified` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `modified_by` int(10) unsigned NOT NULL DEFAULT '0',<% } %><% if (views.standard[i].db.fields.metadata) { %>
  `metakey` text NOT NULL,
  `metadesc` text NOT NULL,
  `metadata` text NOT NULL,<% } %><% if (views.standard[i].db.fields.featured) { %>
  `featured` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT 'Set if link is featured.',<% } %>
  `xreference` varchar(50) NOT NULL COMMENT 'A reference to enable linkages to external data sets.',<% if (views.standard[i].db.fields.publish) { %>
  `publish_up` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `publish_down` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',<% } %>
  PRIMARY KEY (`id`),
  KEY `idx_access` (`access`),<% if (views.standard[i].db.fields.publish) { %>
  KEY `idx_checkout` (`checked_out`),
  KEY `idx_state` (`state`),<% } %><% if (views.standard[i].db.fields.categories) { %>
  KEY `idx_catid` (`catid`),<% } %><% if (views.standard[i].db.fields.timestamp) { %>
  KEY `idx_createdby` (`created_by`),<% } %><% if (views.standard[i].db.fields.featured) { %>
  KEY `idx_featured_catid` (`featured`<% if (views.standard[i].db.fields.categories) { %>,`catid`<% } %>),<% } %><% if (views.standard[i].db.fields.language) { %>
  KEY `idx_language` (`language`),<% } %>
  KEY `idx_xreference` (`xreference`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;
<% } %>