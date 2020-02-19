module.exports = function(app) {
  app.get('/users', async function(req, res) {
    res.render('main');
  });
}