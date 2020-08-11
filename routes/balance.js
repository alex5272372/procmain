module.exports = function(app) {
  app.get('/balance', async function(req, res) {   
    res.render('main', { data: { detail: 'balance' }})
  })
}
