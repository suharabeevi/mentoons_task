import mongoose from "mongoose";
import bcrypt from "bcrypt";
import  jwt  from "jsonwebtoken";

const userschema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    }
})
userschema.pre("save", async function (next) {
    try {
        if (!this.isModified('password')) return next();
        const saltRounds = 10
        const hashedPassword = await bcrypt.hash(this.password, saltRounds);
        this.password = hashedPassword
    } catch (error) {
        next(error)
    }
})
userschema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
		expiresIn: "7d",
	});
	return token;
};
 
const User = mongoose.model('User',userschema)
export default User