module.exports = function(app) {
  app.get('/', async function(req, res) {
    res.render('main', { data: { detail: 'dashboard' }})
  })
}
