// Compiled using marko@4.2.8 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/html").t(__filename),
    marko_helpers = require("marko/runtime/html/helpers"),
    marko_loadTag = marko_helpers.t,
    init_components_tag = marko_loadTag(require("marko/components/taglib/init-components-tag")),
    await_reorderer_tag = marko_loadTag(require("marko/taglibs/async/await-reorderer-tag"));

function render(input, out) {
  var data = input;

  out.w("<!DOCTYPE html><html class=\"js no-touchevents\" lang=\"en\"><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"><title>Sky-High Airport Arrivals</title><link async rel=\"stylesheet\" href=\"static/css/style.css\"><link href=\"https://fonts.googleapis.com/css?family=Roboto:300,600,300italic,600italic\" rel=\"stylesheet\" type=\"text/css\"><meta name=\"theme-color\" content=\"#29BDBB\"><script src=\"static/js/knockout-3.3.0.js\"></script><script src=\"https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js\"></script></head><body><h3>Tasks</h3><form data-bind=\"submit: addTask\">Add task: <input data-bind=\"value: newTaskText\" placeholder=\"What needs to be done?\"><button type=\"submit\">Add</button></form><ul data-bind=\"foreach: tasks, visible: tasks().length > 0\"><li><span class=\"id\" data-bind=\"html: id\"></span><input data-bind=\"value: title, disable: isDone\"><input data-bind=\"value: status, disable: isDone\"><input data-bind=\"value: time, disable: isDone\"><input type=\"checkbox\" data-bind=\"checked: isDone\"><a href=\"#\" data-bind=\"click: $parent.removeTask\">Delete</a></li></ul> You have <b data-bind=\"text: incompleteTasks().length\">&nbsp;</b> incomplete task(s) <span data-bind=\"visible: incompleteTasks().length == 0\"> - it's beer time!</span><button data-bind=\"click: save\">Save</button><script src=\"static/js/client.js\"></script>");

  init_components_tag({}, out);

  await_reorderer_tag({}, out);

  out.w("</body></html>");
}

marko_template._ = render;

marko_template.meta = {
    tags: [
      "marko/components/taglib/init-components-tag",
      "marko/taglibs/async/await-reorderer-tag"
    ]
  };
