const { Pool } = require('pg')
const pool = new Pool()

module.exports = function(app) {
  app.get('/users', async function(req, res) {   
    try {
      const result = await pool.query('SELECT id, username, name, email, tel FROM users')
      res.render('main', { data: { list: 'list/users', rows: result.rows }})
    } catch (err) {
      console.log(err.message)
      res.sendStatus(500)
    }
  })
}
