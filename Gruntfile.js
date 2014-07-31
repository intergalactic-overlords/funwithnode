// grunt tutorial: http://merrickchristensen.com/articles/gruntjs-workflow.html

module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      src: ['Gruntfile.js', 'app.js', 'routes/**/*.js'],
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {
          require: true,
          define: true,
          requirejs: true,
          console: true,
          describe: true,
          expect: true,
          it: true,
          module: true,
          process: true,
          __dirname: true
        }
      }
    },
    /*mocha: {
      all: ['tests/index.html']
    },*/
    watch: {
      files: '<%= jshint.src %>',
      tasks: ['jshint']
    }

  });

   // Load JSHint task
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  //grunt.loadNpmTasks('grunt-mocha');

  // Default task.
  grunt.registerTask('default', ['jshint']);
};