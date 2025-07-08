const BranchService = require("../services/branchService")

const findAllBranches = async (req, res, next) => {
  try {
    const data = await BranchService.find();

    res.status(200).json({
      message: "OK",
      data,
    });
  } catch (error) {
    next(error);
  }
};

const findOneBranch = async (req, res, next) => {
  try {
    const { params: { id }} = req
    const data = await BranchService.findOne(id)

    res.status(200).json({
      message: "OK",
      data
    })
  } catch (error) {
    next(error)
  }
}

const createBranch = async (req, res, next) => {
  try {
    const { body } = req
    const data = await BranchService.create(body)

    res.status(201).json({
      message: 'Created',
      data
    })
  } catch (error) {
    next(error)
  }
}

const updateBranch = async (req, res, next) => {
  try {
    const { body, params: { id }} = req
    const data = await BranchService.update(id, body)

    res.status(200).json({
      message: "Updated",
      data
    })
  } catch (error) {
    
  }
}

module.exports = {
  findAllBranches,
  findOneBranch,
  createBranch,
  updateBranch
}