const { Client } = require('pg')
const client = new Client()

module.exports = function(app) {
  app.get('/', async function(req, res) {
    await client.connect()
    const result = await client.query('SELECT $1::varchar AS my_first_query', ['node hero'])
    res.render('main', { content: 'dashboard', data: result.rows[0].my_first_query })
    await client.end()
  });
}