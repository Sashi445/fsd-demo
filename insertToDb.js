const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./mydata.db", (err) => {
    if (err) {
        return console.log(err);
    }
    return {};
} );

function createTable(){
    
    let sql = `CREATE TABLE IF NOT EXISTS students(
        uid INTEGER PRIMARY KEY AUTOINCREMENT,
        firstname VARCHAR(100) NOT NULL,
        lastname VARCHAR(100) NOT NULL
    );`;
    
    db.run(sql, [], (err) => {
        if (err) {
            console.log(err);
        }
    } );
    
    db.close();

}

function readAll(){

    let sql = `SELECT * FROM students`;


    db.all(sql, function(err, rows){
        if (err) {
            return console.log(err);
        }
        console.log(rows);
    });

    db.close();

}


function insertToDb(firstname, lastname){
    
    let insert = `INSERT INTO students (firstname, lastname) VALUES ( ?, ? );`
    
    db.run(insert, [firstname, lastname], function(err){
        if (err) {
            return console.log(err);
        }else{
            return { message : "Hello" }
        }
    } );
    
    db.close();

}

module.exports.insert = insertToDb;
module.exports.read = readAll;