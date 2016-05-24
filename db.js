var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mail-maker');

var db = mongoose.connection;
db.on('error', function callback() {
    console.log('DB error!');
});
db.once('open', function callback() {
    console.log('DB working!');
});

var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: String,
    password: String,
    isAdmin: Boolean
});

var mailSchema = new Schema({
    title: String,
    description: String,
    type: String,
    author: String,
    addDate: Date,
    updater: String,
    updateDate: Date,
    mailHtml: String,
    webHtml: String
});




var User = mongoose.model('user', userSchema);
var Mail = mongoose.model('mail', mailSchema);



User.find({'name': 'admin'}, function(err, user) {
    if(user.length != 0) {
        console.log('admin exsist');
        console.log(user);
    } else {
        console.log('no admin');

        var admin  = new User({
            name: 'admin',
            password: 'admin',
            isAdmin: true
        });

        admin.save(function(err, data) {
            if(err) {
                console.log(err);
            } else {
                console.log('Saved: ', data);
            }
        })

    }
});



module.exports.User = User;
module.exports.Mail = Mail;