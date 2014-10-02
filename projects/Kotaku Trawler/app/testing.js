function dateCheck(date) {
    var articleDateSubstring = date.substr(0, date.indexOf(' '));

    if (!(isNaN(date.charAt(0)))) { // if the date is a number
        return articleDateSubstring; // return date portion (not time)
    } else if (articleDateSubstring === "Today") {
        var d = new Date();
        var returnedDate = (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear();
        return returnedDate;
    } else if (isNaN(date.charAt(0)) && articleDateSubstring !== "Today") {
        var actualWeekdays = [
            "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
        ]; //weekdays as normally seen in JS
        var dayToday = actualWeekdays[new Date().getDay()]; // Sunday
        var articleWeekdays = new Array(6); // setting new Array based around today
        articleWeekdays[0] = dayToday; // setting today as the first day
        var dayToSet = new Date().getDay() - 1;
        for (i = 1; i <= 6; i++) { // 'i' is the array spot
            if (dayToSet < 0) { // if we're going into last week...
                dayToSet = 6; // ...sets day as Saturday
            };
            articleWeekdays[i] = actualWeekdays[dayToSet]; //sets weekday in new spot on array
            dayToSet = dayToSet - 1; // moves back a day
        };
        var workingDate = new Date(); //sunday
        var dateInMonth = new Date().getDate(); // 28th
        var dayDifference = articleWeekdays.indexOf(articleDateSubstring); // -4
        workingDate.setDate(dateInMonth - dayDifference);
        var actualDate = (workingDate.getMonth() + 1) + "/" + workingDate.getDate() + "/" + workingDate.getFullYear();
        return actualDate;
    };
};
