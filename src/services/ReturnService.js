const { Op, or } = require("sequelize");
const { models } = require("../libs/sequelize");

const find = () => {
  const returns = models.Return.findAll({
    include: [
      "items",
      "user"
    ],
    order: [["id", "DESC"]],
    limit: 12000,
  });

  return returns
};

const findBySeller = (sellerId) => {
  const returns = models.Return.findAll({
    where: {
      sellerId
    },
    include: [
      "items",
      "user"
    ],
    order: [["id", "DESC"]],
    limit: 5000,
  });

  return returns
};

const findByCO = (coId) => {
  const returns = models.Return.findAll({
    where: {
      coId
    },
    include: [
      "items",
      "user"
    ],
    order: [["id", "DESC"]],
    limit: 5000,
  });

  return returns
};

const finOne = (id) => {
  console.log(id)
  const order = models.Return.findOne({
    where: {
      id
    },
    include: [
      "items",
      "user"
    ],
  })

  if(!order) throw Error('No se encontró la orden')

  return order
}

const findByCreator = (id) => {
  console.log(id)
  const order = models.Return.findAll({
    where: {
      userId: id
    },
    include: [
      "items",
      "user"
    ],
    order: [["id", "DESC"]],
    limit: 5000,
  })

  if(!order) throw Error('No se encontró la orden')

  return order
}

const findByClients = () => {
  console.log('consulta por clientes')
  const order = models.Return.findAll({
    where: {
      typeApplicant: 'Cliente'
    },
    include: [
      "items",
      "user"
    ],
    order: [["id", "DESC"]],
    limit: 5000,
  })

  if(!order) throw Error('No se encontró la orden')

  return order
}

const findByAgencias = () => {
  const order = models.Return.findAll({
    where: {
      typeApplicant: 'Agencia'
    },
    include: [
      "items",
      "user"
    ],
    order: [["id", "DESC"]],
    limit: 5000,
  })

  if(!order) throw Error('No se encontró la orden')

  return order
}

const findByAutorizadas = () => {
  const order = models.Return.findAll({
    where: {
      state: 'Autorizado'
    },
    include: [
      "items",
      "user"
    ],
    order: [["id", "DESC"]],
    limit: 5000,
  })

  if(!order) throw Error('No se encontró la orden')

  return order
}

const findFilteredByDate = (initialDate, finalDate) => {
  const returns = models.Return.findAll({
    where: {
      [Op.and]: [
        {
          createdAt: { [Op.gte] : initialDate}
        },
        {
          createdAt : { [Op.lte]: finalDate}
        }
      ]
    },
    include: [
      "items"
    ],
    return: [["id", "DESC"]]
  });

  if(!returns) throw Error('No hay pedidos en ese rango de fechas')

  return returns
}

const addItem = (body) => {
  const newItem = models.ReturnProduct.create(body)

  return newItem
}

const create = async (body) => {
  const newReturn = models.Return.create(body)
  return newReturn
}

const update = async (id, changes) => {
  const order = await finOne(id)
  console.log(order)
  const updatedOrder = order.update(changes)

  return updatedOrder
}

const remove = async(id)=>{
    const order = finOne(id)
    ;(await order).destroy(id)
}

/* const remove = async (id) => {
  const order = await finOne(id)
  models.Order.beforeDestroy(async (order) => {
    await models.ReturnProduct.destroy({ where: { returnId: order.id } })
  })
  models.Return.sequelize.query(`ALTER SEQUENCE orders_id_seq RESTART WITH ${id};`)
  models.Return.sequelize.query(`ALTER SEQUENCE co_${order.coId}_seq RESTART WITH ${order.rowId};`)
  await order.destroy(id)
  return id
}
 */
module.exports = {
  find,
  findBySeller,
  findByCO,
  finOne,
  findFilteredByDate,
  findByAgencias,
  findByClients,
  findByCreator,
  findByAutorizadas,
  create,
  update,
  addItem,
  remove
}