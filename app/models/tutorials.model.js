module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            title: {type: String, required: true},
            description: {type: String, required: true},
            published: {type: Boolean, required: true, trim: true}
        },
        {timestamps: true}
    );

    schema.method("toJSON", function () {
        const {__v, _id, ...object} = this.toObject();
        object.id = _id;
        return object;
    });
    // It defines a custom method called toJSON on the schema. It removes the __v (version) and _id fields and adds an id field with the value of _id.

    const Tutorial = mongoose.model("tutorials", schema);
    return Tutorial;
};