var yargs = require('../index');

var argv = yargs
  .usage('This is my awesome program\n\nUsage: $0 [options]')
  .help('help').alias('help', 'h')
  .version('1.0.1', 'version').alias('version', 'V')
  .options({
    input: {
      alias: 'in',
      description: "<filename> Input file name",
      requiresArg: true,
      required: true
    },
    output: {
      alias: 'out',
      description: "<filename> output file name",
      requiresArg: true,
      required: true
    },
    choice: {
      alias: 'c',
      choices: ['foo', 'bar'],
      description: "<choice> a choice",
      requiresArg: true,
      required: true
    },
    bool: {
      alias: 'b',
      boolean: true,
      description: "<choice> a choice",
      requiresArg: true,
      required: true
    }
  })
  .interactive('i', function(argv) {
    console.log('Inspecting options');
    console.dir(argv);

    console.log("input:", argv.input);
    console.log("output:", argv.output);
  });
