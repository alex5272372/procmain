module.exports = function(app) {
  app.get('/settings', function(req, res) {   
    res.render('main', { data: { detail: 'settings' }})
  })
}
