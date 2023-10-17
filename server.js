const mongoose = require('mongoose')
const dotenv = require('dotenv')
const app = require('./app')

dotenv.config({path:'./config.env'})
const port = 3000

const DB = process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD)

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(connection => {
    console.log('DB connection successful!');
})


app.listen(port, ()=>{
    console.log(`App running on port ${port}`);
})