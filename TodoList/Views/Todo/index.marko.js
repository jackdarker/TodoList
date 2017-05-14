// Compiled using marko@4.2.8 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/html").t(__filename),
    marko_component = ({
    onMount: function () {
        this.subscribeTo(todoApp).on('change', () => {
            this.forceUpdate();
        });
    }
}),
    marko_renderComponent = require("marko/components/taglib/helpers/renderComponent"),
    todoApp = require("./todoapp"),
    marko_loadTemplate = require("marko/runtime/helper-loadTemplate"),
    todomvc_app_template = marko_loadTemplate(require.resolve("./components/todomvc-app.marko")),
    marko_helpers = require("marko/runtime/html/helpers"),
    marko_loadTag = marko_helpers.t,
    todomvc_app_tag = marko_loadTag(todomvc_app_template),
    marko_forEach = marko_helpers.f,
    todomvc_todo_item_template = marko_loadTemplate(require.resolve("./components/todomvc-todo-item.marko")),
    todomvc_todo_item_tag = marko_loadTag(todomvc_todo_item_template);

function render(input, out) {
  var data = input;

  todomvc_app_tag({
      todos: todoApp.todos,
      filter: todoApp.filter
    }, out);

  out.w("<button type=\"button\" id=\"los\">Quadrat errechnen</button><section class=\"main\"><input type=\"checkbox\" class=\"toggle-all\"><ul class=\"todo-list\">");

  marko_forEach(data.todos, function(todo) {
    marko_renderComponent(todomvc_todo_item_tag, todo, out, [
      __component,
      "todo-" + todo.id
    ]);
  });

  out.w("</ul></section><script>function sayHi() { alert(`Hi!`);} ;los.addEventListener ('click', sayHi, true);</script>");
}

marko_template._ = render;

marko_template.meta = {
    deps: [
      "./index.style.css"
    ],
    tags: [
      "./components/todomvc-app.marko",
      "./components/todomvc-todo-item.marko"
    ]
  };
