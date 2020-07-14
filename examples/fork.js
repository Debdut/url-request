const Url = require('../lib')

const Api = Url('https://my-json-server.typicode.com')
  .go('typicode', 'demo')

const Posts = Api
  .fork()
  .go('posts')

const Comments = Api
  .fork()
  .go('comments')

const Post = (id) => Posts
  .fork()
  .go(id)

const apis = [ Posts, Post(2), Comments ]

for (let index = 0; index < apis.length; index++) {
  const api = apis[index]
  api
    .get()
    .then(response => console.log(response, '\n'))
    .catch(err => console.log(err))
  
}

// [
//   { id: 1, title: 'Post 1' },
//   { id: 2, title: 'Post 2' },
//   { id: 3, title: 'Post 3' }
// ]

// { id: 2, title: 'Post 2' }

// [
//   { id: 1, body: 'some comment', postId: 1 },
//   { id: 2, body: 'some comment', postId: 1 }
// ]