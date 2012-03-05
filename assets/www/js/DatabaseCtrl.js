//on launch
document.addEventListener("deviceready", onDeviceReady, false);

//check if table exists, and create if not
//create database with two tables. Task: ID, duedate, duration, name. Workhours: id, day, starthr, endhr.
function createDB(tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS TASK (id, name, duration, duedate)');
    tx.executeSql('CREATE TABLE IF NOT EXISTS WORKHOURS (id, day, starthr, endhr)');
}

//reset database (not important yet)

//bootstrap database for testing (don't need to care first)

//create a task
taskID = 1;
taskName = form.element["task-name"].value;
taskDuration = form.element["hours"].value;
taskDuedate = form.element["quick-due"].value;
tx.executeSql('INSERT INTO TASK (id, name, duration, duedate) VALUES (taskID, taskName, taskDuration, taskDuedate)',[],insertSuccess,errorCB);

//retrieve tasks with 'done' column set as false. Returns an array of Task objects. Needs to be order by duedate

//update task (params: task object). Update the entire task based on this task object using the object's ID column.

//delete task


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
