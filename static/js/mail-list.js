$(function () {


    function page(n) {

    }
    $(document)
        .on('click', '.J-modify', function () {
            // var d = dialog({
            //     title: '欢迎',
            //     content: '欢迎使用 artDialog 对话框组件！'
            // });
            // d.show();
            // return false;


            var _this = $(this);
            var _id = _this.parents('tr').data('id');
            var url = '/modify-mail?_id=' + _id;
            window.location.href= url;
        })
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
                        title: '欢迎',
                        content: $('<div/>').text(mail.mailHtml).html()
                    });
                    d.show();
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
                        title: '欢迎',
                        content: $('<div/>').text(mail.webHtml).html()
                    });
                    d.show();
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
                    console.log('ajax good')
                    var d = dialog({
                        title: '欢迎',
                        content: mail.mailHtml
                    });
                    d.show();
                }
            })
            return false;
        })
})








