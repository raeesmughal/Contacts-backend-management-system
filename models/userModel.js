const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your Name"],
    },
    email: {
        type: String,
        required: [true, "Please enter user email id"],
        unique: [true, "Email address already taken"],
    },
    password: {
        type: String,
        required: [true, "Please enter Password"],
    },
},
    {
        timestamps: true,
    })


userSchema.pre('save', async function (next) {
    const user = this;
    if (!user.isModified('password')) {
        return next()
    }
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    next();
})

userSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    } catch (er) {
        return false
    }
}



module.exports = mongoose.model('User', userSchema);