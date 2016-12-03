'use strict';

module.exports = function (grunt) {

    grunt.config('copy', {
        jenkins: {
              files: [
                {
                    expand: true,
                    cwd: '<%= joomla.root %>/',
                    src: ['**/*'],
                    dest: '<%= jenkins.apache.webroot %>'
                }
            ]
        },
        configuration: {
            src: 'build/configuration.php',
            dest: "<%= arc.jenkins.apache.webroot %>",
            options: {
                process: function(content, srcpath) {
                    var arc = grunt.config.get('arc');
                    return grunt.template.process(content, arc);
                }
            }
        },
        main: {
            files: [
                {
                    expand: true,
                    cwd: 'build/',
                    src: ['*.css'],
                    dest: '<%= repository.path %>/<%= repository.joomla %>/media/plg_system_jopt/css/'
                },
                {
                    expand: true,
                    cwd: 'build/',
                    src: ['*.css.gz'],
                    dest: '<%= repository.path %>/<%= repository.joomla %>/media/plg_system_jopt/css/'
                },
                {
                    expand: true,
                    cwd: 'build/',
                    src: ['*.js'],
                    dest: '<%= repository.path %>/<%= repository.joomla %>/media/plg_system_jopt/js/'
                },
                {
                    expand: true,
                    cwd: 'build/',
                    src: ['*.js.gz'],
                    dest: '<%= repository.path %>/<%= repository.joomla %>/media/plg_system_jopt/js/'
                },
                {
                    expand: true,
                    cwd: 'configs/',
                    src: ['*.json'],
                    dest: '<%= repository.path %>/<%= repository.joomla %>/media/plg_system_jopt/configs/'
                }
            ]
        }
    });

};
