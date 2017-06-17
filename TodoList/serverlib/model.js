var sqlite3 = require('sqlite3').verbose();


var db = new sqlite3.Database(':memory:');
var _Version = "01.00";
var _statusList = ["not started","started", "finished"];

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
            resolve({ data: set });
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
            resolve({ data: set });
        });

    });
}
//saves Array of entrys
function saveMultiple(Values) {
    return new Promise((resolve, reject) => { //wrap this in promise becausethe callback is called async !
        var needsRefresh = false;
        var Jobs = Values.length;
        var stmtInsert = db.prepare("INSERT INTO Todo VALUES (?,?,?);");
        var stmtUpdate = db.prepare("Update Todo Set title=?,status=?, time=? where rowid=?");
        var stmtID = db.prepare("select last_insert_rowid();");
        compl = function () {
            Jobs--;
            if (Jobs <= 0) {
                stmtInsert.finalize();
                stmtUpdate.finalize();
                stmtID.finalize();
                resolve(needsRefresh);
            }
        };
        if (Values.length <= 0) compl();
        for (var i = 0; i < Values.length; i++) {
            if (Values[i].id > 0) {
                stmtUpdate.run(Values[i].title, Values[i].status, Values[i].time, Values[i].id, function (err) {
                    if (err) throw err;
                    compl();
                });
            } else {
                stmtInsert.run(Values[i].title, Values[i].status, Values[i].time);
                stmtID.get( function (err, row) {
                    if (err) {
                        reject(err); return;
                    }
                    console.log(row);
                    needsRefresh = true;
                    compl();
                });
            }
        }
        
    });
}
function save(Values) {
    return new Promise((resolve, reject) => { //wrap this in promise becausethe callback is called async !
        var needsRefresh = false;
        var stmtInsert = db.prepare("INSERT INTO Todo VALUES (?,?,?);");
        var stmtUpdate = db.prepare("Update Todo Set title=?,status=?, time=? where rowid=?");
        var stmtID = db.prepare("select last_insert_rowid() as id;");
        compl = function () {

                stmtInsert.finalize();
                stmtUpdate.finalize();
                stmtID.finalize();
                resolve({ data: Values });

        };
        if (Values.id > 0) {
                stmtUpdate.run(Values.title, Values.status, Values.time, Values.id, function (err) {
                    if (err) throw err;
                    compl();
                });
        } else {
                stmtInsert.run(Values.title, Values.status, Values.time);
                stmtID.get(function (err, row) {
                    if (err) {
                        reject(err); return;
                    }
                    console.log(row);
                    Values.id = row.id;
                    needsRefresh = true;
                    compl();
                });
        }
    });
}

function deleteByID(ID) {
    return new Promise((resolve, reject) => { //wrap this in promise becausethe callback is called async !
        var needsRefresh = false;
        var stmtDelete = db.prepare("delete from Todo where rowid=?;");
        compl = function () {
                stmtDelete.finalize();
                resolve(needsRefresh);
        };
        stmtDelete.run(ID);
        needsRefresh = true;
        compl();
    });
}

module.exports = (width) => {
    return {
        version: () => _Version,
        statusList: () => _statusList,
        getByID: (ID) => getByID(ID),
        getAll: () => getAll(),
        save: (Values) => save(Values),
        deleteByID: (ID) => deleteByID(ID)
    };
};
//db.close();