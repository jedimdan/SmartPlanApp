//sample data
tasks = [];
tasks[0]=new Task(0,'item1',2,toTimeStamp(2012,3,11,18,0,0));
tasks[1]=new Task(1,'item2',2,toTimeStamp(2012,3,12,18,0,0));
tasks[2]=new Task(2,'item3',2,toTimeStamp(2012,3,13,18,0,0));
tasks[3]=new Task(3,'item4',2,toTimeStamp(2012,3,14,18,0,0));
tasks[4]=new Task(4,'item5',2,toTimeStamp(2012,3,15,18,0,0));

//sample working hours
workhrs = [];
workhrs[0]=new WorkingHour(1,12,14);
workhrs[1]=new WorkingHour(3,12,18);
workhrs[2]=new WorkingHour(4,18,20);

//sort tasks and returns them in a calendar.
////////////
function sorttasks(tasks,workhrs)
{
	
//get all tasks that have not been finished ordered by due date (for now passed through params)

//get all working hours (for now passed through params)

//get next working hour position
	nextWorkHr = 0; //to be replaced with logic later
	nowDate = new Date();
	for(i=0;i<workhrs.length;i++){
		curr = workhrs[i];
		
		if(curr.day == nowDate.getDay() && curr.starthr > nowDate.getHours()){
			nextWorkHr = i;
			break;
		}
		else if(curr.day > nowDate.getDay()){
			nextWorkHr = i;
			break;
		}
	}
	
	

//loop all the working hours until all tasks have been assigned
	nexttask = 0;
	currhour = nextWorkHr;
	week = 0;
	workSlotsPopulated = [];
		
	while(nexttask < tasks.length)
	{
		
//		get working hour (currhour)
		currWorkHr = workhrs[currhour];
//		get total hours
		hours = currWorkHr.duration;
		
		if(currWorkHr.day <= nowDate.getDay() && currWorkHr.day != 0){
			week++;
		}
		
		currSlot = new WorkingSlot(currWorkHr,nextWeekDayDate(currWorkHr.day,currWorkHr.starthr,week));
		
//		for each task starting from next task
		for (i=nexttask;i<tasks.length;i++)
		{
			
//			if task hours < total hours
			if(tasks[i].duration <= hours){	
//				assign task a slot (working hour end - total hours)
				starttime = nextWeekDayDate(currWorkHr.day,currWorkHr.endhr-hours,week);
				tasks[i].starttime = starttime;
				
				currSlot.tasks.push(tasks[i]);
				
//				starttime.setHours(starttime.getHours()+tasks[i].duration);
				//tasks[i].endtime = starttime;
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
		
		workSlotsPopulated.push(currSlot);
		
		//reset to start
		if(currhour >= workhrs.length){
			currhour = 0;
			week++;
		}
	}
	
	return workSlotsPopulated;
}

//get date of next available week day
function nextWeekDayDate(day,timesethr,offset)
{
	now = new Date();
	today= now.getDay();
	if (day != today){
		diff = day - today; //eg day = 4,today3 
		
		if(diff > 0){
			now.setDate(now.getDate()+diff+(offset*7));
		}
		else {
			now.setDate(now.getDate()+diff+7+(offset*7));
		}
	}
	else{
		now.setDate(now.getDate()+(offset*7));
	}
	
	now.setHours(timesethr);
	now.setMinutes(0);
	
	return now;
}