#! /usr/bin/env node

require('colors')
var blessed = require('blessed')
var program = blessed.program()
var fs = require('fs')
var fireworm = require('fireworm')
var exec = require('child_process').exec
var path = require('path')


var screen = blessed.screen()
var patterns = process.argv[2]
var command = process.argv[3]
var basePath = process.cwd()
var fw = fireworm(basePath)

var header = blessed.box({
  top: 0,
  left: 1,
  content: 'Re-run ' + command.green + ' when ' + patterns.magenta + ' change'
})

screen.append(header)

var outputPanel = blessed.box({
  top: 1,
  left: 0,
  width: '100%',
  height: '99%',
  border: {
    type: 'line'
  }
})


screen.append(outputPanel)

patterns = patterns.split(',')
fw.add.apply(fw, patterns)

fw.on('change', function(filepath){
  run()
})

var buffer = ''

function run(){
  buffer = ''
  updateScreen()
  var p = exec(command)
  p.stdout.on('data', function(data){
    buffer += data + ''
    updateScreen()
  })
  p.stderr.on('data', function(data){
    buffer += (data + '').red
    updateScreen()
  })
  p.on('error', function(){})
}

function updateScreen(){
  outputPanel.setContent(buffer)
  screen.render()
}

program.on('keypress', function(ch, key){
  if (key.name === 'q'){
    program.clear();
    program.showCursor();
    process.exit(0);
  }
})

screen.render()

run()
