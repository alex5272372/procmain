const { Pool } = require('pg')
const pool = new Pool()

module.exports = function(app) {
  app.get('/groups', async function(req, res) {   
    try {
      const result = await pool.query('SELECT id, user_id, role_id FROM groups')
      res.render('main', { list: 'groups', detail: false, rows: result.rows })
    } catch (err) {
      console.log(err.message)
      res.sendStatus(500)
    }
  })
}