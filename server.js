// Depends (for men)
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const scpRoutes = require('./controllers/SCP')
const cors = require('cors')


const app = express()

app.use(express.json())

// BADNESS
app.use(cors())

// midwives


// routes
app.use('/', scpRoutes)


// Database connection, I have it connected to my Mongo account for now.
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('DB connected'))
    .catch(err => console.error(err));

// my port is set to 3000 in my .env for now
const PORT = process.env.PORT || 8080

app.listen(PORT, console.log(`listening on port ${PORT}`))