const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req,res)=>{
    User.find()
    .then(user=>res.json(user))
    .catch(err=>res.status(400).json('Error: '+err));
});

router.route('/add').post((req,res)=>{
    const userName =req.body.userName;
    const email =req.body.email;
    const phone =req.body.phone;
    const newUser = new User({userName,email,phone});
    newUser.save()
    .then(()=>res.json('User added!')
    .catch(err=>res.status(400).json('Adding Error '+ err)))
});

router.route('/search').get((req,res)=>{

    if(req.query.userName) {
        User.find({"userName": {$regex: RegExp(req.query.userName)}})
            .then(results => {
                res.json(results)
            })
            .catch(err => {
                console.error(err);
                res.status(500).json({
                    msg: "something went wrong"
                })
            })
    }
    if(req.query.email){
        User.find({"email": {$regex: RegExp(req.query.email)}})
            .then(results => {
                res.json(results)
            })
            .catch(err => {
                console.error(err);
                res.status(500).json({
                    msg: "something went wrong"
                })
            })
    }

    if(req.query.phone){
        User.find({"phone": {$regex: RegExp(req.query.phone)}})
            .then(results => {
                res.json(results)
            })
            .catch(err => {
                console.error(err);
                res.status(500).json({
                    msg: "something went wrong"
                })
            })
    }
});

module.exports = router