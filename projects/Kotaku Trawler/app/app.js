function app() {
    // 1. get search data from searchbox
    // 1.5. error tests
    // 2. input query into tag search api
    // 3. for each result in, run pageview api
    // 4. table results
    function KotakuSearch() {
        this.api_key = "&apikey=84xAbAUBOgSWYWfzkAfMzm3PPLkwQOLd&callback=?";
        this.urlStart = "https://www.kimonolabs.com/api/";
    };

    KotakuSearch.prototype.QueryTest = function(query) {
        if (query === "") {
            return alert("Please input a text query");
        };
    };

    KotakuSearch.prototype.TagSearch = function(query) {
        // this.QueryTest(query);
        var fullURL = this.urlStart + "2ffj476w?.js" + this.api_key;
        return $.getJSON(fullURL);
    };

    KotakuSearch.prototype.DateCheck = function(date) {
        if (date.indexOf("minute") !== -1) {
            var d = new Date();
            var returnedDate = (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear();
            return returnedDate;
        }; //if article was written "xx minutes ago"

        var articleDateSubstring = date.substr(0, date.indexOf(' '));

        if (!(isNaN(date.charAt(0)))) { // if the date is a number
            return articleDateSubstring; // return date portion (not time)
        } else if (articleDateSubstring === "Today") {
            var d = new Date();
            var returnedDate = (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear();
            return returnedDate;
        } else if (articleDateSubstring === "Yesterday") {
            var workingDate = new Date(); //sunday
            var dateInMonth = new Date().getDate(); // 28th
            workingDate.setDate(dateInMonth - 1);
            var actualDate = (workingDate.getMonth() + 1) + "/" + workingDate.getDate() + "/" + workingDate.getFullYear();
            return actualDate;
        } else if (isNaN(date.charAt(0)) && articleDateSubstring !== "Today" && articleDateSubstring !== "Yesterday") {
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

    KotakuSearch.prototype.ShowResults = function(query) {
        var self = this;
        $.when(
            this.TagSearch(query)
        ).then(
            function(results) {
                console.log(results);
                var data = results.results.TagSearch;
                localStorage.setItem('taggedJSON', JSON.stringify(data));

                $('.resultsAmount')[0].innerText = "There are " + data.length + " tag results for this query.";
                // and " + searchData.length + " search results 
                console.log(data); //showing all data returned
                var ego = self;

                function arrayifyData(incomingData) {
                    var dataResults = new Array(); // our concatenated Array of incomingData
                    var dataResultsDates = new Array();
                    var dataArraySpot = 0; // Spot we're saving to in articles
                    var dateResultsArraySpot = 0 // Spot we're saving to in dates
                    for (var i = incomingData.length - 1; i >= 0; i--) {
                        // for (i = 0; i < incomingData.length; i--) {

                        var fixedDate = ego.DateCheck(incomingData[i].Date.text); //result will be proper date
                        if (i === (incomingData.length - 1)) {
                            // if (i === 0) {

                            dataResults[dataArraySpot] = {
                                date: fixedDate,
                                articles: 1
                            };
                            dataResultsDates[dateResultsArraySpot] = fixedDate;

                        } else {
                            if (dataResults[dataArraySpot].date === fixedDate) {
                                dataResults[dataArraySpot].articles += 1;
                            } else {
                                dataArraySpot += 1;
                                dataResults[dataArraySpot] = {
                                    date: fixedDate,
                                    articles: 1
                                };
                                dateResultsArraySpot += 1;
                                dataResultsDates[dateResultsArraySpot] = fixedDate;
                            };
                        };
                    };
                    var combinedResults = [dataResults, dataResultsDates];
                    return combinedResults;

                };
                var arrayifiedTagResults = arrayifyData(data);
                // var arrayifiedSearchResults = arrayifyData(searchdata);
                var taggedDataResults = arrayifiedTagResults[0];
                // var searchDataResults = arrayifiedSearchResults[0];

                var dateArray = new Array();

                function addDates(array) {
                    for (i = 0; i < array.length; i++) {
                        dateArray.push(array[i]);
                    };
                    return;
                };

                addDates(arrayifiedTagResults[1]);
                // addDates(arrayifiedSearchResults[1]);

                //so all the dates are now in an array as strings

                function arraySortByDate(a, b) {
                    var dateA = new Date(a);
                    var dateB = new Date(b);
                    if (dateA > dateB) {
                        return 1;
                    } else if (dateA < dateB) {
                        return -1;
                    } else if (dateA === dateB) {
                        dateArray.splice((dateArray.indexOf(dateA)), 1);
                        return 0;
                    };
                };

                dateArray = dateArray.sort(arraySortByDate);
                dateArray = (function() {
                    var oldDates = dateArray;
                    dateArray = new Array();
                    oldDates.forEach(function(date) {
                        if (dateArray.indexOf(date) === -1) {
                            dateArray.push(date);
                        };
                    });
                    return dateArray;
                }(dateArray)); // IIFE function that gets rid of dupes

                //result should be an array with each day's result in its own spot.

                $('.resultsDestination')[0].innerHTML = "<table class='resultsTable'><tr class='tableHeader'><td class='tableTitle'>Date</td><td class='tableTitle'>Number of Articles</td></tr>";
                var tableHTML = '';
                for (i = 0; i < dateArray.length; i++) { // for each new date
                    var tableDate = dateArray[i]; // save the date to the variable
                    var taggedNum = 0; // set up a variable for the taggedNum
                    taggedDataResults.forEach(
                        function(oneResult) {
                            if (oneResult.date.indexOf(tableDate) !== -1) {
                                var a = taggedDataResults.filter(function(object) {
                                    return object.date === tableDate;
                                });
                                taggedNum = a[0].articles;
                            }

                        });

                    // var articleNum = 0; // set up a variable for the articleNum
                    // searchDataResults.forEach(
                    //     function(oneResult) {
                    //         if (oneResult.date.indexOf(tableDate) !== -1) {
                    //             var a = searchDataResults.filter(function(object) {
                    //                 return object.date === tableDate;
                    //             });
                    //             articleNum = a[0].articles;
                    //         }

                    //     });

                    tableHTML += "<tr class='row" + (i + 1) + "'><td class='date'>" + tableDate
                    // + "</td><td class='articleNum'>" + articleNum 
                    + "</td><td class='taggedNum'>" + taggedNum + "</td></tr>";
                };
                $('.resultsDestination').append(tableHTML);

                // at this point, chart the data.
            })
    };

    KotakuSearch.prototype.ShowPageviews = function() {
        var self = this;
        var choice = confirm('Depending on the number of results, this can take a few minutes.\n\n Are you sure you want to proceed?');
        if (choice === true) {
            var taggedResultsJSON = JSON.parse(localStorage.getItem('taggedJSON'));
            var pageviewsArray = new Array();
            pageviewsArray[0] = {
                articlesContained: 0
            }
            var pvArraySpot = 1;
            // var elapsed = taggedResultsJSON.length;
            var elapsed = 5;


            function getPageViews(resultJSON) {
                var ego = self;
                elapsed--;
                // console.log(elapsed);

                if (elapsed === -1) { // stops at end
                    d.resolve();
                    return;
                };

                var articleURL = taggedResultsJSON[elapsed].ArticleTitle.href;
                // console.log(self.api_key);
                // console.log(articleURL.substr(18));
                var fullURL = self.urlStart + "7h1lsg32?" + self.api_key + "&kimpath1=" + articleURL.substr(18);


                $.when(
                    $.getJSON(fullURL)
                ).then(function(pageviewJSON) {

                    //includes the date and # of pageviews
                    //when date does not match, goes to next item in array
                    var articlePageviews = pageviewJSON.results.collection1[0].PageViews;
                    console.log(elapsed, taggedResultsJSON[elapsed])
                    var arrayDate = ego.DateCheck(taggedResultsJSON[elapsed].Date.text);
                    if (pageviewsArray[pvArraySpot] === undefined) {
                        pageviewsArray[pvArraySpot] = {
                            date: arrayDate,
                            views: articlePageviews
                        };
                        pageviewsArray[0].articlesContained++;
                    } else if (pageviewsArray[pvArraySpot] !== undefined && pageviewsArray[pvArraySpot].date === arrayDate) {
                        var pv1 = parseInt(pageviewsArray[pvArraySpot].views.replace(',', ''));
                        var pv2 = parseInt(articlePageviews.replace(',', ''));
                        var pvCombined = pv1 + pv2;

                        pageviewsArray[pvArraySpot].views = pvCombined.toLocaleString();
                        pageviewsArray[0].articlesContained++;

                    } else if (pageviewsArray[pvArraySpot] !== undefined && pageviewsArray[pvArraySpot].date !== arrayDate) {
                        pvArraySpot++;
                        pageviewsArray[pvArraySpot] = {
                            date: arrayDate,
                            views: articlePageviews
                        };
                        pageviewsArray[0].articlesContained++;

                    };

                    // pageviewJSON.results.collection1[0].success
                    // console.log(pageviewJSON.lastrunstatus, pageviewJSON)

                    // console.log(pageviewJSON.lastrunstatus + " out of " + taggedResultsJSON.length)
                });


                setTimeout(getPageViews, 5000);
            }

            var d = new $.Deferred();
            getPageViews();
            var matchingDateClass = '';
            $.when(d).done(function() {
                console.log(pageviewsArray);
                // cover the table with a 'loading' loop and make it locked
                for (var i = 1; i < pageviewsArray.length; i++) {
                    // find the row with the matching date, save to variable
                    var currentDate = pageviewsArray[i].date;
                    
                    $(matchingDateClass).append("<td class='pageViews'>" + pageviewsArray[i].views + "</td>")

                }
                //reveal updated table
                //update graph
            })
        };
    };


    var search = new KotakuSearch;
    search.ShowResults('Destiny');
    $('.pageviewButton').on('click', function() {
        search.ShowPageviews();
    });
    // search.ShowResults(searchQuery);
    // $('.searchForm').on('submit', function(query) {
    //     query.preventDefault();
    //     var searchQuery = ($(".searchBox").val());
    //     search.ShowResults(searchQuery);

    // })
};

window.onload = app;

$.jqplot('chartdiv', [
    [
        [1, 21],
        [3, 5.12],
        [4, 13.1],
        [7, 33.6],
        [9, 85.9],
        [10, 219.9]
    ]
]);

// var line1 = [
//     ['2008-09-30 4:00PM', 4],
//     ['2008-10-30 4:00PM', 6.5],
//     ['2008-11-30 4:00PM', 5.7],
//     ['2008-12-30 4:00PM', 9],
//     ['2009-01-30 4:00PM', 8.2]
// ];
// var plot1 = $.jqplot('.chartdiv', [line1], {
//     title: 'Destiny Articles Over Time',
//     axes: {
//         xaxis: {
//             renderer: $.jqplot.DateAxisRenderer
//         }
//     },
//     series: [{
//         lineWidth: 4,
//         markerOptions: {
//             style: 'square'
//         }
//     }]
// })
