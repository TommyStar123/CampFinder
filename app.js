const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Campground = require('./models/campground');

const methodOverride = require('method-override')

mongoose.connect('mongodb://localhost:27017/YelpCamp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log('Database connected')
})


const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.get('/', (req, res) => {
    res.render("home");
})

app.get('/makecampground', async (req, res) => {
    const camp = new Campground({ title: "My Backyard", description: 'cheap' });
    await camp.save();
    res.send(camp);
})

app.listen(3000, () => {
    console.log("listening");
})

