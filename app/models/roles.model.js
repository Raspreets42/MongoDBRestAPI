const mongoose = require('mongoose');

var schema = mongoose.Schema(
    {
        role: String,
    },
    {timestamps: true}
);

// schema.method("toJSON", function () {
//     const {__v, _id, ...object} = this.toObject();
//     object.id = _id;
//     return object;
// });
// It defines a custom method called toJSON on the schema. It removes the __v (version) and _id fields and adds an id field with the value of _id.

const Roles = mongoose.model("roles", new mongoose.Schema({
    name: String
}));
module.exports = Roles;