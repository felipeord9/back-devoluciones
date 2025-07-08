const { ValidationError } = require('sequelize')

function errorHandler(error, req, res, next) {
  res.status(500).json({
    error: error.message,
    stack: error.stack
  })
}

function boomErrorHandler(error, req, res, next) {
  if (error.isBoom) {
    const { output } = error
    return res.status(output.statusCode).json(output.payload)
  }
  next(error)
}

function ormErrorHandler(err, req, res, next) {
  if (err instanceof ValidationError) {
    res.status(409).json({
      statusCode: 409,
      message: err.name,
      errors: err
    })
  }
  next(err)
}

module.exports = {
  errorHandler,
  boomErrorHandler,
  ormErrorHandler
}