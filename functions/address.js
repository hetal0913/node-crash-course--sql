
exports.addDefaultAddress = async (user_id, models, options = {}) => {
    console.log(" inside default function")
    console.log(options)
    const address = await models.ADDRESSES.create({
        city: "abc",
        address1: "abc",
        address_type: "Home",
        user_id: user_id
    });
    console.log("after address created" + address)
    return address
}