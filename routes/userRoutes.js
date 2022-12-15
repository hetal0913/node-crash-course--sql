const express = require("express");
const {
  getAllUsers,
  getAllUsersWithJoin,
  getUserById,
  createUser,
  createUserPermit,
  deleteById,
  deleteAll,
  softDelete,
  getAllDeletedUsers,
  testScope
} = require("../controllers/userController");
const router = express.Router();
const { validate } = require("express-validation");
const userValidation = require("../validations/user");
const {isAuth} = require('../middleware/authentication');

router.get("/", isAuth(), getAllUsers);
router.get("/deleted", getAllDeletedUsers);
router.get("/join", getAllUsersWithJoin);
router.get("/test/:id", testScope); 
// router.get("/:id", getUserById);

router.post(
  "/",
  // validate(userValidation.createUser, { context: true }),
  createUser
);
router.post(
  "/permit",
  validate(userValidation.createUserPermit, { context: true }),
  createUserPermit
);
router.delete("/", deleteAll);
router.delete("/:id", deleteById);
router.post("/soft_delete/:id", softDelete);



module.exports = router;
