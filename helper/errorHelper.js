

exports.errorMessage = (data, message = null, min = null, max = null) => {
 return {
    'string.base': message ? `${data} ${message}` : `${data} must be a string.`,
    'string.pattern.base': message ? `${data} ${message}` : `${data} invalid.`,
    'string.empty': message ? `${data} ${message}` : `${data} can't be blank.`,
    'any.required': message ? `${data} ${message}` : `${data} can't be blank.`,
    'string.max': message ? `${data} ${message}` : `${data} length must be less than or equal to ${max} characters long.`,
    'string.min': message ? `${data} ${message}` : `${data} length must be greater than or equal to ${min} characters long`,
 }
}