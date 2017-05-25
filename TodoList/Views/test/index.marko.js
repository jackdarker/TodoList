// Compiled using marko@4.2.8 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/html").t(__filename),
    marko_helpers = require("marko/runtime/html/helpers"),
    marko_loadTag = marko_helpers.t,
    init_components_tag = marko_loadTag(require("marko/components/taglib/init-components-tag")),
    await_reorderer_tag = marko_loadTag(require("marko/taglibs/async/await-reorderer-tag"));

function render(input, out) {
  var data = input;

  out.w("<!DOCTYPE html><html class=\"js no-touchevents\" lang=\"en\"><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"><title>Sky-High Airport Arrivals</title><link async rel=\"stylesheet\" href=\"static/css/style.css\"><link href=\"https://fonts.googleapis.com/css?family=Roboto:300,600,300italic,600italic\" rel=\"stylesheet\" type=\"text/css\"><meta name=\"theme-color\" content=\"#29BDBB\"><script src=\"static/js/knockout-3.3.0.js\"></script></head><body><header><div class=\"content\"><h3>Arrivals</h3></div></header><div class=\"container\"><div id=\"main\" class=\"content\"><ul class=\"arrivals-list\" data-bind=\"foreach: arrivals, visible: arrivals().length > 0\"><li class=\"item\"><input type=\"checkbox\" data-bind=\"checked: isDone\"><button data-bind=\"click: $root.deleteEntry\">Delete</button><input type=\"text\" data-bind=\"value: title, disable: isDone\"><span class=\"status\" data-bind=\"html: status\"></span><span class=\"time\" data-bind=\"html: time\"></span></li></ul><form action=\"/arrivals/saveform\" method=\"post\"><input type=\"hidden\" name=\"arrivals\" data-bind=\"value: ko.toJSON(arrivals)\"><button type=\"submit\">Save</button></form></div></div><div id=\"liveExample\" class=\"liveExample\"><p>Choose a ticket class: <select data-bind=\"options: tickets, \r&#10;                       optionsCaption: 'Choose...',\r&#10;                       optionsText: 'name',\r&#10;                       value: chosenTicket\"><option value=\"\">Choose...</option><option value=\"\">Economy</option><option value=\"\">Business</option><option value=\"\">First Class</option></select><button data-bind=\"enable: chosenTicket, click: resetTicket\">Clear</button></p> <p data-bind=\"with: chosenTicket\">You have chosen <b data-bind=\"text: name\">Business</b> ($<span data-bind=\"text: price\">449.22</span>) </p><script type=\"text/javascript\">\r\n        function TicketsViewModel() {\r\n            this.tickets = [\r\n                { name: \"Economy\", price: 199.95 },\r\n                { name: \"Business\", price: 449.22 },\r\n                { name: \"First Class\", price: 1199.99 }\r\n            ];\r\n            this.chosenTicket = ko.observable();\r\n            this.resetTicket = function() { this.chosenTicket(null) }\r\n        }\r\n        ko.applyBindings(new TicketsViewModel(), document.getElementById(\"liveExample\"));\r\n    </script> </div><script src=\"static/js/arrivals.js\"></script><script src=\"static/js/page.js\"></script><script> Arrivals.loadData();ko.applyBindings(Page.vm,document.getElementById('main'));</script>");

  init_components_tag({}, out);

  await_reorderer_tag({}, out);

  out.w("</body></html>");
}

marko_template._ = render;

marko_template.meta = {
    tags: [
      "marko/components/taglib/init-components-tag",
      "marko/taglibs/async/await-reorderer-tag"
    ]
  };
