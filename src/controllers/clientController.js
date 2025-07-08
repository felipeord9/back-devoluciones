const ClientService = require("../services/clientService");

const findAllClients = async (req, res, next) => {
  try {
    const data = await ClientService.find();

    res.status(200).json({
      message: "OK",
      data,
    });
  } catch (error) {
    next(error);
  }
};

const findOneClient = async (req, res, next) => {
  try {
    const { params:{id}} = req
    const data = await ClientService.findOne(id)

    res.status(200).json({
      message: 'OK',
      data
    })
  } catch (error) {
    next(error)
  }
}

const createClient = async (req, res, next) => {
  try {
    const {body} = req
    const data = await ClientService.create(body)

    res.status(201).json({
      message: 'Created',
      data
    })
  } catch (error) {
    next(error)
  }
}

const updateClient =async (req, res, next) => {
  try {
    const { body, params: { id } } = req
    const data = await ClientService.update(id, body)

    res.status(200).json({
      message: 'Updated',
      data
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  findAllClients,
  findOneClient,
  createClient,
  updateClient
}