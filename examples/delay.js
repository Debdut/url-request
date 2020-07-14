const Url = require('../lib')

Url('https://my-json-server.typicode.com')
  .go('typicode/demo')
  .go('posts')
  .delay(2000, () => console.log('Wait 2s'))
  .get()
  .then(json => console.log(json)) 
  .catch(err => console.error('[Error]', err))

// Wait 2s
// [
//   { id: 1, title: 'Post 1' },
//   { id: 2, title: 'Post 2' },
//   { id: 3, title: 'Post 3' }
// ]