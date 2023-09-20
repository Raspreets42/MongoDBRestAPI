//  "type": "module",  ->  import express from 'express' instead of const express = require('express');
// in package.json file

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const dbURL = process.env.DATABASE_URL
const router = require('./app/routes/route');
const db = require('./app/models/models');
const connectDb = require('./app/config/db.config')
const Role = db.roles;

const app = express();

app.use(cors({
    origin: '*'
}));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api', router);

connectDb(dbURL);

app.get('/', (req,res) => {
    res.json({name:'Raspreet',age:23});
});

app.listen(process.env.PORT, () => {
    console.log(`Server is listening at port ${process.env.PORT}`);
});

defaultRoles = () => {
    Role.countDocuments().then( (count) => {
        if (count === 0) {
            new Role({
                name: "user"
            }).save().then( () => {
                console.log("added 'user' to roles collection");
            });

            new Role({
                name: "superadmin"
            }).save().then( () => {
                console.log("added 'superadmin' to roles collection");
            });

            new Role({
                name: "admin"
            }).save().then( () => {
                console.log("added 'admin' to roles collection");
            });
        }
    }).catch( (err) => {
        console.log(err)
    });
}

defaultRoles();