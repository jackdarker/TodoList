"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var app_routing_module_1 = require("./app-routing.module.js");
// Imports for loading & configuring the in-memory web api
//var angular_in_memory_web_api_1 = require("angular-in-memory-web-api");
//var in_memory_data_service_1 = require("static/todoangular/in-memory-data.service.js");
var app_component_1 = require("static/todoangular/app.component.js");
var dashboard_component_1 = require("static/todoangular/dashboard.component.js");
var todoes_component_1 = require("static/todoangular/todoes.component.js");
var todo_detail_component_1 = require("static/todoangular/todo-detail.component.js");
var todo_service_1 = require("static/todoangular/todo.service.js");
var todo_search_component_1 = require("static/todoangular/todo-search.component.js");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            http_1.HttpModule,
            //angular_in_memory_web_api_1.InMemoryWebApiModule.forRoot(in_memory_data_service_1.InMemoryDataService),
            app_routing_module_1.AppRoutingModule
        ],
        declarations: [
            app_component_1.AppComponent,
            dashboard_component_1.DashboardComponent,
            todo_detail_component_1.todoDetailComponent,
            todoes_component_1.todoesComponent,
            todo_search_component_1.todoSearchComponent
        ],
        providers: [todo_service_1.todoService],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map