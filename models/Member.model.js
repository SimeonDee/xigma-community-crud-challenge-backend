const mongoose = require('mongoose')

const memberSchema = new mongoose.Schema({
        fullname: { type: String, required: true, default: 'anonymous' },
        gender: { 
            type: String, enum: ['MALE', 'FEMALE'], 
            uppercase: true, default: 'MALE' 
        },
        institution: { type: String, default: 'Fedpoffa' },
        level: {type: String, default: '100L', uppercase: true },
    }, 
    { timestamps: true }
)

module.exports = mongoose.model('xigma-members', memberSchema)