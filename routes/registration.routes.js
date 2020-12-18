const register = require('express').Router();
const bcrypt = require('bcrypt');
const userModel = require('../models/user.model')
const {check,validationResult} = require('express-validator')
register.get('/registration',(req,res)=>{
    
    let oldInputs = req.flash('oldInputs')[0];
    if(oldInputs==undefined){
        oldInputs = { fname: '', lname: '', username: '', email: '', password: '' }
    }
    res.render('registration.ejs',{errors:req.flash('errors'),oldInputs});
})
register.post('/registerHndel',
check('fname').matches(/[A-Z][a-z]*/),
check('lname').matches(/[A-Z][a-z]*/),
check('username').matches(/[A-Z][a-z]*/),
check('email').isEmail(),
//check('email').exists(),
check('password').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/),
async(req,res)=>{
    const errors = validationResult(req)
    if(errors.isEmpty()==true)
    {
        bcrypt.hash(req.body.password, 4, async function(err, hash) {
            await userModel.insertMany({firstName:req.body.fname ,lastNmae:req.body.lname,userName:req.body.username,email:req.body.email,password:hash })
            res.redirect('/registration');
        });
    }else{
        
        req.flash('errors',errors.array())
        
        req.flash('oldInputs',req.body)
        res.redirect('/registration');
    }
    
})


module.exports = register