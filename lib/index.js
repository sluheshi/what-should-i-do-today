'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const app = express();

//custom modules
const geolocation = require('./requesthandlers/getgeocodedlocation.js');

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/location', function(req, res) {

    console.log(req.query);

    // Validate address and values
    if (!_.has( req.query, 'address')) {
      console.log('No address supplied');
      res.status(400).send({ message: 'No address supplied try sending an address in the form address=London,England' });
    }else{
        geolocation.getGeoCodedLocation(req.query.address, function(err, response){
            if (err){
                res.status(500).send(response.message);
            }else {
              res.status(200).send({location: 'geocodedlocation', results: response.results[0]});
            }
        });
    }

  });

app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
  });

