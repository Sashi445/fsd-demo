const app = require("express")();
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();

app.use(bodyParser.urlencoded({extended : false}));
app.set("view engine", "ejs");

const db = new sqlite3.Database("./mydata.db", (err) => {
    if (err) {
        return console.log(err);
    }
    return {};
} );

// ROUTE-1 "/"

app.get("/", (req, res) => {
    res.render("index");
});

app.post("/", (req, res) => {
    const { firstname, lastname } = req.body;
    
    let insert = `INSERT INTO students (firstname, lastname) VALUES ( ?, ? );`
    
    db.run(insert, [firstname, lastname], function(err){
        if (err) {
            return console.log(err);
        }else{
            res.redirect("/students");
        }
    });

})

// ROUTE - 2 "/students"

app.get("/students", (req, res) => {

    let sql = `SELECT * FROM students`;

    db.all(sql, (err, rows) => {
        if (err) {
            console.log(err.message);
        }
        res.render("students", {students : rows})
    })

})

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Listening on ${PORT}...`);
})
