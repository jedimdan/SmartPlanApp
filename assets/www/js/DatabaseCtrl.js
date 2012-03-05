//on launch
document.addEventListener("deviceready", createDatabase, false);

//check if table exists, and create if not
//create database with two tables. Task: ID, duedate, duration, name. Workhours: id, day, starthr, endhr.
function createDatabase(){
	var db = window.openDatabase("SmartTaskDB", "1.0", "SmartTask Database", 100000);
	db.transaction(createTables, dbError, dbSuccess);
}

function createTables(tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS TASK (id unique, name, duration, duedate, done)');
    tx.executeSql('CREATE TABLE IF NOT EXISTS WORKHOURS (id unique, day, starthr, endhr)');
    
    bootstrapDatabase(tx);
}

//reset database (not important yet)

//bootstrap database for testing (don't need to care first)
function bootstrapDatabase(tx){
	alert('bootstrapping now');
	
	//sample data
	var tasks = [];
	tasks[0]=new Task(0,'item1',2,toTimeStamp(2012,3,6,18,0,0));
	tasks[1]=new Task(1,'item2',2,toTimeStamp(2012,3,7,18,0,0));
	tasks[2]=new Task(2,'item3',2,toTimeStamp(2012,3,8,18,0,0));
	tasks[3]=new Task(3,'item4',2,toTimeStamp(2012,3,9,18,0,0));
	tasks[4]=new Task(4,'item5',2,toTimeStamp(2012,3,9,18,0,0));

	for(i=0;i<tasks.length;i++){
		task = tasks[i];
		tx.executeSql('INSERT INTO TASK (name, duration, duedate, done) VALUES ("'+task.name+'", '+task.duration+', '+task.duedate+', 0)',[],dbSuccess,dbError);
	}
	
	//sample working hours
	var workhrs = [];
	workhrs[0]=new WorkingHour(0,12,14);
	workhrs[1]=new WorkingHour(1,12,14);
	workhrs[2]=new WorkingHour(2,12,14);
	workhrs[3]=new WorkingHour(3,12,14);
	workhrs[4]=new WorkingHour(4,12,14);
	
	for(i=0;i<workhrs.length;i++){
		var workhr = workhrs[i];
		tx.executeSql('INSERT INTO WORKHOURS (day, starthr, endhr) VALUES ('+workhr.day+', '+workhr.starthr+', '+workhr.endhr+')',[],dbSuccess,dbError);
	}
	
	tx.executeSql('SELECT * FROM TASK WHERE done == 0',[],function(tx,result){
		tasks = result.rows;
	},dbError);
	
	//alert('selected: '+tasks.length);
}

//create a task
function createTask(task){
	var db = window.openDatabase("SmartTaskDB", "1.0", "SmartTask Database", 100000);
	db.transaction(function(tx){
		tx.executeSql('INSERT INTO TASK (name, duration, duedate, done) VALUES ('+task.name+', '+task.duration+', '+task.duedate+',0)',[],dbSuccess,dbError);
	}, dbError, dbSuccess('insert'));	
}

//retrieve tasks with 'done' column set as 0. Returns an array of Task objects. Needs to be order by duedate
function getTasksUndone(){
	var dbtasks = [];
	
	var db = window.openDatabase("SmartTaskDB", "1.0", "SmartTask Database", 100000);
	db.transaction(function(tx){
		tx.executeSql('SELECT * FROM TASK WHERE done == 0 order by duedate',[],function(tx,result){
			dbtasks = result.rows;
		},dbError);
	}, dbError, dbSuccess);
	
	alert('selected '+dbtasks.length);
		
	return dbtasks;
}

function dbSelectTasksSuccess(tx,result){
	dbtasks = result.rows;
}

function getTask(id){
	
}

//update task (params: task object). Update the entire task based on this task object using the object's ID column.
function updateTask(task){
	
}

//delete task
function deleteTask(task){
	
}

//success and error handling
function dbError(err) {
    alert("Error processing SQL: "+err.message);
}

function dbSuccess() {
    alert("DB Success: ");
}