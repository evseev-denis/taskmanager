const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('users.db', sqlite3.OPEN_READWRITE);
var cors = require('cors')
app.get("/descriptionget", function (request, response) {
    // получаем данные
    var sql = `SELECT * FROM taskmanager`;
    var arr=[];
            db.all(sql, [],  (err, rows) => { 
                if (err) { throw err;}
                rows.forEach((row)=>{ arr.push(`${row.description} ( ${row.date} )  ${row.status}`)});
                response.send(arr);
                
            });
});
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cors())

app.post("/descriptionwrite",  function (request, response) {
  
var a,b,c,d,q,w,r,s
a=new Date();b=a.getDate(); c=a.getMonth()+1;d=a.getFullYear();
q=a.getHours();w=a.getMinutes(); r=a.getSeconds();
s=(b+"."+"0"+c+"."+d+" "+q+":"+w+":"+r)
    db.serialize(()=> { // пишем данные в базу
        var stmt = db.prepare(`INSERT INTO taskmanager  VALUES (?,?,?)`);
        console.log(`${request.user.name}`)
        stmt.run(`${request.body.user.name}`, `${request.body.user.value}`, `${s}`);
        stmt.finalize();

        response.send(`${request.body.user.name}`);
       
      });
    
}); 

app.listen(3002);