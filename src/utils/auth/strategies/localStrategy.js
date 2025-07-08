const { Strategy } = require('passport-local')

const AuthService = require('../../../services/authService')

const options = {
  usernameField: 'email',
  passwordField: 'password'
}

const LocalStrategy = new Strategy(
  options, async (email, password, done) => {
    try {
      const user = await AuthService.getUser(email, password)
      done(null, user)
    } catch (error) {
      done(error, false)
    }
  }
)

module.exports = LocalStrategy