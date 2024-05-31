const express = require('express')
const {
    getCars,
    getCarById,
    createCar,
    updateCar,
    deleteCar
} = require('../controllers/Cars')
const {verifyUser, adminOnly } = require('../middleware/AuthUser')
const upload = require('../middleware/upload')


const router = express.Router();

router.get('/cars',verifyUser, getCars);
router.get('/cars/:id',verifyUser, getCarById);
router.post('/cars',verifyUser,upload.single('file'), createCar);
router.patch('/cars/:id',verifyUser,upload.single('file'), updateCar);
router.delete('/cars/:id',verifyUser, deleteCar);

module.exports = router;