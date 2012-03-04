//task item
function Task(name,duration,duedate)
{
	this.name = name;
	this.duration = duration; //in hours
	this.duedate = duedate;
	this.starttime = null;
	this.endttime = null;
	this.done = false;
	this.assigned = false; //flag, not stored in database
}

//working hours
function WorkingHour(day,starthr,endhr)
{
	this.day = day; //in int. 0 = sunday
	this.starthr = starthr;
//	this.startmin = startmin;
	this.endhr = endhr;
//	this.endmin = endmin
	this.duration = endhr - starthr;
}

//working hour slot for the calendar
function WorkingSlot(workhr,datetime){
	this.datetime = datetime;
	this.workhr = workhr;
	this.tasks = [];
}

//settings
function Setting(property,value)
{
	this.property = property;
	this.value = value;
}