const accSetting = require('express').Router();
const bcrypt = require('bcrypt');
const userModel = require('../models/user.model')
const {check,validationResult} = require('express-validator')
accSetting.get('/account_setting',(req,res)=>{
    let oldInputs = req.flash('oldInputs')[0];
    if(oldInputs==undefined){
        oldInputs = { oldPass: '', newPass: '', repeatPass: '' }
    }
    res.render('acount_setting.ejs',{errors:req.flash('errors'),oldInputs});
    //res.render('acount_setting.ejs')
})
accSetting.post('/seetingHndel',
check('newPass').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/),
check('repeatPass').custom((value, { req }) => {
    if (value !== req.body.newPass) {
      return false;
    }
    return true;
  }),
async(req,res)=>{
    const errors = validationResult(req)
    const user = await userModel.findOne({_id:req.session.userID});
    const match = await bcrypt.compare(req.body.oldPass, user.password);
 
    if(match) {
        if(errors.isEmpty()==true){
            bcrypt.hash(req.body.newPass, 4, async function(err, hash) {
                await userModel.updateMany({_id:req.session.userID},{$set:{password:hash}})
                res.redirect('/account_setting');
            });

        }else{
            console.log('error!');
        }
       
        

    }else{
        req.flash('errors',errors.array())
        
        req.flash('oldInputs',req.body)
        res.redirect('/account_setting')

    }


}) 



module.exports = accSetting;