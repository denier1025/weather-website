const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

app.use(express.static(path.join(__dirname, "..", "public")));

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "..", "templates", "views"));
hbs.registerPartials(path.join(__dirname, "..", "templates", "partials"));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Alex Denie"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Alex Denie"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "This is some helpful text.",
    title: "Help",
    name: "Alex Denie"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.search_place) {
    res
      .status(400)
      .json({ err: { code: 400, msg: "You must provide an address" } });
  } else {
    geocode(
      req.query.search_place,
      (err, { latitude, longitude, location } = {}) => {
        if (err) {
          res.status(err.code).json({ err });
        } else {
          forecast(latitude, longitude, (err, forecastData) => {
            if (err) {
              res.status(err.code).json({ err });
            } else {
              res.json({
                forecast: forecastData,
                location,
                search_place: req.query.search_place
              });
            }
          });
        }
      }
    );
  }
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    res.status(400).json({ err: 400, msg: "You must provide a search term" });
  } else {
    res.json({
      products: []
    });
  }
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Alex Denie",
    errMsg: "Help article not Found."
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Alex Denie",
    errMsg: "Page not Found."
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is up on port ${PORT}.`);
});
