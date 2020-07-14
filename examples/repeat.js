const Url = require('../lib')

Url('https://postman-echo.com/get')
  .get()
  .then(() => console.log('Ping Successful! Internet is up 🤟')) 
  .catch(() => console.log('Ping Failed! Internet is down 😭'))
  .repeat(1000, 100)
