const express = require('express');
const {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} = require('../controllers/Users');
const {verifyUser,adminOnly, verifikasi} = require('../middleware/AuthUser');

const router = express.Router();

router.get('/users', verifikasi,adminOnly, getUsers); 
router.get('/users/:id',verifikasi,adminOnly, getUserById); 
router.post('/users',verifikasi, adminOnly, createUser); 
router.patch('/users/:id',verifikasi,adminOnly, updateUser); 
router.delete('/users/:id',verifikasi, adminOnly, deleteUser); 

module.exports = router;