var Arrivals = (function() {
    function ArrivalViewModel() {
        var self = this;
        self.title = "";
        self.status = "";
        self.time = "";
        self.isDone = false;
        self.delete = false;
    }

    function ArrivalApiService() {
        var self = this;

        // retrieves all arrivals from the API
        self.getAll = function() {
            return new Promise(function(resolve, reject) {
                var request = new XMLHttpRequest();
                //request.open('GET', 'static/api/data.json');
                request.open('GET', '/api');
                request.onload = function() {
                    // success
                    if (request.status === 200) {
                        console.log(request.statusText);
                        if (request.statusText === 'offline') {
                            resolve(request.response);
                        } else {
                        // resolve the promise with the parsed response text (assumes JSON)
                            resolve(JSON.parse(request.response));
                        }
                    } else {
                        // error retrieving file
                        reject(Error(request.statusText));
                    }
                };

                request.onerror = function() {
                    // network errors
                    reject(Error("Network Error"));
                };

                request.send();
            });
        };
        // updates entrys to server
        self.pushAll = function (data) {
            return new Promise(function (resolve, reject) {
                var request = new XMLHttpRequest();
                //request.open('GET', 'static/api/data.json');
                request.open('POST', '/arrivals/saveform');    
                request.setRequestHeader("Content-Type", "application/json");
                request.onload = function () {
                    // success
                    if (request.status === 200) {
                        console.log(request.statusText);
                        if (request.statusText === 'offline') {
                            resolve(request.response);
                        } else {
                            // resolve the promise with the parsed response text (assumes JSON)
                            //resolve(JSON.parse(request.response));
                        }
                    } else {
                        // error retrieving file
                        reject(Error(request.statusText));
                    }
                };

                request.onerror = function () {
                    // network errors
                    reject(Error("Network Error"));
                };

                request.send(JSON.stringify(data));
                //request.send(JSON.stringify({ "title": "Malta to Amsterdam", "status": "On time", "time": "08:45" }));
            });
        };
    }

    function ArrivalAdapter() {
        var self = this;

        self.toArrivalViewModel = function(data) {
            if (data) {
                var vm = new ArrivalViewModel();
                vm.title = data.title;
                vm.status = data.status;
                vm.time = data.time;
                return vm;
            }
            return null;
        };

        self.toArrivalViewModels = function(data) {
            if (data && data.length > 0) {
                return data.map(function(item) {
                    return self.toArrivalViewModel(item);
                });
            }
            return [];
        };
    }

    function ArrivalController(arrivalApiService, arrivalAdapter) {
        var self = this;

        self.getAll = function() {
            // retrieve all the arrivals from the API
            return arrivalApiService.getAll().then(function(response) {
                return arrivalAdapter.toArrivalViewModels(response);
            });
        };
        
    }


    // initialize the services and adapters
    var arrivalApiService = new ArrivalApiService();
    var arrivalAdapter = new ArrivalAdapter();

    // initialize the controller
    var arrivalController = new ArrivalController(arrivalApiService, arrivalAdapter);    
    
    return {
        loadData: function () {
            // retrieve all routes
            document.querySelector(".arrivals-list").classList.add('loading');
            arrivalController.getAll().then(function (response) {
                // bind the arrivals to the UI
                Page.vm.arrivals(response);
                document.querySelector(".arrivals-list").classList.remove('loading');
            });
        },
        pushData: function (data) {
            arrivalApiService.pushAll(data);
        }
    };

})();
