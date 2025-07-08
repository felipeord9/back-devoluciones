const { models } = require('../libs/sequelize')

const find = () => {
  const agencies = models.Agency.findAll()
  return agencies
}

module.exports = {
  find
}