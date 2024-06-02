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

router.get('/users', verifikasi,adminOnly, getUsers); //kurang verifikasi
router.get('/users/:id',verifikasi,adminOnly, getUserById); //kurang verifikasi
router.post('/users',verifikasi, adminOnly, createUser); //kurang verifikasi
router.patch('/users/:id',verifikasi,adminOnly, updateUser); //kurang verifikasi
router.delete('/users/:id',verifikasi, adminOnly, deleteUser); //kurang verifikasi

module.exports = router;