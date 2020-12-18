const profile = require('express').Router();
const postModel = require('../models/post.model')
profile.get('/profile', async(req,res)=>{
    if(req.session.isLoggedIn==true){

        const data = await postModel.find({username:req.session.userName});
        res.render('profile.ejs',{data,users:req.session.userName})
    }else{
        res.redirect('/')
    }
})




module.exports = profile