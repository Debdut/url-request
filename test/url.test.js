const assert = require('assert')

const Url = require('../lib/index')

describe('Url Class', () => {
  describe('url Generate', () => {
    const url = Url('https://api.workpay.com')
      .go('rooms')
      .go('open/users')
      .query({ id: [10, 12, 13, 14] })
      .query({ access_token: '<TOKEN>', password: '<PASSWORD>'})
      .fragment('bio')
      .url

    it('generate complete url', () => {
      assert.equal(url, 'https://api.workpay.com/rooms/open/users?id=10,12,13,14&access_token=<TOKEN>&password=<PASSWORD>#bio')
    })
  })

  describe('GET Request', () => {

    const request = Url('https://postman-echo.com')
      .go('get')
      .query({ foo1: 'bar1' })
      .query({ foo2: 'bar2' })
      .get()

    it('has a response', async () => {
      const expected = { foo1: 'bar1', foo2: 'bar2' }
      request
        .then(response => assert.deepEqual(response.args, expected))
        .catch(err => console.log(err))
    })
  })

  describe('POST Request', () => {

    const body = { foo1: 'bar1', foo2: 'bar2' }
    const request = Url('https://postman-echo.com')
      .go('post')
      .post(body)

    it('has a response', async () => {
      request
        .then(response => assert.deepEqual(response.data, body))
        .catch(err => console.log(err))
    })
  })
})
