// Compiled using marko@4.2.8 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/html").t(__filename);

function render(input, out) {
  var data = input;

  out.w("<h1>{{title}}</h1><ul>{% for user in users %} <li>{{user.name}}</li> {% endfor %}</ul>");
}

marko_template._ = render;

marko_template.meta = {};
