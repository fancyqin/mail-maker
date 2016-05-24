var router = require('koa-router')();
var db = require('.././db');

router.post('/', function *(next) {
    console.log(this.request.body);
})



module.exports = router;
