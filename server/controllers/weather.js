const Weather = require('../models/Weather.js');
const request = require('request');
const path = require("path");

getWeather = async (req, res) => {
    let currentWeather = await getCurrentWeather(req, res);
    currentWeather = JSON.parse(currentWeather)
    console.log("currentWeather " + currentWeather);
    let weather = new Weather();
    weather.uid = req.params.uid;
    console.log(req.params.uid)
    weather.city = req.params.city;
    weather.temp = currentWeather.main.temp;
    weather.description = currentWeather.weather[0].description;
    weather.icon = currentWeather.weather[0].icon;
    weather.country = currentWeather.sys.country;
    weather.save().then(
        res.status(200).send(weather)).catch((error) => res.send(error))
}

getWeatherHistory = async (req, res) => {
    console.log("getWeatherHistory");
    const weatherHistory = await Weather.find({ "uid": req.params.uid });
    console.log(JSON.stringify(weatherHistory))
    res.send(weatherHistory);
}

getCurrentWeather = (req, res) => {
    return new Promise((resolve, reject) => {
        const url = "http://api.openweathermap.org//data/2.5/weather?q=" + req.params.city + "&appid=2129ca9887c428c6585720bf19eac627&units=metric"
        request(url, function (error, response, body) {
            // console.error('error:', error); // Print the error if one occurred
            // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            // console.log('body:', body);
            if (error)
                reject(error);
            else
                resolve(body);
        });

    })
}

module.exports = {
    getWeather,
    getWeatherHistory
}