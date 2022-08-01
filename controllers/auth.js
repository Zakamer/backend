import users from "../models/usermodel.js";
import argon2 from "argon2"


export const login = async (req,res)=>{
    const user = await users.findOne({
        where:{
            email: req.body.email
        }
    })
    if(!user) return res.status(404).json({msg:"user not found"})
    const match = await argon2.verify(user.password, req.body.password)
    if(!match) return response.status(400).json ({msg: 'password not match'})
    req.session.userId = user.id
    const id = user.id
    const name = user.name
    const email = user.email
    const role = user.role
    res.status(200).json({msg : `welcome ${name}`})
}

export const Me = async(req,res)=>{
    if(!req.session.userId){
        return res.status(401).json({msg:'please log in'})
    }
    const user = await users.findOne({
        attributes : ['id','name','email','role'],
        where:{
            id: req.session.userId
        }
    })
    if(!user) return res.status(404).json({msg:"user not found"})
    res.status(200).json(user)
}

export const logout = (req,res) =>{
    req.session.destroy((e)=>{
        if(e) return res.status(400).json({msg:'logout failed'})
        res.status(200).json({msg:'logout success'})
    })
}