//sample data
tasks[0]=new Task('item1',2,toTimeStamp(2012,3,6,18,0,0));
tasks[1]=new Task('item2',2,toTimeStamp(2012,3,7,18,0,0));
tasks[2]=new Task('item3',2,toTimeStamp(2012,3,8,18,0,0));

//sample working hours
workhrs[0]=new WorkingHour(1,12,15);
workhrs[1]=new WorkingHour(1,18,20);
workhrs[2]=new WorkingHour(2,12,14);

//sort tasks
////////////
function sorttasks(tasks,workhrs)
{
	
//get all tasks that have not been finished ordered by due date (for now passed through params)

//get all working hours (for now passed through params)

//get next working hour position
	nextWorkHr = 0; //to be replaced with logic later

//loop all the working hours until all tasks have been assigned
	var nexttask = 0;
	var currhour = nextWorkHr;
	var week = 0;
		
	while(nexttask < tasks.length)
	{
		
//		get working hour (currhour)
		currWorkHr = workhrs[currhour];
//		get total hours
		hours = currWorkHr.duration;
		
//		for each task starting from next task
		for (i=nexttask;i<tasks.length;i++)
		{
			
//			if task hours < total hours
			if(tasks[i].duration < hours){	
//				assign task a slot (working hour end - total hours)
				starttime = nextWeekDayDate(currWorkHr.day,currWorkHr.endhr-hours,week);
//				total hours = total hours - task duration
				hours = hours - tasks[i].duration;
				
//				nexttask++
				nexttask++;
			}
//			else
			else {
//				break task loop
//				currhour++
				currhour++;
				break;
			}
		}
		
		//reset to start
		if(currhour > workhrs.length){
			currhour = 0;
		}
	}
	
	return tasks;
}
	
	
//convert date time to unix
function toTimestamp(year,month,day,hour,minute,second)
{
	 var datum = new Date(Date.UTC(year,month-1,day,hour,minute,second));
	 return datum.getTime()/1000;
}

//get date of next available week day
function nextWeekDayDate(day,timesethr,offset)
{
	now = new Date();
	today= now.getDay()+1;
	
	if (day != today){
		diff = day - today; //eg day = 4,today3 
		
		if(diff > 0){
			now.setDate(now.getDate()+diff+(offset*7));
		}
		else {
			now.setDate(now.getDate()+diff+7+(offset*7));
		}
	}
	
	now.setHours(timesethr);
	now.setMinutes(0);
	
	return now;
}