const express = require('express')
const UserRoutes = require('./userRoutes')
const MailRoutes = require('./mailRoutes')
const ProductRoutes = require('./productRoutes')
const AgencyRoutes = require('./agencyRoutes')
const ClientRoutes = require('./clientRoutes')
const BranchRoutes = require('./branchRoutes')
const returnsRoutes = require('./returnsRoutes')
const AuthRoutes = require('./authRoutes')
const EvidenceRoutes = require('./evidenceRoutes')

function routerApi(app) {
    const router = express.Router()

    app.use('/api/v1/', router)

    router.use('/auth', AuthRoutes)
    router.use('/users', UserRoutes)
    router.use('/mail', MailRoutes)
    router.use('/products', ProductRoutes)
    router.use('/agencies', AgencyRoutes)
    router.use('/clients', ClientRoutes)
    router.use('/branches', BranchRoutes)
    router.use('/return', returnsRoutes)
    router.use('/upload', EvidenceRoutes)

}

module.exports = routerApi