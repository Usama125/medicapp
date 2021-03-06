import Validator from 'validator'
import isEmpty from 'is-empty'

const validateInsuranceInput = (data: any) => {
    let errors: any = {}
    // Convert empty fields to an empty string so we can use validator functions
    data.name_en = !isEmpty(data.name_en) ? data.name_en : ""
    data.name_ar = !isEmpty(data.name_ar) ? data.name_ar : ""


    if (Validator.isEmpty(data.name_en)) {
        errors.name_en = "English Name field is required"
    }

    if (Validator.isEmpty(data.name_ar)) {
        errors.name_ar = "Arabic Name field is required"
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}

export default validateInsuranceInput