const Users = require('../models/UserModel');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');


const Login = async(req, res,)=>{
    const user = await Users.findOne({
            where: {
                email: req.body.email
            }
    });
    if(!user) return res.status(404).json({msg: "user tidak ditemukan"});
    const match = await argon2.verify(user.password, req.body.password);
    if (!match) return res.status(400).json({msg: "password tidak sesuai"});
    const accessToken = jwt.sign({id : user.id, role: user.role},process.env.ACCESS_TOKEN_SECREAT,{expiresIn:'15m'});
    const refreshToken = jwt.sign({id : user.id, role: user.role},process.env.REFRESH_TOKEN_SECREAT,{expiresIn:'1d'});
    await Users.update({refresh_token: refreshToken},{
            where: {
                id : user.id
            }
        })
    res.cookie('refreshToken', refreshToken,{
        httpOnly : true,
        maxAge: 24*60*60,
        secure: 'auto'
    })
    res.status(200).json(accessToken);
}

const Me = async (req, res)=> {
    const userId = req.user.id;
    const user = await Users.findOne({
        attributes : ['uuid','name','email', 'role'],
        where: {
            id: req.user.id
        }
    });
    if(!user) return res.status(404).json({msg: "User tidak ditemukan"});
    res.status(200).json(user)
}

const Logout = async(req,res)=>{
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(204);

    const user = await UserModel.findOne({
            where: { refresh_token: refreshToken },
        });
        if (!user) return res.sendStatus(204);

        await user.update({refresh_token: refreshToken},{
            where: {
                id : user.id
            }
        });

        res.clearCookie('refreshToken');
        res.sendStatus(200);
}

const refreshToken = async(req,res)=>{
    const refreshToken = req.cookies.refreshToken;
    if(refreshToken) return res.status(401).json({msg: "login terlebih dahulu"})

    const user = await Users.findOne({
        where: {refresh_token : refreshToken}
    })
    if(!user) return res.status(403).json({msg: "user tidak ditemukan"});

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECREAT, (err, decoded)=>{
        if (err) return res.status(403).json({msg : error.message});
        const accessToken = jwt.sign({id : user.id, role: user.role},process.env.ACCESS_TOKEN_SECREAT,{expiresIn:'15m'});
        res.json({accessToken});
    })
}

module.exports = {Login, Me, Logout, refreshToken};