import express from 'express';
import controller from '../../controllers/hospitals/hospital';
import extractJWT from '../../middleware/extractJWT';
import upload from '../../functions/fileUpload';

const router = express.Router();

router.get('/', extractJWT,controller.getAllHospitals);
router.get('/:id', extractJWT,controller.getSingleHospital); 
router.post('/', [ upload.single("tradeLicenseFile") ], controller.createHospital);
router.put('/:id',extractJWT, controller.updateHospital);
router.delete('/:id',extractJWT, controller.deleteHospital);
router.get('/search/:searchedText', extractJWT, controller.searchHospital);
router.put('/uploadImage/:id', [ extractJWT, upload.single("image") ], controller.uploadHospitalImages);

export = router;
