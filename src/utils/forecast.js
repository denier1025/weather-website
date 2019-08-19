const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/cf4f9780f86ea6f7ed82332a2ebbe682/${latitude},${longitude}?units=si`;

  request({ url, json: true }, (err, { body }) => {
    if (err) {
      callback({ code: 500, msg: "Unable to connect to weather service!" });
    } else if (body.error) {
      callback({ code: 400, msg: "Unable to find location." });
    } else {
      callback(null, {
        summary: body.daily.data[0].summary,
        temperatureHigh: body.daily.data[0].temperatureHigh,
        temperatureLow: body.daily.data[0].temperatureLow,
        temperature: body.currently.temperature,
        precipProbability: body.currently.precipProbability
      });
    }
  });
};

module.exports = forecast;
