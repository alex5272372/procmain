const { Pool } = require('pg')
const pool = new Pool()

module.exports = function(app) {
  app.get('/users', async function(req, res) {   
    try {
      const result = await pool.query('SELECT id, name FROM users')
      res.render('main', { list: 'list/users', detail: false, rows: result.rows })
    } catch (err) {
      console.log(err.message)
      res.sendStatus(500)
    }
  })
}