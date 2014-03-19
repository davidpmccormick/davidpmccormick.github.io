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

      grunticon: {
        dmcIcons: {
          files: [{
            expand: true,
            cwd: 'public/assets/images/source',
            src: ['*.svg', '*.png'],
            dest: "public/assets/images/output"
          }],
          options: {
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
        dist: {
          src: [
          'public/js/imager.min.js',
          'public/js/app.js'
          ],
          dest: 'public/js/build/production.js',
        }
      },

      uglify: {
        build: {
          src: 'public/js/build/production.js',
          dest: 'public/js/build/production.min.js'
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
        },
        js: {
          files: ['public/js/*.js'],
          tasks: ['concat', 'uglify'],
          options: {
            spawn: false
          }
        }
      }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-grunticon');

    grunt.registerTask('icons', ['grunticon:dmcIcons']);
    grunt.registerTask('default', ['sass', 'compass', 'concat', 'uglify', 'watch']);

  };