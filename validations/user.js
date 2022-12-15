const {Joi}= require('express-validation');
const { errorMessage } = require('../helper/errorHelper')
const { ADDRESS_TYPE, USER_TYPE } = require('../utils/enums')
const patterns = require('../utils/pattern')

exports.createUser = {
    body: Joi.object({
        user: Joi.object({
            first_name:  Joi.string().trim().min(5).max(30).required().messages(errorMessage('First Name', '', 5, 30)),
            last_name: Joi.string().trim().min(5).max(30).required().messages(errorMessage('Last Name', '', 5, 30)),
            user_type: Joi.string().trim().required().valid(...Object.values(USER_TYPE)).messages(errorMessage('User Type')),
            mobile_no: Joi.string().trim().required().regex(patterns.mobile).messages(errorMessage('Mobile No'))
        }).not({}).required().messages(errorMessage("user")),
        address: Joi.object({
            city: Joi.string().trim().required().messages(errorMessage('City')),
            address1: Joi.string().trim().allow(null).messages(errorMessage('Home Address')),
            address_type: Joi.string().trim().required().valid(...Object.values(ADDRESS_TYPE))
        }).optional()
    }).options({abortEarly: false})
}

exports.createUserPermit = {
    body: Joi.object({
        user: Joi.object({
            first_name:  Joi.string().trim().min(5).max(30).required().messages(errorMessage('First Name', '', 5, 30)),
            last_name: Joi.string().trim().min(5).max(30).required().messages(errorMessage('Last Name', '', 5, 30))
        }).not({}).required().messages(errorMessage("user"))
    }).options({allowUnknown: true, abortEarly: false})
}