const { Pool } = require('pg')
const pool = new Pool()

module.exports = function(app) {
  app.get('/customers', async function(req, res) {   
    try {
      const result = await pool.query('SELECT id, name FROM customers')
      res.render('main', { data: { list: 'list/customers', rows: result.rows }})
    } catch (err) {
      console.log(err.message)
      res.sendStatus(500)
    }
  })
}
