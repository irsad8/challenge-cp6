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

router.get('/cars',verifikasi, getCars); 
router.get('/cars/:id',verifikasi, getCarById); 
router.post('/cars',verifikasi,upload.single('file'), createCar); 
router.patch('/cars/:id',verifikasi,upload.single('file'), updateCar); 
router.delete('/cars/:id',verifikasi, deleteCar); 

module.exports = router;