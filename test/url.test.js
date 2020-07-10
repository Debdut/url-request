const assert = require('assert')

const Url = require('./index')

describe('Url Class', () => {
  describe('url Generate', () => {
    const url = new Url('https://api.workpay.com')
      .go('rooms')
      .go('open/users')
      .query({ id: [10, 12, 13, 14] })
      .query({ access_token: '<TOKEN>', password: '<PASSWORD>'})
      .fragment('bio')
      .url

    it('generate complete url', () => {
      assert.equal(url, 'https://api.workpay.com//rooms/open/users?id=10,12,13,14&access_token=<TOKEN>&password=<PASSWORD>#bio')
    })
  })
})