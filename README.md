
# Grunt-Princess

[Grunt](http://gruntjs.com/) Task for executing [PrinceXML](http://www.princexml.com/) via
[Node-Prince](https://github.com/rse/node-prince) integration API.

Grunt Task for running PrinceXML

<p/>
<img src="https://nodei.co/npm/grunt-princess.png?downloads=true&stars=true" alt=""/>

<p/>
<img src="https://david-dm.org/rse/grunt-princess.png" alt=""/>

## Getting Started

This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/)
before, be sure to check out the [Getting
Started](http://gruntjs.com/getting-started) guide, as it explains how
to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as
install and use Grunt plugins. Once you're familiar with that process,
you may install this plugin with this command:

```shell
npm install grunt-princess --save-dev
```

Once the plugin has been installed, it may be enabled inside your
Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks("grunt-princess");
```

## Task Options

- `binary` (default `prince`): corresponds to node-prince API function `Prince#binary()`

- `prefix` (default ``): corresponds to node-prince API function `Prince#prefix()`

- `license` (default ``): corresponds to node-prince API function `Prince#license()`

- `timeout` (default `10000`): corresponds to node-prince API function `Prince#timeout()`

- `cwd` (default `.`): corresponds to node-prince API function `Prince#cwd()`

- `option` (default `{}`): each key/value entry corresponds to node-prince API function `Prince#option()`

## Task Calling

_Run this task with the `grunt princess` command._

Task targets, files and options may be specified according to the Grunt
[Configuring tasks](http://gruntjs.com/configuring-tasks) guide.

## Usage Example

Assuming we have the following build environment:

- `Gruntfile.js`:

```js
// [...]
grunt.initConfig({
    "princess": {
        options: {
            license: "license.dat"
        },
        "user-manual": {
            options: {
                option: {
                    media: "print"
                }
            },
            src: [ "user-manual.html" ],
            dest: "user-manual.pdf"
        },
        "dev-manual": {
            options: {
                option: {
                    verbose: true
                }
            },
            src: [ "dev-manual.html" ],
            dest: "dev-manual.pdf"
        }
    }
});
grunt.registerTask("manuals", [ "princess:user-manual", "princess:dev-manual" ]);
// [...]
```

