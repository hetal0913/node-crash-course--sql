const { AUTH_TOKENS } = require("../middleware/database");

exports.generateToken = async (user_id, token) => {
  const deviceToken = token || null;
  const authenticationToken = crypto.randomBytes(10).toString("hex");
  const auth_token = await AUTH_TOKENS.create({
    device_token: deviceToken,
    auth_token: authenticationToken,
    user_id: user_id,
  });
  console.log(auth_token);
};
