const express = require('express')
const passport = require('passport')
const SellerController = require('../../controllers/sellerController')
const { checkRoles } = require('../../middlewares/authHandler')

const router = express.Router()

router.use(
  passport.authenticate('jwt', { session: false })
)

router
  .get('/', SellerController.findAllSellers)
  .get('/:id', SellerController.findOneSeller)
  .post('/', checkRoles("admin"), SellerController.createSeller)
  .patch('/:id', checkRoles("admin"), SellerController.updateSeller)

module.exports = router