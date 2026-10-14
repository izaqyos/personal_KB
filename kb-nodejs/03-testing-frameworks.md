---
type: reference
title: Testing frameworks.
description: Section 3 of the legacy nodejs-kb notes.
tags: [kb-nodejs, grunt, mocha, sinon, chai, mockito, ts-mockito, tutorial]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "nodejs-kb#3"
---

# Testing frameworks. tags: grunt, Mocha, sinon, chai, mockito, ts-mockito

[↑ nodejs-kb](/kb-nodejs/README.md)

## 3.1 grunt

### 3.1.1 https://gruntjs.com/getting-started

```text
Getting started

Grunt and Grunt plugins are installed and managed via npm, the Node.js package manager. Grunt 0.4.x requires stable Node.js versions >= 0.8.0.

Before setting up Grunt ensure that your npm is up-to-date by running npm update -g npm (this might require sudo on certain systems).

If you already have installed Grunt and are now searching for some quick reference, please checkout our Gruntfile example and how to configure a task.

Installing the CLI
Using Grunt 0.3? Please see Grunt 0.3 Notes

In order to get started, you'll want to install Grunt's command line interface (CLI) globally. You may need to use sudo (for OSX, *nix, BSD etc) or run your command shell as Administrator (for Windows) to do this.

npm install -g grunt-cli
This will put the grunt command in your system path, allowing it to be run from any directory.

Note that installing grunt-cli does not install the Grunt task runner! The job of the Grunt CLI is simple: run the version of Grunt which has been installed next to a Gruntfile. This allows multiple versions of Grunt to be installed on the same machine simultaneously.

How the CLI works
Each time grunt is run, it looks for a locally installed Grunt using node's require() system. Because of this, you can run grunt from any subfolder in your project.

If a locally installed Grunt is found, the CLI loads the local installation of the Grunt library, applies the configuration from your Gruntfile, and executes any tasks you've requested for it to run. To really understand what is happening, read the code.

Working with an existing Grunt project
Assuming that the Grunt CLI has been installed and that the project has already been configured with a package.json and a Gruntfile, it's very easy to start working with Grunt:

Change to the project's root directory.
Install project dependencies with npm install.
Run Grunt with grunt.
That's really all there is to it. Installed Grunt tasks can be listed by running grunt --help but it's usually a good idea to start with the project's documentation.

Preparing a new Grunt project
A typical setup will involve adding two files to your project: package.json and the Gruntfile.

package.json: This file is used by npm to store metadata for projects published as npm modules. You will list grunt and the Grunt plugins your project needs as devDependencies in this file.

Gruntfile: This file is named Gruntfile.js or Gruntfile.coffee and is used to configure or define tasks and load Grunt plugins. When this documentation mentions a Gruntfile it is talking about a file, which is either a Gruntfile.js or a Gruntfile.coffee.

package.json
The package.json file belongs in the root directory of your project, next to the Gruntfile, and should be committed with your project source. Running npm install in the same folder as a package.json file will install the correct version of each dependency listed therein.

There are a few ways to create a package.json file for your project:

Most grunt-init templates will automatically create a project-specific package.json file.
The npm init command will create a basic package.json file.
Start with the example below, and expand as needed, following this specification.
{
  "name": "my-project-name",
  "version": "0.1.0",
  "devDependencies": {
    "grunt": "~0.4.5",
    "grunt-contrib-jshint": "~0.10.0",
    "grunt-contrib-nodeunit": "~0.4.1",
    "grunt-contrib-uglify": "~0.5.0"
  }
}
Installing Grunt and gruntplugins

The easiest way to add Grunt and gruntplugins to an existing package.json is with the command npm install <module> --save-dev. Not only will this install <module> locally, but it will automatically be added to the devDependencies section, using a tilde version range.

For example, this will install the latest version of Grunt in your project folder, adding it to your devDependencies:

npm install grunt --save-dev
The same can be done for gruntplugins and other node modules. As seen in the following example installing the JSHint task module:

npm install grunt-contrib-jshint --save-dev
Checkout the current available gruntplugins to be installed and used on your project at the plugins page.

Be sure to commit the updated package.json file with your project when you're done!

The Gruntfile
The Gruntfile.js or Gruntfile.coffee file is a valid JavaScript or CoffeeScript file that belongs in the root directory of your project, next to the package.json file, and should be committed with your project source.

A Gruntfile is comprised of the following parts:

The "wrapper" function
Project and task configuration
Loading Grunt plugins and tasks
Custom tasks
An example Gruntfile

In the following Gruntfile, project metadata is imported into the Grunt config from the project's package.json file and the grunt-contrib-uglify plugin's uglify task is configured to minify a source file and generate a banner comment dynamically using that metadata. When grunt is run on the command line, the uglify task will be run by default.

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/<%= pkg.name %>.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('default', ['uglify']);

};
Now that you've seen the whole Gruntfile, let's look at its component parts.

The "wrapper" function

Every Gruntfile (and gruntplugin) uses this basic format, and all of your Grunt code must be specified inside this function:

module.exports = function(grunt) {
  // Do grunt-related things in here
};
Project and task configuration

Most Grunt tasks rely on configuration data defined in an object passed to the grunt.initConfig method.

In this example, grunt.file.readJSON('package.json') imports the JSON metadata stored in package.json into the grunt config. Because <% %> template strings may reference any config properties, configuration data like filepaths and file lists may be specified this way to reduce repetition.

You may store any arbitrary data inside of the configuration object, and as long as it doesn't conflict with properties your tasks require, it will be otherwise ignored. Also, because this is JavaScript, you're not limited to JSON; you may use any valid JS here. You can even programmatically generate the configuration if necessary.

Like most tasks, the grunt-contrib-uglify plugin's uglify task expects its configuration to be specified in a property of the same name. Here, the banner option is specified, along with a single uglify target named build that minifies a single source file to a single destination file.

// Project configuration.
grunt.initConfig({
  pkg: grunt.file.readJSON('package.json'),
  uglify: {
    options: {
      banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
    },
    build: {
      src: 'src/<%= pkg.name %>.js',
      dest: 'build/<%= pkg.name %>.min.js'
    }
  }
});
Loading Grunt plugins and tasks

Many commonly used tasks like concatenation, minification and linting are available as grunt plugins. As long as a plugin is specified in package.json as a dependency, and has been installed via npm install, it may be enabled inside your Gruntfile with a simple command:

// Load the plugin that provides the "uglify" task.
grunt.loadNpmTasks('grunt-contrib-uglify');
Note: the grunt --help command will list all available tasks.

Custom tasks

You can configure Grunt to run one or more tasks by default by defining a default task. In the following example, running grunt at the command line without specifying a task will run the uglify task. This is functionally the same as explicitly running grunt uglify or even grunt default. Any number of tasks (with or without arguments) may be specified in the array.

// Default task(s).
grunt.registerTask('default', ['uglify']);
If your project requires tasks not provided by a Grunt plugin, you may define custom tasks right inside the Gruntfile. For example, this Gruntfile defines a completely custom default task that doesn't even utilize task configuration:

module.exports = function(grunt) {

  // A very basic default task.
  grunt.registerTask('default', 'Log some stuff.', function() {
    grunt.log.write('Logging some stuff...').ok();
  });

};
Custom project-specific tasks don't need to be defined in the Gruntfile; they may be defined in external .js files and loaded via the grunt.loadTasks method.
```

### 3.1.2 https://fairwaytech.com/2014/01/understanding-grunt-part-1-installation-linting-concatenation-and-minification/

#### 3.1.2.1 Understanding Grunt – Part 1: Installation, Linting, Concatenation, and Minification

