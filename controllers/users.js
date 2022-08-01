import users from "../models/usermodel.js"
import argon2 from "argon2"

export const getuser = async(req,res)=>{
    try {
        const response = await users.findAll({
            attributes:['id','name','email','role']
        })
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({msg:error.message})
    }

}

export const getuserbyid = async(req,res)=>{
    try {
        const response = await users.findOne({
            attributes:['id','name','email','role'],
            where:{
                id: req.params.id
            }
        })
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
}

export const createuser = async(req,res)=>{
    const{name, email, password, conpass,role} = req.body
    if (password !== conpass) return res.status(400).json({msg:'password not match'})
    const hashPassword = await argon2.hash(password)
    try {
        await users.create({
            name,
            email,
            password : hashPassword,
            role
        })
        res.status(201).json({msg:'user registered'})
    } catch (error) {
        res.status(400).json({msg:error.message})
    }

}

export const updateuser = async(req,res)=>{
    const user = await users.findOne({
        where:{
            id: req.params.id
        }
    })
    if(!user) return res.status(404).json({msg:"user not found"})
    const{id,name, email, password, conpass,role} = req.body
    let hashPassword
    if (password === "" || password === null){
        hashPassword = users.password
    }else{
        hashPassword = await argon2.hash(password)
    }
    if (password !== conpass) return res.status(400).json({msg:' password not match'})
    try {
        await users.update({
            id,
            name,
            email,
            password : hashPassword,
            role
        },{
            where:{
                id : user.id
            }
        })
        res.status(200).json({msg:'user updated'})
    } catch (error) {
        res.status(400).json({msg:error.message})
    }
}

export const deleteuser = async(req,res)=>{
    const user = await users.findOne({
        where:{
            id: req.params.id
        }
    })
    if(!user) return res.status(404).json({msg:"user not found"})
    try {
        await users.destroy({
            where:{
                id: user.id
            }
        })
        res.status(200).json({msg:'user deleted'})
    } catch (error) {
        res.status(400).json({msg:'oi'})
    }
}
