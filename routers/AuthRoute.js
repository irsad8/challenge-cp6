const express = require('express');
const {
    Login,
    Me,
    Logout,
    refreshToken
} = require('../controllers/Auth');
const {verifyUser, adminOnly, verifikasi } = require('../middleware/AuthUser');

const router = express.Router();

router.get('/whoiam', Me); //kurang verifikasi
router.post('/login', Login); 
router.delete('/logout', Logout); //kurang verifikasi

module.exports = router;