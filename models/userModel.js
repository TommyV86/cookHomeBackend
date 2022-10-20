const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    role: { type: Number, required: true },
    email: { type: String, required: true },
    name: { type: String, required: true },
    passwordHash: { type: String, required: true },
    salt: { type: String, required: true }
})

module.exports = mongoose.model('User', UserSchema, 'users')