//task item
function task(name,duration,duedate)
{
	this.name = name;
	this.duration = duration;
	this.duedate = duedate;
	this.starttime = null;
	this.endttime = null;
	this.done = false;
	this.assigned = false; //flag, not stored in database
}

//working hours
function workinghour(day,starttime,endtime)
{
	this.day = day;
	this.starttime = starttime;
	this.endtime = endtime;
	this.duration = startime-endtime;
}


//settings
function setting(property,value)
{
	this.property = property;
	this.value = value;
}