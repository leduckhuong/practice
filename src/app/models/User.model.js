const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const { Schema } = mongoose;

const User = new Schema ({
    account: { type: String, required: true , unique: true},
    password: { type: String, required: true }
}, {
    timestamps: true
})

User.plugin(mongooseDelete, { deletedAt: true });

module.exports = mongoose.model('User', User);
