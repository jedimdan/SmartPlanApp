//on launch
document.addEventListener("deviceready", connectDatabase, false);

indextasks = [];
indexworkhrs = [];
tasksdb = false;
workhrsdb = false;

//connect database
function connectDatabase(){
	var db = window.openDatabase("SmartTaskDB", "1.0", "SmartTask Database", 100000);
	db.transaction(createTables, dbError, dbSuccess);
}

//create tables
function createTables(tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS TASK (id unique, name, duration, duedate, done)');
    tx.executeSql('CREATE TABLE IF NOT EXISTS WORKHOURS (id unique, day, starthr, endhr)');
    
    //bootstrap
  //sample data
	var tasks = [];
	tasks[0]=new Task(0,'dbitem1',2,toTimeStamp(2012,3,6,18,0,0));
	tasks[1]=new Task(1,'dbitem2',2,toTimeStamp(2012,3,7,18,0,0));
	tasks[2]=new Task(2,'dbitem3',2,toTimeStamp(2012,3,8,18,0,0));
	tasks[3]=new Task(3,'dbitem4',2,toTimeStamp(2012,3,9,18,0,0));
	tasks[4]=new Task(4,'dbitem5',2,toTimeStamp(2012,3,9,18,0,0));

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
	
	tx.executeSql('SELECT * FROM TASK WHERE done == 0',[],getTasksUndone,dbError);
    
}

//select task rows
//retrieve tasks with 'done' column set as 0. Returns an array of Task objects. Needs to be order by duedate
function getTasksUndone(tx){
	tx.executeSql('SELECT * FROM WORKHOURS order by day,starthr',[],workhrsSelectDone,dbError);
	tx.executeSql('SELECT * FROM TASK WHERE done == 0 order by duedate',[],tasksSelectDone,dbError);
	
	//populateCalendarList();
}

//select workhr rows
function tasksSelectDone(tx,results){
	indextasks = results.rows;
	tasksdb = true;
	alert(tasksdb);
	populateCalendarList();
}
function workhrsSelectDone(tx,results){
	indexworkhrs = results.rows;
	workhrsdb = true;
	alert('a'-workhrsdb);
}

//push rows into populate
function populateCalendarList(){
	alert(indextasks.length+'--'+indexworkhrs.length);
	
	workslots = sorttasks(indextasks,indexworkhrs);
	
	now = new Date();
	currWeekday = -1;
	weekdays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
	
	//$("<li data-role='list-divider'>"+now.toDateString()+"</li>").appendTo('#calendarlist');
	
	for(i=0;i<workslots.length;i++){
		if (workslots[i].workhr.day != currWeekday){
			currWeekday = workslots[i].workhr.day;
			$("<li data-role='list-divider'>"+workslots[i].datetime.toDateString()+"</li>").appendTo('#calendarlist');
		}
		
		for(j=0;j<workslots[i].tasks.length;j++){
			id = workslots[i].tasks[j].id;
			$("<li id='task-"+id+"'><a id='"+id+"' onclick='toggleEdit("+id+")'><h3>"+workslots[i].tasks[j].name+"</h3><p class='ui-li-aside'><strong>"+workslots[i].tasks[j].starttime.getHours()+":00</strong></p></a><a onclick='completeTask("+id+")'>Finish</a></li>").appendTo('#calendarlist');
			$("<li class='edit' id='edit-"+id+"' data-theme='e' style='display:none'><a rel='external' href='addtask.html?id="+id+"'>Edit</a></li>").appendTo('#calendarlist');
			$("<li class='edit' id='delete-"+id+"' data-theme='e' style='display:none'><a onclick='deleteTask("+id+',"'+workslots[i].tasks[j].name+'"'+")'>Delete</a></li>").appendTo('#calendarlist');
		}
	}
}

function dbError(err) {
    alert("Error processing SQL: "+err.message);
}

function dbSuccess() {
    alert("DB Connection Success");
}