import express from 'express';
import controller from '../controllers/appointments';
import extractJWT from '../middleware/extractJWT';
import isHospital from '../middleware/isHospital';

const router = express.Router();

router.get('/', extractJWT,controller.getAllAppointments);
router.get('/:id', extractJWT,controller.getSingleAppointment);
router.post('/', controller.createAppointment);
router.put('/:id',extractJWT, controller.updateAppointment);
router.delete('/:id',extractJWT, controller.deleteAppointment);
router.get('/hospitalAppointments/:hospitalId', isHospital, controller.getHospitalAppointments)
router.get('/doctorAppointments/:doctorId', isHospital, controller.getDoctorAppointments);
// Get todays appointments

export = router;
