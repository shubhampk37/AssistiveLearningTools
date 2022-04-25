const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const studentSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    gender: {
        type: String,
        // required: true
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required: true
    },
    password: {
        type: String,
       // required: true,
    },
    confirmpassword: {
        type: String,
        //required: true,
    },
    tokens: [{
        token: {
            type: String,
            required: true,
        }
    }]
})

studentSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10);
        this.confirmpassword = undefined;
    }
    next();
})

studentSchema.methods.generateAuthToken = async function(){
    try{
        const token = await jwt.sign({_id:this._id.toString()}, process.env.SECRET_KEY);
        console.log(`token(method) is ${token}`);
        this.tokens = this.tokens.concat({token: token});
        await this.save();
        return token;
    }
    catch(error){
        console.log("The error part(metohod) is" + error);
    }
}
const Register= new mongoose.model("Registration", studentSchema);
module.exports = Register;