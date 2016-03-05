<% for (var i = 0; i < views.standard.length; i++) { %>
DROP TABLE IF EXISTS `#__<%= component.name %>_<%= views.standard[i].detailview.lowercase %>`;<% } %>