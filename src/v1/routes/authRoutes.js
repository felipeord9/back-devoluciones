const express = require("express");
const passport = require("passport");
const AuthController = require("../../controllers/authController");

const router = express.Router();

router
  .post(
    "/login",
    passport.authenticate("local", { session: false }),
    AuthController.login
  )
  .post(
    '/change/password',
    passport.authenticate("jwt", { session: false }),
    AuthController.changePassword
  )
  .post("/send/recovery", AuthController.sendRecovery)
  .post("/recovery/password", AuthController.changeRecoveryPassword);

module.exports = router;