```text
Grunt has become the go-to build tool for the node.js environment. This multi-part tutorial will demonstrate how to configure Grunt to perform common tasks required on Node.js projects. The first part of the tutorial will provide a whirlwind tour of Grunt basics as we configure Grunt to:

    Lint our source code with JSHint

    Concatenate our source code into a single file for distribution

    Provide a minified version of our concatenated file

The second part will go more in depth on several topics as we configure Grunt to run a suite of automated tests using the Mocha test framework.

After you finish this tutorial you should understand Grunt well enough to setup the basic tasks that will be required on most projects. You should also have a base of knowledge for exploring solutions to more complex scenarios.

This guide will be using Grunt 0.4.2 and assumes you have already installed Node.js >=0.8.0.
Installing the Grunt CLI

Grunt is comprised of two components; The Grunt runner, and the Grunt CLI. The Grunt CLI should be installed as a global npm module, whereas the Grunt runner should be installed as a local npm module in your project. We’ll come back to the Grunt runner later, so for now, just install the Grunt CLI by running the following as a command line if you haven’t already done so:

npm install -g grunt-cli

If you encounter errors, you may need to sudo or run your console as an admin on Windows systems.
Demo Project

This tutorial was written so that you can follow along as we build a demo project.

As of now, it consists of only a few source files, math.js and string.js, both of which contain a few functions. These files have been placed inside of a src folder.

module.exports = {
	add: function (a, b) {
		return a + b;
	},

	subtract: function (a, b) {
		return a - b;
	}
};

src/math.js

module.exports = {
	add: function (a, b) {
		return a + b;
	},

	subtract: function (a, b) {
		return a - b;
	}
};

src/string.js

Also included in the project are the configuration files package.json, and gruntfile.js. These two files are central to the usage of Grunt.

View the step01 branch on Github.

Note: Each step in this tutorial is contained within a separate branch on the Github repository. If something isn’t working for you locally at any step in the tutorial, it may be helpful to compare your code against the code in the associated branch on Github.
package.json

Let’s take a closer look at package.json. It serves as the source of meta information for a Node.js project. If you’re not already familiar with package.json, now would be a good time to get to know what it’s all about.

The original intent of the package.json file was to describe a module being deployed via the npm system. Its usage has since been appropriated for a wide number of other purposes. It is used by many tools in the Node.js ecosystem including “Platform as a Service” deployments, cloud-based continuous integration tools, and build systems like Grunt. As such, it’s become, arguably, the most important file in any Node.js project. If you haven’t been keeping a well maintained package.json file in your Node.js projects, you should start doing so now.

The package.json file shown below provides information such as the name of the project, the version number, where the git repo is located, and much more. Visit package.json.nodejitsu.com to see an interactive list of many standard package.json options.

{
  "name": "GruntTutorial",
  "version": "0.1.0",
  "author": "Craig Maslowski <craig@craigmaslowski.com>",
  "description": "The demo project that accompanies my 'Understanding Grunt' tutorial",
  "contributors": [
    {
      "name": "Craig Maslowski",
      "email": "craig@craigmaslowski.com"
    }
  ],
  "repository": {
    "type": "git",
    "url": "https://github.com/craigmaslowski/Grunt-Tutorial.git"
  },
  "devDependencies": {
  }
}

package.json
gruntfile.js

The gruntfile.js file is where all configuration for Grunt occurs. This is where we will configure and register tasks, register plugins, and otherwise tell Grunt we want it what to do.

module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
	});
};

gruntfile.js

The gruntfile.js is pretty bare so far. All we’ve done is tell Grunt to read our package.json file into a property named pkg. This is actually more powerful than it appears, as we now have access to all that meta information and can use it inside Grunt Templates. Grunt Templates let’s us do things like automatically build a banner comment in our concatenated and minified js files.

Let’s get ready for that now, by adding a banner variable to gruntfile.js. Later, we’ll configure the concat and uglify plugins to insert this variable into the top of the files they build.

module.exports = function(grunt) {
	var banner = '/*n<%= pkg.name %> <%= pkg.version %> - <%= pkg.description %>n<%= pkg.repository.url %>nBuilt on <%= grunt.template.today("yyyy-mm-dd") %>n*/n';

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
	});
};

gruntfile.js

The variable we’ve added defines a Grunt Template which prints the name of our project, the version number, the url of our git repo, and the date the build was performed. Grunt Templates are a powerful part of the Grunt system and we’ll come back to them more than once as we go through the tutorial.

Particularly astute readers might be asking whether it’s possible to automatically bump the version number in package.json when Grunt runs a build. The answer is, of course, yes. The grunt-bump plugin does just this.
Installing Grunt In The Project

There’s one last thing we need to do before we get going. We need to install the Grunt runner in our project. This is done using npm at the command line.

npm install grunt --save-dev

By passing the --save-dev flag, we also told npm to update the devDependencies array in our package.json file. This is useful because it can be used later to install the correct versions of our development dependencies when the source code is used on another system.

{
  "name": "GruntTutorial",
  "version": "0.1.0",
  "author": "Craig Maslowski <craig@craigmaslowski.com>",
  "description": "The demo project that accompanies my 'Understanding Grunt' tutorial",
  "contributors": [
    {
      "name": "Craig Maslowski",
      "email": "craig@craigmaslowski.com"
    }
  ],
  "repository": {
    "type": "git",
    "url": "https://github.com/craigmaslowski/Grunt-Tutorial.git"
  },
  "devDependencies": {
    "grunt": "~0.4.2"
  }
}

package.json

View the step02 branch on Github.

See the differences between step01 and step02.
Grunt Plugins

I’ve talked an awful lot about Grunt plugins so far, but we haven’t seen any yet. That’s about to change. From here on out, most of what we’ll be doing is installing and configuring various different plugins. It’s time to actually make Grunt do something.
JSHint

Let’s get started by making sure that our code adheres to good JavaScript practices by linting our files. We’ll use the JSHint plugin to do so.

The first thing we need to do is install it. We do this using npm at the command line, again passing the --save-dev flag so it updates the devDependencies array in package.json. The npm package we’ll be installing is grunt-contrib-jshint.

npm install grunt-contrib-jshint --save-dev

Next, we’ll tell Grunt to load this plugin by updating gruntfile.js with a call to grunt.loadNpmTasks.

module.exports = function(grunt) {
	var banner = '/*n<%= pkg.name %> <%= pkg.version %> - <%= pkg.description %>n<%= pkg.repository.url %>nBuilt on <%= grunt.template.today("yyyy-mm-dd") %>n*/n';

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
};

gruntfile.js

Finally, we’ll tell JSHint which files we want it to check, and set some linting options.

module.exports = function(grunt) {
	var banner = '/*n<%= pkg.name %> <%= pkg.version %> - <%= pkg.description %>n<%= pkg.repository.url %>nBuilt on <%= grunt.template.today("yyyy-mm-dd") %>n*/n';

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			files: ['gruntfile.js', 'src/*.js'],
			options: {
				maxlen: 80,
				quotmark: 'single'
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
};

gruntfile.js

This last change needs a bit of an explanation. We’ve added a jshint property to the object we pass to grunt.initConfig. This jshint object is a Grunt plugin configuration task. A plugin task is where we set the configuration for a task that Grunt will carry out.

Inside of the jshint task we set two properties. The first tells JSHint which files we want it to process. In this case, that’s the gruntfile.js itself and every js file in our src folder.

We’ve also added an options object which will be passed along to JSHint. These are the same JSHint options that are available outside of Grunt. Check out the JSHint docs to see the full list of options.

What we’ve done here is a common pattern that we’ll be using with most Grunt plugins. Install the npm module with the --save-dev flag, tell Grunt, to load the plugin, and configure a task by telling the plugin which files to operate on and passing it some options.
Registering Tasks

Now we’re almost ready to run Grunt. The last thing we need to do is register our default Alias Task. Registering Alias Tasks allows us to handle several different scenarios such as running linting and tests tasks during development, and provide a separate configuration for release building that includes concatenation and minification.

This may seem confusing, as we called our JSHint object a Task in the last section, and I’ll admit that it is. Grunt provides multiple ways to configure Tasks. This will become more clear in the part 2 of this tutorial when we cover Tasks in greater detail. In the meantime, I’ll do my best to be clear about a task relating to plugin task versus a task related to Grunt Alias Task.

In this case, we want to create a default Alias Task to tell Grunt which plugin tasks to run when we run the grunt command without passing it any parameters. We do this by modifying gruntfile.js with a call to grunt.registerTask. The first parameter is the name of the Alias Task, and the second is an array of plugins tasks to process. Note that the jshint string we pass matches the name of the property we passed to the grunt.initConfig call.

module.exports = function(grunt) {
	var banner = '/*n<%= pkg.name %> <%= pkg.version %> - <%= pkg.description %>n<%= pkg.repository.url %>nBuilt on <%= grunt.template.today("yyyy-mm-dd") %>n*/n';

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			files: ['gruntfile.js', 'src/*.js'],
			options: {
				maxlen: 80,
				quotmark: 'single'
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');

	grunt.registerTask('default', ['jshint']);
};

gruntfile.js

Finally we can run Grunt and get some results. Executing grunt at the command line, provides us with our first linting error telling us our banner line in gruntfile.js is longer than the 80 character limit we specified.

Running "jshint:files" (jshint) task
Linting gruntfile.js ...ERROR
[L2:C168] W101: Line is too long.
  var banner = '/*n<%= pkg.name %> <%= pkg.version %> - <%= pkg.description %>n<%= pkg.repository.url %>nBuilt on <%= grunt.template.today("yyyy-mm-dd") %>n*/n';

We’ll fix that by breaking up the string into multiple lines.

var banner = '/*n<%= pkg.name %> <%= pkg.version %>';
banner += '- <%= pkg.description %>n<%= pkg.repository.url %>n';
banner += 'Built on <%= grunt.template.today("yyyy-mm-dd") %>n*/n';

gruntfile.js (changes only)

Now when we run grunt at the command line, our code is given a clean bill of health by JSHint.

Running "jshint:files" (jshint) task
>> 3 files lint free.

Done, without errors.

View the step03 branch on Github.

See the differences between step02 and step03.
Concatenation

Next we’ll move onto concatenation. Again our first step is to install the plugin with npm at the command line using the --save-dev flag.

npm install grunt-contrib-concat --save-dev

We update gruntfile.js by telling Grunt to load the plugin and configure the concat task. Finally, we update our default Grunt Alias task to include our concat plugin task.

module.exports = function(grunt) {
	var banner = '/*n<%= pkg.name %> <%= pkg.version %>';
	banner += '- <%= pkg.description %>n<%= pkg.repository.url %>n';
	banner += 'Built on <%= grunt.template.today("yyyy-mm-dd") %>n*/n';

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			files: ['gruntfile.js', 'src/*.js'],
			options: {
				maxlen: 80,
				quotmark: 'single'
			}
		},
		concat: {
			options: {
				separator: ';n',
				banner: banner
			},
			build: {
				files: [{
					src: ['src/*.js'], 
					dest: 'build/<%= pkg.name %>.js'
				}]
			}
		},
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');

	grunt.registerTask('default', ['jshint', 'concat']);
};

gruntfile.js

Our concat task is confgured with two options. separator tells the concat plugin to include a semi-colon and the newline character after the contents of each file. banner is a string that the concat plugin will prepend to the file it generates. In this case, we are using the banner variable we defined earlier.

Also provided in our concat configuration is a build Target telling Grunt which files to process and where to place the concatenated file.

Targets are another important, and powerful, part of Grunt. Targets allow us to create MultiTasks, a fancy name for the ability to provide multiple configurations of the same plugin task. We’ll see more use of these in part two of this tutorial when we add testing.

It’s important to note that the property name build is arbitrary. We could have called it rootBeer and achieved the same result.

One other thing that’s worth mentioning is the usage of another template in the dest property of the files object. Here we are using a Template to specify the name of the concatenated file by using the value of the name property from package.json. In this case, our concatenated file will be created in build/GruntTutorial.js.

Now when we run grunt at the command line, we see the following output:

Running "jshint:files" (jshint) task

>> 3 files lint free.

Running "concat:build" (concat) task
File "build/GruntTutorial.js" created.

Done, without errors.

We also see that Grunt has concatenated our math.js and string.js file into build/GruntTutorial.js with our dynamically generated banner included at the top.

/*

GruntTutorial 0.1.0- The demo project that accompanies my 'Understanding Grunt' tutorial
https://github.com/craigmaslowski/Grunt-Tutorial.git
Built on 2014-01-06
*/
module.exports = {
	add: function (a, b) {
		return a + b;
	},

	subtract: function (a, b) {
		return a - b;
	}
};
;
module.exports = {
	capitalize: function (a) {
		var arr = a.split('');
		arr[0] = arr[0].toUpperCase();
		return arr.join('');
	},

	reverse: function (a) {
		return a.split('').reverse().join('');
	}
};

build/GruntTutorial.js

View the step04 branch on Github.

See the differences between step03 and step04.

Minification

The last step we’ll do in this part is minify our concatenated file. The pattern will be the same as before.

Install the plugin via npm.

npm install grunt-contrib-uglify --save-dev

Update gruntfile.js to load the plugin, configure an uglify plugin task, and add the uglify task to the default Alias Task.

module.exports = function(grunt) {
	var banner = '/*n<%= pkg.name %> <%= pkg.version %>';
	banner += '- <%= pkg.description %>n<%= pkg.repository.url %>n';
	banner += 'Built on <%= grunt.template.today("yyyy-mm-dd") %>n*/n';

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			files: ['gruntfile.js', 'src/*.js'],
			options: {
				maxlen: 80,
				quotmark: 'single'
			}
		},
		concat: {
			options: {
				separator: ';n',
				banner: banner
			},
			build: {
				files: [{
					src: ['src/*.js'], 
					dest: 'build/<%= pkg.name %>.js'
				}]
			},
		},
		uglify: {
			options: {
				banner: banner,
			},
			build: {
				files: { 
					'build/<%= pkg.name %>.min.js': 
						['build/<%= pkg.name %>.js'],
				}
			}
		},
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('default', ['jshint', 'concat', 'uglify']);
};

gruntfile.js

Once again, we’ve set the banner option to the banner variable we declared earlier so that Grunt will prepend this information in the minified file it creates.

Running grunt at the command line now yields the output.

Running “jshint:files” (jshint) task

>> 3 files lint free.

Running "concat:build" (concat) task
File "build/GruntTutorial.js" created.

Running "uglify:build" (uglify) task
File "build/GruntTutorial.min.js" created.

Done, without errors.

Looking inside the build folder we see our minified GruntTutorial.min.js file.

View the step05 branch on Github.

See the differences between step04 and step05.
Conclusion

We covered a lot of ground in this part of the tutorial, but many of the topics were only given minimal treatment. In the next part of this tutorial, we’ll go more in depth on several topics as we add test coverage to our demo project using the Mocha testing framework.

            3.1.2.2
        3.1.3
```

## 3.2 Mocha

### 3.2.1 Mocha tutorial

