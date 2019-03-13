module.exports = grunt => {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean:  { all: [ 'dist/icons/sprites' ] },

    svgstore: {
      options: {
        cleanup: true,
        cleanupdefs: true,
        includeTitleElement: false,
        prefix: 'ds-icon-',
        svg: {
          style: 'display:none'
        }
      },

      dashboard: {
        dest: 'icons/sprites/icons-dashboard.svg',
        src: 'icons/dashboard/**/*.svg',
        options: { svg: { id: 'ds-sprites--icons-dashboard' } }
      },

      logos: {
        dest: 'icons/sprites/logos.svg',
        src: 'icons/logos/**/*.svg',
        options: { svg: { id: 'ds-sprites--icons-logos' } }
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
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-svgstore');

  grunt.registerTask('default', '', [
    'clean:all',
    'svgstore'
  ]);
};
