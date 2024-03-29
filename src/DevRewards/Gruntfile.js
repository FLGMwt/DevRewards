﻿module.exports = function (grunt) {
    // load Grunt plugins from NPM
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // configure plugins
    grunt.initConfig({
        uglify: {
            options: {
                mangle: false,
                beautify: true
            },
            my_target: {
                files: { 'wwwroot/app.js': ['Scripts/tp/slabtext.min.js', 'Scripts/app.js', 'Scripts/**/*.js'] }
            }
        },
        watch: {
            scripts: {
                files: ['Scripts/**/*.js'],
                tasks: ['uglify']
            }
        }
    });

    // define tasks
    grunt.registerTask('default', ['uglify', 'watch']);
};