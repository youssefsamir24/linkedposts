const home = require('express').Router();
const postModel = require('../models/post.model')

home.get('/home',async (req,res)=>{
    if(req.session.isLoggedIn==true){
        const data = await postModel.find();
        
        res.render('home.ejs',{data,users:req.session.userName})
    }else{
        res.redirect('/')
    }
})
home.post('/addPost',async (req,res)=>{
   await postModel.insertMany({title:req.body.title,post:req.body.post,username:req.session.userName,userId:req.session.userID})
   res.redirect('/home')


})




module.exports = home