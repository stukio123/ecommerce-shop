//Define app
let express = require('express')
let app = express()

//Set public static folder
app.use(express.static(__dirname+ '/public'))

//Set View Engine 
let expressHbs = require('express-handlebars')
let hbs = expressHbs.create({
    extname: 'hbs',
    defaultLayout: 'layout',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials'
})
app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')

//Define route
app.get('/',(req,res) => {
    res.render('index')
})

app.get('/:page',(req,res) => {
    let page = req.params.page
    res.render(page)
})


//Set Server port & Start port 
app.set('port', process.env.PORT || 5000 )
app.listen(app.get('port'), () => {
     console.log(`Server is running on Port: ${app.get('port')}`)
 })