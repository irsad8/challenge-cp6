const express = require('express');
const {
    Login,
    Me,
    Logout,
    refreshToken
} = require('../controllers/Auth');
const {verifyUser, adminOnly, verifikasi } = require('../middleware/AuthUser');

const router = express.Router();

router.get('/whoiam',verifikasi, Me);
router.post('/login', Login); 
router.delete('/logout',verifikasi, Logout);

module.exports = router;