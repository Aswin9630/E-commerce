import jwt from "jsonwebtoken"
const { ADMIN_EMAIL, ADMIN_PASSWORD, TOKEN } = process.env

const adminLogin = async (req,res)=>{
    try {
        const { email,password } = req.body
        if( email === ADMIN_EMAIL && password === ADMIN_PASSWORD ){
            const token = jwt.sign(
                {email},
                TOKEN
            )
            res.json({ success:true, token })
        }else{
            res.json({ success:false, message:"Only admin can access"})
        }


    } catch (error) {
        console.error(error);
        res.json({ success:false, message:error.message })
        
    }
}

export { adminLogin }