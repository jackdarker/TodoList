"use strict";
var DataService = (function () {
    function DataService() {
    }
    DataService.prototype.createDb = function () {
        var todoes = [
            { id: 1, title: "test1", status: 0, time: "00:00" },
            { id: 2, title: "test2", status: 0, time: "00:00" }
        ];
        return { todoes: todoes };
    };
    return DataService;
}());
exports.DataService = DataService;