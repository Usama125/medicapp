import mongoose, { Schema } from 'mongoose'
import ILeave from '../interfaces/leaves'

const LeaveSchema: Schema = new Schema(
	{
		patientId: {
			type: Schema.Types.ObjectId,
			ref: "Patient",
			index: false
		},
		doctorId: {
			type: Schema.Types.ObjectId,
			ref: "Doctor",
			index: false
		},
		days: {
			type: Number,
			required: true
		},
		description: {
			type: String,
			required: false
		}
	},
	{
		timestamps: true
	}
)

export default mongoose.model<ILeave>('Leave', LeaveSchema)
