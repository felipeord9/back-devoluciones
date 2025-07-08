const express = require('express')
const passport = require('passport')
const BranchController = require('../../controllers/branchController')
const { checkRoles } = require('../../middlewares/authHandler')

const router = express.Router()

router.use(
  passport.authenticate('jwt', { session: false }), 
)

router
  .get('/', BranchController.findAllBranches)
  .get('/:id', BranchController.findOneBranch)
  .post('/', checkRoles("admin"), BranchController.createBranch)
  .patch('/:id', checkRoles("admin"), BranchController.updateBranch)

module.exports = router