const request = require('request')


const forecast = (lat, long, callback) =>{
    const url = 'https://api.darksky.net/forecast/38c7703c37fbc3ae2b3eee811786853f/'+ long +','+ lat +'?lang=es&units=si'

    request({url , json: true}, (error, {body}) => {                                          //shorthand on url --> it is already defined, destructure response to body
        if(error)
            callback('Unable to locate service',undefined , undefined)
        else if(body.error)
            callback('Error Found', undefined)
        else
            callback(undefined, {
                temperature: body.currently.temperature,                                            //destructured response to body, so no response required to navigate
                precip: body.currently.precipProbability
            })
    })
}

module.exports = forecast