const userHelper = require('./userHelper');
const addressHelper = require('./addressHelper');

const validate_params = (main_param_key, child_params) => {
    
}

// unless params.has_key?(main_param_key)
// render_response(400, "error", "Invalid or Missing parameters.")
// return false
// end

// child_params.each do |param_key|
// unless params[main_param_key].has_key?(param_key) && params[main_param_key][param_key].present?
//   render_response(400, "error", "Invalid or Missing parameters.")
//   return false
// end
// end
// true

module.exports = {
    userHelper,
    addressHelper
}