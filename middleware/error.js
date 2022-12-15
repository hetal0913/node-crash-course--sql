const { ValidationError } = require("express-validation");
const {
  ForeignKeyConstraintError,
  UniqueConstraintError,
  SequelizeValidationError,
} = require("sequelize");
const APIError = require("../utils/APIError");

/**
 * Get validation error messages
 * @param {} error
 */

const getErrorMessages = (error) => {
  error = error.details;

  let validateError = [];

  if (error.params) error.params.map((err) => validateError.push(err.message));
  else if (error.query)
    error.query.map((err) => validateError.push(err.message));
  else if (error.body) error.body.map((err) => validateError.push(err.message));

  return validateError;
};

/**
 * Error handler, it will send stacktrace only during development
 * @param {} err
 * @param {} req
 * @param {} res
 * @param {} next
 */

exports.handler = (err, req, res, next) => {
  let message = err.message || "Something went wrong! Please try again later";

  if (!err.isPublic) err.message = err.stack || message;

  if (err.status === 422) message = "Invalid or missing parameters";
  else if (err.status === 500) {
    err.url = req.url;
    err.errMsg = message;
    err.params = { ["correlation-id"]: req["correlation-id"] };
    return next(err);
  }

  if (err.stack) console.log(err.stack);
  if (err.errors) console.log(err.errors);

  // return res.status(err.status).send({status: err.status, message: message, data: err.data});
  return res.sendJson(err.status, message, err.data);
};

/**

* If error is not an instance of apierror, then convert it
* @param {} err
* @param {} req
* @param {} res
* @param {} next
*/

exports.converter = (err, req, res, next) => {
  let convertedError = err;
  console.log("converter function");
  console.log(typeof err);
  if (err instanceof ValidationError) {
    console.log("=====first if");
    convertedError = new APIError({ status: 422, data: getErrorMessages(err) });
  } else if (
    err instanceof ForeignKeyConstraintError ||
    err instanceof UniqueConstraintError
  ) {
    console.log("second if=========");
    convertedError = new APIError({
      status: 400,
      message: "Params missing or not allowed",
      data: "Params missing or not allowed",
    });
  } else if (err.name === "SequelizeValidationError") {
    console.log("==== inside model error =======");
    const errors = err.errors;

    const errorList = []
    errors.map((e) => {

      errorList.push(e.message);
    
    });
    convertedError = new APIError({ status: 400, message: errorList });
  } else if (!(err instanceof APIError)) {
    console.log("third if=========");
    convertedError = new APIError({ status: 500, isPublic: false, stack: err });
  } else {
    console.log("===else ===");
  }

  return this.handler(convertedError, req, res, next);
};

/**
 * Catch 404 error
 * @param {} req
 * @param {} res
 * @param {} next
 */

exports.notFound = (req, res, next) => {
  const err = { status: 404, message: "URL Not Found", isPublic: true };
  return this.handler(err, req, res);
};
