
//b9f91d369ff59547cd47b931d8cbc56b
//AuthKey used for NYT API
//var createQuery = function() {

var authKey = "b8cd8a1cde4841c893d0c68b900b87a4:0:74623931";
//


$(document).ready(function() {

	//On submission of form, execute following function
	$("#search-btn").on('click', function(event) {

		//Grabs value on input fields on form submission
		var qID = $("#searchTerm").val();
		var records = $("#numRec").val();
		var bDate = $("#startYear").val();
		var eDate = $("#endYear").val();

		//Base URL for NYT API
		var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + authKey + "&sort=newest";



		//
		url += '?' + $.param({
		  'api-key': authKey,
		  'q': qID,
		  'page': records,
		  'begin_date': bDate,
		  'end_date': eDate,
		});

		//Prevents page from reloading so we dont lose data
		event.preventdefault();

		//AJAX to retrieve NYT API data
		$.ajax({
		  url: url,
		  method: 'GET'
		  
		}).done(function(response) {
		  //Log the response to get object data
		  console.log(response);
		  //Type less, easier to read
		  var results = response.docs;

		  //For loop for the array
		  for(var i = 0; i < results.length; i++) {
		  	//Start count at 0
		  	var count = 0;
		  	//Var to dynamically insert span tags for the numbers
		  	var newSpan = $('<span>').addClass('numForList');
		  	//Var to dynamically create a div with a class to hold the results
		  	var newDiv = $('<div>').addClass('resultsDiv');
		  	//Var to dynamically create a p tag for title
		  	var titleP = $('<p>');
		  	////Var to dynamically create a p tag for the article's abstract
		  	var abstractP = $('<p>').addClass('fontSub');
		  	//Var to dynamically create ordered list
		  	var newOl = $('<ol>');
		  	//Var to dynamically create a list
		  	var newList = $('<li>');
		  	//Var to retrieve the URL from the API
		  	var webURL = results[i].webURL;
		  	//Setting the source of the link the URL
		  	var titleA = $('<a>').attr('href', webURL);
		  	//Retrieving the article title from API
		  	var articleTitle = results[i].headline.main;
		  	//Retrieving the article abstract from API
		  	var articleAbstract = results[i].abstract;
		  	//Retrieving the published date from API
		  	var pubDate = results[i].pub_date;

		  	//If abstract is null, add the snippet to the html
		  	if (articleAbstract === null) {
		  		var articleAbstract = results[i].snippet;
		  	}

		  	//Time to append everything
		  	$('#topArticles').append(newDiv);

		  	titleA.append(titleP);
		  	newDiv.append(titleA).append(abstractP);

		  	titleP.append(articleTitle);
		  	abstractP.append(articleAbstract);

		  	newDiv.append("Publication date: " + pubDate).addClass('fontForSub'); 

		  	console.log(newDiv);

		  }



		  //Show error if function fails
		}).fail(function(err) {
		  throw err;
		});

//


	});

})

 