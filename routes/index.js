var router = require('koa-router')();
var db = require('.././db');
var moment = require('moment'); 

router.get('/', function *(next) {
    yield this.render('login', {
        title: 'Hello World Koa!',
        page: 'login'
    });

});

router.post('/login', function *(next) {
    this.body = 'hahahaha'
    var id = this.request.body.id;
    var password = this.request.body.password;
    var isExsist = ((yield db.User.find({'name': id, 'password': password})).length > 0) ? true : false;
    this.body = isExsist;

})

router.get('/mail-list', function *(next) {
    var pageSize = 4;
    var url = this.originalUrl;
    var urlAux = url.split('=');
    var currentPage = urlAux[1] ? urlAux[1] : 1;
        
    yield this.render('mail-list', {
        title: 'Hello World Koa!',
        page: 'mailList',
        mailList: yield db.Mail.find({}).sort({'_id':-1}).skip((currentPage-1) * pageSize).limit(pageSize).exec(),
        listLength: (yield db.Mail.find({})).length,
        currentPage: currentPage,
        moment: moment
    });
});
router.post('/mail-search', function *(next) {
    var pageSize = 4;
    var url = this.originalUrl;
    var urlAux = url.split('=');
    var currentPage = urlAux[1] ? urlAux[1] : 1;
    
    var keyword = this.request.body.keyword ? new RegExp(this.request.body.keyword) : 0;
    var type = this.request.body.type ? this.request.body.type : 0;
    
    if (keyword) {
        yield this.render('mail-list', {
            title: 'Hello World Koa!',
            page: 'mailSearchList',
            mailList: yield db.Mail.find({title: keyword}).sort({'_id':-1}).skip((currentPage-1) * pageSize).limit(pageSize).exec(),
            listLength: (yield db.Mail.find({title: keyword})).length,
            currentPage: currentPage,
            moment: moment
        });
    } else if (type) {
        yield this.render('mail-list', {
            title: 'Hello World Koa!',
            page: 'mailSearchList',
            mailList: yield db.Mail.find({type: type}).sort({'_id':-1}).skip((currentPage-1) * pageSize).limit(pageSize).exec(),
            listLength: (yield db.Mail.find({type: type})).length,
            currentPage: currentPage,
            moment: moment
        });
    }
        
})

router.post('/save-mail', function *(next) {
    //this.body = 'save mail';
    var mail = this.request.body.mail;
    var _this = this;
    var _id;

    var newMail = new db.Mail({
        title: mail.title,
        author: mail.author,
        description: mail.description,
        type: mail.type,
        // addDate: mail.date,
        addDate: new Date(),
        mailHtml: mail.mailHtml,
        webHtml: mail.webHtml
    });
    yield newMail.save(function(err, data) {
        if (err) {
            console.log(err);
        } else {
            // console.log('Saved: ', data);
            // console.log(data._id)
            _this.body = data._id;
        }
    })
})


router.post('/modify-mail', function *(next) {
    var _mail = this.request.body.mail;
    var _id = _mail._id;
    var _this = this;


    yield db.Mail.findOne({_id: _id}, function(err, mail) {
        if (err) throw err;

        console.log('good')

        //_this.body = 'success'

        mail.title = _mail.title;
        mail.updater = _mail.author;
        mail.description = _mail.description;
        mail.updateDate = new Date();
        mail.mailHtml = _mail.mailHtml;
        mail.webHtml = _mail.webHtml;

        // _this.body = mail;

        mail.save(function(err) {
            if (err) throw err;
            console.log('update success')
        })


        _this.body = 'update success'
    })
})

router.get('/modify-mail', function *(next) {
    this.body = 'goodddd'
    yield this.render('modify-mail', {
        title: 'Hello World Koa!',
        page: 'chooseDemo'
    })
})

router.post('/del-mail', function *(next) {
    var _id = this.request.body._id;
    db.Mail.findOneAndRemove({_id: _id}, function(err) {
        if (err) throw err;
        console.log('deleted')
    })
    this.body = 'deleted'
});

router.post('/find-mail', function *(next) {
    var _this = this;
    var _id = this.request.body._id;
    yield db.Mail.findOne({_id: _id}, function(err, mail) {
        if(err) throw err;
        _this.body = mail;

    })
})

// router.post('/add-mail', function *(next) {
//     var title       = this.request.body.title,
//         description = this.request.body.description,
//         author      = this.request.body.author,
//         addData     = this.request.body.addData,
//         updater     = this.request.body.updater,
//         updateDate  = this.request.body.updateDate,
//         mailHtml    = this.request.body.mailHtml,
//         webHtml     = this.request.body.webHtml;
// })





router.get('/user-list', function *(next) {
    yield this.render('user-list', {
        title: 'Hello World Koa!',
        page: 'userList',
        userList: yield db.User.find({}).exec()
    });
    
});

router.get('/add-user', function *(next) {
    console.log(11111111)
});

router.post('/add-user', function *(next) {

    var userName = this.request.body.userName;
    var isAdmin = this.request.body.isAdmin;

    var isExsist = ((yield db.User.find({'name': userName})).length > 0) ? true : false;
    // this.body = isExsist;
    if (!isExsist) {
        // this.body = 'User Name: ' + userName + ', ' + 'Admin: ' + isAdmin;
        var newUser = new db.User({
            name: userName,
            password: '123456',
            isAdmin: isAdmin
        });
        newUser.save(function(err, data) {
            if (err) {
                console.log(err);
            } else {
                console.log('Saved: ', data);
            }
        })
    } else {
    }
        this.body = isExsist;
});


router.post('/del-user', function *(next) {
    var userName = this.request.body.userName;
    db.User.findOneAndRemove({name: userName}, function(err) {
        if (err) throw err;
        console.log('User: ' + userName + ' deleted')
    })
    this.body = 'User: ' + userName + ' deleted'
});









router.get('/choose-demo', function *(next) {
    yield this.render('choose-demo', {
        title: 'Hello World Koa!',
        page: 'chooseDemo'
    });
    
});








module.exports = router;
