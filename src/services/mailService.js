const nodemailer = require("nodemailer")
const pdf = require('html-pdf')
const { config } = require('../config/config')

async function sendEmails(infoEmail) {  
  const transporter = nodemailer.createTransport({
    host: config.smtpHost,
    port: config.smtpPort,
    secure: true,
    auth: {
      user: config.smtpEmail,
      pass: config.smtpPassword
    }
  })

  if(!transporter) throw new Error('Error al conectar con el servidor de correo')

  const info = await transporter.sendMail(infoEmail)

  return info
}

async function generatePDF(info, callback) {
  pdf.create(info, {
    format: "A4",
    childProcessOptions: {
      env: {
        OPENSSL_CONF: '/dev/null',
      },
    }
  }).toBuffer((error, buffer) => {
    if(error) {
      callback(error, null)
    } else {
      callback(null, buffer)
    }
  })
}

module.exports = {
  sendEmails,
  generatePDF
}