```text
was in: https://fairwaytech.com/2014/01/understanding-grunt-part-2-automated-testing-with-mocha/

We’ll be using the Mocha test framework as we go through this portion of the tutorial. The plugin we’ll be using to get tests running is the grunt-simple-mocha plugin. We’ll be adding two test files. One to test the code in our math.js file, and one to test our string.js file.

var expect = require('chai').expect,
	math = require('../src/math');

describe('add', function () {
	it('should return 3 when passed the params (1, 2)', function () {
		expect(math.add(1, 2)).to.equal(3);
	});
});

describe('subtract', function () {
	it('should return -1 when passed the params (1, 2)', function () {
		expect(math.subtract(1, 2)).to.equal(-1);
	});
});

tests/math.tests.js

var expect = require('chai').expect,
	string = require('../src/string');

describe('capitalize', function () {
	it('should return "Foo" when passed the param ("foo")', function () {
		expect(string.capitalize('foo')).to.equal('Foo');
	});
});

describe('reverse', function () {
	it('should return "oof" when passed the param ("foo")', function () {
		expect(string.reverse('foo')).to.equal('oof');
	});
});

/tests/string.tests.js

To demonstrate that the tests pass without Grunt, I’ve installed Mocha globally. The grunt-simple-mocha plugin will install the Mocha framework as a local dependency. It isn’t necessary for you to install Mocha globally, but if you want to follow along, run the following in a terminal.

npm install -g mocha

Now when we run the following in a terminal:

mocha tests

I receive the following output showing that my tests pass.

․․․․

4 passing (4ms)

Simple Mocha

Let’s configure Grunt to run these tests for us automatically. We’ll begin by installing the grunt-simple-mocha plugin using the --save-dev flag to keep package.json up to date.

npm install grunt-simple-mocha --save-dev

Next we’ll modify gruntfile.js to load the plugin and configure it.

module.exports = function(grunt) {
	var banner = '/*n<%= pkg.name %> <%= pkg.version %>';
	banner += '- <%= pkg.description %>n<%= pkg.repository.url %>n';
	banner += 'Built on <%= grunt.template.today("yyyy-mm-dd") %>n*/n';

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			files: ['gruntfile.js', 'src/*.js'],
			options: {
				maxlen: 80,
				quotmark: 'single'
			}
		},
		concat: {
			options: {
				separator: ';n',
				banner: banner
			},
			build: {
				files: [{
					src: ['src/*.js'], 
					dest: 'build/<%= pkg.name %>.js'
				}]
			},
		},
		uglify: {
			options: {
				banner: banner,
			},
			build: {
				files: { 
					'build/<%= pkg.name %>.min.js': 
						['build/<%= pkg.name %>.js'],
				}
			}
		},
		simplemocha: {
			options: {
				globals: ['expect'],
				timeout: 3000,
				ignoreLeaks: false,
				ui: 'bdd',
				reporter: 'tap'
			},
			all: { src: ['tests/*.js'] }
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-simple-mocha');

	grunt.registerTask('default', 
		['jshint', 'simplemocha', 'concat', 'uglify']);
};

gruntfile.js 

Again, we see the same pattern identified in part one of the tutorial. We set some options to pass to Mocha, and tell Grunt which files to process. In this case though, we see a file pattern we haven’t yet encountered. The ** in the file pattern tests/**/*.js instructs Grunt to process all *.js files in the tests folder, as well as *.js inside of any subfolders.

Lastly, we’ve added simplemocha to our default task. It’s important to note that it was added between the jshint and concat tasks. Grunt will run the plugin tasks in the order they are provided, and will stop processing when any task fails. We don’t want to concatenate or minify if the tests fail. Placing the simplemocha task before the others ensures Grunt will stop processing if any test fails. 

Now, when I run grunt from the command line, I see that all of my tests pass. 

Running "jshint:files" (jshint) task
>> 3 files lint free.

Running "simplemocha:all" (simplemocha) task
|1..4
ok 1 add should return 3 when passed the params (1, 2)
ok 2 subtract should return -1 when passed the params (1, 2)
ok 3 capitalize should return "Foo" when passed the param ("foo")
ok 4 reverse should return "oof" when passed the param ("foo")
# tests 4
# pass 4
# fail 0

Running "concat:build" (concat) task
File "build/GruntTutorial.js" created.

Running "uglify:build" (uglify) task
File "build/GruntTutorial.min.js" created.

Done, without errors..

View the step06 branch on Github. 

See the differences between step05 and step06.
Grunt Tasks

In the last tutorial, I highlighted some potential confusion about what actually comprises a Task in the Grunt system. Tasks can be defined in many ways in Grunt. To help understand how tasks work, let’s dive into the command line a bit more.

Up to this point, we’ve just been running grunt at the command line. This instructs Grunt to look for a default task in gruntfile.js and execute it.

Grunt also lets us specify which Task(s) to run from the command line. If we only wanted to lint our code, we could do so by running the following command

grunt jshint

That would produce the following output showing that only the task executed was jshint.

Running "jshint:files" (jshint) task
>> 3 files lint free.

Done, without errors.

We can also pass multiple tasks at the command line.

grunt jshint simplemocha

Grunt will execute these tasks in the order in which they are passed.

Running "jshint:files" (jshint) task
>> 3 files lint free.

Running "simplemocha:all" (simplemocha) task
|1..4
ok 1 add should return 3 when passed the params (1, 2)
ok 2 subtract should return -1 when passed the params (1, 2)
ok 3 capitalize should return "Foo" when passed the param ("foo")
ok 4 reverse should return "oof" when passed the param ("foo")
# tests 4
# pass 4
# fail 0

Done, without errors.

As we’ve already seen with our default task, we can define Alias Tasks inside of gruntfile.js to run multiple tasks at the same time. Let’s add a development Alias Task to gruntfile.js which only runs the jshint and simplemocha tasks since we probably don’t want to concatenate and minify everytime we run Grunt during development.

grunt.registerTask('development', ['jshint', 'simplemocha']);

gruntfile.js (changes only)

Now we can run this alias task from the command line.

grunt development

Which produces the same output as when we specified both tasks individually at the command line.

Running "jshint:files" (jshint) task
>> 3 files lint free.

Running "simplemocha:all" (simplemocha) task
|1..4
ok 1 add should return 3 when passed the params (1, 2)
ok 2 subtract should return -1 when passed the params (1, 2)
ok 3 capitalize should return "Foo" when passed the param ("foo")
ok 4 reverse should return "oof" when passed the param ("foo")
# tests 4
# pass 4
# fail 0

Done, without errors.

Grunt has one more trick up its sleeve regarding defining and running Tasks. When we created the concat task in the last part of the tutorial, I mentioned that the build property in the configuration was arbitrarily named and I called it a Target. Targets also identified as a Task in Grunt.

Let’s modify the jshint configuration and split the files we’re linting into two separate Targets to see how they work.

jshint: {
	options: {
		maxlen: 80,
		quotmark: 'single'
	},
	dev: ['gruntfile.js', 'tests/*.js'],
	app:  ['src/**/*.js']
},

gruntfile.js (changes only) 

We now have two Targets in our jshint configuration, dev and app. The dev task will lint gruntfile.js and all of our tests. The app task will lint only the app source code.

These Targets can now be run individually from the command line. The Target to execute is specified as follows:

grunt jshint:dev 

Which produces the following output. 

Running "jshint:dev" (jshint) task
>> 3 files lint free.

Done, without errors.

We can also tell Grunt to execute only the app Target.

grunt jshint:app

Which produces the following output.

Running "jshint:app" (jshint) task
>> 2 files lint free.

Done, without errors.

Also interesting to note is that when we run grunt jshint from the command line now, Grunt will run both tasks.

Running "jshint:dev" (jshint) task
>> 3 files lint free.

Running "jshint:app" (jshint) task
>> 2 files lint free.

Done, without errors.

View the step07 branch on Github. 

See the differences between step06 and step07.
Watching Files For Changes

Now that we understand tasks in Grunt, let’s see how we can make it more useful for development. Earlier in the tutorial, we added the development alias task so we could lint and test while working on code without concatenating and minifying. Let’s make Grunt automatically run the development task by installing the grunt-contrib-watch plugin.

npm install grunt-contrib-watch --save-dev A_new_bli

    |1..4.1
general


    |1..4.2 links
general
    |1..4.3 Design

    |1..4.4 Code



|1..5
ok 1

Next we’ll need to tell Grunt to load the plugin and configure it by indicating which files it should monitor for changes and which tasks to run when it detects a change in the file. 

module.exports = function(grunt) {
	var banner = '/*n<%= pkg.name %> <%= pkg.version %>';
	banner += '- <%= pkg.description %>n<%= pkg.repository.url %>n';
	banner += 'Built on <%= grunt.template.today("yyyy-mm-dd") %>n*/n';

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			options: {
				maxlen: 80,
				quotmark: 'single'
			},
			dev: ['gruntfile.js', 'tests/*.js'],
			app:  ['src/**/*.js']
		},
		concat: {
			options: {
				separator: ';n',
				banner: banner
			},
			build: {
				files: [{
					src: ['src/*.js'], 
					dest: 'build/<%= pkg.name %>.js'
				}]
			},
		},
		uglify: {
			options: {
				banner: banner,
			},
			build: {
				files: { 
					'build/<%= pkg.name %>.min.js': 
						['build/<%= pkg.name %>.js'],
				}
			}
		},
		simplemocha: {
			options: {
				globals: ['expect'],
				timeout: 3000,
				ignoreLeaks: false,
				ui: 'bdd',
				reporter: 'tap'
			},
			all: { src: ['tests/**/*.js'] }
		},
		watch: {
			scripts: {
				files: ['gruntfile.js', 'src/*.js', 'tests/**/*.js'],
				tasks: ['development']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-simple-mocha');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('development', ['jshint', 'simplemocha']);
	grunt.registerTask('default', 
		['jshint', 'simplemocha', 'concat', 'uglify']);
};

In this case, we’ve told Grunt to monitor gruntfile.js, our app code, and our tests. We start grunt in watch mode by running the following at the command line.

grunt watch

When it detects a change in any file, it will run the development task. Here’s the output after I made a change to string.js

Running "watch" task
Waiting...OK
>> File "src/string.js" changed.

Running "jshint:dev" (jshint) task
>> 3
|1..5
ok 1

Next we’ll need to tell Grunt to load the plugin and configure it by indicating which files it should monitor for changes and which tasks to run when it detects a change in the file. 

module.exports = function(grunt) {
	var banner = '/*n<%= pkg.name %> <%= pkg.version %>';
	banner += '- <%= pkg.description %>n<%= pkg.repository.url %>n';
	banner += 'Built on <%= grunt.template.today("yyyy-mm-dd") %>n*/n';

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			options: {
				maxlen: 80,
				quotmark: 'single'
			},
			dev: ['gruntfile.js', 'tests/*.js'],
			app:  ['src/**/*.js']
		},
		concat: {
			options: {
				separator: ';n',
				banner: banner
			},
			build: {
				files: [{
					src: ['src/*.js'], 
					dest: 'build/<%= pkg.name %>.js'
				}]
			},
		},
		uglify: {
			options: {
				banner: banner,
			},
			build: {
				files: { 
					'build/<%= pkg.name %>.min.js': 
						['build/<%= pkg.name %>.js'],
				}
			}
		},
		simplemocha: {
			options: {
				globals: ['expect'],
				timeout: 3000,
				ignoreLeaks: false,
				ui: 'bdd',
				reporter: 'tap'
			},
			all: { src: ['tests/**/*.js'] }
		},
		watch: {
			scripts: {
				files: ['gruntfile.js', 'src/*.js', 'tests/**/*.js'],
				tasks: ['development']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-simple-mocha');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('development', ['jshint', 'simplemocha']);
	grunt.registerTask('default', 
		['jshint', 'simplemocha', 'concat', 'uglify']);
};

In this case, we’ve told Grunt to monitor gruntfile.js, our app code, and our tests. We start grunt in watch mode by running the following at the command line.

grunt watch

When it detects a change in any file, it will run the development task. Here’s the output after I made a change to string.js

Running "watch" task
Waiting...OK
>> File "src/string.js" changed.

Running "jshint:dev" (jshint) task
>> 3 files lint free.

Running "jshint:app" (jshint) task
>> 2 files lint free.

Running "simplemocha:all" (simplemocha) task
|1..4
ok 1 add should return 3 when passed the params (1, 2)
ok 2 subtract should return -1 when passed the params (1, 2)
ok 3 capitalize should return "Foo" when passed the param ("foo")
ok 4 reverse should return "oof" when passed the param ("foo")
# tests 4
# pass 4
# fail 0

Done, without errors.
Completed in 0.632s at Wed Jan 08 2014 15:14:44 GMT-0800 (PST) - Waiting...

View the step08 branch on Github.

See the changes between step07 and step08.
Epilogue: Gulp…Is Grunt Already Old News?

As I was about halfway through writing part two of this tutorial, a colleague of mine told me about a new task runner that looks like it may unseat Grunt as the go-to tool for Node.js projects.

Gulp bills itself as “the streaming build system.” It makes heavy use of Node.js streams, eliminating the need to write temporary files to disk as it’s running tasks. Gulp’s API makes creating build tasks a much more clear process. Without going into detail, here’s a gulpfile.js that gets us as close to the same configuration as possible using Gulp.

var fs = require('fs'),
	path = require('path'),
	gulp = require('gulp'),
	jshint = require('gulp-jshint'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	mocha = require('gulp-mocha');

var pkg = JSON.parse(
	fs.readFileSync(path.resolve(__dirname, './package.json'))
);

gulp.task('jshint:dev', function () {
	gulp.src(['gulpfile.js', 'tests/**/*.js'])
		.pipe(jshint({
				maxlen: 80,
				quotmark: 'single'
			}))
		.pipe(jshint.reporter('default'));
});

gulp.task('jshint:app', function () {
	gulp.src(['src/*.js'])
		.pipe(jshint({
				maxlen: 80,
				quotmark: 'single'
			}))
		.pipe(jshint.reporter('default'));
});

gulp.task('test', function () {
	gulp.src(['tests/**/*.js'])
		.pipe(mocha());
});

gulp.task('concat', function () {
	gulp.src(['src/*.js'])
		.pipe(concat(pkg.name + '.js'))
		.pipe(gulp.dest('./build/'));
});

gulp.task('minify', function () {
	gulp.src(['./build/' + pkg.name + '.js'])
		.pipe(uglify())
		.pipe(gulp.dest('./build/min/'));
});


gulp.task('development', function () {
	gulp.watch(['gruntfile.js', 'src/*.js', 'tests/**/*.js'], function () {
		gulp.run('jshint:dev', 'jshint:app', 'test');
	});
});

gulp.task('default', function () {
	gulp.run('jshint:dev', 'jshint:app', 'test', 'concat', 'minify');
});

gulpfile.js 

The major differences in functionality are that we can’t put a banner in the concatenated file, and we can’t put a banner or specify the name of the minified file. This is lack of functionality is in the plugins as opposed to Gulp itself though.
```

