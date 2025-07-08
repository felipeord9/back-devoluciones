const boom = require('@hapi/boom')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const MailService = require('./mailService')
const UserService = require('./userService')
const { config } = require('../config/config')

const getUser = async (email, password) => {
  const user = await UserService.findByUsername(email)

  const isMatch = await bcrypt.compare(password, user.password)

  if (!isMatch) throw boom.unauthorized()

  delete user.dataValues.password
  return user
}

const signToken = (user) => {
  const payload = {
    sub: user.id,
    role: user.role
  }
  const token = jwt.sign(payload, config.jwtSecret)
  return {
    user, token
  }
}

const changePassword = async (id, currentPassword, newPassword) => {
  const user = await UserService.findOne(id)

  const isMatch = bcrypt.compareSync(currentPassword, user.password)

  if(!isMatch) throw boom.unauthorized()

  const hash = bcrypt.hashSync(newPassword, 10)

  const updatedUser = await user.update({ password: hash })
  delete updatedUser.dataValues.password
  return updatedUser
}

const sendRecovery = async (email) => {
  const user = await UserService.findByEmail(email)

  if (!user) throw boom.unauthorized()

  const payload = { sub: user.id }
  const token = jwt.sign(payload, config.jwtSecret, {
    expiresIn: '15min'
  })
  const mail = {
    from: config.smtpEmail,
    to: user.email,
    subject: 'Email para recuperar contraseña',
    html: `<b>Ingresa aquí ${config.recoveryUrl}/${token}</b>`
  }

  const rta = await MailService.sendEmails(mail)
  await UserService.update(user.id, { recoveryToken: token })
  return rta
}

const changeRecoveryPassword = async (token, newPassword) => {
  try {
    console.log(token)
    const payload = jwt.verify(token, config.jwtSecret)
    const user = await UserService.findOne(payload.sub)

    if (user.recoveryToken !== token) throw boom.unauthorized()

    const hashedPassword = await bcrypt.hash(newPassword, 10)

    await UserService.update(user.id, {
      password: hashedPassword,
      recoveryToken: null
    })
    return { message: 'Password changed' }
  } catch (error) {
    throw boom.unauthorized()
  }
}

/* const sendMail = async (infoMail) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: config.smtpEmail,
      pass: config.smtpPassword
    }
  })
  await transporter.sendMail(infoMail)
  return { message: 'Mail sent' }
} */

module.exports = {
  getUser,
  signToken,
  changePassword,
  sendRecovery,
  changeRecoveryPassword,
  //sendMail
}