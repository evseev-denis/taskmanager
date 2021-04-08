const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('users.db', sqlite3.OPEN_READWRITE);

db.serialize(() => {
  db.each(`SELECT * FROM people`, (err, row) => {
    console.log(row.person_id + "\t" + row.first_name);
  });
});
db.close();