### 3.2.2 another tutorial, tags: mocha tutorial

#### 3.2.2.1 INSTALLATION

```text
Install with npm globally:

$ npm install --global mocha
or as a development dependency for your project:

$ npm install --save-dev mocha
```

#### 3.2.2.2 setup project

```text
$ npm init
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.

See `npm help init` for definitive documentation on these fields
and exactly what they do.

Use `npm install <pkg>` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
package name: (mocha) mocha
version: (1.0.0) 
description: mocha demo
entry point: (index.js) 
test command: test
git repository: 
keywords: mocha demo tutorial
author: yosi izaq
license: (ISC) 
About to write to /Users/<user>/work/code/nodejs/tutorial/test/mocha/package.json:

{
  "name": "mocha",
  "version": "1.0.0",
  "description": "mocha demo",
  "main": "index.js",
  "scripts": {
    "test": "test"
  },
  "keywords": [
    "mocha",
    "demo",
    "tutorial"
  ],
  "author": "yosi izaq",
  "license": "ISC"
}


Is this OK? (yes) y
$ ls
package.json
$ cat package.json 
{
  "name": "mocha",
  "version": "1.0.0",
  "description": "mocha demo",
  "main": "index.js",
  "scripts": {
    "test": "test"
  },
  "keywords": [
    "mocha",
    "demo",
    "tutorial"
  ],
  "author": "yosi izaq",
  "license": "ISC"
}
$ npm install --save-dev mocha

added 80 packages, and audited 81 packages in 959ms

20 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
$ cat package.json 
{
  "name": "mocha",
  "version": "1.0.0",
  "description": "mocha demo",
  "main": "index.js",
  "scripts": {
    "test": "test"
  },
  "keywords": [
    "mocha",
    "demo",
    "tutorial"
  ],
  "author": "yosi izaq",
  "license": "ISC",
  "devDependencies": {
    "mocha": "^9.2.1"
  }
}
$ npm i mocha

up to date, audited 81 packages in 818ms

20 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
$ mkdir test
$ cd !$
cd test
$ vi test.js
```

#### 3.2.2.3 run test

```text
$ cat test/test.js 
const assert = require('assert');
describe('Array', function () {
  describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function () {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});
$ ./node_modules/mocha/bin/mocha 


  Array
    #indexOf()
      ✔ should return -1 when the value is not present


  1 passing (2ms)

Set up a test script in package.json:

"scripts": {
  "test": "mocha"
}
Then run tests with:

$ npm test
```

#### 3.2.2.4 RUN CYCLE OVERVIEW

```text
Updated for v8.0.0.

The following is a mid-level outline of Mocha’s “flow of execution” when run in Node.js; the “less important” details have been omitted.

In a browser, test files are loaded by <script> tags, and calling mocha.run() begins at step 9 below.
```

#### 3.2.2.4.1 SERIAL MODE

```text
User (that’s you) executes mocha
Loads options from config files, if present
Mocha processes any command-line options provided (see section on configuration merging for details)
If known flags for the node executable are found:
Mocha will spawn node in a child process, executing itself with these flags
Otherwise, Mocha does not spawn a child process
Mocha loads modules specified by --require
If a file loaded this way contains known Mocha-specific exports (e.g., root hook plugins), Mocha “registers” these
If not, Mocha ignores any exports of a --require’d module
Mocha validates any custom reporters or interfaces which were loaded via --require or otherwise
Mocha discovers test files; when given no files or directories, it finds files with extensions .js, .mjs or .cjs in the test directory (but not its children), relative to the current working directory
The (default) bdd interface loads the test files in no particular order, which are given an interface-specific global context (this is how, e.g., describe() ends up as a global in a test file)
When a test file is loaded, Mocha executes all of its suites and finds–but does not execute–any hooks and tests therein.
Top-level hooks, tests and suites are all made members of an “invisible” root suite; there is only one root suite for the entire process
Mocha runs global setup fixtures, if any
Starting with the “root” suite, Mocha executes:
Any “before all” hooks (for the root suite, this only happens once; see root hook plugins)
For each test, Mocha executes:
Any “before each” hooks
The test (and reports the result)
Any “after each” hooks
If the current suite has a child suite, repeat the steps in 10. for each child suite; each child suite inherits any “before each” and “after each” hooks defined in its parent
Any “after all” hooks (for the root suite, this only happens once; see root hook plugins)
Mocha prints a final summary/epilog, if applicable
Mocha runs global teardown fixtures, if any
```

#### 3.2.2.4.2 #PARALLEL MODE

```text
Repeat steps 1 through 6 from Serial Mode above, skipping reporter validation
All test files found are put into a queue (they are not loaded by the main process)
Mocha runs global setup fixtures, if any
Mocha creates a pool of subprocesses (“workers”)
Immediately before a worker runs the first test it receives, the worker “bootstraps” itself by:
Loading all --require’d modules
Registering any root hook plugins
Ignoring global fixtures and custom reporters
Asserting the built-in or custom interface is valid
When a worker receives a test file to run, the worker creates a new Mocha instance for the single test file, and:
The worker repeats step 8 from above
The worker repeats step 10 from above, with the caveat that the worker does not report test results directly; it holds them in a memory buffer
When the worker completes the test file, buffered results are returned to the main process, which then gives them to the user-specified reporter (spec by default)
The worker makes itself available to the pool; the pool gives the worker another test file to run, if any remain
Mocha prints a final summary/epilog, if applicable
Mocha runs global teardown fixtures, if any
#

                3.2.2.4.3 
```

#### 3.2.2.5 DETECTS MULTIPLE CALLS TO DONE()

```text
If you use callback-based async tests, Mocha will throw an error if done() is called multiple times. This is handy for catching accidental double callbacks.
$ cat test/test.js 
const assert = require('assert');
describe('Array', function () {
  describe('#indexOf()', function () {
      it('should return -1 when the value is not present', function () {
          assert.equal([1, 2, 3].indexOf(4), -1);
      });

      it('double done', function (done) {
          // Calling `done()` twice is an error
          setImmediate(done);
          setImmediate(done);
      });
  });
});
$ npm test

> mocha@1.0.0 test
> mocha



  Array
    #indexOf()
      ✔ should return -1 when the value is not present
      ✔ double done
      1) double done


  2 passing (3ms)
  1 failing

  1) Array
       #indexOf()
         double done:
     Error: done() called multiple times in test <Array #indexOf() double done> of file /Users/<user>/work/code/nodejs/tutorial/test/mocha/test/test.js
      at processImmediate (node:internal/timers:466:21)
```

#### 3.2.2.6 ASSERTIONS

```text
Mocha allows you to use any assertion library you wish. In the above example, we’re using Node.js’ built-in assert module — but generally, if it throws an Error, it will work! This means you can use libraries such as:

should.js - BDD style shown throughout these docs
expect.js - expect() style assertions
chai - expect(), assert() and should-style assertions
better-assert - C-style self-documenting assert()
unexpected - “the extensible BDD assertion toolkit”
```

#### 3.2.2.7 ASYNCHRONOUS CODE

```text
By adding an argument (usually named done) to it() to a test callback, Mocha will know that it should wait for this function to be called to complete the test. This callback accepts both an Error instance (or subclass thereof) or a falsy value; anything else is invalid usage and throws an error (usually causing a failed test).

describe('User', function () {
  describe('#save()', function () {
    it('should save without error', function (done) {
      var user = new User('Luna');
      user.save(function (err) {
        if (err) done(err);
        else done();
      });
    });
  });
});
Alternatively, use the done() callback directly (which will handle an error argument, if it exists):

describe('User', function () {
  describe('#save()', function () {
    it('should save without error', function (done) {
      var user = new User('Luna');
      user.save(done);
    });
  });
});
```

#### 3.2.2.7.1 working with promises

```text
Alternately, instead of using the done() callback, you may return a Promise. This is useful if the APIs you are testing return promises instead of taking callbacks:

beforeEach(function () {
  return db.clear().then(function () {
    return db.save([tobi, loki, jane]);
  });
});

describe('#find()', function () {
  it('respond with matching records', function () {
    return db.find({type: 'User'}).should.eventually.have.length(3);
  });
});
The latter example uses Chai as Promised for fluent promise assertions.

In Mocha v3.0.0 and newer, returning a Promise and calling done() will result in an exception, as this is generally a mistake:

const assert = require('assert');

// antipattern
it('should complete this test', function (done) {
  return new Promise(function (resolve) {
    assert.ok(true);
    resolve();
  }).then(done);
});
The above test will fail with Error: Resolution method is overspecified. Specify a callback *or* return a Promise; not both.. In versions older than v3.0.0, the call to done() is effectively ignored.
```

#### 3.2.2.7.2 USING ASYNC / AWAIT

