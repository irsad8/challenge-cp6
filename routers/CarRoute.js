const express = require('express')
const {
    getCars,
    getCarById,
    createCar,
    updateCar,
    deleteCar
} = require('../controllers/Cars');
const {verifyUser, adminOnly, verifikasi } = require('../middleware/AuthUser');
const upload = require('../middleware/upload');


const router = express.Router();

router.get('/cars',verifyUser, getCars); //kurang verifikasi
router.get('/cars/:id',verifyUser, getCarById); //kurang verifikasi
router.post('/cars',verifyUser,upload.single('file'), createCar); //kurang verifikasi
router.patch('/cars/:id',verifyUser,upload.single('file'), updateCar); //kurang verifikasi
router.delete('/cars/:id',verifyUser, deleteCar); //kurang verifikasi

module.exports = router;