const { Client } = require('pg')
const client = new Client({
  user: 'postgres',
  host: 'procmain.eu',
  database: 'acc',
  password: 'FS9final',
  port: 5432
})

module.exports = function(app) {
  app.get('/', async function(req, res) {
    await client.connect()
    const result = await client.query('SELECT $1::varchar AS my_first_query', ['node hero'])
    console.log(result)
    res.render('main')
    await client.end()
  });
}