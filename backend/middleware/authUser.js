import jwt from 'jsonwebtoken'
const token = process.env.TOKEN

const authUser = async (req,res,next)=>{
    const authHeaderToken = req.headers.authorization
    if(!authHeaderToken){
        return res.json({success:false, message:"Not Authorizes, Login Again"})
    }

    try {
        const decoded_token = jwt.verify(authHeaderToken,token)
        req.body.userId = decoded_token.id
        next()

    } catch (error) {
        console.error(error);
        res.json({ success:false,message:error.message })
    }
     
}

export default authUser