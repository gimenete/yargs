var inquirer = require('inquirer')

module.exports = function (yargs, usage, args, callback) {
  var options = yargs.getOptions()
  var demanded = yargs.getDemanded()
  var keys = Object.keys(demanded).filter(function(key) {
    return !args[key]
  })

  if (keys.length === 0) return callback(args)

  var questions = keys.map(function(key) {
    var question = {
      name: key,
      message: usage.getDescriptions()[key] || key,
    }
    if (options.choices[key]) {
      if (~options.array.indexOf(key)) {
        question.type = 'checkbox'
      } else {
        question.type = 'list'
      }
      question.choices = options.choices[key]
    } else if (~options.boolean.indexOf(key)) {
      question.type = 'confirm'
    }
    if (options.default.hasOwnProperty(key)) {
      question.default = options.default[key]
    }
    return question
  })

  inquirer.prompt(questions, function(answers) {
    Object.keys(answers).forEach(function(key) {
      args[key] = answers[key]
    })
    callback(args)
  })

}