```text
If your JS environment supports async / await, you can also write asynchronous tests like this:

beforeEach(async function () {
  await db.clear();
  await db.save([tobi, loki, jane]);
});

describe('#find()', function () {
  it('responds with matching records', async function () {
    const users = await db.find({type: 'User'});
    users.should.have.length(3);
  });
});
```

#### 3.2.2.7.3 SYNCHRONOUS CODE

```text
When testing synchronous code, omit the callback and Mocha will automatically continue on to the next test.

describe('Array', function () {
  describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function () {
      [1, 2, 3].indexOf(5).should.equal(-1);
      [1, 2, 3].indexOf(0).should.equal(-1);
    });
  });
});
```

#### 3.2.2.7.4 ARROW FUNCTIONS

```text
Passing arrow functions (aka “lambdas”) to Mocha is discouraged. Lambdas lexically bind this and cannot access the Mocha context. For example, the following code will fail:

describe('my suite', () => {
  it('my test', () => {
    // should set the timeout of this test to 1000 ms; instead will fail
    this.timeout(1000);
    assert.ok(true);
  });
});
If you do not need to use Mocha’s context, lambdas should work. Be aware that using lambdas will be more painful to refactor if the need eventually arises!

                3.2.2.7.5 
```

#### 3.2.2.8 HOOKS

```text
With its default “BDD”-style interface, Mocha provides the hooks before(), after(), beforeEach(), and afterEach(). These should be used to set up preconditions and clean up after your tests.

describe('hooks', function () {
  before(function () {
    // runs once before the first test in this block
  });

  after(function () {
    // runs once after the last test in this block
  });

  beforeEach(function () {
    // runs before each test in this block
  });

  afterEach(function () {
    // runs after each test in this block
  });

  // test cases
});
Tests can appear before, after, or interspersed with your hooks. Hooks will run in the order they are defined, as appropriate; all before() hooks run (once), then any beforeEach() hooks, tests, any afterEach() hooks, and finally after() hooks (once).

#DESCRIBING HOOKS
Any hook can be invoked with an optional description, making it easier to pinpoint errors in your tests. If a hook is given a named function, that name will be used if no description is supplied.

beforeEach(function () {
  // beforeEach hook
});

beforeEach(function namedFun() {
  // beforeEach:namedFun
});

beforeEach('some description', function () {
  // beforeEach:some description
});
#ASYNCHRONOUS HOOKS
All hooks (before(), after(), beforeEach(), afterEach()) may be sync or async as well, behaving much like a regular test-case. For example, you may wish to populate database with dummy content before each test:

describe('Connection', function () {
  var db = new Connection(),
    tobi = new User('tobi'),
    loki = new User('loki'),
    jane = new User('jane');

  beforeEach(function (done) {
    db.clear(function (err) {
      if (err) return done(err);
      db.save([tobi, loki, jane], done);
    });
  });

  describe('#find()', function () {
    it('respond with matching records', function (done) {
      db.find({type: 'User'}, function (err, res) {
        if (err) return done(err);
        res.should.have.length(3);
        done();
      });
    });
  });
});
```

#### 3.2.2.9 ROOT-LEVEL HOOKS

```text
A hook defined at the top scope of a test file (outside of a suite) is a root hook.

As of v8.0.0, Root Hook Plugins are the preferred mechanism for setting root hooks.

#DELAYED ROOT SUITE
WARNING: Delayed root suites are incompatible with parallel mode.

If you need to perform asynchronous operations before any of your suites are run (e.g. for dynamically generating tests), you may delay the root suite. Run mocha with the --delay flag. This will attach a special callback function, run(), to the global context:

const assert = require('assert');

const fn = async x => {
  return new Promise(resolve => {
    setTimeout(resolve, 3000, 2 * x);
  });
};

// instead of an IIFE, you can use 'setImmediate' or 'nextTick' or 'setTimeout'
(async function () {
  const z = await fn(3);

  describe('my suite', function () {
    it(`expected value ${z}`, function () {
      assert.strictEqual(z, 6);
    });
  });

  run();
})();
```

#### 3.2.2.10 #ROOT-LEVEL HOOKS

```text
A hook defined at the top scope of a test file (outside of a suite) is a root hook.

As of v8.0.0, Root Hook Plugins are the preferred mechanism for setting root hooks.
```

#### 3.2.2.11 #DELAYED ROOT SUITE

```text
WARNING: Delayed root suites are incompatible with parallel mode.

If you need to perform asynchronous operations before any of your suites are run (e.g. for dynamically generating tests), you may delay the root suite. Run mocha with the --delay flag. This will attach a special callback function, run(), to the global context:

const assert = require('assert');

const fn = async x => {
  return new Promise(resolve => {
    setTimeout(resolve, 3000, 2 * x);
  });
};

// instead of an IIFE, you can use 'setImmediate' or 'nextTick' or 'setTimeout'
(async function () {
  const z = await fn(3);

  describe('my suite', function () {
    it(`expected value ${z}`, function () {
      assert.strictEqual(z, 6);
    });
  });

  run();
})();
```

#### 3.2.2.12 #PENDING TESTS

```text
“Pending” — as in “someone should write these test cases eventually” — test-cases are those without a callback:

describe('Array', function () {
  describe('#indexOf()', function () {
    // pending test below
    it('should return -1 when the value is not present');
  });
});
Pending tests will be included in the test results, and marked as pending. A pending test is not considered a failed test.

Read the inclusive tests section for an example of conditionally marking a test as pending via this.skip().
```

#### 3.2.2.13 #EXCLUSIVE TESTS

```text
WARNING: Exclusive tests are incompatible with parallel mode.

The exclusivity feature allows you to run only the specified suite or test-case by appending .only() to the function. Here’s an example of executing only a particular suite:

describe('Array', function () {
  describe.only('#indexOf()', function () {
    // ...
  });
});
Note: All nested suites will still be executed.

Here’s an example of executing an individual test case:

describe('Array', function () {
  describe('#indexOf()', function () {
    it.only('should return -1 unless present', function () {
      // ...
    });

    it('should return the index when present', function () {
      // ...
    });
  });
});
Previous to v3.0.0, .only() used string matching to decide which tests to execute; this is no longer the case. In v3.0.0 or newer, .only() can be used multiple times to define a subset of tests to run:

describe('Array', function () {
  describe('#indexOf()', function () {
    it.only('should return -1 unless present', function () {
      // this test will be run
    });

    it.only('should return the index when present', function () {
      // this test will also be run
    });

    it('should return -1 if called with a non-Array context', function () {
      // this test will not be run
    });
  });
});
You may also choose multiple suites:

describe('Array', function () {
  describe.only('#indexOf()', function () {
    it('should return -1 unless present', function () {
      // this test will be run
    });

    it('should return the index when present', function () {
      // this test will also be run
    });
  });

  describe.only('#concat()', function () {
    it('should return a new Array', function () {
      // this test will also be run
    });
  });

  describe('#slice()', function () {
    it('should return a new Array', function () {
      // this test will not be run
    });
  });
});
But tests will have precedence:

describe('Array', function () {
  describe.only('#indexOf()', function () {
    it.only('should return -1 unless present', function () {
      // this test will be run
    });

    it('should return the index when present', function () {
      // this test will not be run
    });
  });
});
Note: Hooks, if present, will still be executed.

Be mindful not to commit usages of .only() to version control, unless you really mean it! To do so one can run mocha with the option --forbid-only in the continuous integration test command (or in a git precommit hook).
```

#### 3.2.2.14 #INCLUSIVE TESTS

```text
This feature is the inverse of .only(). By appending .skip(), you may tell Mocha to ignore test case(s). Anything skipped will be marked as pending, and reported as such. Here’s an example of skipping an individual test:

describe('Array', function () {
  describe('#indexOf()', function () {
    it.skip('should return -1 unless present', function () {
      // this test will not be run
    });

    it('should return the index when present', function () {
      // this test will be run
    });
  });
});
You can also put .skip() on an entire suite. This is equivalent to appending .skip() onto all tests in the suite. Hooks in the suite are also skipped.

describe('Array', function () {
  describe.skip('#indexOf()', function () {
    it('should return -1 unless present', function () {
      // this test will not be run
    });
  });
});
Note: Code in skipped suites, that is placed outside of hooks or tests is still executed, as mocha will still invoke the suite function to build up the suite structure for visualization.

Best practice: Use .skip() instead of commenting tests out.

You may also skip at runtime using this.skip(). If a test needs an environment or configuration which cannot be detected beforehand, a runtime skip is appropriate. For example:

it('should only test in the correct environment', function() {
  if (/* check test environment */) {
    // make assertions
  } else {
    this.skip();
  }
});
The above test will be reported as pending. It’s also important to note that calling this.skip() will effectively abort the test.

Best practice: To avoid confusion, do not execute further instructions in a test or hook after calling this.skip().

Contrast the above test with the following code:

it('should only test in the correct environment', function() {
  if (/* check test environment */) {
    // make assertions
  } else {
    // do nothing
  }
});
Because this test does nothing, it will be reported as passing.

Best practice: Don’t do nothing! A test should make an assertion or use this.skip().

To skip multiple tests in this manner, use this.skip() in a “before all” hook:

before(function() {
  if (/* check test environment */) {
    // setup code
  } else {
    this.skip();
  }
});
This will skip all it, beforeEach/afterEach, and describe blocks within the suite. before/after hooks are skipped unless they are defined at the same level as the hook containing this.skip().

describe('outer', function () {
  before(function () {
    this.skip();
  });

  after(function () {
    // will be executed
  });

  describe('inner', function () {
    before(function () {
      // will be skipped
    });

    after(function () {
      // will be skipped
    });
  });
});
Updated in v7.0.0: skipping a test within an “after all” hook is disallowed and will throw an exception. Use a return statement or other means to abort hook execution.

Before Mocha v3.0.0, this.skip() was not supported in asynchronous tests and hooks.
```

#### 3.2.2.15 #RETRY TESTS

```text
You can choose to retry failed tests up to a certain number of times. This feature is designed to handle end-to-end tests (functional tests/Selenium…) where resources cannot be easily mocked/stubbed. It’s not recommended to use this feature for unit tests.

This feature does re-run a failed test and its corresponding beforeEach/afterEach hooks, but not before/after hooks. this.retries() has no effect on failing hooks.

NOTE: Example below was written using Selenium webdriver (which overwrites global Mocha hooks for Promise chain).

describe('retries', function () {
  // Retry all tests in this suite up to 4 times
  this.retries(4);

  beforeEach(function () {
    browser.get('http://www.yahoo.com');
  });

  it('should succeed on the 3rd try', function () {
    // Specify this test to only retry up to 2 times
    this.retries(2);
    expect($('.foo').isDisplayed()).to.eventually.be.true;
  });
});
```

#### 3.2.2.16 DYNAMICALLY GENERATING TESTS , todo: write demo

