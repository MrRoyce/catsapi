'use strict';

const http = require('http');
//const util = require('util');
const parseString = require('xml2js').parseString;

const catapi = 'http://thecatapi.com/api/';
const catapikey = 'MTU5ODM4';

module.exports.setFavorite = (event, context, callback) => {

  const
    url = `${catapi}images/favourite?api_key=${catapikey}&sub_id=1234&image_id=${event.image_id}`
  ;
  console.log('start request to ' + url);

  http.get(url, (response) => {

    // Continuously update stream with data
    let body = '';

    response.on('data', (d) => {
        body += d;
    });

    response.on('end', () => {

      parseString(body, (err) => {
         if (err) {
             callback(null, err);
         }

         //console.log("result: " + util.inspect(result, false, null));

          callback(null, {
            statusCode: 200,
            headers: {
              "Access-Control-Allow-Origin" : "*"
            },
            body: 'Favorite accepted'
          });
      });

    });

  }).on('error', (e) => {
    console.log("setFavorite - Got error: " + e.message);
    callback(null, 'FAILURE');
  });

};

module.exports.getFavorites = (event, context, callback) => {

  const
    url = `${catapi}images/getfavourites?api_key=${catapikey}&sub_id=1234`
  ;
  //console.log('start request to ' + url);

  http.get(url, (response) => {

    // Continuously update stream with data
    let body = '';

    response.on('data', (d) => {
        body += d;
    });

    response.on('end', () => {

      //console.log("response: " + util.inspect(response, false, null));

      parseString(body, (err, result) => {
         if (err) {
             callback(null, err);
         }

         //console.log("result: " + util.inspect(result, false, null));

          callback(null, {
            statusCode: 200,
            headers: {
              "Access-Control-Allow-Origin" : "*"
            },
            body: JSON.stringify(result.response.data[0].images[0].image)
          });
      });

    });

  }).on('error', (e) => {
    console.log("getFavorites - Got error: " + e.message);
    callback(null, 'FAILURE');
  });

};

module.exports.voteCat = (event, context, callback) => {

  const
    url = `${catapi}images/vote?api_key=${catapikey}&sub_id=1234&image_id=${event.image_id}&score=${event.score}`
  ;
  //console.log('start request to ' + url);

  http.get(url, (response) => {

    // Continuously update stream with data
    let body = '';

    response.on('data', (d) => {
        body += d;
    });

    response.on('end', () => {

      parseString(body, (err) => {
         if (err) {
             callback(null, err);
         }

         //console.log("result: " + util.inspect(result, false, null));

          callback(null, {
            statusCode: 200,
            headers: {
              "Access-Control-Allow-Origin" : "*"
            },
            body: 'Vote accepted'
          });
      });

    });

  }).on('error', (e) => {
    console.log("voteCat - Got error: " + e.message);
    callback(null, 'FAILURE');
  });

};

module.exports.getACat = (event, context, callback) => {

  const
    url = `${catapi}images/get?api_key=${catapikey}&sub_id=1234&format=xml&results_per_page=1&size=small`
  ;
  //console.log('start request to ' + url);

  http.get(url, (response) => {

    // Continuously update stream with data
    let body = '';

    response.on('data', (d) => {
        body += d;
    });

    response.on('end', () => {

    //  console.log("body: " + body);
    //  console.log("response: " + util.inspect(response, false, null));

      parseString(body, (err, result) => {
         if (err) {
             callback(null, err);
         }

         //console.log("result: " + util.inspect(result, false, null));

          callback(null, {
            statusCode: 200,
            headers: {
              "Access-Control-Allow-Origin" : "*"
            },
            body: JSON.stringify(result.response.data[0].images[0].image)
          });
      });

    });

  }).on('error', (e) => {
    console.log("getACat - Got error: " + e.message);
    callback(null, 'FAILURE');
  });

};

module.exports.getCategories = (event, context, callback) => {

  const
    url = `${catapi}categories/list?api_key=${catapikey}&sub_id=1234`
  ;

  http.get(url, (response) => {

    // Continuously update stream with data
    let body = '';

    response.on('data', (d) => {
        body += d;
    });

    response.on('end', () => {

      //console.log("response: " + util.inspect(response, false, null));
      parseString(body, (err, result) => {
         if (err) {
             callback(null, err);
         }

          callback(null, {
            statusCode: 200,
            headers: {
              "Access-Control-Allow-Origin" : "*"
            },
            body: JSON.stringify(result.response.data[0].categories[0].category)
          });
      });
    });

  }).on('error', (e) => {
    console.log("getCategories - Got error: " + e.message);
    callback(null, 'FAILURE');
  });

};
