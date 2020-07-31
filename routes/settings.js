module.exports = function(app) {
  app.get('/settings', function(req, res) {   
    res.render('main', { list: false, detail: 'settings' })
  })
}
