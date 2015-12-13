var dsConfig = require('../datasources.json');

module.exports = function(app) {
  var User = app.models.user;

  //verified
  app.get('/verified', function(req, res) {
    res.render('verified');
  });


};