//AuthKey used for NYT API
var authKey = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";
//


$(document).ready(function() {

	//On submission of form, execute following function
	$("#search").on('click', function(e) {

		//Grabs value on input fields on form submission
		var qID = $('#searchTerm').val();
		var records = $('#numberOfRecordToRetrieve').val();
		var bDate = $('#startYear').val();
		var eDate = $('#endYear').val();

		//Base URL for NYT API
		var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";

		//
		url += '?' + $.param({
		  'api-key': authKey,
		  'q': qID,
		  'page': records
		  'begin_date': bDate,
		  'end_date': eDate
		});

		//Prevents page from reloading so we dont lose data
		e.preventdefault();

		//AJAX to retrieve NYT API data
		$.ajax({
		  url: url,
		  method: 'GET',
		  
		}).done(function(response) {
		  //Log the response to get object data
		  console.log(response);

		  var results = response.response.docs;

		  //For loops for the array
		  for(var i = 0; i < results.length; i++) {
		  	var count = 0;
		  	var newSpan = $('<span>').addClass('numForList');
		  	var newDiv = $('<div>').addClass('resultsDiv');
		  	var titleP = $('<p>');
		  	var abstractP = $('<p>').addClass('fontSub');
		  	var newOl = $('<ol>');
		  	var newList = $('<li>');
		  	var webURL = results[i].webURL;
		  	var titleA = $('<a>').attr('href', webURL);
		  	var articleTitle = results[i].headline.main;
		  	var articleAbstract = results[i].abstract;
		  	var pubDate = results[i].pub_date;
		  }




		}).fail(function(err) {
		  throw err;
		});

//


	})

})

 