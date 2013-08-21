#! /usr/bin/env node

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
  console.log(
    path.relative(basePath, filepath), 
    'changed, executing', 
    '"' + command + '"')
  var p = exec(command)
  p.stdout.pipe(process.stdout)
  p.stderr.pipe(process.stderr)
  p.on('error', function(){})
})

process.nextTick(function(){
  console.log('Watching...')
})
