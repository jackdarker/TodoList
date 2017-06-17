"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/toPromise");
var todoService = (function () {
    function todoService(http) {
        this.http = http;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.todoesUrl = 'todoapi'; // URL to web api
    }
    todoService.prototype.gettodoes = function () {
        return this.http.get(this.todoesUrl)
            .toPromise()
            .then(function (response) {
                return response.json().data;
            })
            .catch(this.handleError);
    };
    todoService.prototype.gettodo = function (id) {
        var url = this.todoesUrl + "/" + id;
        return this.http.get(url)
            .toPromise()
            .then(function (response) {
                return response.json().data;
            })
            .catch(this.handleError);
    };
    todoService.prototype.delete = function (id) {
        var url = this.todoesUrl + "/delete";
        /*return this.http.delete(url, { headers: this.headers })*/
        return this.http
            .post(url, JSON.stringify({ id: id }), { headers: this.headers })
            .toPromise()
            .then(function () { return null; })
            .catch(this.handleError);
    };
    todoService.prototype.create = function (name,status,time) {
        var url = this.todoesUrl + "/add";
        return this.http
            .post(url, JSON.stringify({ id:0,title: name , status: status,time: time }), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json().data; })
            .catch(this.handleError);
    };
    todoService.prototype.update = function (todo) {
        var url = this.todoesUrl + "/" + todo.id;
        return this.http
            .put(url, JSON.stringify(todo), { headers: this.headers })
            .toPromise()
            .then(function () { return todo; })
            .catch(this.handleError);
    };
    todoService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    return todoService;
}());
todoService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof http_1.Http !== "undefined" && http_1.Http) === "function" && _a || Object])
], todoService);
exports.todoService = todoService;
var _a;