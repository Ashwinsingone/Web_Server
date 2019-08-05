const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('../public/utils/forecast')
const forecast = require('../public/utils/geocode')
const viewPath = path.join(__dirname,'./templates/views')                                     //use as instead of view we have added file in the template folder. Need to add path for templates fodler to run
const partialsPath = path.join(__dirname,'./templates/partials')

const app = express()

const port = process.env.PORT || 3000
console.log('PORT------------> '+port)

                                                                        //parameter should be exact(case sensitive or spaces etc) or it will not execute
const DirPath = path.join(__dirname, '../public')                       //joined the index.html existing folder         // now can call directly after root 'localhost: 300/index.html' and it will run
const name ='Ashwin'
const age = 25

app.use(express.static(DirPath))


//to get response when the url is hitted, text in the string('') (eg: aap.com or app.com/home)

// app.get('' , (req , res) => {                                                                            //adding indexPath will no longer let this fucntion work.
//     res.send('<h1>user</h1>  <h2>user/all</h2>  <h3>about</h3>  <h4>weather</h4>  ')
// })

app.set('view engine', 'hbs')                               //having a static page(eg: index.html) wont let this revoke and would show output for index.html and not index.hbs


app.set('views' , viewPath)
hbs.registerPartials(partialsPath)

app.get('', (req, res) =>{
    res.render('index', {
        title: 'Weather App',
        name                            //shorthand
    })
})  

app.get('/about',(req , res) => {
    res.render('about', {
        image: "./img/bgImage.jpg",
        title: 'About',
        name
    })
})

app.get('/help',(req,res) => {
    res.render('help', {
        title: 'Help',
        name

    })
})

app.get('/pinpoint', (req, res) => {
    if(!req.query.address)
    {
        return res.send({                                           //else condition not used bcoz the code will breeak as it will execute the return statementso the below code will not be executed
            error:'You must enter Address'
        })
    }                                   
                                                
    geocode(req.query.address, (error , response) => {
        if(error)
        {
            return res.send({
                error: error,
            })
        }
        
        forecast(response.lat, response.long, (error , {temperature,precip}) => {                  //destructured the response into temperature and precip
            if(error)
            {
                return res.send({
                    error:error
                })
            }
            const forecast_string = 'It is currently ' + temperature +' degrees out.There is a '+precip +'% chance of rain.'

            res.send({
                geocode : response,
                forecast: forecast_string
            })
             
        })
    })
})

app.get('/user' , (req , res) => {
    if(!req.query.firstName || !req.query.lastName){
       return res.send({                                                           
            error: 'You must provide First Name and Last Name'
        })
    }

    console.log(req.query)
    res.send({
           firstName: req.query.firstName,
           lastName: req.query.lastName
       })

})


app.get('*' , (req,res) => {
    res.render('pageNotFound', {
        title:'Error',
        name
    })
})


// TO start the server
app.listen(port, ()=> {
    console.log('Started at '+ port)
})