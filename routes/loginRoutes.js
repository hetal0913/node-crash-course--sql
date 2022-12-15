const router = require('express').Router();
const { validate } = require('express-validation');
const {loginSchema} = require('../validations/login')

router.post('/', validate(loginSchema, {context: true, keyByField: false}),(req, res, next) => {
    console.log('==== inside login ====')
    res.status(200).send({message: 'login api'})
});

module.exports = router;