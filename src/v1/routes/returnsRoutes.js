const express = require('express')
const passport = require('passport')
const ReturnController = require('../../controllers/returnController')
const { checkRoles } = require('../../middlewares/authHandler')

const router = express.Router()

router
  .get(
    '/', 
    passport.authenticate('jwt', { session: false }), 
    checkRoles('admin', 'supervisor'), 
    ReturnController.findAllReturn
  )
  .get(
    '/seller/:sellerId', 
    passport.authenticate('jwt', { session: false }), 
    checkRoles('vendedor'), 
    ReturnController.findAllReturnsBySeller
  )
  .get(
    '/co/:coId', 
    passport.authenticate('jwt', { session: false }), 
    checkRoles('agencia'), 
    ReturnController.findAllReturnsByCO
  )
  .get(
    '/:id', 
    passport.authenticate('jwt', { session: false }), 
    /* checkRoles('admin'),  */
    ReturnController.findOneReturn
  )
  .get(
    '/creator/:id', 
    passport.authenticate('jwt', { session: false }), 
    /* checkRoles('admin'),  */
    ReturnController.findOneByCreator
  )
  .get(
    '/find/clientes', 
    passport.authenticate('jwt', { session: false }), 
    checkRoles('Autorizador clientes'), 
    ReturnController.findAllByClients
  )
  .get(
    '/find/agencias', 
    passport.authenticate('jwt', { session: false }), 
    checkRoles('Autorizador agencias'), 
    ReturnController.findAllByAgencies
  )
  .get(
    '/find/autorizadas', 
    passport.authenticate('jwt', { session: false }), 
    checkRoles('logistica'), 
    ReturnController.findAllAutorizadas
  )
  .get(
    '/verify/:token', 
    ReturnController.verifyToken
  )
  .post(
    '/', 
    passport.authenticate('jwt', { session: false }), 
    checkRoles('admin', "solicitante", "agencia"), 
    ReturnController.createReturn
  )
  .patch(
    "/:id",
    passport.authenticate('jwt', { session: false }),
    checkRoles('admin', 'Autorizador clientes', 'Autorizador agencias', 'logistica', 'supervisor'),
    ReturnController.updateReturn
  )
  .post(
    '/add-item', 
    ReturnController.addItemReturn
  )
  .delete(
    '/:id', 
    passport.authenticate('jwt', { session: false }), 
    /* checkRoles('admin'), */ 
    ReturnController.deleteReturn
  )

module.exports = router