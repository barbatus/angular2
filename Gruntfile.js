module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    webpack: {
      angular2_bundle: {
        entry: './angular2.js',
        output: {
          filename: './dist/angular2.js'
        }
      }
    },
    tsd: {
      refresh: {
        options: {
          command: 'reinstall',
          config: 'tsd.json'
        }
      }
    },
    copy: {
      angular2_typings: {
        files: [
          {src: ['node_modules/angular2/bundles/typings/angular2/angular2.d.ts'], dest: 'typings/angular2/angular2.d.ts'},

          {src: ['node_modules/angular2/bundles/typings/angular2/router.d.ts'], dest: 'typings/angular2/router.d.ts'},
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-npm-install');
  grunt.loadNpmTasks('grunt-webpack');
  grunt.loadNpmTasks('grunt-tsd');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('default', ['npm-install:angular2',
    'webpack:angular2_bundle', 'tsd:refresh', 'copy:angular2_typings']);
};
