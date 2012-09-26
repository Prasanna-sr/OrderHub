/**
 * Created with IntelliJ IDEA.
 * User: prasannasr
 * Date: 7/18/12
 * Time: 11:16 AM
 * To change this template use File | Settings | File Templates.
 */


var socketio = require('socket.io');
var request = require('request');


module.exports = function (app) {
	
    io = socketio.listen(app);
    io.configure(function() {
        io.set('log level', 1);
        io.set("transports", ["xhr-polling"]);
    });

    io.sockets.on('connection', function (socket) {
        console.log('connection established');
        socket.on('notify',function(to_email) {
            console.log('----update socket----');
             request.post({url: 'https://svcs.sandbox.paypal.com/AdaptivePayments/Pay', 
				body : 'actionType=PAY&clientDetails.applicationId=APP-80W284485P519543T&clientDetails.ipAddress=127.0.0.1&currencyCode=USD&feesPayer=EACHRECEIVER&memo=Example&receiverList.receiver(0).amount=5.00&receiverList.receiver(0).email='
				+ to_email +'&receiverList.receiver(0).primary=true&receiverList.receiver(1).amount=5.00&receiverList.receiver(1).email=c4s_1_1348278764_biz@yahoo.com&receiverList.receiver(1).primary=false&requestEnvelope.errorLanguage=en_US&returnUrl=http://restauranthelper.cloudfoundry.com#customer-notification&cancelUrl=http://www.yourdomain.com/cancel.html'
				, headers : {'X-PAYPAL-SECURITY-USERID':'c4s_1_1348278764_biz_api1.yahoo.com',
				'X-PAYPAL-SECURITY-PASSWORD':'1348278787','X-PAYPAL-SECURITY-SIGNATURE':'AQGMQKp1jP2YclC19HEJHh6IgyaBAmsztD5p1KtHV9kGA4lmiFPrBBUB','X-PAYPAL-REQUEST-DATA-FORMAT':'NV',
				'X-PAYPAL-RESPONSE-DATA-FORMAT':'NV',
				'X-PAYPAL-APPLICATION-ID':'APP-80W284485P519543T'}},
			   function(error, response, body) {
			  console.log('error'+ error);
			  if (!error && response.statusCode == 200) {
				console.log(body) // Print the google web page.
				var paykey = body.indexOf("payKey");
				var voucherString = body.substr(paykey+15);
				
            io.sockets.emit('update', {voucher: voucherString, mail: to_email});
        }
    });
            //io.sockets.emit('update', to_email);
        });
        
        socket.on('pay',function(data) {
            console.log('----update socket pay----');
            console.log('pay' + data.pay);
            request.post({url: 'https://svcs.sandbox.paypal.com/AdaptivePayments/Preapproval', 
				body : 'cancelUrl=http://your_cancel_url&currencyCode=USD&endingDate=2012-09-25T08%3A00%3A00.000Z&maxAmountPerPayment='
				+ data.pay +'&maxNumberOfPayments=1&maxTotalAmountOfAllPayments=1500.00&pinType=NOT_REQUIRED&requestEnvelope.errorLanguage=en_US&returnUrl=http://restauranthelper.cloudfoundry.com#customer-notification&startingDate=2012-09-22T05:00:00.000Z&senderEmail='
				+data.toemail +'', headers : {'X-PAYPAL-SECURITY-USERID':'c4s_1_1348278764_biz_api1.yahoo.com',
				'X-PAYPAL-SECURITY-PASSWORD':'1348278787','X-PAYPAL-SECURITY-SIGNATURE':'AQGMQKp1jP2YclC19HEJHh6IgyaBAmsztD5p1KtHV9kGA4lmiFPrBBUB','X-PAYPAL-REQUEST-DATA-FORMAT':'NV',
				'X-PAYPAL-RESPONSE-DATA-FORMAT':'NV',
				'X-PAYPAL-APPLICATION-ID':'APP-80W284485P519543T'}},
			   function(error, response, body) {
			  console.log('error'+ error);
			  if (!error && response.statusCode == 200) {
				console.log(body) // Print the google web page.
				var preapprovalkey = body.indexOf("preapprovalKey");
				var preapprovalString = body.substr(preapprovalkey+15);
				
            io.sockets.emit('update1', {pre: preapprovalString, mail: data.toemail});
        }
    });
});
});
}
