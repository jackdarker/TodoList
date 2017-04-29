// Compiled using marko@4.2.8 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/html").t(__filename),
    marko_component = {
        handleFormSubmit: function(event) {
          var titleInput = this.getEl("new-todo");

          var todoTitle = titleInput.value;

          todoApp.addNewTodo({
              title: todoTitle
            });

          titleInput.value = "";

          event.preventDefault();
        }
      },
    marko_components = require("marko/components"),
    marko_registerComponent = marko_components.rc,
    marko_componentType = marko_registerComponent("/nodejs-web-app2$0.0.0/views/todo/components/todomvc-header.marko", function() {
      return module.exports;
    }),
    todoApp = require("../todoapp"),
    marko_helpers = require("marko/runtime/html/helpers"),
    marko_attr = marko_helpers.a;

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<header class=\"header\"" +
    marko_attr("id", __component.id) +
    "><h1>todos</h1><form" +
    marko_attr("data-marko", {
      onsubmit: __component.d("handleFormSubmit")
    }, false) +
    "><input placeholder=\"What needs to be done?\" class=\"new-todo\"" +
    marko_attr("id", __component.elId("new-todo")) +
    "></form></header>");
}

marko_template._ = marko_components.r(render, {
    type: marko_componentType
  }, marko_component);

marko_template.Component = marko_components.c(marko_component, marko_template._);

marko_template.meta = {
    deps: [
      {
          type: "css",
          code: ".header form {\r\n        margin:0;\r\n    }",
          virtualPath: "./todomvc-header.marko.css",
          path: "./todomvc-header.marko"
        },
      {
          type: "require",
          path: "./todomvc-header.marko"
        }
    ]
  };