```text
- my demo:
$ cat test/test.js 
const assert = require('assert');
describe('Array', function () {
  describe('#indexOf()', function () {
      it('should return -1 when the value is not present', function () {
          assert.equal([1, 2, 3].indexOf(4), -1);
      });

      it('double done', function (done) {
          // Calling `done()` twice is an error
          setImmediate(done);
          setImmediate(done);
      });
  });
});

function mult(args) {
    return args.reduce(( prv, cur) => prv*cur, 1);
}

describe('test mult function', function() {
    const test_inputs_outputs = [
        {args: [1,2,3], expected: 6},
        {args: [], expected: 1},
        {args: [-1,2,3], expected: -6},
        {args: [3], expected: 3},
        {args: [1,2,3,4,5,6], expected: 720},
        {args: [1,2,3,4], expected: 24}
    ];

    test_inputs_outputs.forEach(({args, expected}) => {
        it(`test multiplication of ${args}, should be ${expected}`, function() {
            const result = mult(args);
            assert.strictEqual(result, expected);
        });
    });
});
$ npm test

> mocha@1.0.0 test
> mocha



  Array
    #indexOf()
      ✔ should return -1 when the value is not present
      ✔ double done
      1) double done

  test mult function
    ✔ test multiplication of 1,2,3, should be 6
    ✔ test multiplication of , should be 1
    ✔ test multiplication of -1,2,3, should be -6
    ✔ test multiplication of 3, should be 3
    ✔ test multiplication of 1,2,3,4,5,6, should be 720
    ✔ test multiplication of 1,2,3,4, should be 24


  8 passing (4ms)
  1 failing

  1) Array
       #indexOf()
         double done:
     Error: done() called multiple times in test <Array #indexOf() double done> of file /Users/<user>/work/code/nodejs/tutorial/test/mocha/test/test.js
      at processImmediate (node:internal/timers:466:21)


- explanation
Given Mocha’s use of function expressions to define suites and test cases, it’s straightforward to generate your tests dynamically. No special syntax is required — plain ol’ JavaScript can be used to achieve functionality similar to “parameterized” tests, which you may have seen in other frameworks.

Take the following example:

const assert = require('assert');

function add(args) {
  return args.reduce((prev, curr) => prev + curr, 0);
}

describe('add()', function () {
  const tests = [
    {args: [1, 2], expected: 3},
    {args: [1, 2, 3], expected: 6},
    {args: [1, 2, 3, 4], expected: 10}
  ];

  tests.forEach(({args, expected}) => {
    it(`correctly adds ${args.length} args`, function () {
      const res = add(args);
      assert.strictEqual(res, expected);
    });
  });
});
The above code will produce a suite with three specs:

$ mocha

  add()
    ✓ correctly adds 2 args
    ✓ correctly adds 3 args
    ✓ correctly adds 4 args
Tests added inside a .forEach handler often don’t play well with editor plugins, especially with “right-click run” features. Another way to parameterize tests is to generate them with a closure. This following example is equivalent to the one above:

describe('add()', function () {
  const testAdd = ({args, expected}) =>
    function () {
      const res = add(args);
      assert.strictEqual(res, expected);
    };

  it('correctly adds 2 args', testAdd({args: [1, 2], expected: 3}));
  it('correctly adds 3 args', testAdd({args: [1, 2, 3], expected: 6}));
  it('correctly adds 4 args', testAdd({args: [1, 2, 3, 4], expected: 10}));
});
With top-level await you can collect your test data in a dynamic and asynchronous way while the test file is being loaded.
See also --delay for CommonJS modules without top-level await.

// testfile.mjs
import assert from 'assert';

// top-level await: Node >= v14.8.0 with ESM test file
const tests = await new Promise(resolve => {
  setTimeout(resolve, 5000, [
    {args: [1, 2], expected: 3},
    {args: [1, 2, 3], expected: 6},
    {args: [1, 2, 3, 4], expected: 10}
  ]);
});

// in suites ASYNCHRONOUS callbacks are NOT supported
describe('add()', function () {
  tests.forEach(({args, expected}) => {
    it(`correctly adds ${args.length} args`, function () {
      const res = args.reduce((sum, curr) => sum + curr, 0);
      assert.strictEqual(res, expected);
    });
  });
});
```

#### 3.2.2.17 TEST DURATION

```text
Many reporters will display test duration and flag tests that are slow (default: 75ms), as shown here with the SPEC reporter:

test duration

There are three levels of test duration (depicted in the following image):

FAST: Tests that run within half of the “slow” threshold will show the duration in green (if at all).
NORMAL: Tests that run exceeding half of the threshold (but still within it) will show the duration in yellow.
SLOW: Tests that run exceeding the threshold will show the duration in red.
test duration range

To tweak what’s considered “slow”, you can use the slow() method:

describe('something slow', function () {
  this.slow(300000); // five minutes

  it('should take long enough for me to go make a sandwich', function () {
    // ...
  });
});

my demo:
```

#### 3.2.2.18 TIMEOUTS

```text
#SUITE-LEVEL
Suite-level timeouts may be applied to entire test “suites”, or disabled via this.timeout(0). This will be inherited by all nested suites and test-cases that do not override the value.

describe('a suite of tests', function () {
  this.timeout(500);

  it('should take less than 500ms', function (done) {
    setTimeout(done, 300);
  });

  it('should take less than 500ms as well', function (done) {
    setTimeout(done, 250);
  });
});
#TEST-LEVEL
Test-specific timeouts may also be applied, or the use of this.timeout(0) to disable timeouts all together:

it('should take less than 500ms', function (done) {
  this.timeout(500);
  setTimeout(done, 300);
});
#HOOK-LEVEL
Hook-level timeouts may also be applied:

describe('a suite of tests', function () {
  beforeEach(function (done) {
    this.timeout(3000); // A very long environment setup.
    setTimeout(done, 2500);
  });
});
Again, use this.timeout(0) to disable the timeout for a hook.

In v3.0.0 or newer, a parameter passed to this.timeout() greater than the maximum delay value will cause the timeout to be disabled. In v8.0.0 or newer, this.enableTimeouts() has been removed. Warning: With async tests if you disable timeouts via this.timeout(0) and then do not call done(), your test will exit silently.

- demo 
    -- run 
$ npm test

> mocha@1.0.0 test
> mocha --inline-diffs



  Array
    #indexOf()
      ✔ should return -1 when the value is not present
      ✔ double done
      1) double done

  test mult function
    ✔ test multiplication of 1,2,3, should be 6
    ✔ test multiplication of , should be 1
    ✔ test multiplication of -1,2,3, should be -6
    ✔ test multiplication of 3, should be 3
    ✔ test multiplication of 1,2,3,4,5,6, should be 720
    ✔ test multiplication of 1,2,3,4, should be 24

  test slow function
    ✔ fast test < 30sec
normal test will give error:  Error: Resolution method is overspecified. Specify a callback *or* return a Promise; not both. Reason async function returns promise and done() is another promise
fast action
    2) normal test 60> test time > 30sec
    ✔ slow test > 60sec


  10 passing (35s)
  2 failing

  1) Array
       #indexOf()
         double done:
     Error: done() called multiple times in test <Array #indexOf() double done> of file /Users/<user>/work/code/nodejs/tutorial/test/mocha/test/test.js
      at processImmediate (node:internal/timers:466:21)

  2) test slow function
       normal test 60> test time > 30sec:
     Error: Resolution method is overspecified. Specify a callback *or* return a Promise; not both.
      at Context.<anonymous> (test/test.js:49:9)


    -- code
$ cat !$
cat test/test.js
const assert = require('assert');
describe('Array', function () {
  describe('#indexOf()', function () {
      it('should return -1 when the value is not present', function () {
          assert.equal([1, 2, 3].indexOf(4), -1);
      });

      it('double done', function (done) {
          // Calling `done()` twice is an error
          setImmediate(done);
          setImmediate(done);
      });
  });
});

function mult(args) {
    return args.reduce(( prv, cur) => prv*cur, 1);
}

describe('test mult function', function() {
    const test_inputs_outputs = [
        {args: [1,2,3], expected: 6},
        {args: [], expected: 1},
        {args: [-1,2,3], expected: -6},
        {args: [3], expected: 3},
        {args: [1,2,3,4,5,6], expected: 720},
        {args: [1,2,3,4], expected: 24}
    ];

    test_inputs_outputs.forEach(({args, expected}) => {
        it(`test multiplication of ${args}, should be ${expected}`, function() {
            const result = mult(args);
            assert.strictEqual(result, expected);
        });
    });
});

describe('test slow function', async function() {
    this.slow(60000); // 1 minute. so >1 slow, 30-60 seconds normal, <30 fast 
   
    it('fast test < 30sec', async function() {
        setTimeout(() => {console.log('fast action');}, 5000);
        //await new Promise(res => setTimeout(res, 5000));
        //done()
    }).timeout(70000);
    it('normal test 60> test time > 30sec', async function(done) {
        console.log('normal test will give error:  Error: Resolution method is overspecified. Specify a callback *or* return a Promise; not both. Reason async function returns promise and done() is another promise');
        await new Promise(res => setTimeout(res, 35000));
        done()
     }).timeout(70000);
    it('slow test > 60sec', async function() {
        setTimeout(() => {console.log('fast action');}, 61000);
    }).timeout(70000);
});
```

#### 3.2.2.19 inline-diffs

```text
code:
describe('inline-diff demo', function() {
    it('test inline-diff', function() {
        const expected = {
            name: 'yosi',
            surname: 'izaq'
        };
        assert.strictEqual(expected, {
            name: 'yosii',
            surname: 'itzak'
        });
    });
});

run:
$ grep test package.json 
    "test": "mocha --inline-diffs"

demo:
  2) inline-diff demo
       test inline-diff:

      AssertionError [ERR_ASSERTION]: Expected "actual" to be reference-equal to "expected":
+ actual - expected

  {
+   name: 'yosi',
+   surname: 'izaq'
-   name: 'yosii',
-   surname: 'itzak'
  }      
      actual expected
      
      {
        "name": "yosiyosii"
        "surname": "izaqitzak"
      }
      
      at Context.<anonymous> (test/test.js:44:16)
      at processImmediate (node:internal/timers:466:21)
```

#### 3.2.2.20 COMMAND-LINE USAGE

```text
mocha [spec..]

Run tests with Mocha

Commands
  mocha inspect [spec..]  Run tests with Mocha                         [default]
  mocha init <path>       create a client-side Mocha setup at <path>

Rules & Behavior
      --allow-uncaught       Allow uncaught errors to propagate        [boolean]
  -A, --async-only           Require all tests to use a callback (async) or
                             return a Promise                          [boolean]
  -b, --bail                 Abort ("bail") after first test failure   [boolean]
      --check-leaks          Check for global variable leaks           [boolean]
      --delay                Delay initial execution of root suite     [boolean]
      --dry-run              Report tests without executing them       [boolean]
      --exit                 Force Mocha to quit after tests complete  [boolean]
      --fail-zero            Fail test run if no test(s) encountered   [boolean]
      --forbid-only          Fail if exclusive test(s) encountered     [boolean]
      --forbid-pending       Fail if pending test(s) encountered       [boolean]
      --global, --globals    List of allowed global variables            [array]
  -j, --jobs                 Number of concurrent jobs for --parallel; use 1 to
                             run in serial
                                   [number] [default: (number of CPU cores - 1)]
  -p, --parallel             Run tests in parallel                     [boolean]
      --retries              Retry failed tests this many times         [number]
  -s, --slow                 Specify "slow" test threshold (in milliseconds)
                                                          [string] [default: 75]
  -t, --timeout, --timeouts  Specify test timeout threshold (in milliseconds)
                                                        [string] [default: 2000]
  -u, --ui                   Specify user interface    [string] [default: "bdd"]

Reporting & Output
  -c, --color, --colors                     Force-enable color output  [boolean]
      --diff                                Show diff on failure
                                                       [boolean] [default: true]
      --full-trace                          Display full stack traces  [boolean]
  -G, --growl                               Enable Growl notifications [boolean]
      --inline-diffs                        Display actual/expected differences
                                            inline within each string  [boolean]
  -R, --reporter                            Specify reporter to use
                                                      [string] [default: "spec"]
  -O, --reporter-option,                    Reporter-specific options
  --reporter-options                        (<k=v,[k1=v1,..]>)           [array]

Configuration
      --config       Path to config file   [string] [default: (nearest rc file)]
  -n, --node-option  Node or V8 option (no leading "--")                 [array]
      --package      Path to package.json for config                    [string]

File Handling
      --extension          File extension(s) to load
                                           [array] [default: ["js","cjs","mjs"]]
      --file               Specify file(s) to be loaded prior to root suite
                           execution                   [array] [default: (none)]
      --ignore, --exclude  Ignore file(s) or glob pattern(s)
                                                       [array] [default: (none)]
      --recursive          Look for tests in subdirectories            [boolean]
  -r, --require            Require module              [array] [default: (none)]
  -S, --sort               Sort test files                             [boolean]
  -w, --watch              Watch files in the current working directory for
                           changes                                     [boolean]
      --watch-files        List of paths or globs to watch               [array]
      --watch-ignore       List of paths or globs to exclude from watching
                                      [array] [default: ["node_modules",".git"]]

Test Filters
  -f, --fgrep   Only run tests containing this string                   [string]
  -g, --grep    Only run tests matching this string or regexp           [string]
  -i, --invert  Inverts --grep and --fgrep matches                     [boolean]

Positional Arguments
  spec  One or more files, directories, or globs to test
                                                     [array] [default: ["test"]]

Other Options
  -h, --help             Show usage information & exit                 [boolean]
  -V, --version          Show version number & exit                    [boolean]
      --list-interfaces  List built-in user interfaces & exit          [boolean]
      --list-reporters   List built-in reporters & exit                [boolean]

Mocha Resources
    Chat: https://gitter.im/mochajs/mocha
  GitHub: https://github.com/mochajs/mocha.git
    Docs: https://mochajs.org/

            3.2.2.21
        3.2.3
```

