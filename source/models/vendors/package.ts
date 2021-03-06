import mongoose, { Schema } from 'mongoose';
import IPackage from '../../interfaces/vendors/packages';

const PackageSchema: Schema = new Schema(
	{
		type: {
			type: String,
			required: true
		},
		points: {
			type: String,
			required: true
		},
		buyQuantity: {
			type: String
		},
		getQuantity: {
			type: String,
			required: false
		},
		subscribedCount: {
			type: Number,
			default: 0
		},
		off: {
			type: String
		},
		category_id: {
			type: Schema.Types.ObjectId,
			ref: "PackageCategory",
			index: false
		},
		termsAndConditions: {
			type: String
		},
		about: {
			type: String
		},
		images: {
			type: [String]
		},
		vendorId: {
			type: Schema.Types.ObjectId,
			ref: "Vendor",
			index: false
		},
		voucherCode: {
			type: String,
		}
	},
	{
		timestamps: true
	}
);

export default mongoose.model<IPackage>('Package', PackageSchema);