module.exports = function(app) {
  app.get('/', async function(req, res) {
    res.render('main', { list: false, detail: 'dashboard' })
  })
}
