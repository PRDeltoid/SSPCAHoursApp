
DAY = {sunday:0,monday:1,tuesday:2,wednesday:3,thursday:4,friday:5,saturday:6};
MONTH = {january:0,february:1,march:2,april:3,may:4,june:5,july:6,august:7,september:8,october:9,november:10,december:11};

//Object for each area, as different areas (adoptions, receiving, etc) have different open/close dates and times.
var today = new Date();
var currentYear = 	today.getFullYear();
var currentMonth = 	today.getMonth();
var currentDate = 	today.getDate();
var currentHour = 	today.getHours();
var currentMinutes= today.getMinutes();

var dayObject = function(day,open,openTime,closeTime) {
	this.day = day;
	this.open = open;
	this.openTime = openTime;
	this.closeTime = closeTime;
	

};

var holidays = [];
var adoptionsDays = [];
var receivingDays = [];
var vaccineClinicDays = [];
var petcoDays = [];

var areaObject = function(areaName,htmlID) {
	this.areaName = areaName;
	this.dates = [];
	this.htmlID = htmlID;
};

areaObject.prototype.loadArea = function(datesArray) {
	for(var it=0;it<datesArray.length;it++) {
		this.dates.push(datesArray[it]);
	}
	return;
};

areaObject.prototype.checkIfOpen = function(todaysDate) {
	if((this.checkTime(todaysDate) && this.checkDay(todaysDate)) || checkIfHoliday(todaysDate)) {
		$("#"+this.htmlID).html(this.areaName + ":<span class='open'> Open</span>");
	} else {
		$("#"+this.htmlID).html(this.areaName + ":<span class='closed'> Closed</span>");
	}
	return;	
};

areaObject.prototype.checkDay = function(todaysDate) {
	var isOpen = false;
	var dayOfTheWeek = this.dates[todaysDate.getDay()];
	
	if(dayOfTheWeek.open==true) {
		isOpen = true;
	}
	
	return isOpen;
};

areaObject.prototype.checkTime = function(todaysDate) {
	var isOpen = false;
	var currentTime = todaysDate.getHours();
	var dayOfTheWeek = this.dates[todaysDate.getDay()];
	var openTime = dayOfTheWeek.openTime;
	var closeTime = dayOfTheWeek.closeTime;
	
	if(openTime <= currentTime && currentTime <= closeTime) {
		isOpen = true;
	}	
	return isOpen;
};

$(document).ready(function() {	
	loadHolidayArray();
	loadAreaArrays();
	
	var adoptionsCenter = new areaObject("Adoptions",'adoptions');
	adoptionsCenter.loadArea(adoptionsDays);
	var petcoCenter = new areaObject("PetCo Adoptions Center",'petco');
	petcoCenter.loadArea(petcoDays);
	var receivingCenter = new areaObject("Receiving",'receiving');
	receivingCenter.loadArea(receivingDays);
	var vaccineClinic = new areaObject("Vaccine Clinic",'vaccine-clinic');
	vaccineClinic.loadArea(vaccineClinicDays);

	
	var todaysDate = getTodaysDateFormatted();	
	adoptionsCenter.checkIfOpen(todaysDate);
	petcoCenter.checkIfOpen(todaysDate);
	receivingCenter.checkIfOpen(todaysDate);
	vaccineClinic.checkIfOpen(todaysDate);
	
});

function checkIfHoliday(date) {
	var isHoliday = false;
	for(var it=0;it<holidays.length;it++) {
		if(holidays[it].toString() == date.toString()) {	isHoliday = true;	}
	}
	return isHoliday;
}


//Removes ms,seconds,minutes,and hours (sets to 0) to make comparisons easier.
function getTodaysDateFormatted() {
	var formattedDate = new Date(currentYear,currentMonth,currentDate,currentHour,currentMinutes);
	return formattedDate;	
}


function loadHolidayArray() {
	holidays.push(new Date(currentYear, MONTH.february, 17)); 	//Pres. Day
	holidays.push(new Date(currentYear, MONTH.april, 20));		//Easter
	holidays.push(new Date(currentYear, MONTH.may, 26));		//Memorial Day
	holidays.push(new Date(currentYear, MONTH.july, 4));		//Independence Day
	holidays.push(new Date(currentYear, MONTH.september, 1));	//Labor Day
	holidays.push(new Date(currentYear, MONTH.november, 11));	//Veteran's Day
	holidays.push(new Date(currentYear, MONTH.november, 27));	//Thanksgiving Day
	holidays.push(new Date(currentYear, MONTH.december, 25));	//Christmas Day
}

function loadAreaArrays() {
	//open/closed times use 24h clock (midnight is 0, 11PM is 23)
	adoptionsDays.push(new dayObject(DAY.sunday,true,11,18));
	adoptionsDays.push(new dayObject(DAY.monday,false,11,18));
	adoptionsDays.push(new dayObject(DAY.tuesday,false,11,18));
	adoptionsDays.push(new dayObject(DAY.wednesday,true,11,18));
	adoptionsDays.push(new dayObject(DAY.thursday,true,11,18));
	adoptionsDays.push(new dayObject(DAY.friday,true,11,18));
	adoptionsDays.push(new dayObject(DAY.saturday,true,11,18));
	
	petcoDays.push(new dayObject(DAY.sunday,true,11,17));
	petcoDays.push(new dayObject(DAY.monday,true,13,19));
	petcoDays.push(new dayObject(DAY.tuesday,true,13,19));
	petcoDays.push(new dayObject(DAY.wednesday,true,13,19));
	petcoDays.push(new dayObject(DAY.thursday,true,13,19));
	petcoDays.push(new dayObject(DAY.friday,true,13,19));
	petcoDays.push(new dayObject(DAY.saturday,true,11,17));
	
	receivingDays.push(new dayObject(DAY.sunday,true,11,18));
	receivingDays.push(new dayObject(DAY.monday,false,11,18));
	receivingDays.push(new dayObject(DAY.tuesday,false,11,18));
	receivingDays.push(new dayObject(DAY.wednesday,true,11,18));
	receivingDays.push(new dayObject(DAY.thursday,true,11,18));
	receivingDays.push(new dayObject(DAY.friday,true,11,18));
	receivingDays.push(new dayObject(DAY.saturday,true,11,18));
	
	vaccineClinicDays.push(new dayObject(DAY.sunday,false,11,15));
	vaccineClinicDays.push(new dayObject(DAY.monday,true,11,15));
	vaccineClinicDays.push(new dayObject(DAY.tuesday,true,11,15));
	vaccineClinicDays.push(new dayObject(DAY.wednesday,false,11,15));
	vaccineClinicDays.push(new dayObject(DAY.thursday,false,11,15));
	vaccineClinicDays.push(new dayObject(DAY.friday,false,11,15));
	vaccineClinicDays.push(new dayObject(DAY.saturday,false,11,15));
}


