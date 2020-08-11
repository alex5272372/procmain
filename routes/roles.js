const { Pool } = require('pg')
const pool = new Pool()

module.exports = function(app) {
  app.get('/roles', async function(req, res) {   
    try {
      const result = await pool.query('SELECT id, name FROM roles')
      res.render('main', { data: { list: 'list/roles', rows: result.rows }})
    } catch (err) {
      console.log(err.message)
      res.sendStatus(500)
    }
  })
}
