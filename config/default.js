module.exports = {
  SMTP:"smtps://7049a1e90d889a7c4b842c083e9f3e9f:5b65756961527259add7884ae1deaa9f@in-v3.mailjet.com",
  smtpConfig: {
    mailMode: "SMTP",
    host: "in-v3.mailjet.com ",
    port: 25,
    auth: {
      user: "7049a1e90d889a7c4b842c083e9f3e9f",
      pass: "5b65756961527259add7884ae1deaa9f"
    },
    logger: false,
    debug: false // include SMTP traffic in the logs
  },
  mongoUrl:'mongodb://localhost/Factis'
}