const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const { Schema } = mongoose;

const User = new Schema ({
    account: { type: String, required: true , unique: true },
    password: { type: String, required: true },
    name: { type: String, default: 'user' },
    birthday: { type: Date, default: '01/01/2000' },
    phone: { type: String, default: 'no' },
    avatar: { type: String, default: '/images/user-default.png' }
}, {
    timestamps: true
})

User.plugin(mongooseDelete, { deletedAt: true });

module.exports = mongoose.model('User', User);
