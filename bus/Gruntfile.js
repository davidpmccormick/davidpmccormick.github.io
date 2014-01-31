module.exports = function(grunt) {

    // 1. All configuration goes here
    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),

      sass: {
        dist: {
          options: {
            style: 'compressed',
            compass: true
          },
          files: {
            'css/build/main.css': 'css/main.scss'
          }
        }
      },

      concat: {
        dist: {
          src: [
          'js/libs/angular.min.js',
          'js/libs/angular-route.min.js',
          'js/app.js'
          ],
          dest: 'js/build/production.js',
        }
      },

      uglify: {
        build: {
          src: 'js/build/production.js',
          dest: 'js/build/production.min.js'
        }
      },

      compass: {
        dist: {
          options: {
            config: 'config.rb'
          }
        }
      },

      watch: {
        options: {
          livereload: true,
        },
        scripts: {
          files: [
            'js/libs/angular.min.js',
            'js/libs/angular-route.min.js',
            'js/app.js'
          ],
          tasks: ['concat', 'uglify'],
          options: {
            spawn: false,
          },
        },
        html: {
          files: ['index.html'],
          options: {
            spawn: false,
          }
        },
        css: {
          files: ['css/*.scss'],
          tasks: ['sass'],
          options: {
            spawn: false,
          }
        }
      }
    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-watch');


    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['sass', 'compass', 'concat', 'uglify', 'watch']);

  };