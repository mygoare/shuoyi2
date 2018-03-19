const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')
const qs = require('querystring')
const path = require('path')
const ejs = require('pug')
const cookieParser = require('cookie-parser')
const i18n = require('i18n')

const config = require('./config')
const port = config.port

const static_path = path.resolve(__dirname, 'public')
const views_path = path.resolve(__dirname, 'views')

const app = express()

app.use(cookieParser())

// https://github.com/mashpie/i18n-node#list-of-all-configuration-options
i18n.configure({
    // locals 使用简易缩写, 类似 zh-CN 无效
    locales:['en', 'cn', 'tw'],
    // 优先 取 queryParameter， 再取 cookie
    queryParameter: 'lang',
    cookie: 'languageCookie',    
    directory: __dirname + '/locales',    
    preserveLegacyCase: false
});
app.use(i18n.init)

app.use(express.static(static_path))
app.set('views', views_path)

// set view engine html
app.set('view engine', 'pug')


app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


// app behind a proxy
app.set('trust proxy', 1)


// route '/' will go to index.html
app.get('/', (req, res) => {
    console.log('res: ', req.getLocale(), res.getLocale())
    res.render('index.pug', {
        year: new Date().getFullYear()
    }) // render html engine file in views folder
})





app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })


console.log(port, process.env.NODE_ENV)


app.listen(port, () => console.log('Example app listening on port '+ port +'!'))

