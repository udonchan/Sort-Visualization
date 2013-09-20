var express = require('express');
var path = require('path');
var app = express();
app.set('port', process.env.PORT || 3000)
    .set('views', __dirname + '/views')
    .set('view engine', 'ejs')
    .use(express.bodyParser())
    .use(express.methodOverride())
    .use(express.static(path.join(__dirname, 'public')))
    .get('/', function(req, res){
        res.render('index');
    })
    .use(express.errorHandler());

require('http').createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
