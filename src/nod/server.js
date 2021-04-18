const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('users.db', sqlite3.OPEN_READWRITE);
const sql = require('mssql')

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(cors())
app.post("/w",  function (request, response) {
  //пишем данные в базу
  var r = request.body
  response.send(r)
  debugger
  var a, b, c, d, q, w, r, s;
  a = new Date(); b = a.getDate(); c = a.getMonth() + 1; d = a.getFullYear();
  q = a.getHours(); w = a.getMinutes(); r = a.getSeconds();
  s = (b + "." + "0" + c + "." + d + " " + q + ":" + w + ":" + r)
  db.serialize(() => { // пишем данные в базу
    var stmt = db.prepare(`INSERT INTO taskmanager  VALUES (?,?,?)`);
    stmt.run(request.body.user.name, request.body.user.value, `${s}`);
    stmt.finalize();
  });
})
app.get("/g", function (request, response) {
  // получаем данные из базы
  var sql = `SELECT * FROM taskmanager`;
  var arr=[];
          db.all(sql, [],  (err, rows) => { 
              if (err) { throw err;}
              rows.forEach((row)=>{ arr.push(`${row.description} ( ${row.date} )  ${row.status}`)});
              response.send(arr);
          });
});
const port = 3004
const host = '172.17.11.44'
app.listen(port, host)
console.log(`Listening at http://${host}:${port}`)