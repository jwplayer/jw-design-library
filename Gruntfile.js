module.exports = function (grunt) {
  'use strict';
  var config = {};
  config.pkg = grunt.file.readJSON('package.json');

  config.watch = {
    files: ['styles/mixins/**/*.less', 'styles/**/*.less', 'icons/dashboard/**/*.svg', 'icons/player/**/*.svg'],
    tasks: ['default']
  };

  config.clean =  {
    all: ['styles/hook.css', 'styles/hook.min.css', 'icons/sprites']
  };

  config.less = {
    build: {
      files: { 'styles/hook.css' : 'styles/hook.less' }
    }
  };

  config.cssmin = {
    build: {
      options: { keepSpecialComments: 0 },
      files: { 'styles/hook.min.css': 'styles/hook.css' }
    }
  };

  config.svgstore = {
    dashboard: {
      files: { 'icons/sprites/icons-dashboard.svg' : ['icons/dashboard/**/*.svg'] },
      options: {
        cleanup: true,
        cleanupdefs: true,
        includeTitleElement: false
      }
    },
    player: {
      files: { 'icons/sprites/icons-player.svg' : ['icons/player/**/*.svg'] }
    },
    logos: {
      files: { 'icons/sprites/logos.svg' : ['icons/logos/**/*.svg'] }
    }
  };

  grunt.initConfig(config);

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-svgstore');

  grunt.registerTask('default', '', function() {

    var tasks = [
      'clean:all',
      'svgstore',
      'less',
      'cssmin',
      'watch'
    ];

    grunt.task.run(tasks);

  });

};
