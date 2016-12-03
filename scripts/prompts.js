"use-strict";

exports.media = [{
                type: 'checkbox',
                name: 'overrides',
                message: 'Select which configuration items you would like to override defaults for?',
                choices: [
                    'js',
                    'css',
                    'images',
                    'fonts',
                    'less',
                    'scss',
                    'sass'
                ],
                "default" : ['js', 'css', 'images', 'less'],
                store: 'false'
            }];

exports.development = [{
                type: 'input',
                name: 'author',
                message: 'Enter default author for development on this Joomla instance:',
                store: true
            },
            {
                type: 'input',
                name: 'copyright',
                message: 'Enter default copyright for development on this Joomla instance:',
                store: true
            },
            {
                type: 'input',
                name: 'license',
                message: 'Enter default license for development on this Joomla instance:',
                "default": 'GNU General Public License version 2 or later; see LICENSE.txt',
                store: true
            },
            {
                type: 'input',
                name: 'email',
                message: 'Enter default email for development on this Joomla instance:',
                store: true
            },
            {
                type: 'input',
                name: 'website',
                message: 'Enter local URL for development off this Joomla instance:',
                store: true
            },
            {
                type: 'input',
                name: 'languagecode',
                message: 'Enter default language code for development on this Joomla instance:',
                "default": 'en-GB',
                store: true
            }];