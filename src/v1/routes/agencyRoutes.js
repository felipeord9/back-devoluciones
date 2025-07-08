const express = require('express')
const AgencyController = require('../../controllers/agencyController')

const router = express.Router()

router.get('/', AgencyController.findAllAgencies)

module.exports = router