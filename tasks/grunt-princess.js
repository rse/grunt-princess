/*
**  grunt-princess -- Grunt Task for running PrinceXML
**  Copyright (c) 2014-2018 Ralf S. Engelschall <rse@engelschall.com>
**
**  Permission is hereby granted, free of charge, to any person obtaining
**  a copy of this software and associated documentation files (the
**  "Software"), to deal in the Software without restriction, including
**  without limitation the rights to use, copy, modify, merge, publish,
**  distribute, sublicense, and/or sell copies of the Software, and to
**  permit persons to whom the Software is furnished to do so, subject to
**  the following conditions:
**
**  The above copyright notice and this permission notice shall be included
**  in all copies or substantial portions of the Software.
**
**  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
**  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
**  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
**  IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
**  CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
**  TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
**  SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

/* global module:  false */
/* global require: false */

/*  foreign modules  */
var fs     = require("fs");
var chalk  = require("chalk");
var Prince = require("prince");

module.exports = function (grunt) {
    grunt.registerMultiTask("princess", "Run PrinceXML", function () {
        /*  prepare options  */
        var options = this.options({
            binary:  "",
            prefix:  "",
            license: "",
            timeout: 10 * 1000,
            cwd:     ".",
            option:  {}
        });
        grunt.verbose.writeflags(options, "Options");

        /*  sanity check usage  */
        if (this.files.length !== 1)
            throw new Error("support only one src/dest pair");
        var inputs = this.files[0].src;
        var output = this.files[0].dest;

        /*  configure an PrinceXML execution instance  */
        var prince = Prince();
        if (options.binary !== "")
            prince.binary(options.binary);
        if (options.prefix !== "")
            prince.prefix(options.prefix);
        if (options.license !== "")
            prince.license(options.license);
        prince.timeout(options.timeout);
        prince.cwd(options.cwd);
        prince.inputs(inputs);
        prince.output(output);
        for (var name in options.option) {
            if (!options.option.hasOwnProperty(name))
                continue;
            prince.option(name, options.option[name]);
        }

        /*  asynchronously execute PrinceXML  */
        var done = this.async();
        prince.execute().then(function () {
            /*  determine output size  */
            var stat = fs.statSync(output);
            var bytes = 0;
            if (typeof stat === "object" && stat.size > 0)
                bytes = stat.size;
            else
                grunt.log.warn(chalk.red("successful PrinceXML execution, but invalid output file!"));

            /*  provide success feedback  */
            grunt.log.writeln("PrinceXML successfully generated \"" +
                chalk.green(output) + "\" (" + bytes + " bytes)");

            /*  finish successfully  */
            done();
        }, function (e) {
            /*  utility function for rendering a piece of error  */
            var render = function (header, body) {
                var result = "";
                if (body !== "") {
                   result += chalk.red.bold(header) + ":\n";
                   result += chalk.red(body.replace(/\r?\n/, "").replace(/^/mg, "| ")) + "\n";
                }
                return result;
            };

            /*  provide error feedback  */
            var err = render("PrinceXML failed to generate \"" + output + "\"", e.error.toString());
            err += render("stdout output", e.stdout.toString());
            err += render("stderr output", e.stderr.toString());
            grunt.fail.fatal(err);

            /*  finish unsuccessfully  */
            done(false);
        });
    });
};

