import e from "express";
import products  from "../models/promodel.js";
import users from "../models/usermodel.js";
import { Op } from "sequelize";

export const getproduct = async(req,res)=>{
    try {
        let response
        if(req.role ==='admin'){
            response = await products.findAll({
                attributes: ['id', 'name', 'price'],
                include:[{
                    model: users,
                    attributes: ['name', 'email']
                }]
            })
        }
        else{
            response = await products.findAll({
                where:{
                    userId: req.userId
                },
                attributes: ['id', 'name', 'price'],
                include:[{
                    model: users,
                    attributes: ['name', 'email']
                }]
            })
        }
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
}

export const getproductbyid = async (req,res)=>{
    try {
        const product = await products.findOne({
            where:{
                id : req.params.id
            }
        })
        if(!product)  return res.status(404).json9({msg:"product not found"})
        let response
        if(req.role ==='admin'){
            response = await products.findOne({
                attributes: ['id', 'name', 'price'],
                    where:{
                        id : product.id
                    },
                include:[{
                    model: users,
                    attributes: ['name', 'email']
                }]
            })
        }
        else{
            response = await products.findOne({
                where:{
                    [Op.and]:[{id: product.id}, {userId: req.userId}]
                },
                attributes: ['id', 'name', 'price'],
                include:[{
                    model: users,
                    attributes: ['name', 'email']
                }]
            })
        }
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
}

export const createproduct = async (req,res)=>{
    const {name, price} = req.body
    try {
        await products.create({
            name : name,
            price : price,
            userId : req.userId
        })
        res.status(201).json({msg:"product created successfuly"})
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
}

export const updateproduct = async (req,res)=>{
    try {
        const product = await products.findOne({
            where:{
                id : req.params.id
            }
        })
        if(!product)  return res.status(404).json9({msg:"product not found"})
        const {name, price} = req.body
        if(req.role ==='admin'){
            await products.update({name,price},{
                where:{
                    id: product.id
                }
            })
        }
        else{
            if (req.userId !== product.userId) return res.status(403).json({msg : "akses terlarang"})
            await products.update({name,price},{
                where:{
                    [Op.and]:[{id: product.id}, {userId: req.userId}]
                }
            })
        }
        res.status(200).json({msg:"product updated successfuly"})
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
}

export const deleteproduct = async(req,res)=>{
    try {
        const product = await products.findOne({
            where:{
                id : req.params.id
            }
        })
        if(!product)  return res.status(404).json9({msg:"product not found"})
        const {name, price} = req.body
        if(req.role ==='admin'){
            await products.destroy({
                where:{
                    id: product.id
                }
            })
        }
        else{
            if (req.userId !== product.userId) return res.status(403).json({msg : "akses terlarang"})
            await products.destroy({
                where:{
                    [Op.and]:[{id: product.id}, {userId: req.userId}]
                }
            })
        }
        res.status(200).json({msg:"product deleted successfuly"})
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
}
