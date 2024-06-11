const express = require('express')
const multer = require('multer')
const fs = require('fs')
const db = require('./config/database')
const userDB = require('./models/userSchema')
const router = require('./routers/router')
const port = 8081
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use('/uploads', express.static('uploads/'));
app.use(router)

app.set('view engine', 'ejs')

app.listen(port, (err) => {
    db()
    if (err) {
        console.log("Server Not Started");
        return false
    }
    console.log("Server Started At....http://localhost:" + port);
})