const { Pool } = require('pg')
const pool = new Pool()

module.exports = function(app) {
  app.get('/products', async function(req, res) {   
    try {
      const result = await pool.query('SELECT id, name FROM products')
      res.render('main', { list: 'list/products', detail: false, rows: result.rows })
    } catch (err) {
      console.log(err.message)
      res.sendStatus(500)
    }
  })
}