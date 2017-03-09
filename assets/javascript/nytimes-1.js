//"b8cd8a1cde4841c893d0c68b900b87a4:0:74623931"

$("#results").html("This works");

console.log("Hi");

var makeQuery = function() {
	var authKey = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931"
	var search = $("#searchTerm").val();
	var yearBeg = $("#sYear").val();
	var yearEnd = $("#eYear").val();

	var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + authKey + "&sort=newest";

	if(search === "") {
		queryURL += "&q=history";
	}
	else{
		queryURL += "&q=" + search;
	}
	if(yearBeg !== undefined) {
		"&begin_date=" + yearBeg;
	}
	if(yearEnd !== undefined) {
		"&end_date=" + yearEnd;
	}

	return queryURL;
}

var createSearchResults = function(data) {
	//
	var results = data.response.docs;
	//
	//$("#results").empty();

	var numRec = $("#numOfRecordsToRetrieve").val();

	if(numRec === 0 || numRec === undefined) {
		numRec = 5;
	}

	for (i = 0; i < numRec; i++) {
		var newDiv = $("<div>").addClass("results");
		var title = $("<h2>");
		var auth = $("<h3>");
		var sect = $("<p>");
		var time = $("<p>");
		var link = $("<a>");

		console.log(results);
		var titleText = results[i].headline.main;

		var authText;

		if(authText === null) {

		}
		try {
			authText = results[i].byline.original;
		}
		catch(err) {
			authText = "New York Times Article";
		}

		var sectText = results[i].snippet;
		var timeText = results[i].pub_date;
		var linkURL = results[i].web_url;

		title.append(i + 1 + ".) ")
			.append(link.append(titleText).attr("href", linkURL));

		auth.append(authText);
		sect.append(sectText);
		time.append(timeText).addClass("italic");
		newDiv.append(title);
		newDiv.append(auth);
		newDiv.append(sect);
		newDiv.append(time);

		$("results").append(newDiv);

	}
};

var initSearchButton = function() {
	var queryURL = makeQuery;

	console.log(queryURL);

	$.ajax({
		url: queryURL,
		method: 'GET'
	}).done(createSearchResults);
};

$(document).ready(function() {
	$("#search-btn").on('click', initSearchButton);

	$("input").keypress(function (e) {
		if (e.which == 13) {
			initSearchButton();
			return false;
		}
	});

	$("#clear-btn").click(function() {
		$("results").empty();
		$("#searchTerm").focus();
	})

	$("searchTerm").focus();
});