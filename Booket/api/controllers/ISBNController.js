/**
 * ISBNController
 *
 * @description :: Server-side logic for managing ISBNS
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var isbndb_access_key = "U95DCJC7";

module.exports = {

	get:function(req, res)
	{
		var isbn = req.param('isbn');
		var http = require('http');
		
		var options = {
            host : "isbndb.com",
            port : 80,
            path : "/api/v2/json/"+isbndb_access_key+"/book/"+isbn,
            method : 'GET'
	    };

	    var isbn_req = http.request(options, function(isbn_res)
	    {
	    	var isbn_data = '';
	        webservice_response.on('error', function(e){ console.log(e.message); });
	        webservice_response.on('data', function(chunk){ isbn_data+=chunk });
	        webservice_response.on('end', function(){
	        	try {
        			var json = JSON.parse(isbn_data);
	        		res.json(json);
      			} catch (e) {
        			console.log('Could not parse response: ' + e);
      			}
	        });
	    });
	},

	addBook:function(req, res){
		var isbn = req.param('isbn');
		var http = require('http');
		
		var options = {
            host : "isbndb.com",
            port : 80,
            path : "/api/v2/json/"+isbndb_access_key+"/book/"+isbn,
            method : 'GET'
	    };

	    var isbn_req = http.request(options, function(isbn_res)
	    {
	    	var isbn_data = '';
	        webservice_response.on('error', function(e){ console.log(e.message); });
	        webservice_response.on('data', function(chunk){ isbn_data+=chunk });
	        webservice_response.on('end', function(){
	        	try {
        			var json = JSON.parse(isbn_data);

        			///TODO

      			} catch (e) {
        			console.log('Could not parse response: ' + e);
      			}
	        });
	    });	
	}
};

