const { AUTH_TOKENS, USERS } = require('./database');
const {_active} = require('../helper/attributesHelper');
const APIError = require('../utils/APIError');

exports.isAuth = () => async (req, res, next) => {
    try{
        const deviceToken = req.headers['x-device-token'] || null
        const authToken = req.headers['x-auth-token'] || null
        
        if (authToken == null || deviceToken == null) {throw new APIError({status: 400, message: "Invalid or missing header"})}
        const tokenExist = await AUTH_TOKENS.findOne({where: {..._active, auth_token: authToken, device_token: deviceToken}})
        if (!tokenExist) { throw new APIError({status: 404, message: "Invalid headers"}) };
        return next();
    } catch(err) {
        next(err);
    }
    
}