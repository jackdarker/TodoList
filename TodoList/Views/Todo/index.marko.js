// Compiled using marko@4.2.8 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/html").t(__filename),
    marko_component = ({
    onMount: function () {
        console.log('I have entered the viewport');
        this.subscribeTo(new TodoApp()).on('change', () => {
            this.forceUpdate();
        });
    }
}),
    marko_renderComponent = require("marko/components/taglib/helpers/renderComponent"),
    todoApp = require("./todoapp"),
    marko_helpers = require("marko/runtime/html/helpers"),
    marko_attr = marko_helpers.a,
    marko_forEach = marko_helpers.f,
    marko_loadTemplate = require("marko/runtime/helper-loadTemplate"),
    todomvc_todo_item_template = marko_loadTemplate(require.resolve("./components/todomvc-todo-item.marko")),
    marko_loadTag = marko_helpers.t,
    todomvc_todo_item_tag = marko_loadTag(todomvc_todo_item_template);

function render(input, out) {
  var data = input;

  out.w("<script> document.addEventListener(\"DOMContentLoaded\", function () {function isToggleAllChecked(todos) {\r\n    var toggleAllChecked = true;\r\n    for (var i=0; i<todos.length; i++) {\r\n        var todo = todos[i];\r\n        if (!todo.completed) {\r\n            return false;\r\n        }\r\n    }\r\n    return true;}  });\r\n</script><button type=\"button\" id=\"los\">Quadrat errechnen</button><section class=\"main\"><input type=\"checkbox\"" +
    marko_attr("checked", isToggleAllChecked(data.todos)) +
    " class=\"toggle-all\"><ul class=\"todo-list\">");

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
      "./components/todomvc-todo-item.marko"
    ]
  };
