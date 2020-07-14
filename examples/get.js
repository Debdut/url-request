const Url = require('../lib')

Url('https://my-json-server.typicode.com')
  .go('typicode/demo')
  .go('posts')
  .get()
  .then(json => console.log(json)) 
  .catch(err => console.error('[Error]', err))

// [
//   { id: 1, title: 'Post 1' },
//   { id: 2, title: 'Post 2' },
//   { id: 3, title: 'Post 3' }
// ]