## 3.3 sinon

### 3.3.1 https://www.sitepoint.com/sinon-tutorial-javascript-testing-mocks-spies-stubs/

```text
In real life projects, code often does all kinds of things that make testing hard. Ajax requests, timers, dates, accessing other browser features… or if you’re using Node.js, databases are always fun, and so is network or file access.

All of these are hard to test because you can’t control them in code. If you’re using Ajax, you need a server to respond to the request, so as to make your tests pass. If you use setTimeout, your test will have to wait. With databases or networking, it’s the same thing — you need a database with the correct data, or a network server.

Real-life isn’t as easy as many testing tutorials make it look. But did you know there is a solution?

By using Sinon, we can make testing non-trivial code trivial!

Let’s find out how.
What Makes Sinon so Important and Useful?

Put simply, Sinon allows you to replace the difficult parts of your tests with something that makes testing simple.

When testing a piece of code, you don’t want to have it affected by anything outside the test. If something external affects a test, the test becomes much more complex and could fail randomly.

If you want to test code making an Ajax call, how can you do that? You need to run a server and make sure it gives the exact response needed for your test. It’s complicated to set up, and makes writing and running unit tests difficult.

And what if your code depends on time? Let’s say it waits one second before doing something. What now? You could use a setTimeout in your test to wait one second, but that makes the test slow. Imagine if the interval was longer, for example five minutes. I’m going to guess you probably don’t want to wait five minutes each time you run your tests.

By using Sinon, we can take both of these issues (plus many others), and eliminate the complexity.
How Does Sinon Work?

Sinon helps eliminate complexity in tests by allowing you to easily create so called test-doubles.

Test-doubles are, like the name suggests, replacements for pieces of code used in your tests. Looking back at the Ajax example, instead of setting up a server, we would replace the Ajax call with a test-double. With the time example, we would use test-doubles to allow us to “travel forwards in time”.

It may sound a bit weird, but the basic concept is simple. Because JavaScript is very dynamic, we can take any function and replace it with something else. Test-doubles just take this idea a little bit further. With Sinon, we can replace any JavaScript function with a test-double, which can then be configured to do a variety of things to make testing complex things simple.

Sinon splits test-doubles into three types:

    Spies, which offer information about function calls, without affecting their behavior
    Stubs, which are like spies, but completely replace the function. This makes it possible to make a stubbed function do whatever you like — throw an exception, return a specific value, etc
    Mocks, which make replacing whole objects easier by combining both spies and stubs

In addition, Sinon also provides some other helpers, although these are outside the scope of this article:

    Fake timers, which can be used to travel forwards in time, for example triggering a setTimeout
    Fake XMLHttpRequest and server, which can be used to fake Ajax requests and responses

With these features, Sinon allows you to solve all of the difficult problems external dependencies cause in your tests. If you learn the tricks for using Sinon effectively, you won’t need any other tools.
Installing Sinon
```

#### 3.3.1.1 install Sinon.

```text
For Node.js testing:

    Install Sinon via npm using npm install sinon
    Require Sinon in your test with var sinon = require('sinon');

For browser based testing:

    You can either install Sinon via npm with npm install sinon, use a CDN, or download it from Sinon’s website
    Include sinon.js in your test runner page.

Getting Started

Sinon has a lot of functionality, but much of it builds on top of itself. You learn about one part, and you already know about the next one. This makes Sinon easy to use once you learn the basics and know what each different part does.

We usually need Sinon when our code calls a function which is giving us trouble.

With Ajax, it could be $.get or XMLHttpRequest. With time, the function might be setTimeout. With databases, it could be mongodb.findOne.

To make it easier to talk about this function, I’m going to call it the dependency. The function we are testing depends on the result of another function.

We can say, the basic use pattern with Sinon is to replace the problematic dependency with a test-double.

    When testing Ajax, we replace XMLHttpRequest with a test-double which pretends to make an Ajax request
    When testing time, we replace setTimeout with a pretend timer
    When testing database access, we could replace mongodb.findOne with a test-double which immediately returns some fake data

Let’s see how that works in practice.
```

#### 3.3.1.2 Spies

```text
Spies are the simplest part of Sinon, and other functionality builds on top of them.

The primary use for spies is to gather information about function calls. You can also use them to help verify things, such as whether a function was called or not.

var spy = sinon.spy();

//We can call a spy like a function
spy('Hello', 'World');

//Now we can get information about the call
console.log(spy.firstCall.args); //output: ['Hello', 'World']

The function sinon.spy returns a Spy object, which can be called like a function, but also contains properties with information on any calls made to it. In the example above, the firstCall property has information about the first call, such as firstCall.args which is the list of arguments passed.

Although you can create anonymous spies as above by calling sinon.spy with no parameters, a more common pattern is to replace another function with a spy.

var user = {
  ...
  setName: function(name){
    this.name = name;
  }
}

//Create a spy for the setName function
var setNameSpy = sinon.spy(user, 'setName');

//Now, any time we call the function, the spy logs information about it
user.setName('Darth Vader');

//Which we can see by looking at the spy object
console.log(setNameSpy.callCount); //output: 1

//Important final step - remove the spy
setNameSpy.restore();

Replacing another function with a spy works similarly to the previous example, with one important difference: When you’ve finished using the spy, it’s important to remember to restore the original function, as in the last line of the example above. Without this your tests may misbehave.

Spies have a lot of different properties, which provide different information on how they were used. Sinon’s spy documentation has a comprehensive list of all available options.

In practice, you might not use spies very often. You’re more likely to need a stub, but spies can be convenient for example to verify a callback was called:

function myFunction(condition, callback){
  if(condition){
    callback();
  }
}

describe('myFunction', function() {
  it('should call the callback function', function() {
    var callback = sinon.spy();

    myFunction(true, callback);

    assert(callback.calledOnce);
  });
});

In this example I am using Mocha as the test framework and Chai as the assertion library. If you would like to learn more about either of these, then please consult my previous article: Unit Test Your JavaScript Using Mocha and Chai.
```

#### 3.3.1.3 Sinon’s Assertions

```text
Before we carry on and talk about stubs, let’s take a quick detour and look at Sinon’s assertions.

In most testing situations with spies (and stubs), you need some way of verifying the result of the test.

We can use any kind of assertion to verify the results. In the previous example with the callback, we used Chai’s assert function which ensures the value is truthy.

assert(callback.calledOnce);

The problem with this is that the error message in a failure is unclear. You’ll simply be told “false was not true”, or some variation of that. As you can probably imagine, it’s not very helpful in finding out what went wrong, and you need to go look at the source code for the test to figure it out. Not fun.

To fix the problem, we could include a custom error message into the assertion.

assert(callback.calledOnce, 'Callback was not called once');

But why bother when we can use Sinon’s own assertions?

describe('myFunction', function() {
  it('should call the callback function', function() {
    var callback = sinon.spy();

    myFunction(true, callback);

    sinon.assert.calledOnce(callback);
  });
});

Using Sinon’s assertions like this gives us a much better error message out of the box. This becomes very useful when you need to verify more complex condition, such as the parameters to a function.

Here are some examples of other useful assertions provided by Sinon:

    sinon.assert.calledWith can be used to verify the a function was called with specific parameters (this is probably the one I use most often)
    sinon.assert.callOrder can verify functions were called in a specific order

As with spies, Sinon’s assertion documentation has all the options available. If you like using Chai, there is also a sinon-chai plugin available, which lets you use Sinon assertions through Chai’s expect or should interface.
```

#### 3.3.1.4 Stubs

```text
Stubs are the go-to test-double because of their flexibility and convenience. They have all the functionality of spies, but instead of just spying on what a function does, a stub completely replaces it. In other words, when using a spy, the original function still runs, but when using a stub, it doesn’t.

This makes stubs perfect for a number of tasks, such as:

    Replacing Ajax or other external calls which make tests slow and difficult to write
    Triggering different code paths depending on function output
    Testing unusual conditions, for example what happens when an exception is thrown?

We can create stubs in a similar way to spies…

var stub = sinon.stub();

stub('hello');

console.log(stub.firstCall.args); //output: ['hello']

We can create anonymous stubs as with spies, but stubs become really useful when you use them to replace existing functions.

For example, if we have some code that uses jQuery’s Ajax functionality, testing it is difficult. The code sends a request to whatever server we’ve configured, so we need to have it available, or add a special case to the code to not do that in a test environment — which is a big no-no. You should almost never have test-specific cases in your code.

Instead of resorting to poor practices, we can use Sinon and replace the Ajax functionality with a stub. This makes testing it trivial.

Here’s an example function we’ll test. It takes an object as its parameter, and sends it via Ajax to a predefined URL.

function saveUser(user, callback) {
  $.post('/users', {
    first: user.firstname,
    last: user.lastname
  }, callback);
}

Normally, testing this would be difficult because of the Ajax call and predefined URL, but if we use a stub, it becomes easy.

Let’s say we want to ensure the callback function passed to saveUser is called correctly once the request finishes.

describe('saveUser', function() {
  it('should call callback after saving', function() {

    //We'll stub $.post so a request is not sent
    var post = sinon.stub($, 'post');
    post.yields();

    //We can use a spy as the callback so it's easy to verify
    var callback = sinon.spy();

    saveUser({ firstname: 'Han', lastname: 'Solo' }, callback);

    post.restore();
    sinon.assert.calledOnce(callback);
  });
});

Here, we replace the Ajax function with a stub. This means the request is never sent, and we don’t need a server or anything — we have full control over what happens in our test code!

As we want to ensure the callback we pass into saveUser gets called, we’ll instruct the stub to yield. This means the stub automatically calls the first function passed as a parameter to it. This mimics the behavior of $.post, which would call a callback once the request has finished.

In addition to a stub, we’re creating a spy in this test. We could use a normal function as the callback, but using a spy makes it easy to verify the result of the test using Sinon’s sinon.assert.calledOnce assertion.

In most cases when you need a stub, you can follow the same basic pattern:

    Find the problematic function, such as $.post
    Look at how it works so you can mimic it in the test
    Create a stub
    Set the stub to have the behavior you want in your test

The stub doesn’t need to mimic every behavior. Only the behavior you need for the test is necessary, and anything else can be left out.

Another common usage for stubs is verifying a function was called with a specific set of arguments.

For example, for our Ajax functionality, we want to ensure the correct values are being sent. Therefore, we could have something like:

describe('saveUser', function() {
  it('should send correct parameters to the expected URL', function() {

    //We'll stub $.post same as before
    var post = sinon.stub($, 'post');

    //We'll set up some variables to contain the expected results
    var expectedUrl = '/users';
    var expectedParams = {
      first: 'Expected first name',
      last: 'Expected last name'
    };

    //We can also set up the user we'll save based on the expected data
    var user = {
      firstname: expectedParams.first,
      lastname: expectedParams.last
    }

    saveUser(user, function(){} );
    post.restore();

    sinon.assert.calledWith(post, expectedUrl, expectedParams);
  });
});

Again, we create a stub for $.post(), but this time we don’t set it to yield. This test doesn’t care about the callback, therefore having it yield is unnecessary.

We set up some variables to contain the expected data — the URL and the parameters. It’s a good practice to set up variables like this, as it makes it easy to see at a glance what the requirements for the test are. It also helps us set up the user variable without repeating the values.

This time we used the sinon.assert.calledWith() assertion. We pass the stub as its first parameter, because this time we want to verify the stub was called with the correct parameters.

There’s also another way of testing Ajax requests in Sinon. This is by using Sinon’s fake XMLHttpRequest functionality. We won’t go into detail on it here, but if you want to learn how that works, see my article on Ajax testing with Sinon’s fake XMLHttpRequest.
```

