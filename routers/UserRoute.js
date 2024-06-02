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

router.get('/users', verifyUser,adminOnly, getUsers); //kurang verifikasi
router.get('/users/:id',verifyUser,adminOnly, getUserById); //kurang verifikasi
router.post('/users',verifyUser, adminOnly, createUser); //kurang verifikasi
router.patch('/users/:id',verifyUser,adminOnly, updateUser); //kurang verifikasi
router.delete('/users/:id',verifyUser, adminOnly, deleteUser); //kurang verifikasi

module.exports = router;