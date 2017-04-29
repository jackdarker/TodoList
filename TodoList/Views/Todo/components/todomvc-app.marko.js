// Compiled using marko@4.2.8 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/html").t(__filename),
    marko_loadTemplate = require("marko/runtime/helper-loadTemplate"),
    todomvc_header_template = marko_loadTemplate(require.resolve("./todomvc-header.marko")),
    marko_helpers = require("marko/runtime/html/helpers"),
    marko_loadTag = marko_helpers.t,
    todomvc_header_tag = marko_loadTag(todomvc_header_template),
    todomvc_main_template = marko_loadTemplate(require.resolve("./todomvc-main.marko")),
    todomvc_main_tag = marko_loadTag(todomvc_main_template),
    todomvc_footer_template = marko_loadTemplate(require.resolve("./todomvc-footer.marko")),
    todomvc_footer_tag = marko_loadTag(todomvc_footer_template);

function filterTodos(input) {
    var remainingCount = 0;
    var completedCount = 0;
    var filter = input.filter;

    var filteredTodos = input.todos.filter(function(todo) {
        if (todo.completed) {
            completedCount++;
        } else {
            remainingCount++;
        }

        if (todo.pending) {
            return true;
        } else if (filter === 'active') {
            return !todo.completed;
        } else if (filter === 'completed') {
            return todo.completed;
        } else {
            return true;
        }
    });

    return {
        todos: filteredTodos,
        remainingCount: remainingCount,
        completedCount: completedCount,
        filter: filter
    };
};

function render(input, out) {
  var data = input;

  out.w("<link rel=\"stylesheet\" href=\"static/todomvc-app.style.css\">");

  var todos = filterTodos(input);

  out.w("<div class=\"todoapp\">");

  todomvc_header_tag({}, out);

  todomvc_main_tag(todos, out);

  todomvc_footer_tag(todos, out);

  out.w("</div>");
}

marko_template._ = render;

marko_template.meta = {
    tags: [
      "./todomvc-header.marko",
      "./todomvc-main.marko",
      "./todomvc-footer.marko"
    ]
  };
