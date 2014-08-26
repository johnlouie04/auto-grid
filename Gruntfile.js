module.exports = function(grunt) {

    var jsHints = [ 
            'Gruntfile.js'
        ];

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            all: [
                jsHints
            ],

            options: {
                ignores: '.jshintignore',
                smarttabs: true
            },
        },

        cssmin: {
            add_banner: {
                options: {
                    report: 'min',
                    compatibility: 'ie8',
                    banner: '/* <%= pkg.name %> - v<%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd") %> */'
                },
                files: {
                    'dest/grid.min.css': [
                        'css/grid.css',
                    ]
                },
            }
        },

        watch: {
            options: {
                dateFormat: function(time) {
                  grunt.log.writeln('The watch finished in ' + time + 'ms at' + (new Date()).toString());
                  grunt.log.writeln('Waiting for more changes...');
                },
            },

            gruntfile: {
                files: 'Gruntfile.js',
                tasks: ['jshint'],
            },


            css: {
                files: ['**/*.css'],
                tasks: ['cssmin'],
                options: {
                    spawn: false,
                },
            }
        }

    });

    // Load the plugin that provides the task.
    require('load-grunt-tasks')(grunt);

    // Default task(s).
    grunt.registerTask('default', ['jshint','cssmin']);
    grunt.registerTask('inspect', ['watch']);

};