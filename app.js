
const express = require('express')
const morgan = require('morgan')
const app = express()
const siteRouter = require('./routes/siteRoutes')

// 1) Middlewares
app.use(express.json())
app.use(morgan('dev'))

app.use((req,res,next)=>{ //order of middleware matters, if we call this after route definition, it won't work on that route. because route sends res.send() which ends the cycle of middleware
    console.log(`hello from middleware 😊`);
    //important to call next() function in middlewares
    next()
})

app.use((req,res,next)=>{ // adding current time to the request
    req.requestTime = new Date().toISOString()
    next()
})


app.use('/api/v1/sites',siteRouter)


module.exports = app

