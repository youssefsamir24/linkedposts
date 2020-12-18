const express = require('express')
const mongoose = require('mongoose')
var session = require('express-session')
var MongoDBStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash')
const path = require('path')
const app = express()
const multer = require('multer');
const port = 3000
var store = new MongoDBStore({
    uri: 'mongodb+srv://admin:admin@cluster0.ulfp9.mongodb.net/postLinkDB',
    collection: 'mySessions'
  })
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store
  }))
  
mongoose.connect('mongodb+srv://admin:admin@cluster0.ulfp9.mongodb.net/postLinkDB', { useNewUrlParser: true, useUnifiedTopology: true });
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs');

// function fileFilter(req,file,cb){
//         if(file.mimetype=='image/png'||file.mimetype=='image/jpg'||file.mimetype=='image/jpeg'){
//             cb(null,true)
//         }else{
//             cb(null,false)
    
//         }
//     }
    
// let storage = multer.diskStorage({
//     destination: function (req, file, cb) {
        
//         cb(null, 'public/img')
//       },
//     filename: function (req, file, cb) {
//         cb(null, file.originalname + '-' + Date.now())
//       }
// })
// app.use(multer({dest:"public/img",storage}).single("img"))
app.use(flash())
app.get('/logout',(req,res)=>{
  req.session.destroy(()=>{
    res.redirect('/')
  }
  )
})
const indexRoute = require('./routes/index.routes')
const registerRoute = require('./routes/registration.routes')
const homeRoute = require('./routes/home.routes')
const profileRoute = require('./routes/profile.routes')
const accountSettingRoute = require('./routes/account_setting.routes')
app.use(indexRoute)
app.use(registerRoute)
app.use(homeRoute)
app.use(profileRoute)
app.use(accountSettingRoute)
app.set('views',(__dirname, 'views'));

app.listen(process.env.PORT ||port, () => console.log('Server is running .. !'))