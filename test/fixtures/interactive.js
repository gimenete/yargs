var yargs = require('../../index')

yargs
  .usage('This is my awesome program\n\nUsage: $0 [options]')
  .help('help').alias('help', 'h')
  .version('1.0.1', 'version').alias('version', 'V')
  .options({
    input: {
      alias: 'in',
      description: '<filename> Input file name',
      requiresArg: true,
      required: true
    },
    output: {
      alias: 'out',
      description: '<filename> output file name',
      requiresArg: true,
      required: true
    },
    choice: {
      alias: 'c',
      choices: ['foo', 'bar'],
      description: 'A simple choice',
      requiresArg: true,
      required: true
    },
    multi: {
      alias: 'm',
      choices: ['foo', 'bar'],
      description: 'A multiple choice',
      requiresArg: true,
      required: true,
      type: 'array'
    },
    bool: {
      alias: 'b',
      boolean: true,
      description: 'A boolean value',
      requiresArg: true,
      required: true
    }
  })
  .interactive('i')
  .parseAsync(function (argv) {
    console.log('Inspecting options')
    console.log(JSON.stringify(argv))
    process.exit(0)
  })
