$(function () {

    $(document)
        .on('click', '.J-delete', function() {
            if (confirm('Are you sure?')) {
                var _this = $(this);
                var _id = _this.parents('tr').data('id');
                $.ajax({
                    type: 'post',
                    url: './del-mail',
                    data: {
                        _id: _id
                    },
                    success: function(msg) {
                        console.log('good')
                        console.log(msg)
                        _this.parents('tr').remove()
                    },
                    error: function(err) {
                        console.log('ouch')
                    }

                })
            }
            return false;
        }) 
        .on('click', '.J-show-mail-html', function() {
            var _this = $(this);
            var _id = _this.parents('tr').data('id');
            $.ajax({
                type: 'post',
                url: './find-mail',
                data: {
                    _id: _id
                },
                success: function(mail) {
                    console.log('ajax good')
                    var d = dialog({
                        title: '邮件版 HTML',
                        content: $('<textarea/>').text(mail.mailHtml)
                    });
                    d.width(600).show();
                }
            })
            return false;
        })
        .on('click', '.J-show-web-html', function() {
            var _this = $(this);
            var _id = _this.parents('tr').data('id');
            $.ajax({
                type: 'post',
                url: './find-mail',
                data: {
                    _id: _id
                },
                success: function(mail) {
                    console.log('ajax good')
                    var d = dialog({
                        title: '网页版 HTML',
                        content: $('<textarea/>').text(mail.webHtml)
                    });
                    d.width(600).show();
                }
            })
            return false;
        })
        .on('click', '.J-preview', function(){
            var _this = $(this);
            var _id = _this.parents('tr').data('id');
            $.ajax({
                type: 'post',
                url: './find-mail',
                data: {
                    _id: _id
                },
                success: function(mail) {
                    console.log('ajax good');


                    var priew = window.open('', '');
                    if (priew){
                        priew.document.write(mail.mailHtml);
                    }else {
                        var d = dialog({
                            title: '欢迎',
                            content: mail.mailHtml
                        });
                        d.show();
                    }

                }
            })
            return false;
        })




})








