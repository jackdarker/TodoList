function Task(data) {
    var self = this;
    self.id = data.id;
    self.title = data.title;
    self.status = data.status;
    self.time = data.time;
    self.isDone = false;
    self.delete = false;
}
function TaskListViewModel() {
    // Data
    var self = this;
    self.tasks = ko.observableArray([]);
    self.newTaskText = ko.observable();
    self.incompleteTasks = ko.computed(function () {
        return ko.utils.arrayFilter(self.tasks(), function (task) { return !task.isDone && !task._destroy });
    });

    // Operations
    self.addTask = function () {
        self.tasks.push(new Task({ title: this.newTaskText(), status: "open", id: "0", time : "00:00" }));
        self.newTaskText("");
    };
    self.removeTask = function (task) { self.tasks.destroy(task) };
    self.save = function () {
       $.ajax("/arrivals/saveform", {
            data: ko.toJSON({ tasks: self.tasks }),
            type: "post", contentType: "application/json",
            success: function (result) { if (result) { self.refresh(); } }
        });
    };
    self.refresh = function () {
        $.getJSON("/api", function (allData) {
            var mappedTasks = $.map(allData, function (item) { return new Task(item) });
            self.tasks(mappedTasks);
        });
    }
    // Load initial state from server, convert it to Task instances, then populate self.tasks
    self.refresh();
}

ko.applyBindings(new TaskListViewModel());