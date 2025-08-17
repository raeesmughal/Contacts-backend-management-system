const mongoose = require('mongoose');


const contactSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: [true, "Please add the contact name"],
    },
    email: {
        type: String,
        required: [true, "Please add the contact email address"]
    },
    phone: {
        type: String,
        required: [true, "Please add the contact Phone Number"]
    }
},
    {
        timestamps: true,
    }
)


module.exports = mongoose.model('Contact', contactSchema);
