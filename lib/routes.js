//routes

var mongoLib = require('./mongoLib');
var request = require('request');
mongoLib.connect('mongodb-1');

module.exports = function routes(app) {
	app.get('/login', function(req, res) {
		
				request.post({url: 'https://svcs.sandbox.paypal.com/AdaptivePayments/Preapproval', 
				body : 'cancelUrl=http://your_cancel_url&currencyCode=USD&endingDate=2012-09-25T08%3A00%3A00.000Z&maxAmountPerPayment=200.00&maxNumberOfPayments=30&maxTotalAmountOfAllPayments=1500.00&pinType=NOT_REQUIRED&requestEnvelope.errorLanguage=en_US&returnUrl=http://your_return_url&startingDate=2012-09-22T05:00:00.000Z&senderEmail=c4s_2_1348279008_per@yahoo.com',
				headers : {'X-PAYPAL-SECURITY-USERID':'c4s_1_1348278764_biz_api1.yahoo.com',
				'X-PAYPAL-SECURITY-PASSWORD':'1348278787','X-PAYPAL-SECURITY-SIGNATURE':'AQGMQKp1jP2YclC19HEJHh6IgyaBAmsztD5p1KtHV9kGA4lmiFPrBBUB','X-PAYPAL-REQUEST-DATA-FORMAT':'NV',
				'X-PAYPAL-RESPONSE-DATA-FORMAT':'NV',
				'X-PAYPAL-APPLICATION-ID':'APP-80W284485P519543T'}},
			   function(error, response, body) {
			   console.log('error'+ error);
			   if (!error && response.statusCode == 200) {
				console.log(body) // Print the google web page.
				var preapprovalkey = body.indexOf("preapprovalKey");
				var preapprovalString = body.substr(preapprovalkey+15)
				
			}
		});
		
		app.get('push', function(req,res){
			
		});
		
		// request({url: 'https://svcs.sandbox.paypal.com/AdaptivePayments/Preapproval', 
		// body : 'cancelUrl=http://your_cancel_url&currencyCode=USD&endingDate=2012-09-25T08%3A00%3A00.000Z&maxAmountPerPayment=200.00&maxNumberOfPayments=30&maxTotalAmountOfAllPayments=1500.00&pinType=NOT_REQUIRED&requestEnvelope.errorLanguage=en_US&returnUrl=http://your_return_url&startingDate=2012-09-22T05:00:00.000Z&senderEmail=c4s_2_1348279008_per@yahoo.com',
		// headers : 'X-PAYPAL-SECURITY-USERID:c4s_1_1348278764_biz_api1.yahoo.com,X-PAYPAL-SECURITY-PASSWORD:1348278787,X-PAYPAL-SECURITY-SIGNATURE:AQGMQKp1jP2YclC19HEJHh6IgyaBAmsztD5p1KtHV9kGA4lmiFPrBBUB,X-PAYPAL-REQUEST-DATA-FORMAT:NV,X-PAYPAL-RESPONSE-DATA-FORMAT:NV,X-PAYPAL-APPLICATION-ID:APP-80W284485P519543T'},
		 // function(error, response, body) {
		 	// console.log('error');
			// console.log('error'+ error);
			// if (!error && response.statusCode == 200) {
				// console.log(body) // Print the google web page.
			// }
		// });
		//res.render('index.html');
	});
}

