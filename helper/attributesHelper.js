const Op = require('sequelize').Op;
const userAttributes = ["id", "first_name", "last_name"]
const addressAttributes = ["id", "city", "address1", "user_id", "address_type"]
const _active = {is_deleted: false, deleted_at: {[Op.eq]: null}}
const _nonActive = {is_deleted: true, deleted_at: {[Op.ne]: null}}
// const filterByName = (fname, lname) => () => {first_name: first_name, last_name: last_name}


const excludeFields = (keys = []) => {
    var defaultKeys = ['created_at', 'updated_at']
    keys = defaultKeys.concat(keys)
    return keys
}

module.exports = {
    userAttributes,
    addressAttributes,
    excludeFields,
    _active,
    _nonActive
}