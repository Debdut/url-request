const Url = require('../lib')

// Json Response Default
new Url('https://postman-echo.com')
  .go('post')
  // Default Behaviour
  // .encodeResponse('json')
  .post({ foo1: 'bar1', foo2: 'bar2' })
  .then(response => console.log(response))


// String Response Encode

new Url('https://postman-echo.com')
  .go('post')
  .encodeResponse('string')
  .post({ foo1: 'bar1', foo2: 'bar2' })
  .then(response => console.log(response))


// Buffer Response

new Url('https://postman-echo.com')
  .go('post')
  .encodeResponse('buffer')
  .post({ foo1: 'bar1', foo2: 'bar2' })
  .then(response => console.log(response))


  // Full Response - Null

new Url('https://postman-echo.com')
  .go('post')
  .encodeResponse(null)
  .post({ foo1: 'bar1', foo2: 'bar2' })
  .then(response => console.log(response))

