const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const app = express();

// defining express path config
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')
const publicDirPath = path.join(__dirname, '../public/');

// setup handlebars and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicDirPath));

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather App",
        author: "Rizwan"
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        author: 'Rizwan'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'Welcome to help page',
        title: 'Help',
        author: 'Rizwan'
    });
})

app.get('/weather', (req, res) => {
    const address = req.query.address;

    if(!address) {
        return res.send({
            error: "Address not provided"
        })
    }

    geocode(address, (error, {lat, lon, location} = {}) => {
        if (error) {
            return res.send({ error });
        }

        forecast(lat, lon, (error, forecastedData) => {
            if (error) {
                return res.send({ error });
            }
        
            return res.send({
                address,
                location,
                forecast: forecastedData
            })
        })
    })

})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({error: "Search Not Provided"});
    }
    console.log(req.query.search);
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        error: "Help article",
        title: '404',
        author: 'Rizwan'
    });
})

app.get('*', (req, res) => {
    res.render('404', {
        error: "Page",
        title: '404',
        author: 'Rizwan'
    });
})

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});