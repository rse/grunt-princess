
/* global module: true */
module.exports = function (grunt) {
    grunt.initConfig({
        princess: {
            "test": {
                options: {
                },
                src: "test.html",
                dest: "test.pdf"
            },
        },
        clean: {
            clean:     [ "test.pdf" ],
            distclean: [ "node_modules" ]
        }
    });
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadTasks("../tasks");
    grunt.registerTask("default", [ "princess:test" ]);
};

