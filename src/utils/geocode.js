const request = require('postman-request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoic3Rhcml6d2FuIiwiYSI6ImNrODM0dnhxOTB2djEzdG1zeDh5bGtlbW4ifQ.0YMaDMb6fqWoDRdq5g2mWw&limit=1`
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services', undefined)
        } else if (body.features.length == 0) {
            callback('Unable to find location. Try another serach', undefined)
        }
        else {
            data = {
                location: body.features[0].place_name,
                lon: body.features[0].center[0],
                lat: body.features[0].center[1]
            }

            callback(undefined, data)
        }
    })
}

module.exports = geocode