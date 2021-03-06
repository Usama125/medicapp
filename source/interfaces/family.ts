import { Document } from 'mongoose'

export default interface IFamily extends Document {
    firstName: string
    lastName: string
    relation: string
    emiratesId: string
    phoneNo: string
    patientId: string
}