const express = require('express');
const path = require('path');
const https = require('https');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    res.render("index");
});

app.post('/', (req, res) => {
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const query = capitalizeFirstLetter(req.body.cityName);
    const apiKey = "bf779ed7679ca2810d5944e197b9f8fd";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=metric";

    https.get(url, (response => {
        response.on('data', (d) => {
            const myData = JSON.parse(d);
            console.log(myData)
            if(myData.cod !== '404'){
                const weather = capitalizeFirstLetter(myData.weather[0].description);
                const icon = myData.weather[0].icon;
                const iconURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
                const weatherBg = myData.weather[0].main;
                const temp = myData.main.temp;
                res.render('weather', {city : query, weather, iconURL, temp, weatherBg})
                res.send();
            }
           else{
            res.send("OOPS! Coudn't find city");
           }
            
            
        });
    }));
    
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started at port ${PORT} ... `);
});


//Pixabay: 23132093-c98b648e7f0cdc73b86fda663