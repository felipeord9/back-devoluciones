const ReturnService = require('../services/ReturnService')
const { config } = require("../config/config");
const jwt = require("jsonwebtoken");

const findAllReturn = async (req, res, next) => {
  try {
    const data = await ReturnService.find()

    res.status(200).json({
      message: 'OK',
      data 
    })
  } catch (error) {
    console.log(error)
    next(error)
  }
}

const findAllReturnsBySeller = async (req, res, next) => {
  try {
    const { sellerId } = req.params
    const data = await ReturnService.findBySeller(sellerId)

    res.status(200).json({
      message: 'OK',
      data 
    })
  } catch (error) {
    next(error)
  }
}

const findAllReturnsByCO = async (req, res, next) => {
  try {
    const { coId } = req.params
    const data = await ReturnService.findByCO(coId)

    res.status(200).json({
      message: 'OK',
      data 
    })
  } catch (error) {
    next(error)
  }
}

const findOneReturn = async (req, res, next) => {
  try {
    const { params: { id }} = req
    const data = await ReturnService.finOne(id)

    res.status(200).json({
      message: 'OK',
      data
    })
  } catch (error) {
    console.log(error)
    next(error)
  }
}

const findOneByCreator = async (req, res, next) => {
  try {
    const { params: { id }} = req
    const data = await ReturnService.findByCreator(id)

    res.status(200).json({
      message: 'OK',
      data
    })
  } catch (error) {
    console.log(error)
    next(error)
  }
}

const findAllByClients = async (req, res, next) => {
  try {
    const data = await ReturnService.findByClients()

    res.status(200).json({
      message: 'OK',
      data
    })
  } catch (error) {
    console.log(error)
    next(error)
  }
}

const findAllByAgencies= async (req, res, next) => {
  try {
    const data = await ReturnService.findByAgencias()

    res.status(200).json({
      message: 'OK',
      data
    })
  } catch (error) {
    console.log(error)
    next(error)
  }
}

const findAllAutorizadas= async (req, res, next) => {
  try {
    const data = await ReturnService.findByAutorizadas()

    res.status(200).json({
      message: 'OK',
      data
    })
  } catch (error) {
    console.log(error)
    next(error)
  }
}

const findFilteredReturnsByDate = async (req, res, next) => {
  try {
    const { query: { init, final }} = req
    const data = await ReturnService.findFilteredByDate(init, final)

    res.status(200).json({
      message: 'OK',
      data
    })
  } catch (error) {
    
  }
}

const createReturn = async (req, res, next) => {
  try {
    const { body } = req
    console.log(body)
    const data = await ReturnService.create({
      observations: body.observations,
      clientId: body.client !== null ? parseInt(body.client.nit) : null,
      clientDescription: body.client !== null ? body.client.razonSocial : null,
      userId: body.createdBy,
      state: body.state,
      sellerId: body.seller !== null ? body.seller.id : null,
      sellerDescription: body.seller !== null ? body.seller.tercero.razonSocial : null,
      branchId: body.branch !== null ? body.branch.id : null,
      branchDescription: body.branch !== null ? body.branch.descripcion : null,
      coId: body.agency !== null ? body.agency.id : null,
      coDescription: body.agency !== null ? body.agency.descripcion : null,
      createdAt: body.createdAt,
      typeApplicant: body.typeApplicant,
      evidence: body.evidence,
    })
    
    for(let product of body.products.agregados) {
      await ReturnService.addItem({
        amount: Number(product.amount),
        reason: product.reason,
        returnId: data.id,
        productId: product.id
      })
    }

    res.status(201).json({
      message: 'Created',
      data
    })
  } catch (error) {
    console.log(error)
    next(error)
  }
}

const updateReturn = async (req, res, next) => {
  try {
    const { body, params: { id }} = req
    const data = await ReturnService.update(id, body)

    res.status(200).json({
      message: "Updated",
      data
    })
  } catch (error) {
    console.log(error)
    next(error)
  }
}

const updateReturn2 = async (req, res, next) => {
  try {
    const { id , body } = req
    const data = await ReturnService.update(id, body)

    res.status(200).json({
      message: "Updated",
      data
    })
  } catch (error) {
    console.log(error)
    next(error)
  }
}

const verifyToken = async (req, res, next) =>{
  try{
    const { params: { token }} = req
    
    jwt.verify(token, config.jwtSecret, async (err, decoded) =>{
      if (err) {
        return res.status(500).json({ message: "Token inválido o expirado" });
      }else{
        
        const data = await ReturnService.finOne(decoded.id)
        
        res.status(200).json({
            message:'Token válido',
            data
        })
      }
    })
  } catch(error){
    console.log(error)
      next(error)
  }
}

const addItemReturn = async (req, res, next) => {
  try {
    const { body } = req
    const data = await ReturnService.addItem(body)

    res.status(201).json({
      message: 'Created',
      data
    })
  } catch (error) {
    next(error)
  }
}

const deleteReturn = async (req, res, next) => {
  try {
    const { params: { id } } = req
    const data = await ReturnService.remove(id)

    res.status(202).json({
      message: 'Deleted',
      data
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  findAllReturn,
  findAllReturnsBySeller,
  findAllReturnsByCO,
  findOneReturn,
  findFilteredReturnsByDate,
  findAllByAgencies,
  findAllByClients,
  findAllAutorizadas,
  findOneByCreator,
  verifyToken,
  createReturn,
  updateReturn,
  updateReturn2,
  addItemReturn,
  deleteReturn
}