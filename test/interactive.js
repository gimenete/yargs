/* global describe, it */

var spawn = require('child_process').spawn
var ansiRegex = require('ansi-regex')()

require('chai').should()

describe('interactive tests', function () {
  it('should show usage if no arguments are supplied', function (done) {
    testCmd('node', ['interactive.js'], '', function (stderr, stdout) {
      stdout.should.equal('')
      stderr.should.not.equal('')
      done()
    })
  })

  it('should run in interactive mode', function (done) {
    testCmd('node', ['interactive.js', '-i'], 'input\noutput\n\n\n\n', function (stderr, stdout) {
      stderr.should.equal('')

      var i = stdout.indexOf('Inspecting options')
      i.should.be.above(0)
      stdout = stdout.substring(i + 'Inspecting options'.length).trim()
      var argv = JSON.parse(stdout)
      argv.input.should.equal('input')
      argv.output.should.equal('output')
      argv.choice.should.equal('foo')
      done()
    })
  })
})

function testCmd (cmd, args, input, callback) {
  var stderr = ''
  var stdout = ''

  var oldDir = process.cwd()
  process.chdir(__dirname + '/fixtures')
  var bin = spawn(cmd, args)
  process.chdir(oldDir)

  bin.stderr.on('data', function (buf) {
    stderr += buf.toString()
  })

  bin.stdout.on('data', function (buf) {
    stdout += buf.toString().replace(ansiRegex, '') // remove ANSI sequences
  })

  bin.on('exit', function () {
    callback(stderr, stdout)
  })

  bin.stdin.write(input)
}
