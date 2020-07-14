const Url = require('../lib')

// Json Response Default
Url('https://postman-echo.com')
  .go('post')
  // Default Behaviour
  // .encodeResponse('json')
  .post({ foo1: 'bar1', foo2: 'bar2' })
  .then(response => console.log(response))


// String Response Encode

Url('https://postman-echo.com')
  .go('post')
  .encodeResponse('string')
  .post({ foo1: 'bar1', foo2: 'bar2' })
  .then(response => console.log(response))


// Buffer Response

Url('https://postman-echo.com')
  .go('post')
  .encodeResponse('buffer')
  .post({ foo1: 'bar1', foo2: 'bar2' })
  .then(response => console.log(response))


  // Full Response - Null

Url('https://postman-echo.com')
  .go('post')
  .encodeResponse(null)
  .post({ foo1: 'bar1', foo2: 'bar2' })
  .then(response => console.log(response))

