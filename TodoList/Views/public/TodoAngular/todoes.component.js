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
var router_1 = require("@angular/router");
var todo_service_1 = require("static/todoangular/todo.service.js");
var todoesComponent = (function () {
    var _statusList = ["not started", "started", "finished"];
    function todoesComponent(todoService, router) {
        this.todoService = todoService;
        this.router = router;
    }
    todoesComponent.prototype.gettodoes = function () {
        var _this = this;
        this.todoService
            .gettodoes()
            .then(function (todoes) { return _this.todoes = todoes, _this.statusList = _statusList; });
    };
    todoesComponent.prototype.add = function (name,status,time) {
        var _this = this;
        name = name.trim();
        if (!name) {
            return;
        }
        this.todoService.create(name, status, time)
            .then(function (todo) {
            _this.todoes.push(todo);
            _this.selectedtodo = null;
        });
    };
    todoesComponent.prototype.delete = function (todo) {
        var _this = this;
        this.todoService
            .delete(todo.id)
            .then(function () {
            _this.todoes = _this.todoes.filter(function (h) { return h !== todo; });
            if (_this.selectedtodo === todo) {
                _this.selectedtodo = null;
            }
        });
    };
    todoesComponent.prototype.ngOnInit = function () {
        this.gettodoes();
    };
    todoesComponent.prototype.onSelect = function (todo) {
        this.selectedtodo = todo;
    };
    todoesComponent.prototype.gotoDetail = function () {
        this.router.navigate(['/detail', this.selectedtodo.id]);
    };
    return todoesComponent;
}());
todoesComponent = __decorate([
    core_1.Component({
        selector: 'my-todoes',
        templateUrl: 'static/todoangular/todoes.component.html',
        styleUrls: ['static/todoangular/todoes.component.css']
    }),
    __metadata("design:paramtypes", [todo_service_1.todoService, typeof (_a = typeof router_1.Router !== "undefined" && router_1.Router) === "function" && _a || Object])
], todoesComponent);
exports.todoesComponent = todoesComponent;
var _a;