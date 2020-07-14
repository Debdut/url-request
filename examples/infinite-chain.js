const Url = require('../lib')

Url('https://my-json-server.typicode.com')
  .go('typicode/demo')
  .go('posts')
  .get()
  .then(json => console.log('[1]', json)) 
  .catch(err => console.error('[Error]', err))
  .go(1)
  .get()
  .then(json => console.log('[2]', json)) 
  .catch(err => console.error('[Error]', err))


// [1] [
//   { id: 1, title: 'Post 1' },
//   { id: 2, title: 'Post 2' },
//   { id: 3, title: 'Post 3' }
// ]
// [2] { id: 1, title: 'Post 1' }