const { Client } = require('pg')
const client = new Client()

module.exports = function(app) {
  app.get('/users', async function(req, res) {
    let result
    try {
      await client.connect()
      result = await client.query('SELECT id, name FROM users')
    } catch (err) {
      console.log(err.stack)
    }
    res.render('main', { content: 'users', rows: result.rows })
    try {
      await client.end()
    } catch (err) {
      console.log(err.stack)
    }
  });
}