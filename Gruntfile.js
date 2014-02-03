module.exports = function(grunt) {

    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),

      sass: {
        dist: {
          options: {
            style: 'compressed',
            compass: true
          },
          files: {
            'public/css/build/main.css': 'public/css/main.scss'
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

      watch: {
        options: {
          livereload: true,
        },
        html: {
          files: ['index.html'],
          options: {
            spawn: false,
          }
        },
        css: {
          files: ['public/css/*.scss'],
          tasks: ['sass'],
          options: {
            spawn: false,
          }
        }
      }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['sass', 'compass', 'watch']);

  };