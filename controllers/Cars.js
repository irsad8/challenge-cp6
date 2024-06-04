const Cars = require('../models/CarModel');
const Users = require('../models/UserModel');
const {Op} = require('sequelize');
const path = require('path');
const fs = require('fs')

const getCars = async (req, res) => {
    try {
        let response;
        if (req.user.role === "admin"){
            response = await Cars.findAll({
                attributes: ['uuid', 'name', 'price','image','is_deleted'],
                include:[{
                    model: Users,
                    as: "createdByUser",
                    attributes : ['name', 'email']
                },
                {
                    model: Users,
                    as: "updatedByUser",
                    attributes : ['name', 'email']
                },
                {
                    model: Users,
                    as: "deletedByUser",
                    attributes : ['name', 'email']
                }
            ]
            });
        } else{
            response = await Cars.findAll({
                attributes: ['uuid', 'name', 'price','image','is_deleted'],
                where: {
                    userId : req.user.id
                },
                include:[
                {
                    model: Users,
                    as: "createdByUser",
                    attributes : ['name', 'email']
                },
                {
                    model: Users,
                    as: "updatedByUser",
                    attributes : ['name', 'email']
                },
                {
                    model: Users,
                    as: "deletedByUser",
                    attributes : ['name', 'email']
                }
                ]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg:error.message});
    }
}

const getCarById = async (req, res) => {
     try {
        const car = await Cars.findOne({
            where:{
                uuid : req.params.id
            }
        });
        if (!car) return res.status(404).json({msg: "data tidak ditemukan"});
        let response;
        if (req.user.role === "admin"){
            response = await Cars.findOne({
                attributes: ['uuid', 'name', 'price','image','is_deleted'],
                where:{
                    id : car.id
                },
                include:[
                {
                    model: Users,
                    as: "createdByUser",
                    attributes : ['name', 'email']
                },
                {
                    model: Users,
                    as: "updatedByUser",
                    attributes : ['name', 'email']
                },
                {
                    model: Users,
                    as: "deletedByUser",
                    attributes : ['name', 'email']
                }
                ]
            });
        } else{
            response = await Cars.findOne({
                attributes: ['uuid', 'name', 'price','image','is_deleted'],
                where: {
                    [Op.and]: [{id: car.id},{userId: req.user.id}]
                },
                include:[
                {
                    model: Users,
                    as: "createdByUser",
                    attributes : ['name', 'email']
                },
                {
                    model: Users,
                    as: "updatedByUser",
                    attributes : ['name', 'email']
                },
                {
                    model: Users,
                    as: "deletedByUser",
                    attributes : ['name', 'email']
                }
                ]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg:error.message});
    }
}

const createCar = async (req, res) => {
    if (!req.file)return res.status(400).json({msg: "no file uploaded"});
    const {name, price} = req.body;
    const file = req.file;
    const fileSize = file.size;
    const ext = path.extname(file.originalname);
    const typeOf = ['.png', '.jpg','.jpeg'];
    if (!typeOf.includes(ext.toLowerCase()))return res.status(422).json({msg: "invalid type file"})
    if (fileSize > 5000000)return res.status(422).json({msg: "image size should be less then 5 mb"})

    try {
        await Cars.create({
            name : name,
            price : price,
            image : file.filename,
            userId : req.userId,
            createdBy : req.userId
        });
        res.status(201).json({msg: "car added successfuly"})
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}

const updateCar = async(req, res) => {
    const car = await Cars.findOne({
            where: {
                uuid : req.params.id
            }
        });
    if (!car)return res.status(522).json({msg: "data not found"})
    let filename = ""
    if (!req.file){
        filename = car.image
    }else{
        const file = req.file
        const fileSize = file.size
        const ext = path.extname(file.originalname)
        const typeOf = ['.png', '.jpg', '.jpeg']
        filename = file.filename

        if (!typeOf.includes(ext.toLowerCase()))return res.status(422).json({msg: "invalid type file"})
        if (fileSize > 5000000)return res.status(422).json({msg: "image size should be less then 5 mb"})

        const image = `./public/uploads/${car.image}`
        fs.unlinkSync(image)
    }

    const {name, price} = req.body;
    try {
        if(req.user.role === "admin" || req.user.id === car.userId){
            await Cars.update({
                name : name,
                price : price,
                image : filename,
                updatedBy : req.userId
            },{
                where: {
                    uuid : req.params.id
                }
            });
        }else {
            res.status(403).json({msg: "akses dilarang!!"});
        }
        res.status(201).json({msg: "car updated successfuly"})
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}

const deleteCar = async(req, res) => {
    const car = await Cars.findOne({
            where: {
                uuid : req.params.id
            }
        });
    if (!car)return res.status(522).json({msg: "data not found"})

    try {
        if(req.user.role === "admin" || req.user.id === car.userId){
            await Cars.update({
                is_deleted : 1,
                deletedBy : req.userId
            },{
                where: {
                    uuid : req.params.id
                }
            });
        }else {
            res.status(403).json({msg: "akses dilarang!!"});
        }
        res.status(201).json({msg: "car deleted successfuly"})
    } catch (error) {
        console.log(error);
        res.status(400).json({msg: error.message})
    }
}

module.exports = {getCars, getCarById, createCar, updateCar, deleteCar}