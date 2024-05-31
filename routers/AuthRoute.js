const express = require('express')
const {
    Login,
    Me,
    Logout
} = require('../controllers/Auth')


const router = express.Router();

router.get('/whoiam', Me);
router.post('/login', Login);
router.delete('/logout', Logout);

module.exports = router;