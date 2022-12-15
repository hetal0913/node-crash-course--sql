const addressHelper = require('./addressHelper')

exports.getData = async (user) => {
    const data = {
        id: user.id,
        first_name: user.first_name,
        mobile_no: user.mobile_no,
        addressData: await addressHelper.getAddData({ userId: user.id})
    }
    return data;
}