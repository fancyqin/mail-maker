var router = require('koa-router')();
var db = require('.././db');

router.get('/', function *(next) {
    yield this.render('user-list');

});



module.exports = router;