#### 3.3.1.5 Mocks

```text
Mocks are a different approach to stubs. If you’ve heard the term “mock object”, this is the same thing — Sinon’s mocks can be used to replace whole objects and alter their behavior similar to stubbing functions.

They are primarily useful if you need to stub more than one function from a single object. If you only need to replace a single function, a stub is easier to use.

You should take care when using mocks! Because of their power, it’s easy to make your tests overly specific — test too many and too specific things — which risks making your tests unintentionally brittle.

Unlike spies and stubs, mocks have assertions built-in. You define your expected results up front by telling the mock object what needs to happen, and then calling the verification function at the end of the test.

Let’s say we’re using store.js to save things into localStorage, and we want to test a function related to that. We can use a mock to help testing it like so:

describe('incrementStoredData', function() {
  it('should increment stored value by one', function() {
    var storeMock = sinon.mock(store);
    storeMock.expects('get').withArgs('data').returns(0);
    storeMock.expects('set').once().withArgs('data', 1);

    incrementStoredData();

    storeMock.restore();
    storeMock.verify();
  });
});

When using mocks, we define the expected calls and their results using a fluent calling style as seen above. This is the same as using assertions to verify test results, except we define them up-front, and to verify them, we call storeMock.verify() at the end of the test.

In Sinon’s mock object terminology, calling mock.expects('something') creates an expectation. As in, the method mock.something() expects to be called. Each expectation, in addition to mock-specific functionality, supports the same functions as spies and stubs.

You may find that it’s often much easier to use a stub than a mock — and that’s perfectly fine. Mocks should be used with care.

For a full list of mock-specific functions, check Sinon’s mock documentation.
Important Best Practice: Use sinon.test()

There is one important best practice with Sinon that should be remembered whenever using spies, stubs or mocks.

If you replace an existing function with a test-double, use sinon.test().

In the earlier example, we used stub.restore() or mock.restore() to clean up after using them. This is necessary as otherwise the test-double remains in place, and could negatively affect other tests or cause errors.

But using the restore() function directly is problematic. It’s possible that the function being tested causes an error and ends the test function before restore() has been called!

We have two ways to solve this: We can wrap the whole thing in a try catch block. This allows us to put the restore() call in a finally block, ensuring it gets run no matter what.

Or, a better approach, we can wrap the test function with sinon.test()

it('should do something with stubs', sinon.test(function() {
  var stub = this.stub($, 'post');

  doSomething();

  sinon.assert.calledOnce(stub);
});

In the above example, note the second parameter to it() is wrapped within sinon.test(). The second thing of note is that we use this.stub() instead of sinon.stub().

Wrapping a test with sinon.test() allows us to use Sinon’s sandboxing feature, allowing us to create spies, stubs and mocks via this.spy(), this.stub() and this.mock(). Any test-doubles you create using sandboxing are cleaned up automatically.

Note that our example code above has no stub.restore() — it’s unnecessary thanks to the test being sandboxed.

If you use sinon.test() where possible, you can avoid problems where tests start failing randomly because an earlier test didn’t clean up its test-doubles due to an error.
Sinon Is Not Magic

Sinon does many things, and occasionally it might seem difficult to understand how it works. Let’s take a look at some plain JavaScript examples of how Sinon works, so we can get a better idea of what it does under the hood. This will help you use it more effectively in different situations.

We can create spies, stubs and mocks manually too. The reason we use Sinon is it makes the task trivial — creating them manually can be quite complicated, but let’s see how that works, to understand what Sinon does.

First, a spy is essentially a function wrapper:

//A simple spy helper
function createSpy(targetFunc) {
  var spy = function() {
    spy.args = arguments;
    spy.returnValue = targetFunc.apply(this, arguments);
    return spy.returnValue;
  };

  return spy;
}

//Let's spy on a simple function:
function sum(a, b) { return a + b; }

var spiedSum = createSpy(sum);

spiedSum(10, 5);

console.log(spiedSum.args); //Output: [10, 5]
console.log(spiedSum.returnValue); //Output: 15

We can get spy functionality quite easily with a custom function like so. But notice that Sinon’s spies provide a much wider array of functionality — including assertion support. This makes Sinon a lot more convenient.
What about a Stub Then?

To make a really simple stub, you can simply replace a function with a new one:

var stub = function() { };

var original = thing.otherFunction;
thing.otherFunction = stub;

//Now any calls to thing.otherFunction will call our stub instead

But again, there are several advantages Sinon’s stubs provide:

    They have the full spy functionality in them
    You can restore original behavior easily with stub.restore()
    You can assert against Sinon stubs

Mocks simply combine the behavior of spies and stubs, making it possible to use their features in different ways.

Even though Sinon may sometimes seem like it does a lot of “magic”, this can be done fairly easily with your own code too, for the most part. Sinon is just much more convenient to use, than having to write your own library for the purpose.
Conclusion

Testing real-life code can sometimes seem way too complex and it’s easy to give up altogether. But with help from Sinon, testing virtually any kind of code becomes a breeze.

Just remember the main principle: If a function makes your test difficult to write, try replacing it with a test-double. This principle applies regardless of what the function does.

Looking to learn more about how to apply Sinon with your own code? Head over to my site and I’ll send you my free Sinon in the real-world guide, which includes Sinon best practices, and three real-world examples of how to apply it in different types of testing situations!
```

### 3.3.2 my example

```text
- test
$ grunt --force

- code
r~/Desktop/work/code/nodejs/tutorial/sinonDemo.js
class User{

        constructor (fname, lname){
                this.fname = fname;
                this.lname = lname;
        }

        getName()
        {
                return this.fname +" "+this.lname;
        }

        sleep(ms){
                return new Promise(resolve => setTimeout(resolve,ms));
        }

        async saveToDB()
        {
                console.log("sleeping...");
                await this.sleep(2000);
                console.log("woke up 2 sec later");
        }

        setName(fname,lname){
                this.fname = fname;
                this.lname = lname;
        }

        callSetThenGetName(){
                console.log("callSetThenGetName()");
                this.setName(this.fname, this.lname);
                this.saveToDB();
                this.getName();
        }
}

r~/Desktop/work/code/nodejs/tutorial/sinonDemoManager.js
user = require('./sinonDemo.js');

class Manager{
        constructor(name){
                this.name =name;
        }

        hireNewEmployee( user)
        {
            console.log("hireNewEmployee()");
            user.callSetThenGetName();
        }
} 
module.exports = Manager ;

r~/Desktop/work/code/nodejs/tutorial/test/UserTests.js
var expect = require('chai').expect;
var assert = require('chai').assert;
const User = require('../sinonDemo.js');
const Manager = require('../sinonDemoManager.js');

var sinon = require('sinon');

//spy keeps tab on target function calls. letting you know how many times it was called and with which arguments
describe ("getName", function(){

        it('should call getName once', function(){
                yosi = new User('yosi', 'izaq');
                var getNameSpy = sinon.spy(User.prototype, "getName"); //stub class getName
                //var getNameSpy = sinon.spy(yosi, "getName"); //stub single instance getName

                yosi.getName();

                getNameSpy.restore();
                assert(getNameSpy.calledOnce);
        });
});



//sinon stubs repace a method so we can verify the method was called but avoid running blocking methods (like waiting for external server response)
//describe.skip and xit instead of it -> skip tests 
describe("saveToDB", function(){

        it('should call saveToDB but use a stub to avoid waiting', function(){
                yosi = new User('yosi', 'izaq');
                var saveToDBStub = sinon.stub(yosi, "saveToDB");

                yosi.saveToDB();

                //saveToDBStub.should.have.been.called();
                saveToDBStub.restore();
                assert(saveToDBStub.called);
        });
});

//sinon mock gives full power to mimic method calls expected results.
describe ('hireNewEmployee', function(){
        it('should create a user and call hireNewEmployee', function(){
        yosi = new User('yosi', 'izaq');
        var userMock = sinon.mock(yosi) ;
        //var userMock = sinon.mock(User.prototype) ;

        userMock.expects('setName').once().withArgs(yosi.fname, yosi.lname);
        userMock.expects('saveToDB').once().withArgs();
        userMock.expects('getName').once().withArgs().returns('yosi');
        manager = new Manager("guy mosko");
        manager.hireNewEmployee(yosi);

        userMock.verify();
        userMock.restore();

        });
});


        3.3.3
```

## 3.4 My grunt file examples

### 3.4.1 /Users/<user>/Desktop/work/code/nodejs/tutorial

```text
$ cat Gruntfile.js 
module.exports = function(grunt) {
	var banner = '/*n<%= pkg.name %> <%= pkg.version %> - <%= pkg.description %>n<%= pkg.repository.url %>nBuilt on <%= grunt.template.today("yyyy-mm-dd") %>n*/n';

        // section 1 - require modules
    require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
                eslint: {
            options: {
                config: 'eslint.json',
                reset: true
            },
            target: ['*.js']
        },
        // task for mocha tests execution, they would be executed by nyc
        mochaTest: {
            local: {
                options: {
                    reporter: 'spec'
                },
                src: ['test/*.js']
            }
        },
        // nyc - executes mochaTest task
        nyc: {
            local: {
                options: {
                    all: true,
                    exclude: [
                        "**/*.spec.js",
                        "**/Gruntfile.js",
                        "**/Mock*",
                        "**/coverage",
                        "**/resources"
                    ],
                    reporter: ['text-summary', 'html'],
                    checkCoverage: true,
                    lines: 90
                },
                cmd: false,
                args: ['grunt', 'mochaTest:local', '--force']
            }
        }
	});


// section 3 - register grunt tasks
        //    grunt.loadNpmTasks('gruntify-eslint');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-simple-nyc');

    // Default task
    //grunt.registerTask('default', [ 'test']);
    grunt.registerTask('default', ['lint', 'test']);
    // Lint task
    //grunt.registerTask('lint', ['eslint:ci']);
    grunt.registerTask('lint', ['eslint']);
    // Mocha test task
    grunt.registerTask('test', ['nyc:local']);
};


    3.5
```
