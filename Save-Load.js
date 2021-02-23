const fs = require('fs');

exports.saveUserData = function(database){
const stringifyData = JSON.stringify(database, null, 2)
fs.writeFileSync('Database.json', stringifyData)
console.log(stringifyData)
}

exports.updateUserData = function(database, found, updated){
let targetIndex = database.indexOf(found);
// replace object from data list with `updated` object
database.splice(targetIndex, 1, updated);
//saveUserData(database);
//console.log("database: "+database);
const stringifyData = JSON.stringify(database, null, 2)
fs.writeFileSync('Database.json', stringifyData)
console.log("updated");
}