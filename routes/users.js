const { Client } = require('pg')
const client = new Client()

module.exports = function(app) {
  app.get('/users', async function(req, res) {
    await client.connect()
    const result = await client.query('SELECT id, name FROM users')
    res.render('main', { content: 'users', rows: result.rows })
    await client.end()
  });
}