# Proto

A bunch of default stuff in a project, because it's hard to remember all of this stuff every time you want to start a new thing.

## Getting Started

### Install development dependencies
1. Install Git
  1. Git is already installed on OSX, so this may require no effort
  1. (optional) Update Git to the latest version
1. Install Node.js
  1. (optional but recommended) Don't install Node.js directly; install [NVM](https://github.com/creationix/nvm) instead
  1. (optional but recommended) Install the LTS version of Node.js (currently v4.2.x)

### (optional) Set up Sublime Text
1. Download Sublime Text 3 from [here](http://www.sublimetext.com/3) and install it as per your operating system
1. Improve your terminal
  1. To add the `subl` command to your terminal, add the following line to your `.bashrc` file (or `.zshrc` if you're using zshell):
    `alias subl='/Applications/Sublime\ Text.app/Contents/SharedSupport/bin/subl'`
  1. To set Sublime Text as your default editor, add the following linadd the following line to your `.bashrc` file (or `.zshrc` if you're using zshell):
    `export EDITOR='subl -w'`
1. Install [Package Control](https://packagecontrol.io/installation)
1. Install useful plugins
  1. All Autocomplete - autocomplete suggests words contained in all open files
  1. Babel - improved JavaScript syntax highlighting, including ES6 and JSX
    1. To get improved syntax highlighting via the Babel plugin, you must first open a .js file and in the top menu select: View > Syntax > Open all with current extension as > Babel > JavaScript (Babel)
  1. EditorConfig - automatically make your line endings and tabs follow the project's prescribed guidelines
  1. GitGutter - show added or deleted lines to the left of line numbers
  1. SublimeLinter - run a linting tool against a file open save
  1. SublimeLinter-contrib-eslint
    1. Note that this plugin may require a bunch of setup that I'm too lazy to put here right now, but it's totally worth the pain to get it working

### Set up the codebase
1. (optional) Create your own fork of this repository
1. Create a local clone of this repository (or your own fork)
1. Inside the project directory, install all of the project's dependencies with the following command:
  `npm install`
1. Verify that all dependencies are met and the development environment runs correctly
  1. Inside the project directory, start the development server with the following command:
    `npm start`
  1. Open up a browser and verify that the text "Hello, Sea World!" appears on the page by navigating to:
    `http://localhost:8080`
