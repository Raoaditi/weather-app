const express = require('express');
const path = require('path');
const https = require('https');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
<<<<<<< HEAD
app.use(express.static('public'));
=======
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
>>>>>>> 3ebca078fb39a5d207f470a817591dfd43ab093a

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/', (req, res) => {
    const query = req.body.cityName;
    const apiKey = "bf779ed7679ca2810d5944e197b9f8fd";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=metric";
    https.get(url, (response => {
        response.on('data', (d) => {
            const myData = JSON.parse(d);
            const weather = myData.weather[0].description;
            const icon = myData.weather[0].icon;
            const iconURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            const temp = myData.main.temp;
            res.render('weather', {city : query, weather, iconURL, temp})
            res.send();
        });
    }));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started at port ${PORT} ... `);
});