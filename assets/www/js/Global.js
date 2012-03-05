//Global functions that can be reusable throughout the app

function getParameterByName(name)
{
  name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
  var regexS = "[\\?&]" + name + "=([^&#]*)";
  var regex = new RegExp(regexS);
  var results = regex.exec(window.location.search);
  if(results == null)
    return "";
  else
    return decodeURIComponent(results[1].replace(/\+/g, " "));
}

//convert date time to unix
function toTimeStamp(year,month,day,hour,minute,second)
{
	 var datum = new Date(Date.UTC(year,month-1,day,hour,minute,second));
	 return datum.getTime()/1000;
}