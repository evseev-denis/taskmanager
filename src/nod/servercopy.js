var express = require('express');
var app = express();
var sql = require("mssql");

app.get('/', function (req, res) {
    // config for your database
    var config = {
        user: 'sa',
        password: 'alien2006',
        server: 'jsmos.tbrest.ru', 
        database: 'Till_co',
        synchronize: true,
        "options": {
            "encrypt": true,
            "enableArithAbort": true
          }
        }
    
    // connect to your database
    sql.connect(config, function (err) {
    
        if (err) console.log(err);
        // create Request object
        var request = new sql.Request();
            
        // query to the database and get the records
        request.query('use Till_co; select idnt_Code from tp_Identifiers', function (err, recordset) {
            
            // if (err) console.log(err)
            // var resarray = []
            //JSON.parse(recordset.recordsets[0], function(k,v){  return k })
            
           res.send(recordset)
            
        });

    });
});
var server = app.listen(5000, function () {
    console.log('Server is running..');
});