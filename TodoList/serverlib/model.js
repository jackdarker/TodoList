var sqlite3 = require('sqlite3').verbose();


var db = new sqlite3.Database(':memory:');
var _Version = '1';
db.serialize(function () {
    db.run("CREATE TABLE Todo (title TEXT, status TEXT, time TEXT)");

    var stmt = db.prepare("INSERT INTO Todo VALUES (?,?,?)");
    stmt.run("Get shit done", "started", "8:00");
    stmt.run("Breakfast", "finished", "9:00");
    stmt.run("Lunch", "not started", "12:00");
    //for (var i = 0; i < 10; i++) {
    //    stmt.run("Ipsum " + i, "Ipsum " + i, "Ipsum " + i );
    //}

    stmt.finalize();

   // db.each("SELECT rowid AS id, title,status,time FROM Todo", function (err, row) {
   //     console.log(row.id + ": " + row.title + " " + row.status + " " + row.time + " ");
   // });
});

function getByID(ID) {
    var set = new Set();
    //set.add({ "id": "1", "title": "Bonn to Rome", "status": "On time", "time": "12:05" });
    return new Promise((resolve, reject) => { //wrap this in promise because
        //the callback is called async !
        db.each("SELECT rowid AS id, title,status,time FROM Todo", function (err, row) {
            if (err) {
                reject(err); return;
            }
            set.add({ "id": row.id, "title": row.title, "status": row.status, "time": row.time });
           
        }, function () {
            resolve(set);
        });
        
    });
    //set.forEach(function (value) {
    //    console.log(value.title);
    //});
}
function getAll() {
    var set = new Set();
    return new Promise((resolve, reject) => { //wrap this in promise because
        //the callback is called async !
        db.each("SELECT rowid AS id, title,status,time FROM Todo", function (err, row) {
            if (err) {
                reject(err); return;
            }
            set.add({ "id": row.id, "title": row.title, "status": row.status, "time": row.time });

        }, function () {
            resolve(set);
        });

    });
}


module.exports = (width) => {
    return {
        area: () => width * 2,
        version: () => _Version,
        getByID: (ID) => getByID(ID),
        getAll: () => getAll()
    };
};
//db.close();