const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const signUpFunction = (req, res) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    });
    user.save().then((data) => {
        res.status(201).send({details: data, message: 'User inserted successfully', status: 201});
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Tutorial.",
            status: 500
        });
    });
}

const signInFunction = (req, res) => {
    User.findOne({
        username: req.body.username
    }).exec((err, user) => {
        if (err) {
            res.status(500).send({message: err, status: 500});
            return;
        }

        if (!user) {
            return res.status(404).send({message: "User Not found.", status: 404});
        }

        var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );

        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password!",
                status: 401
            });
        }
    });
}

const authController = {
    signUpFunction,
    signInFunction
}

module.exports = authController;