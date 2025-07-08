const { config} = require("../config/config")

module.exports = {
  production: {
    url: config.dbUrl,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false
      }
    }
  },
  development: {
    url: config.dbUrl,
    dialect: 'postgres'
  },
}