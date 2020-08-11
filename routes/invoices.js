const { Pool } = require('pg')
const pool = new Pool()

module.exports = function(app) {
  app.get('/invoices', async function(req, res) {   
    try {
      const result = await pool.query('SELECT id, doc_date FROM invoices')
      res.render('main', { data: { list: 'list/invoices', rows: result.rows }})
    } catch (err) {
      console.log(err.message)
      res.sendStatus(500)
    }
  })
}
