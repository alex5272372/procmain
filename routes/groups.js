const { Pool } = require('pg')
const pool = new Pool()

module.exports = function(app) {
  app.get('/groups', async function(req, res) {   
    try {
      const result = await pool.query(`
        SELECT groups.id AS id, users.name AS user_name, roles.name AS role_name FROM groups
        JOIN users ON groups.user_id = users.id
        JOIN roles ON groups.role_id = roles.id
      `)
      res.render('main', { list: 'list/groups', detail: false, rows: result.rows })
    } catch (err) {
      console.log(err.message)
      res.sendStatus(500)
    }
  })
}
