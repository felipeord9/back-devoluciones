const AgencyService = require('../services/agencyService')

const findAllAgencies = async (req, res, next) => {
  try {
    const data = await AgencyService.find()
    
    res.status(200).json({
      status: 'OK',
      data
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  findAllAgencies
}