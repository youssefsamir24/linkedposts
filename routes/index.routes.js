const main = require('express').Router();
const userModel = require('../models/user.model')
const bcrypt = require('bcrypt');
const {check,validationResult} = require('express-validator')
main.get('/', (req, res) =>{
    res.render('index.ejs')

})

main.post('/loginHndel', async(req,res)=>{
    const {email , password} = req.body
    const user = await userModel.findOne({email});
    if(user==null){
        res.redirect('/')
    }else{
        const match = await bcrypt.compare(password, user.password);
 
    if(match) {
        req.session.userID = user._id
        req.session.userName = user.userName
        req.session.isLoggedIn = true;
        res.redirect('/home')

    }else{
        res.redirect('/')

    }

    }
    
    
})



module.exports=main