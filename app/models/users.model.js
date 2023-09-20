module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            username: {type: String, required: true, trim: true},
            email: {type: String, unique: true, required: true, trim: true},
            password: {type: String, required: true, trim: true},
            roles: {type: [String], required: true},
            active: {type: Boolean, required: true, trim: true}
        },
        {timestamps: true}
    );

    schema.method("toJSON", function () {
        const {__v, _id, ...object} = this.toObject();
        object.id = _id;
        return object;
    });
    // It defines a custom method called toJSON on the schema. It removes the __v (version) and _id fields and adds an id field with the value of _id.

    const Users = mongoose.model("users", schema);
    return Users;
};