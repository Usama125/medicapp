import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Nurse from '../../models/nurse/nurse';
import User from '../../models/user';
import makeResponse from '../../functions/makeResponse';
import UserController from '../user';
import { Roles } from '../../constants/roles';
import { getRandomPassword } from '../../functions/utilities';
import config from '../../config/config';
import { sendEmail } from '../../functions/mailer';

const NAMESPACE = "Doctor";

const createNurse = async (req: Request, res: Response, next: NextFunction) => {
        const { email, firstName, lastName, mobile } = req.body;
        
        const password = getRandomPassword();

        await User.find({email}).then(result => {
            if(result.length === 0){
                if(email && firstName && lastName && mobile){
                    const newNurse = new Nurse({
                        _id: new mongoose.Types.ObjectId(),
                        email, firstName, lastName, mobile, hospitalId: res.locals.jwt._id
                    }); 

                    const options = {
                        from: config.mailer.user,
                        to: email,
                        subject: "Welcome to Medicapp",
                        text: `Your account account has been created as a nurse, and your password is ${password}`
                    }

                    sendEmail(options);

                    return newNurse.save()
                        .then(result => {
                            if(UserController.createUserFromEmailAndPassword(req, res, email, password, firstName + " " + lastName, Roles.NURSE, result._id)){
                                return makeResponse(res, 201, "Nurse Created Successfully", result, false);
                            }else {
                                return makeResponse(res, 201, "Something went wrong while creating Nurse", result, false);
                            };
                        })
                        .catch(err => {
                            return makeResponse(res, 400, err.message, null, true);
                        });
                }else {
                    return makeResponse(res, 400, "Validation Failed", null, true);
                }
            }else {
                return makeResponse(res, 400, "Email already exists", null, true);
            }
        })
};

const getAllNurses = (req: Request, res: Response, next: NextFunction) => {
    Nurse.find({ hospitalId: res.locals.jwt._id })
        .then(result => {
            return makeResponse(res, 200, "All Nurses", result, false);
        })
        .catch(err => {
            return makeResponse(res, 400, err.message, null, true);
        })
};

const getSingleNurse = (req: Request, res: Response, next: NextFunction) => {
    Nurse.findById({ _id: req.params.id })
    .then(data => {
        return makeResponse(res, 200, "Nurse", data, false);
    }).catch(err => {
        return makeResponse(res, 400, err.message, null, true);
    })
};

const updateNurse = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const filter = { _id: id };
    let update = {...req.body};

    Nurse.findOneAndUpdate(filter, update).then(updatedNurse => {
        return makeResponse(res, 200, "Nurse updated Successfully", updatedNurse, false);
    }).catch(err => {
        return makeResponse(res, 400, err.message, null, true);
    });
};

const deleteNurse = async (req: Request, res: Response, next: NextFunction) => {
    const _id = req.params.id;
    try {
        const nurse = await Nurse.findByIdAndDelete(_id);
    if (!nurse) return res.sendStatus(404);
        if(UserController.deleteUserWithEmail(nurse.email)){
            return makeResponse(res, 200, "Deleted Successfully", nurse, false);
        }else {
            return makeResponse(res, 400, "Error while deleting Nurse", null, true);
        }
    } catch (e) {
        return res.sendStatus(400);
    }
};

const searchNurse = async (req: Request, res: Response, next: NextFunction) => {
    const { searchedText } = req.params;

    // Regex 
    const searchedTextRegex = new RegExp(searchedText, 'i');

    const searchQuery = [
        { firstName: searchedTextRegex }, 
        { lastName: searchedTextRegex },
        { email: searchedTextRegex },
        { mobile: searchedTextRegex } 
    ]

    Nurse.find({$or: searchQuery}).then(result => {
        return makeResponse(res, 200, "Search Results", result, false);
    }).catch(err => {
        return makeResponse(res, 400, "Error while searching Nurse", null, true);
    });

};

export default { 
    createNurse, 
    getAllNurses,
    getSingleNurse,
    updateNurse,
    deleteNurse,
    searchNurse
};