var express = require('express')
var bcrypt = require('bcryptjs')
var router = express.Router()
var UserModel = require('../models/UserModel');

var salt = 8; //random value

router.get('/register', (req, res) => {
    res.render('auth/register')
})

router.post('/register', async (req, res) => {
    try {
        var username = req.body.username;
        var password = req.body.password;
        var hash = bcrypt.hashSync(password, salt);
        var role = "user";

        await UserModel.create({
            username: username,
            password: hash,
            role: role
        });
        console.log("Add successfully");
    } catch (error) {
        console.log("Add failed");
    }
});

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.post('/login', async (req, res) => {
    var login = req.body;
    var user = await UserModel.findOne({username: login.username});
    if (user) {
        var hash = bcrypt.compareSync(login.password, user.password);
        if (hash) {
            //initialize session after login success
            req.session.username = user.username;
            // res.send("<h1>Login successfully </h1>");
            res.redirect("/");
        } else {
            res.send("<h1>Login failed </h1>");
        }
    }
});

module.exports = router