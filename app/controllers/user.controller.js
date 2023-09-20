const userControllers = {};
const db = require("../models/models");
const User = db.users;
const Role = db.roles;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

userControllers.signup = async (req, res) => {
    const {username, email, password, confirmPassword, roles} = req.body;

    if (!username || !email || !password || !confirmPassword) {
        res.status(400).send({message: "Failed! All fields are required !", status: 400});
        return;
    }
    const findUser = await User.findOne({email: email});
    try {
        if (findUser) {
            res.status(400).send({message: 'Failed! Email already exist...', status: 400});
            return;
        } else {
            if (password !== confirmPassword) {
                res.status(400).send({message: `Failed! Password and confirm password doesn't match...`, status: 400});
                return;
            } else {
                const salt = await bcrypt.genSalt(10);
                const hashedPass = await bcrypt.hash(password, salt);

                // Create a user
                const user = new User({
                    username: username,
                    email: email,
                    password: hashedPass,
                });
                try {
                    let findRole = [];
                    findRole = await Role.find({name: {$in: roles}});
                    if (roles && (findRole.length === roles.length)){
                        user.roles = roles;
                        user.active = false;
                        await user.save(user);
                        const savedUser = await User.findOne({email: email});
                        try {
                            const token = jwt.sign(
                                {userId : savedUser._id},
                                process.env.SECRET_KEY,
                                {expiresIn: '1d'}
                            );
                            res.status(200).send({details: savedUser, token: token, message: 'User inserted successfully', stats: 200});
                            return;
                        }catch (e) {
                            res.status(500).send({
                                message: e.message || "Some error occurred while creating the User.",
                                status: 500
                            });
                            return;
                        }
                    }else{
                        res.status(404).send({message: 'Failed! Role not found.', status: 404});
                        return;
                    }
                } catch (e) {
                    res.status(500).send({
                        message: e.message || "Some error occurred while creating the User.",
                        status: 500
                    });
                    return;
                }
            }
        }
    } catch (err) {
        res.status(500).send({message: err, status: 500});
        return;
    }
}

userControllers.activateUser = async (req, res) => {
    const {email, activeStatus} = req.body;
    const findUser = await User.findOne({email: email});
    if (!findUser) {
        res.status(404).send({message: 'Failed! User not found...', status: 404});
        return;
    } else {
        findUser.active = activeStatus;
        await findUser.save();
        res.status(200).send({message: `User's active status changed successfully...`, status: 200});
        return;
    }
}

userControllers.login = async (req, res) => {
    const {email, password} = req.body;

    if (!email || !password) {
        res.status(400).send({message: "Failed! All fields are required !", status: 400});
        return;
    }

    const findUser = await User.findOne({email: email});
    try {
        if (!findUser) {
            res.status(404).send({message: "Failed! You are not a Registered user !", status: 404});
            return;
        } else {
            const isMatch = await bcrypt.compare(password, findUser.password);
            try {
                if (findUser.email === email && isMatch) {
                    if (findUser.active){
                        const token = jwt.sign(
                            {userId : findUser._id},
                            process.env.SECRET_KEY,
                            {expiresIn: '1d'}
                        );
                        res.status(200).send({token: token, message: "Success! Logged-In successfully !", status: 200});
                        return;
                    }else {
                        res.status(401).send({message: "Failed! Your account is not active, please activate you account !", status: 401});
                        return;
                    }
                } else {
                    res.status(401).send({message: "Failed! Email or Password doesn't matched, please try again !", status: 401});
                    return;
                }
            }catch (e) {
                res.status(500).send({message: "Failed! Some error occurred !", status: 500});
                return;
            }
        }
    } catch (e) {
        res.status(500).send({message: "Failed! Some error occurred !", status: 500});
        return;
    }
}

module.exports = userControllers;