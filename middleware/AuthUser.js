const Users = require('../models/UserModel');
const jwt = require('jsonwebtoken');

const verifyUser = async (req, res, next) => {
    if (!req.session.userId){
        return res.status(401).json({msg: "login ke akun anda telebih dahulu!"});
    }
    const user = await Users.findOne({
        where: {
            uuid: req.session.userId
        }
    });
    if(!user) return res.status(404).json({msg: "User tidak ditemukan"});
    req.userId = user.id;
    req.role = user.role;
    next();
}

const adminOnly = async (req, res, next) => {
    const user = await Users.findOne({
        where: {
            uuid: req.session.userId
        }
    });
    if(!user) return res.status(404).json({msg: "User tidak ditemukan"});
    if(user.role !== "admin") return res.status(403).json({msg: "akses dilarang!!"})
    next();
}

const verifikasi = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log(token)
    if(token == null) return res.sendStatus(401);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECREAT, (err, decoded) => {
        if(err) return res.sendStatus(403);
        req.user = decoded;
        next();
    })
}

module.exports = {verifyUser, adminOnly, verifikasi};