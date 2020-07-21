const { Client } = require('pg')
const client = new Client()

module.exports = function(app) {
  app.get('/', async function(req, res) {
    let result
    try {
      await client.connect()
      result = await client.query('SELECT $1::varchar AS my_first_query', ['node hero'])
    } catch (err) {
      console.log(err.stack)
    }
    res.render('main', { content: 'dashboard', data: result.rows[0].my_first_query })
    try {
      await client.end()
    } catch (err) {
      console.log(err.stack)
    }
  });
}