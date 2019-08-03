const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address +'.json?proximity=-74.70850,40.78375&access_token=pk.eyJ1IjoiYXNod2luMTk5MyIsImEiOiJjanlndjk4MzcwNTloM25sNHlhN2Q1eTY0In0.XgsaFVx7QrFHcVDTi1CSbg&limit=1'
   
    request({url , json: true}, (error, {body}) => {                              //shorthand url --> already defined ,destructure response to body
        if(error)
            callback('Unable to locate service', undefined)
        else if(body.features.length === 0)
            callback('Empty array', undefined)
        else
            callback(undefined, {
                lat: body.features[0].center[0],                                     //destructured response to body, so no response required to navigate
                long: body.features[0].center[1],
                location: body.features[0].place_name
            })
    })

}

module.exports = geocode
