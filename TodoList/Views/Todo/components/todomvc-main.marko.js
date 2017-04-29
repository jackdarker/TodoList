// Compiled using marko@4.2.8 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/html").t(__filename),
    marko_component = {
        handleToggleAllOnChange: function(event, input) {
          todoApp.toggleAllTodosCompleted(input.checked);
        }
      },
    marko_components = require("marko/components"),
    marko_registerComponent = marko_components.rc,
    marko_componentType = marko_registerComponent("/nodejs-web-app2$0.0.0/views/todo/components/todomvc-main.marko", function() {
      return module.exports;
    }),
    marko_renderComponent = require("marko/components/taglib/helpers/renderComponent"),
    todoApp = require("../todoapp"),
    marko_helpers = require("marko/runtime/html/helpers"),
    marko_attr = marko_helpers.a,
    marko_forEach = marko_helpers.f,
    marko_loadTemplate = require("marko/runtime/helper-loadTemplate"),
    todomvc_todo_item_template = marko_loadTemplate(require.resolve("./todomvc-todo-item.marko")),
    marko_loadTag = marko_helpers.t,
    todomvc_todo_item_tag = marko_loadTag(todomvc_todo_item_template);

function isToggleAllChecked(todos) {
    var toggleAllChecked = true;

    for (var i=0; i<todos.length; i++) {
        var todo = todos[i];
        if (!todo.completed) {
            return false;
        }
    }

    return true;
};

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<section class=\"main\"" +
    marko_attr("id", __component.id) +
    "><input type=\"checkbox\"" +
    marko_attr("checked", isToggleAllChecked(input.todos)) +
    " class=\"toggle-all\"" +
    marko_attr("data-marko", {
      onchange: __component.d("handleToggleAllOnChange")
    }, false) +
    "><ul class=\"todo-list\">");

  marko_forEach(data.todos, function(todo) {
    marko_renderComponent(todomvc_todo_item_tag, todo, out, [
      __component,
      "todo-" + todo.id
    ]);
  });

  out.w("</ul></section>");
}

marko_template._ = marko_components.r(render, {
    type: marko_componentType
  }, marko_component);

marko_template.Component = marko_components.c(marko_component, marko_template._);

marko_template.meta = {
    deps: [
      {
          type: "require",
          path: "./todomvc-main.marko"
        }
    ],
    tags: [
      "./todomvc-todo-item.marko"
    ]
  };
