
const express = require('express')
const morgan = require('morgan')
const app = express()
const siteRouter = require('./routes/siteRoutes')
const siteScraper = require('./routes/siteScraperRoute')
const cors = require('cors')

app.use(cors())

app.options('*',cors())
// 1) Middlewares
app.use(express.json())
app.use(morgan('dev'))


app.use((req,res,next)=>{ 
    console.log(`hello from middleware 😊`);
    //next() function in middlewares
    next()
})

app.use((req,res,next)=>{ // adding current time to the request
    req.requestTime = new Date().toISOString()
    next()
})


app.use('/api/v1/sites',siteRouter)
app.use('/api/v1/scraper',siteScraper)


module.exports = app

