What should I do today service

*Installation*
- Install nvm for your host OS (https://gist.github.com/d2s/372b5943bce17b964a79)
- Obtain API KEYS for the following
* Openweathermap.org - (https://openweathermap.org/price)
* GoogleMapsAPI - (https://developers.google.com/maps/documentation/javascript/get-api-key)
- Update your ~/.bashrc with the following exports

export GOOGLEMAPSAPIKEY={mapskey}
export OPENWEATHERMAPAPIKEY={weatherkey}

- install node version 6.9.5 using nvm install v6.9.5
- run nvm use
- run npm install
- run npm start - to run the service on localhost:3000

*Usage*
- query the service as follows curl localhost:3000/location?address=London,England for example



