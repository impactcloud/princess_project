'use strict';
const Promise = require('bluebird');
const asyncFunc = Promise.coroutine;
const config = require('config');
const BoxOptions = config.get('BoxOptions');
let Box = require('../../box-service/boxClientService');
var email = "ccheng@box.com";

/**
 * Render home page
**/
module.exports.main = (req, res, next) => {
  var hellosign = require('hellosign-sdk')({key: '44780f1c79d0bb275329f9b1c8e6293650220f93fb458ddbfba2f168bbae242c'});
  var response_url;

  var options = {
      test_mode : 1,
      clientId : '0ae85c64ae9da214af7c86d0e6162d98',
      subject : 'My First embedded signature request',
      message : 'Awesome, right?',
      signers : [
          {
              email_address : 'carycheng77@gmail.com',
              name : 'Cary Cheng'
          }
      ],
      file_url : ['https://app.box.com/s/thlku6i5xve5pkuv5l2hednurxs3po36']
  };


  hellosign.signatureRequest.createEmbedded(options)
      .then(function(response){
          var signatureId = response.signature_request.signatures[0].signature_id;
          response_url = hellosign.embedded.getSignUrl(signatureId);
          return hellosign.embedded.getSignUrl(signatureId);
      })
      .then(function(response){
          console.log('URL = ' + response.embedded.sign_url);
          response_url = response.embedded.sign_url;
      })
      .catch(function(err){
          //catch error'
          console.log('Err: ' + err);
      });

	res.render('pages/home', {
    sign_url: response_url
  });
}
