const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect(process.env.PORT_DATABASE, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connect mongodb successfully!!!');
    } catch (error) {
        console.log('Connect failure!!!');
    }
}

module.exports = { connect };