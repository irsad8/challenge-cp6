const Users = require('../models/UserModel');
const argon2 = require('argon2');

const Login = async(req, res,)=>{
    const user = await Users.findOne({
            where: {
                email: req.body.email
            }
    });
    if(!user) return res.status(404).json({msg: "user tidak ditemukan"});
    const match = await argon2.verify(user.password, req.body.password);
    if (!match) return res.status(400).json({msg: "password tidak sesuai"});
    req.session.userId = user.uuid;
    const {uuid, name, email, role} = user;
    res.status(200).json({uuid, name, email, role});
}

const Me = async (req, res)=> {
    if (!req.session.userId){
        return res.status(401).json({msg: "login ke akun anda telebih dahulu!"});
    }
    const user = await Users.findOne({
        attributes : ['uuid','name','email', 'role'],
        where: {
            uuid: req.session.userId
        }
    });
    if(!user) return res.status(404).json({msg: "User tidak ditemukan"});
    res.status(200).json(user)
}

const Logout = async(req,res)=>{
    req.session.destroy((err) => {
        if (err) return res.status(400).json({msg: "Tidak dapat logout"});
        res.status(200).json({msg: "Anda telah logout"});
    });
}

module.exports = {Login, Me, Logout};