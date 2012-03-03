// Wait for PhoneGap to load
//
document.addEventListener("deviceready", onDeviceReady, false);

// Populate the database 
//
function populateDB(tx) {
    tx.executeSql('DROP TABLE IF EXISTS DEMO');
    tx.executeSql('CREATE TABLE IF NOT EXISTS DEMO (id unique, data)');
    tx.executeSql('INSERT INTO DEMO (id, data) VALUES (1, "First row")');
    tx.executeSql('INSERT INTO DEMO (id, data) VALUES (2, "Second row")',[],insertSuccess,errorCB);
}

// Query the database
//
function queryDB(tx) {
    tx.executeSql('SELECT * FROM DEMO', [], selectSuccess, errorCB);
}

// Query the success callback
//
function insertSuccess(tx, results) {
    // this will be empty since no rows were inserted.
    console.log("Insert ID = " + results.insertId);
    // this will be 0 since it is a select statement
    console.log("Rows Affected = " + results.rowAffected);
}
function selectSuccess(tx, results) {
    // the number of rows returned by the select statement
    console.log("Rows Returned = " + results.rows.length);
    console.log("First row returned = "+ results.rows.item(0).data)
}

// Transaction error callback
//
function errorCB(err) {
    console.log("Error processing SQL: "+err.message);
}

// Transaction success callback
//
function successCB() {
    var db = window.openDatabase("Database", "1.0", "PhoneGap Demo", 100000);
    db.transaction(queryDB, errorCB);
}

// PhoneGap is ready
//
function onDeviceReady() {
    var db = window.openDatabase("Database", "1.0", "PhoneGap Demo", 100000);
    db.transaction(populateDB, errorCB, successCB);
}