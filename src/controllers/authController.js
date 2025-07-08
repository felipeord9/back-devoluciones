const AuthService = require('../services/authService')

const login = async (req, res, next) => {
  try {
    const { user } = req
    delete user.dataValues.recoveryToken
    res.status(200).json(AuthService.signToken(user))
  } catch (error) {
    console.log(error)
    next(error)
  }
}

const changePassword = async (req, res, next) => {
  try {
    const {user, body} = req
    const data = await AuthService.changePassword(user.sub, body.currentPassword, body.newPassword)

    res.status(200).json(data)
  } catch (error) {
    next(error)
  }
}

const sendRecovery = async (req, res, next) => {
  try {
    const { email } = req.body
    const data = await AuthService.sendRecovery(email)
    res.status(200).json(data)
  } catch (error) {
    console.log(error)
    next(error)
  }
}

const changeRecoveryPassword = async (req, res, next) => {
  try {
    const { token, newPassword } = req.body
    const data = await AuthService.changeRecoveryPassword(token, newPassword)
    res.status(200).json(data)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  login,
  changePassword,
  sendRecovery,
  changeRecoveryPassword
}