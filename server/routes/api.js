const express = require('express');
const router = express.Router();
  
const weatherController= require('../controllers/weather.js')

router.get('/:uid/:city',weatherController.getWeather)
router.get('/:uid',weatherController.getWeatherHistory)

module.exports = router;