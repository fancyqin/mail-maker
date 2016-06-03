var app = require('koa')()
  , koa = require('koa-router')()
  , logger = require('koa-logger')
  , json = require('koa-json')
  , views = require('koa-views')
  , onerror = require('koa-onerror');

var index = require('./routes/index');
// var users = require('./routes/users');
// var login = require('./routes/login');
// var mailList = require('./routes/mail-list');

// global middlewares
app.use(views('views', {
  root: __dirname + '/views',
  default: 'ejs'
}));
app.use(require('koa-bodyparser')({
  formLimit: '50mb'
}));
app.use(json());
app.use(logger());

app.use(function *(next){
  var start = new Date;
  yield next;
  var ms = new Date - start;
  console.log('%s %s - %s', this.method, this.url, ms);
});

app.use(require('koa-static')(__dirname + '/static'));

// routes definition
koa.use(index.routes(), index.allowedMethods());
//koa.use('/users', users.routes(), users.allowedMethods());
//koa.use('/login', login.routes(), login.allowedMethods());


//koa.use('/mail-list', mailList.routes(), mailList.allowedMethods());
// var bodyParser = require('koa-bodyparser');
// app.use(bodyParser.urlencoded({limit: '50mb'})); 






// mount root routes  
app.use(koa.routes());






//var logger = require('koa-logger');
//var route = require('koa-route');
//var views = require('co-views');
//var serve = require('koa-static');


var url = require('url');
var http = require('http');
var q = require('q');
var sizeOf = require('image-size');



// app.use(router.get('/upload',upload));
// app.use(router.get('/checkImg',checkImg));




















app.on('error', function(err, ctx){
  log.error('server error', err, ctx);
});

































module.exports = app;
