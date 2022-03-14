import express from 'express';
import controller from '../../controllers/hospitals/promos';
import isHospital from '../../middleware/isHospital';
import upload from '../../functions/multerCloudinary';
import extractJWT from '../../middleware/extractJWT';

const router = express.Router();

router.get('/', isHospital, controller.getAllPromos);
router.get('/all', extractJWT, controller.getAllPromoVideos);
router.post('/', isHospital, upload.single("video"), controller.createPromo);
router.delete('/:id', isHospital, controller.deletePromo);
router.put('/like/:id', extractJWT, controller.likePromo)

export = router;
