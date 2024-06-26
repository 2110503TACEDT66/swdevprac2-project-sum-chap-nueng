const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required:[true,'Please add a name']

    },
    email:{
        type: String,
        required:[true,'Please add an email'],
        unique: true, 

        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please add a valid email'
        ]

    },
    role:{
        type:String,
        enum: ['user','admin'],
        defualt: 'user'
    },
    password: {
        type:String,
        required:[true,'Please add a password']
        ,

        minlength:6,
        select:false
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    createdAt: {
        type: Date,
        defualt:Date.now
    }


});

// UserSchema.pre('save',async function() {
//     const salt = await bcrypt.genSalt(10);
//     password=await bcrypt.hash(password,salt);

// });


// module.exports = mongoose.model('User',UserSchema);

const User = mongoose.models.User || mongoose.model("User",UserSchema)  
export default User