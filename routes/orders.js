const { Pool } = require('pg')
const pool = new Pool()

module.exports = function(app) {
  app.get('/orders', async function(req, res) {   
    try {
      const result = await pool.query('SELECT id, doc_date FROM orders')
      res.render('main', { data: { list: 'list/orders', rows: result.rows }})
    } catch (err) {
      console.log(err.message)
      res.sendStatus(500)
    }
  })
}
