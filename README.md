Watch'em
========

A utility that watches your directory for file changes, and then executes a command on change. The output of the command is always anchored to the top to a box which makes for a nice iterative development experience.

Screencast
----------

Watch it in action in this [screencast (3:22)](http://www.screenr.com/VEXH).

Install
-------

First you need [Node](http://nodejs.org/). Then

    npm install watchem -g

Usage
-----

    watchem "Makefile,**/*.c,**/*.h" make

This command will watch the `Makefile`, and any `.c` or `.h`files within the current directory and within any of its subdirectories. It runs the command `make` and re-run it whenever any matching files change, even new ones that are created.

Thanks
------

Watchem uses [blessed](https://github.com/chjj/blessed) to build its user interface. It uses [fireworm](https://github.com/airportyh/fireworm) for file watching.