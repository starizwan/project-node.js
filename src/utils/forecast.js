const request = require('postman-request')

const forecast = (lat, lon, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=fc89b32ec705db93c74d791111b44b58&query=' + lat + ',' + lon
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback("Unable to connect to weather service", undefined)
        } else if (body.error) {
            callback("Unable to find location. Try again", undefined)
        } else {
            const ref = body.current
            const out = `It is ${ref.weather_descriptions[0]}. It is currently ${ref.temperature} as observed on ${ref.observation_time}. 
            It feels like ${ref.feelslike} and the humidity is ${ref.humidity}.`
            callback(undefined, out)
        }
    })

}

module.exports = forecast