const { models } = require('../libs/sequelize')

const find = () => {
  const sellers = models.Seller.findAll({
    order: [["id", "ASC"]]
  })
  return sellers
}

const findOne = (id) => {
  const seller = models.Seller.findByPk(id)

  if(!seller) throw Error("No se encontro el vendedor")

  return seller
}

const create = (data) => {
  const newSeller = models.Seller.create(data)

  return newSeller
}

const update = async (id, changes) => {
  const seller = await findOne(id)

  const updatedSeller = seller.update(changes)

  return updatedSeller
}

module.exports = {
  find,
  findOne,
  create, 
  update
}