const express = require("express");
const passport = require('passport')
const UserController = require("../../controllers/userController");
const { checkRoles } = require('../../middlewares/authHandler')

const router = express.Router();

router.use(
  passport.authenticate('jwt', { session: false }), 
  checkRoles('admin')
)

router
  .get("/", UserController.findAllUsers)
  .get("/:id", UserController.findOneUser)
  .post('/', UserController.createUser)
  .patch('/:id', UserController.updateUser)
  .delete('/:id', UserController.deleteUser);

module.exports = router