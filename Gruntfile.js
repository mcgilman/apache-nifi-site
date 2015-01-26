module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        
        clean: {
            options: {
                force: true
            },
            js: ['dist/js/'],
            css: ['dist/css/'],
            assets: ['dist/assets/*']
        },
        
        assemble: {
            options: {
                partials: 'src/includes/*.hbs',
                layout: 'src/layouts/default.hbs',
                flatten: true
            },
            pages: {
                files: {
                    'dist/': ['src/pages/*.hbs']
                }
            }
        },
        
        compass: {
            dist: {
                options: {
                    config: 'config.rb'
                }
            }
        },
        
        concat: {
            options: {
                separator: ';'
            },
            foundation: {
                src: [
                    'bower_components/foundation/js/foundation/foundation.js',
                    'bower_components/foundation/js/foundation/foundation.topbar.js'
                    // 'bower_components/foundation/js/foundation/foundation.abide.js',
                    // 'bower_components/foundation/js/foundation/foundation.joyride.js',
                    // ...more foundation JS you might want to add
                ],
                dest: 'dist/assets/js/foundation.js'
            },
            modernizr: {
                src: [
                    'bower_components/modernizr/modernizr.js'
                    // 'develop/js/custom.modernizr.js'
                ],
                dest: 'dist/assets/js/modernizr.js'
            },
            nifi: {
                src: [
                    'src/js/app.js'
                ],
                dest: 'dist/js/app.js'
            }
        },
        
        copy: {
            dist: {
                files: [{
                    expand: true,
                    cwd:  'src/images/',
                    src:  ['**/*.{png,jpg,gif,svg,ico}'],
                    dest: 'dist/images/'
                }, {
                    expand: true,
                    cwd:  'bower_components/jquery/dist',
                    src:  ['jquery.min.js'],
                    dest: 'dist/assets/js/'
                }, {
                    expand: true,
                    cwd:  'bower_components/webfontloader',
                    src:  ['webfontloader.js'],
                    dest: 'dist/assets/js/'
                }]
            }
        },
        
        watch: {
            grunt: { 
                files: ['Gruntfile.js'], 
                tasks: ['dev'] 
            },
            css: {
                files: 'src/scss/*.scss',
                tasks: ['css']
            },
            script: {
                files: 'src/js/*.js',
                tasks: ['js']
            },
            images: {
                files: 'src/images/*.{png,jpg,gif,svg,ico}',
                tasks: ['img']
            },
            assemble: {
                files: 'src/{includes,layouts,pages}/*.hbs',
                tasks: ['assemble']
            }
        }
    });
    
    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('assemble');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    
    grunt.registerTask('img', ['newer:copy']);
    grunt.registerTask('css', ['clean:css', 'compass']);
    grunt.registerTask('js',  ['clean:js', 'concat']);
    grunt.registerTask('dev',  ['clean', 'assemble', 'css', 'js', 'img', 'copy', 'watch']);
    grunt.registerTask('default', ['clean', 'assemble', 'css', 'js', 'img', 'copy']);
};
