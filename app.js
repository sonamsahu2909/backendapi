const express = require('express')
const app = express()
const port = 4000
const web = require('./routes/web')
const dotenv = require('dotenv') 
const connectdb = require('./db/dbcon')

const fileUpload = require("express-fileupload");
app.use(express.json())
app.use(fileUpload({useTempFiles: true}));

//cookies 
const cookieParser = require('cookie-parser')
app.use(cookieParser())

dotenv.config({path:".env"})
connectdb()


// route load
app.use('/api',web) // localhost:4000/api

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})