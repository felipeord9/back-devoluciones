const express = require('express')
const passport = require('passport')
const ClientController = require('../../controllers/clientController')
const { checkRoles } = require('../../middlewares/authHandler')

const router = express.Router()

router.use(
  passport.authenticate('jwt', { session: false })
)

router
  .get('/', ClientController.findAllClients)
  .get('/:id', ClientController.findOneClient)
  .post('/', checkRoles("admin"), ClientController.createClient)
  .patch('/:id', checkRoles("admin"), ClientController.updateClient)

module.exports = router