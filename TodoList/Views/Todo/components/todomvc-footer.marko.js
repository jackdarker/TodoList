// Compiled using marko@4.2.8 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/html").t(__filename),
    marko_component = {
        setFilter: function(filter, event) {
          todoApp.filter = filter;

          event.preventDefault();
        },
        clearCompleted: function() {
          todoApp.clearCompleted();
        }
      },
    marko_components = require("marko/components"),
    marko_registerComponent = marko_components.rc,
    marko_componentType = marko_registerComponent("/nodejs-web-app2$0.0.0/views/todo/components/todomvc-footer.marko", function() {
      return module.exports;
    }),
    todoApp = require("../todoapp"),
    marko_helpers = require("marko/runtime/html/helpers"),
    marko_escapeXml = marko_helpers.x,
    marko_classAttr = marko_helpers.ca,
    marko_attr = marko_helpers.a;

function render(input, out, __component, component, state) {
  var data = input;

  var remainingTodosWord = input.remainingCount > 1 ? 'items' : 'item';

  out.w("<footer class=\"footer\"" +
    marko_attr("id", __component.id) +
    "><span class=\"todo-count\"><strong>" +
    marko_escapeXml(input.remainingCount) +
    "</strong> " +
    marko_escapeXml(remainingTodosWord) +
    " left</span><ul class=\"filters\"><li><a href=\"#/\"" +
    marko_classAttr((input.filter === "all") && "selected") +
    marko_attr("data-marko", {
      onclick: __component.d("setFilter", [
          "all"
        ])
    }, false) +
    ">All</a></li><li><a href=\"#/active\"" +
    marko_classAttr((input.filter === "active") && "selected") +
    marko_attr("data-marko", {
      onclick: __component.d("setFilter", [
          "active"
        ])
    }, false) +
    ">Active</a></li><li><a href=\"#/completed\"" +
    marko_classAttr((input.filter === "completed") && "selected") +
    marko_attr("data-marko", {
      onclick: __component.d("setFilter", [
          "completed"
        ])
    }, false) +
    ">Completed</a></li></ul>");

  if (input.completedCount > 0) {
    out.w("<button class=\"clear-completed\"" +
      marko_attr("data-marko", {
        onclick: __component.d("clearCompleted")
      }, false) +
      ">Clear completed (" +
      marko_escapeXml(input.completedCount) +
      ")</button>");
  }

  out.w("</footer>");
}

marko_template._ = marko_components.r(render, {
    type: marko_componentType
  }, marko_component);

marko_template.Component = marko_components.c(marko_component, marko_template._);

marko_template.meta = {
    deps: [
      {
          type: "require",
          path: "./todomvc-footer.marko"
        }
    ]
  };
