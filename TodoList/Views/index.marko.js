// Compiled using marko@4.2.8 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/html").t(__filename),
    marko_loadTemplate = require("marko/runtime/helper-loadTemplate"),
    layout_template = marko_loadTemplate(require.resolve("./layout.marko")),
    tools_module = require("./tools"),
    add = tools_module.add,
    subtract = tools_module.subtract,
    marko_helpers = require("marko/runtime/html/helpers"),
    marko_escapeXml = marko_helpers.x,
    marko_str = marko_helpers.s,
    marko_loadTag = marko_helpers.t,
    include_tag = marko_loadTag(require("marko/taglibs/core/include-tag"));

function render(input, out) {
  var data = input;

  var message = 'Welcome to <b>Marko</b>!';

  include_tag({
      _target: layout_template,
      title: {
          renderBody: function renderBody(out) {
            out.w("This is the title");
          }
        },
      body: {
          renderBody: function renderBody(out) {
            out.w("This is the body content <p>1 + 2 = " +
              marko_escapeXml(add(1, 2)) +
              "</p><div>HTML " +
              marko_str(message) +
              "</div><div>Escaped HTML: " +
              marko_escapeXml(message) +
              "</div>");
          }
        },
      footer: {
          renderBody: function renderBody(out) {
            out.w("This is the footer content");
          }
        }
    }, out);
}

marko_template._ = render;

marko_template.meta = {
    tags: [
      "./layout.marko",
      "marko/taglibs/core/include-tag"
    ]
  };
