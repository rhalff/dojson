'use strict';

module.exports = function (grunt) {

  var files = ['Gruntfile.js', '*.js', 'test/*.js'];

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      all: files,
      options: grunt.file.readJSON('.jshint')
    },

    watch: {
      js: {
        files: files,
        tasks: [ 'jshint', 'shell:build', 'mocha_phantomjs:client' ]
      },
      doc: {
        files: files,
        tasks: [ 'jsdoc', 'reload:docs' ]
      }
    },

    mocha_phantomjs: {
      client: {
        files: {
          src: ['test/*.html']
        }
      }
    },

    shell: {
      build: {
        command: [
          'browserify',
          '--require ./client.js:dompointer',
          '-o build/bundle.js'
        ].join(' '),
        options: { stdout: true, stderr: true }
      }
    },

    jsdoc : {
      dist: {
        src: files,
        options: {
          configure: '.jsdoc',
          destination: 'doc/api',
          'private': false,
          template: 'node_modules/ink-docstrap/template'
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-mocha-phantomjs');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-jsdoc');

  grunt.registerTask('default', [ 'watch:js' ]);

  grunt.registerTask('docs', ['watch:doc']);
  grunt.registerTask('test', ['shell:build', 'mocha_phantomjs']);

};
