// Compiled using marko@4.2.8 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/html").t(__filename),
    marko_component = ({
    onCreate: function () {
        this.state = {
            isEditing: false,
            editingTitle: ''
        };
    },
    saveEdit: function () {
        if (this.state.isEditing) {
            var newTitle = this.getEl('titleInput').value;
            todoApp.updateTodo(this.input.id, { title: newTitle });
            this.state.isEditing = false;
        }
    },
    cancelEdit: function () {
        this.state.isEditing = false;
    },
    handleCheckboxChange: function (event, input) {
        var completed = input.checked === true;
        todoApp.setTodoCompleted(this.input.id, completed);
    },
    handleLabelDblClick: function () {
        this.state.isEditing = true;
        this.state.editingTitle = this.input.title;
    },
    removeTodo: function () {
        todoApp.removeTodo(this.input.id);
    },
    onUpdate: function () {
        if (this.state.isEditing) {
            var inputEl = this.getEl('titleInput');
            inputEl.focus();
            var val = inputEl.value;
            inputEl.value = '';
            inputEl.value = val;
        }
    },
    handleInputKeyDown: function (event) {
        if (event.keyCode === 13) {
            this.saveEdit();
        } else if (event.keyCode === 27) {
            this.cancelEdit();
        }
    },
    handleDetach: function (event, node) {
        event.preventDefault();
        node.classList.add('animate');
        var height = node.offsetHeight;
        node.style.maxHeight = height + 'px';
        setTimeout(() => {
            node.style.maxHeight = '0px';
            node.style.opacity = 0;
            setTimeout(() => {
                event.detach();
            }, 250);
        }, 0);
    },
    handleAttach: function (event, node) {
        var clone = node.cloneNode(true);
        clone.style.position = 'absolute';
        clone.style.top = '-200px';
        clone.style.left = '-200px';
        node.parentNode.appendChild(clone);
        var height = clone.offsetHeight;
        clone.parentNode.removeChild(clone);
        node.classList.remove('animate');
        node.style.maxHeight = '0px';
        node.style.opacity = 0;
        setTimeout(() => {
            node.classList.add('animate');
            node.style.maxHeight = height + 'px';
            node.style.opacity = 1;
        }, 10);
    }
}),
    marko_components = require("marko/components"),
    marko_registerComponent = marko_components.rc,
    marko_componentType = marko_registerComponent("/nodejs-web-app2$0.0.0/views/todo/components/todomvc-todo-item.marko", function() {
      return module.exports;
    }),
    todoApp = require("../todoapp"),
    marko_helpers = require("marko/runtime/html/helpers"),
    marko_attr = marko_helpers.a,
    marko_escapeXml = marko_helpers.x,
    marko_classAttr = marko_helpers.ca;

require("marko/components/attach-detach");

function render(input, out, __component, component, state) {
  var data = input;

  var className = {
      completed: input.completed,
      editing: state.isEditing
  };

  out.w("<li" +
    marko_classAttr(className) +
    marko_attr("id", __component.id) +
    marko_attr("data-marko", {
      ondetach: __component.d("handleDetach"),
      onattach: __component.d("handleAttach")
    }, false) +
    "><div class=\"view\"><input type=\"checkbox\"" +
    marko_attr("checked", input.completed) +
    " aria-label=\"Toggle todo completed\" class=\"toggle\"" +
    marko_attr("data-marko", {
      onchange: __component.d("handleCheckboxChange")
    }, false) +
    "><label" +
    marko_attr("data-marko", {
      ondblclick: __component.d("handleLabelDblClick")
    }, false) +
    ">" +
    marko_escapeXml(input.title) +
    "</label><button aria-label=\"Delete todo\" class=\"destroy\"" +
    marko_attr("data-marko", {
      onclick: __component.d("removeTodo")
    }, false) +
    "></button></div>");

  var __componentId0 = __component.elId("titleInput");

  __component.e("blur", "saveEdit", __componentId0);

  out.w("<input title=\"Enter the new todo title\" type=\"text\"" +
    marko_attr("value", state.editingTitle) +
    " class=\"edit\"" +
    marko_attr("id", __componentId0) +
    marko_attr("data-marko", {
      onchange: __component.d("saveEdit"),
      onkeydown: __component.d("handleInputKeyDown")
    }, false) +
    "></li>");
}

marko_template._ = marko_components.r(render, {
    type: marko_componentType
  }, marko_component);

marko_template.Component = marko_components.c(marko_component, marko_template._);

marko_template.meta = {
    deps: [
      {
          type: "css",
          code: ".todo-list li.pending .toggle, .todo-list li.pending button {\r\n        visibility: hidden;\r\n    }\r\n\r\n    .todo-list li.pending label {\r\n        color: #d9d9d9;\r\n    }\r\n\r\n    .todo-list li {\r\n        opacity: 1;\r\n        background-color: #fff;\r\n        overflow: hidden;\r\n    }\r\n\r\n    .todo-list li.animate {\r\n        transition: opacity 250ms ease-in-out, max-height 250ms ease-in-out;\r\n    }",
          virtualPath: "./todomvc-todo-item.marko.css",
          path: "./todomvc-todo-item.marko"
        },
      {
          type: "require",
          path: "./todomvc-todo-item.marko"
        }
    ]
  };
