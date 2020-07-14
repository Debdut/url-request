const Url = require('../lib')

const post = async () => {
  const request = Url('https://postman-echo.com')
    .go('post')
    .post({ foo1: 'bar1', foo2: 'bar2' })
  
  const response = await request
  console.log(response)
}

post()

// {
//   args: {},
//   data: { foo1: 'bar1', foo2: 'bar2' },
//   files: {},
//   form: {},
//   headers: {
//     'x-forwarded-proto': 'https',
//     'x-forwarded-port': '443',
//     host: 'postman-echo.com',
//     'x-amzn-trace-id': 'Root=1-5f0cb2fd-f55ca6462a7dad68ecc790f0',
//     'content-length': '29',
//     accept: 'application/json',
//     'accept-encoding': 'br, gzip, deflate',
//     'content-type': 'application/json'
//   },
//   json: { foo1: 'bar1', foo2: 'bar2' },
//   url: 'https://postman-echo.com/post'
// }