module.exports = function(app) {
  app.get('/sign-in', function(req, res) {   
    res.render('main', { data: { modal: 'signIn' }})
  })
}
