const boom = require('@hapi/boom')
const { models } = require("../libs/sequelize");

const find = async () => {
  const branches = await models.Branch.findAll({
    include: ["vendedor", "client"],
    order: [["id", "ASC"]]
  });
  return branches;
};

const findOne = async (id) => {
  const branch = await models.Branch.findByPk(id)

  if(!branch) boom.notFound('No se encontro la sucursal')
  
  return branch
}

const create = async (data) => {
  const branch = await models.Branch.create(data)
  
  return branch
}

const update = async (id, changes) => {
  const branch = await findOne(id)
  const updatedBranch = await branch.update(changes)

  return updatedBranch
}

module.exports = {
  find,
  findOne,
  create,
  update
}