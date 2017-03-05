//AuthKey used for NYT API
var authKey = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";
//
//var queryURLBase = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" +
 //authKey + "&q=";

 //Search term

 //Number of queries

 //Start year

 //End Year

 //Search button

 //Clear results

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

		$.ajax({
		  url: url,
		  method: 'GET',
		  
		}).done(function(result) {
		  console.log(result);

		}).fail(function(err) {
		  throw err;
		});

//


	})

})

 