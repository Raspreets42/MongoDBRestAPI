const db = require('../models/models');
const User = db.users;

const checkDuplicateEmail = (req,res,next) => {
    User.findOne({email: req.body.email}).exec((err,user) => {
        if(err){
            res.status(500).send({message: err,status: 500});
            return;
        }
        if(user){
            res.status(400).send({message: 'Failed! Email already exist...',status: 400});
            return;
        }else{
        }
    })
    next();
}

const verifySignUp = {
    checkDuplicateEmail
}

module.exports = verifySignUp;