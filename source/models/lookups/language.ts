import mongoose, { Schema } from 'mongoose'
import ILookup from '../../interfaces/lookups/lookup'

const LanguageSchema: Schema = new Schema(
	{
		name_en: {
			type: String,
			required: true
		},
		name_ar: {
			type: String,
			required: true
		}
	}
)

export default mongoose.model<ILookup>('Language', LanguageSchema)
