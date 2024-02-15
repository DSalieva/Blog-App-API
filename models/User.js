const { model, Schema } = require('mongoose')
const { compare, genSalt, hash } = require('bcryptjs')
const { sign } = require('jsonwebtoken')

const userSchema = new Schema({
    first_name: {
        type: String,
        required: [true, 'first name is required'],
        trim: true
    },
    last_name: {
        type: String,
        required: [true, 'first name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        unique: true,
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, 'Please provide valid email']
    },
    password: {
        type: String,
        requird: [true, 'Password is required'],
        minlength: 6,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }

}, { timestamps: true })


// Encrypt Password
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) next();
    const salt = await genSalt(10);
    this.password = await hash(this.password, salt)
})

// Compare password
userSchema.methods.matchPassword = async function (enteredPassword) {
    return compare(enteredPassword, this.password);
}

// Generate Token 
userSchema.methods.getToken = function () {
    return sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    })
}

module.exports = model('User', userSchema)