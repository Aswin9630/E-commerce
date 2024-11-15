import jwt from "jsonwebtoken"
const { TOKEN } = process.env

const adminAuth =async (req,res,next)=>{ 
    try{
        const authHeader =  req.headers.authorization
        if(authHeader && authHeader.startsWith("Bearer ")){
            const token = authHeader.split(' ')[1]            
            const decoded = jwt.verify(token, TOKEN)            
            req.admin = decoded;
            next() 
        }else{
            res.json({ success:false, message:"Admin authorization required"})
        }
    }catch(error){
        console.error(error);
        res.status(401).json({ success: false, message: "Unauthorized access" });
    }
    
}


export default adminAuth