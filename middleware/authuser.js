import users from "../models/usermodel.js";

export const verifyuser = async(req,res,next)=>{
    if(!req.session.userId){
        return res.status(401).json({msg:'please log in as admin'})
    }
    const user = await users.findOne({
        where:{
            id: req.session.userId
        }
    })
    if(!user) return res.status(404).json({msg:"user not found"})
    req.userId = user.id
    req.role = user.role
    next()
}

export const adminonly = async(req,res,next)=>{
    const user = await users.findOne({
        where:{
            id: req.session.userId
        }
    })
    if(!user) return res.status(404).json({msg:"user not found"})
    if(user.role !== 'admin') return res.status(403).json({msg:"admin only"})
    next()
}