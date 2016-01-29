/* global describe, it */

var spawn = require('child_process').spawn
var ansiRegex = require('ansi-regex')()

var chai = require('chai')
chai.should()
chai.use(require('chai-string'))

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

      var argv = parseStdout(stdout)
      argv.input.should.equal('input')
      argv.output.should.equal('output')
      argv.choice.should.equal('foo')
      argv.def.should.equal('foobar')
      done()
    })
  })

  it('should not run if required arguments are not present and not interactive mode', function (done) {
    testCmd('node', ['interactive.js'], 'input\noutput\n\n\n\n', function (stderr, stdout) {
      stderr.should.startWith('This is my awesome program\n\nUsage: interactive.js')
      done()
    })
  })

  it('should run if required arguments are present and not interactive mode', function (done) {
    var args = ['interactive.js', '-in', 'input', '-out', 'output', '-c', 'foo', '-m', 'bar']
    testCmd('node', args, 'input\noutput\n\n\n\n', function (stderr, stdout) {
      stderr.should.equal('')

      var argv = parseStdout(stdout)
      argv.input.should.equal('input')
      argv.output.should.equal('output')
      argv.choice.should.equal('foo')
      argv.multi.should.deep.equal(['bar'])
      argv.def.should.equal('foobar')
      done()
    })
  })

  it('should do nothing if no options are required', function (done) {
    var args = ['interactive-empty.js', '-i']
    testCmd('node', args, 'input\noutput\n\n\n\n', function (stderr, stdout) {
      stderr.should.equal('')

      parseStdout(stdout)
      done()
    })
  })
})

function parseStdout (stdout) {
  var i = stdout.indexOf('Inspecting options')
  i.should.be.at.least(0)
  stdout = stdout.substring(i + 'Inspecting options'.length).trim()
  return JSON.parse(stdout)
}

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
