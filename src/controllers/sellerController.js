const SellerService = require('../services/sellerService')

const findAllSellers = async (req, res, next) => {
  try {
    const data = await SellerService.find()

    res.status(200).json({
      message: 'OK',
      data
    })
  } catch (error) {
    next(error)
  }
}

const findOneSeller = async (req, res, next) => {
  try {
    const { params: { id }} = req
    const data = await SellerService.findOne(id)

    res.status(200).json({
      message: 'Ok',
      data
    })
  } catch (error) {
    next(error)    
  }
}

const createSeller = async (req, res, next) => {
  try {
    const { body } = req
    const data = await SellerService.create(body)

    res.status(201).json({
      message: 'Created',
      data
    })
  } catch (error) {
    next(error)    
  }
}

const updateSeller = async (req, res, next) => {
  try {
    const { body, params: { id } } = req
    const data = await SellerService.update(id, body)

    res.status(200).json({
      message: 'Updated',
      data
    })
  } catch (error) {
    next(error)    
  }
}

module.exports = {
  findAllSellers,
  findOneSeller,
  createSeller,
  updateSeller
}