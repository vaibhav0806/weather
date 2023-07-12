const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.post('/getWeather', async (req, res, next) => {
    const cities = req.body.cities;

    const weather = []

    for (let i = 0; i < cities.length; i++) {
        const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=d43d4cf22d1245f28d4161404231207&q=${cities[i]}&aqi=no`);
        const data = await response.json();
        weather.push({ [cities[i]]: `${data.current.temp_c}C` });
    }
    
    res.json({"weather": weather});
});

app.listen(3000, () => {
    console.log("Server is running at PORT 3000");
});