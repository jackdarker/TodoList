// Compiled using marko@4.2.8 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/html").t(__filename),
    marko_helpers = require("marko/runtime/html/helpers"),
    marko_escapeXml = marko_helpers.x,
    marko_forEach = marko_helpers.f;

var dateLoaded = new Date();

function render(input, out) {
  var data = input;

  out.w("<link rel=\"stylesheet\" href=\"static/style.css\"><h1>" +
    marko_escapeXml(input.title) +
    "</h1><ul>");

  marko_forEach(input.users, function(user) {
    out.w("<li>" +
      marko_escapeXml(user.name) +
      "</li>");
  });

  out.w("</ul><p>This template was loaded at " +
    marko_escapeXml(dateLoaded.toString()) +
    "</p>");
}

marko_template._ = render;

marko_template.meta = {};
