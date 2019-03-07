module.exports = grunt => {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean:  {
      all: [
        'icons/sprites',
        'styles/hook.css',
        'styles/hook.min.css'
      ]
    },

    cssmin: {
      options: {
        keepSpecialComments: 0
      },

      build: {
        dest: 'styles/hook.min.css',
        src: 'styles/hook.css'
      }
    },

    less: {
      options: {
        strictMath: true
      },

      build: {
        dest: 'styles/hook.css',
        src: 'styles/hook.less'
      }
    },

    svgstore: {
      options: {
        cleanup: true,
        cleanupdefs: true,
        includeTitleElement: false,
        prefix: 'ds-icon-',
        svg: {
          style: 'width:0;height:0;visibility:hidden;'
        }
      },

      dashboard: {
        dest: 'icons/sprites/icons-dashboard.svg',
        src: 'icons/dashboard/**/*.svg',
        options: {
          svg: {
            id: 'ds-sprites--icons-dashboard'
          }
        }
      },

      logos: {
        dest: 'icons/sprites/logos.svg',
        src: 'icons/logos/**/*.svg',
        options: {
          svg: {
            id: 'ds-sprites--icons-logos'
          }
        }
      },

      player: {
        dest: 'icons/sprites/icons-player.svg',
        src: 'icons/player/**/*.svg',
        options: {
          svg: {
            id: 'ds-sprites--icons-player'
          }
        }
      }
    },

    watch: {
      sprites: {
        files: [
          'icons/dashboard/**/*.svg',
          'icons/player/**/*.svg'
        ],
        tasks: ['svgstore']
      },

      styles: {
        files: [ 'styles/**/*.less' ],
        tasks: [ 'less', 'cssmin' ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-svgstore');

  grunt.registerTask('default', '', [
    'clean:all',
    'svgstore',
    'less',
    'cssmin'
  ]);

  grunt.registerTask('dev', '', [
    'less',
    'cssmin',
    'svgstore',
    'watch'
  ]);
};
