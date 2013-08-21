#! /usr/bin/env node

var screen = require('charm')(process)
var fs = require('fs')
var fireworm = require('fireworm')
var exec = require('child_process').exec
var path = require('path')

var patterns = process.argv[2]
var command = process.argv[3]
var basePath = process.cwd()
var fw = fireworm(basePath)

patterns = patterns.split(',')
fw.add.apply(fw, patterns)

fw.on('change', function(filepath){
  run()
})

function run(){
  screen.erase('screen')
  var p = exec(command)
  p.stdout.on('data', function(data){
    screen.position(1, 1)
    screen.write(data + '')
  })
  p.stderr.on('data', function(data){
    screen.position(1, 0)
    screen.write(data + '')
  })
  p.on('error', function(){})
}

'SIGINT SIGTERM SIGHUP'.split(' ')
  .forEach(function(evt){
  process.on(evt, function(){
    exitClean()
  })
})

function exitClean(){
  screen.display('reset')
  screen.erase('screen')
  screen.position(0, 0)
  screen.cursor(true)
  process.stdin.setRawMode(false)
  screen.destroy()
  process.exit()
}

screen.on('data', function(){
  exitClean()
})

screen.reset()
run()
