import mongoose, { Schema } from 'mongoose'
import { Roles, UserStatus } from '../../constants/roles'
import IHospital from '../../interfaces/hospitals/hospital'

const HospitalSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: false
        },
        phoneNo: {
            type: String,
            required: false
        },
        category: {
            type: [Schema.Types.ObjectId],
            ref: "Category",
            index: false
        },
        services: {
            type: [Schema.Types.ObjectId],
            ref: "Services",
            index: false
        },
        role: {
            type: String,
            required: false,
            default: Roles.HOSPITAL,
        },
        tradeLicenseNo: {
            type: String,
            required: true
        },
        issueDate: {
            type: String,
            required: true
        },
        expiryDate: {
            type: String,
            required: true
        },
        tradeLicenseFile: {
            type: String,
            required: false
        },
        insurances: {
            type: [Schema.Types.ObjectId],
            ref: "Insurance",
            index: false,
            default: []
        },
        location: {
            type: {
                type: String,
                enum: ['Point'],
                default: 'Point',
            },
            coordinates: {
                type: [Number],
                default: [0, 0],
            }
        },
        address: {
            type: String,
            required: false
        },
        state: {
            type: String,
            required: false
        },
        rating: {
            type: Number,
        },
        image: {
            type: String
        },
        images: {
            type: [String]
        },
        about: {
            type: String
        },
        openingTime: {
            type: String
        },
        closingTime: {
            type: String
        },
        PCRDPI: {
            type: Boolean
        },
        status: {
            type: String,
            default: UserStatus.PENDING
        }
    },
    {
        timestamps: true
    }
)

// On MongoDB Atlas create index { location: '2dsphere' }
HospitalSchema.index({ location: '2dsphere' })

export default mongoose.model<IHospital>('Hospital', HospitalSchema)