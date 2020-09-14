//Define app
const express = require('express')
const env = require('dotenv').config()
const bodyParse = require('body-parser')
const mongoose = require('mongoose')
const userRoute = require('./Routes/auth')
const adminRoute = require('./Routes/admin/auth')

const app = express()

//Set public static folder
app.use(express.static(__dirname+ '/public'))
app.use(bodyParse())

//Set View Engine 
const expressHbs = require('express-handlebars')
const hbs = expressHbs.create({
    extname: 'hbs',
    defaultLayout: 'layout',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials'
})
app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')

mongoose.connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@ecommerce-sneaker.d4kai.gcp.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`
    ,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }
).then(() => {
        console.log('Database Connected')
}).catch((error) => { console.log('Connected Failed !\n'+error)})



//Define route
app.get('/',(req,res,next) => {
    res.render('index')
})

app.use('/api',userRoute)
app.use('/api',adminRoute)


app.get('/:page',(req,res,next) => {
    let page = req.params.page
    res.render(page)
})


//Set Server port & Start port 
app.set('port', process.env.PORT || 5000 )
app.listen(app.get('port'), () => {
     console.log(`Server is running on Port: ${app.get('port')}`)
 })