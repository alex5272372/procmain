module.exports = function(app) {
  app.get('/sign-up', function(req, res) {   
    res.render('main', { data: { modal: 'signUp' }})
  })
}
