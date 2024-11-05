import validator from "validator"
import userModel from "../models/userSchema.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const createToken = (id)=>{
    return jwt.sign(
        {id},
        process.env.TOKEN,
    )
}

const registerUser = async(req,res)=>{
    try {
        const { name, email, password } = req.body;

        if(!email || !password ||email==='' || password==='') return res.status(403).json({"message":"All fields are required"})
        
        const userExist = await userModel.findOne({email})
        if(userExist) return res.json({ success:false ,message:"Email Already Exist" })

        if(!validator.isEmail(email)) return res.json({ success:false, message:"Enter valid Email"})
        if(password.length < 8) return res.json({ success:false, message:"Password should be in 8 characters"})

        const hashedPassword = await bcrypt.hash(password,10);

        const newUser =new userModel ({
            name,
            email,
            password:hashedPassword
        })

        const user = await newUser.save()
        const token = createToken(user._id)
        res.json({ success:true, token , message:"User Created" })
        

    } catch (error) {
        console.log(error);
        res.json({ success:false , message:error.message})        
    }

} 

const loginUser = async(req,res)=>{
    try {
        const {email,password} = req.body;

        if(!email || !password ||email==='' || password==='') return res.status(403).json({"message":"All fields are required"})

        const user = await userModel.findOne({email})
        if(!user) return res.json({ success:false, message:"Email does not exist"})
        
        const pwdIsMatch = await bcrypt.compare( password, user.password )
        if(!pwdIsMatch) return res.json({ success:false, message:"Invalid Credentials"})

        if(pwdIsMatch){
            const token = createToken(user._id)
            res.json({success:true, token, message:"Login Success"})
        }


    } catch (error) {
        console.log(error);
        res.json({ success:false , message:error.message}) 
    }
}    


export { registerUser, loginUser }



