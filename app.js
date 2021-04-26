//weather api key : bf779ed7679ca2810d5944e197b9f8fd
const express = require('express');
const path = require('path');
const https = require('https');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});
app.post('/', (req, res) => {
    const query = req.body.cityName;
    const apiKey = "bf779ed7679ca2810d5944e197b9f8fd";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=metric";
    https.get(url, (response => {
        response.on('data', (d) => {
            const myData = JSON.parse(d);
            const weather = myData.weather[0].description;
            //const icon = myData.weather[0].icon;
            //const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            const temp = myData.main.temp;
            res.write("<h1>" + query + "</h1>");
            res.write("<h4> Weather: " + weather + "</h4>");
            //res.write("<img src = " + imageURL + ">");
            res.write("<h4> Temperature: " + temp + "</h4>");
            res.send();
        });
    }));
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started at port ${PORT} ... `);
});