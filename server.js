var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/dist'));

app.get('/', function(req, res) {
	res.render('dist/index');
});

app.listen(app.get('port'), function() {
	console.log('Node app is running on port', app.get('port'));
});

app.use(function(req, res, next) {
  res.status(404).send('ERROR #404: page not found');
});