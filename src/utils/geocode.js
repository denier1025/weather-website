const request = require("request");

const geocode = (search_place, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(search_place)}.json?access_token=pk.eyJ1IjoiZGVuaWVyMTAyNSIsImEiOiJjano4YW56dzAwMHE2M2tsbDUxMGp4cmVwIn0.6koM3zgpUEYCLm-bSqBR5A&limit=1`;

  request({ url, json: true }, (err, { body }) => {
    if (err) {
      callback(
        { code: 500, msg: "Unable to connect to location services!" }
      );
    } else if (!body.features.length) {
      callback(
        { code: 400, msg: "Unable to find location. Try another search." }
      );
    } else {
      callback(null, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name
      });
    }
  });
};

module.exports = geocode;
