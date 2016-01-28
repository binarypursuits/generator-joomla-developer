'use strict';

module.exports = function (grunt) {

    grunt.config('azure-blob', {
        documentation: {
            options: {
                containerName: 'hilco',
                containerDelete: true,
                containerOptions: {
                    publicAccessLevel: "blob"
                },
                gzip: false,
                metadata: {
                    cacheControl: "public, max-age=31556926"
                }

            },
            files:
                [
                    {
                        expand: true,
                        cwd: './docs',
                        src: ['**/*']
                    }
                ]
        },
        sugar: {
            options: {
                containerName: 'sugar',
                containerDelete: false,
                containerOptions: {
                    publicAccessLevel: "blob"
                },
                gzip: false,
                metadata: {
                    cacheControl: "public, max-age=31556926"
                }

            },
            files:
                [
                    {
                        expand: true,
                        cwd: '<%= joomla.root %>/images/sugar/',
                        src: ['**/*']
                    }
                ]
        },
        pdf: {
            options: {
                containerName: 'pdf',
                containerDelete: false,
                containerOptions: {
                    publicAccessLevel: "blob"
                },
                gzip: false,
                metadata: {
                    cacheControl: "public, max-age=31556926"
                }

            },
            files:
                [
                    {
                        expand: true,
                        cwd: './<%= joomla.root %>/libraries/hilco/cache/',
                        src: ['*.pdf']
                    }
                ]
        },
        hilco_css: {
            options: {
                containerName: 'media',
                containerDelete: false,
                containerOptions: {
                    publicAccessLevel: "blob"
                },
                gzip: true,
                metadata: {
                    cacheControl: "public, max-age=31556926"
                }

            },
            files:
                [
                    {
                        expand: true,
                        cwd: './<%= joomla.root %>/media/',
                        src: [
                            'com_hassetdb/**/*.min.css',
                            'mod_hweb_feature_sales_rotator_homepage/**/*.min.css',
                            'mod_hweb_featured_asset/**/*.min.css',
                            'tpl_hilco/**/*.min.css'
                        ]
                    }
                ]
        },
        hilco_js: {
            options: {
                containerName: 'media',
                containerDelete: false,
                containerOptions: {
                    publicAccessLevel: "blob"
                },
                gzip: true,
                metadata: {
                    cacheControl: "public, max-age=31556926"
                }

            },
            files:
                [
                    {
                        expand: true,
                        cwd: './<%= joomla.root %>/media/',
                        src: [
                            'com_hassetdb/**/*.min.js',
                            'mod_hweb_feature_sales_rotator_homepage/**/*.min.js',
                            'mod_hweb_featured_asset/**/*.min.js',
                            'tpl_hilco/**/*.min.js'
                        ]
                    }
                ]
        },
        hilco_detailview: {
            options: {
                containerName: 'media',
                containerDelete: false,
                containerOptions: {
                    publicAccessLevel: "blob"
                },
                gzip: true,
                metadata: {
                    cacheControl: "public, max-age=31556926"
                }

            },
            files:
                [
                    {
                        expand: true,
                        cwd: './<%= joomla.root %>/media/',
                        src: [
                            'com_hassetdb/js/detailview.min.js',
                            'com_hassetdb/js/detailview.*.js'
                        ]
                    }
                ]
        },
        hilco_calendar: {
            options: {
                containerName: 'media',
                containerDelete: false,
                containerOptions: {
                    publicAccessLevel: "blob"
                },
                gzip: true,
                metadata: {
                    cacheControl: "public, max-age=31556926"
                }

            },
            files:
                [
                    {
                        expand: true,
                        cwd: './<%= joomla.root %>/media/',
                        src: [
                            'com_hassetdb/js/calendar.min.js',
                            'com_hassetdb/js/calendar.js'
                        ]
                    }
                ]
        },
        hilco_inventory: {
            options: {
                containerName: 'media',
                containerDelete: false,
                containerOptions: {
                    publicAccessLevel: "blob"
                },
                gzip: true,
                metadata: {
                    cacheControl: "public, max-age=31556926"
                }

            },
            files:
                [
                    {
                        expand: true,
                        cwd: './<%= joomla.root %>/media/',
                        src: [
                            'com_hassetdb/js/inventory.min.js',
                            'com_hassetdb/js/inventory.js'
                        ]
                    }
                ]
        },
        hilco_media: {
            options: {
                containerName: 'media',
                containerDelete: false,
                containerOptions: {
                    publicAccessLevel: "blob"
                },
                gzip: true,
                metadata: {
                    cacheControl: "public, max-age=31556926"
                }

            },
            files:
                [
                    {
                        expand: true,
                        cwd: './<%= joomla.root %>/media/',
                        src: [
                            'com_hassetdb/**/*.js', 'com_hassetdb/**/*.css',
                            'mod_hweb_feature_sales_rotator_homepage/**/*.js', 'mod_hweb_feature_sales_rotator_homepage/**/*.css',
                            'mod_hweb_featured_asset/**/*.js', 'mod_hweb_featured_asset/**/*.css',
                            'tpl_hilco/**/*.js', 'tpl_hilco/**/*.css'
                        ]
                    }
                ]
        },
        media_gzip: {
            options: {
                containerName: 'media',
                containerDelete: false,
                containerOptions: {
                    publicAccessLevel: "blob"
                },
                gzip: true,
                metadata: {
                    cacheControl: "public, max-age=31556926"
                }

            },
            files:
                [
                    {
                        expand: true,
                        cwd: './<%= joomla.root %>/media/',
                        src: ['**/*.js', '**/*.css']
                    }
                ]
        },
        media_normal: {
            options: {
                containerName: 'media',
                containerDelete: false,
                containerOptions: {
                    publicAccessLevel: "blob"
                },
                gzip: false,
                metadata: {
                    cacheControl: "public, max-age=31556926"
                }

            },
            files:
                [
                    {
                        expand: true,
                        cwd: './<%= joomla.root %>/media/',
                        src: ['**/*', '!**/*.js', '!**/*.css']
                    }
                ]
        },
        images: {
            options: {
                containerName: 'images',
                containerDelete: false,
                containerOptions: {
                    publicAccessLevel: "blob"
                },
                gzip: false,
                metadata: {
                    cacheControl: "public, max-age=31556926"
                }
            },
            files:
                [
                    {
                        expand: true,
                        cwd: './<%= joomla.root %>/images/',
                        src: ['**/*', '!sugar/']
                    }
                ]
        }
        
    });

};


