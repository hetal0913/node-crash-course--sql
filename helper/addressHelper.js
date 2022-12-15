const { ADDRESSES } = require('../middleware/database');

exports.getAddData = async (address) => {
    const add = await ADDRESSES.findOne({where: {user_id: address.userId }});
    var data = {}
    if (add) {
        data = {
            id: add.id,
            city: add.city,
            address: add.address1
        }
    } 
    return data;
}