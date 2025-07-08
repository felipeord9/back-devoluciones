const { models } = require('../libs/sequelize')

const find = () => {
  const products = models.Product.findAll()

  return products
}

const findOne = (id) => {
  const product = models.Product.findByPk(id)

  if(!product) throw new Error('No se encontro el producto')

  return product
}

const create = async (body) => {
  const newProduct = models.Product.create(body)
  return newProduct
}

const update = async (changes) => {
  const updatedProduct = models.Product.update(changes)
  return updatedProduct
}

module.exports = {
  find,
  findOne,
  create,
  update
}