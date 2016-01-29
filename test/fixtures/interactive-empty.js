var yargs = require('../../index')

yargs
  .usage('This is my awesome program\n\nUsage: $0 [options]')
  .help('help').alias('help', 'h')
  .version('1.0.1', 'version').alias('version', 'V')
  .options({})
  .interactive('i')
  .parseAsync(function (argv) {
    console.log('Inspecting options')
    console.log(JSON.stringify(argv))
    process.exit(0)
  })
