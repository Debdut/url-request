const Url = require('../lib')

const url = Url('https://api.workpay.com')
  .go('rooms')
  .go('open/users')
  .query({ id: [10, 12, 13, 14] })
  .query({ access_token: 'my-token', password: 'password'})
  .fragment('bio')
  .url

console.log(url)
// https://api.workpay.com/rooms/open/users?id=10,12,13,14&access_token=my-token&password=password#bio