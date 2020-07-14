const Url = require('../lib')

Url('https://postman-echo.com')
  .invoke('go', 'post')
  .invoke('post', { foo1: 'bar1', foo2: 'bar2' })
  .execute()
  .then(json => console.log(json.data))
  .catch(err => console.error(err))

// { foo1: 'bar1', foo2: 'bar2' }

const actions = [
  ['go', ['post']],
  ['post', [{ foo1: 'bar1', foo2: 'bar2' }]]
]

Url('https://postman-echo.com')
  .execute(actions)
  .then(json => console.log(json.data))
  .catch(err => console.error(err))

// { foo1: 'bar1', foo2: 'bar2' }