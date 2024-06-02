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

router.get('/cars',verifikasi, getCars); //kurang verifikasi
router.get('/cars/:id',verifikasi, getCarById); //kurang verifikasi
router.post('/cars',verifikasi,upload.single('file'), createCar); //kurang verifikasi
router.patch('/cars/:id',verifikasi,upload.single('file'), updateCar); //kurang verifikasi
router.delete('/cars/:id',verifikasi, deleteCar); //kurang verifikasi

module.exports = router;