import http from 'http';
import bodyParser from 'body-parser';
import express from 'express';
import logging from './config/logging';
import config from './config/config';
import mongoose from 'mongoose';
import userRoutes from './routes/user';
import patientRoutes from './routes/patient';
import hospitalRoutes from './routes/hospitals/hospital';
import categoryRoutes from './routes/category';
import servicesRoutes from './routes/hospitals/services';
import doctorRoutes from './routes/doctors/doctor';
import nurseRoutes from './routes/nurse/nurse';
import labortoryRoutes from './routes/labortories/labortory';
import appointmentRoutes from './routes/appointments';
import pharmacyRoutes from './routes/pharmacy/pharmacy';
import branchRoutes from './routes/pharmacy/branch';

const NAMESPACE = 'Server';
const router = express();

/** Connect to MONGO **/ 
mongoose.connect(config.mongo.url, config.mongo.options)
    .then(result => {
        logging.info(NAMESPACE, "Connected to MongoDB!");
    }).catch(error => {
        logging.error(NAMESPACE, error.message, error);
    });

/** Log the request */
router.use((req, res, next) => {
    /** Log the req */
    logging.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
        /** Log the res */
        logging.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`);
    })
    
    next();
});

/** Parse the body of the request */
router.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
router.use(bodyParser.json({ limit: '50mb' }));

/** Rules of our API */
router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }

    next();
});

// Upload Files Setup
router.use(express.static("./source/images"));
// Note:- Simply save ( req.file/files.filename ) into the database and then get the file with URL:- http://localhost:1337/filename

/** Routes go here */
router.use('/api/users', userRoutes);
router.use('/api/patients', patientRoutes);
router.use('/api/hospitals', hospitalRoutes);
router.use('/api/categories', categoryRoutes);
router.use('/api/hospitals/services', servicesRoutes);
router.use('/api/doctors', doctorRoutes);
router.use('/api/nurse', nurseRoutes);
router.use('/api/labortories', labortoryRoutes);
router.use('/api/appointments', appointmentRoutes);
router.use('/api/pharmacy', pharmacyRoutes);
router.use('/api/pharmacy/branch', branchRoutes);

// Simple Root Message
router.get('/', (req, res) => {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Welcome to Medicapp</title></head>");
    res.write("<body><h4>Welcome to Medicapp Backend API's, Please use Postman Collection for respective API's</h4></body>");
    res.write("</html>");
    return res.end(); 
});

/** Error handling */
router.use((req, res, next) => {
    const error = new Error('Not found');

    res.status(404).json({
        message: error.message
    });
});

const httpServer = http.createServer(router);

httpServer.listen(config.server.port, () => logging.info(NAMESPACE, `Server is running ${config.server.hostname}:${config.server.port}`));