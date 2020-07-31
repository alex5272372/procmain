const { Pool } = require('pg')
const pool = new Pool()

module.exports = function(app) {
  app.get('/', async function(req, res) {
    try {
      const result = await pool.query('SELECT $1::varchar AS my_first_query', ['node hero'])
      res.render('main', { list: false, detail: 'dashboard', data: result.rows[0].my_first_query })
    } catch (err) {
      console.log(err.message)
      res.sendStatus(500)
    }
  })
}
