// Compiled using marko@4.2.8 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/html").t(__filename),
    marko_helpers = require("marko/runtime/html/helpers"),
    marko_loadTag = marko_helpers.t,
    include_tag = marko_loadTag(require("marko/taglibs/core/include-tag"));

function render(input, out) {
  var data = input;

  out.w("<section><header>");

  include_tag({
      _target: input.title
    }, out);

  out.w("</header><div class=\"body\">");

  include_tag({
      _target: input.body
    }, out);

  out.w("</div><footer>");

  include_tag({
      _target: input.footer
    }, out);

  out.w("</footer></section>");
}

marko_template._ = render;

marko_template.meta = {
    tags: [
      "marko/taglibs/core/include-tag"
    ]
  };
