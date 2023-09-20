const mongoose = require('mongoose');

const connectDb = async(dbURL) => {
    try {
        const dbOption = {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
        await mongoose.connect(dbURL,dbOption);
        console.log('Successfully connected to database...');
    }catch (e) {
        console.log(e);
    }
}

module.exports = connectDb;