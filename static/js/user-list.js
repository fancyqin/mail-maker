$(function () {

    $('.J-add-user').on('click', function () {
        var _this = $(this);
        var d = dialog({
            title: '添加用户',
            okValue: '确定',
            content: '<input class="input-text" type="text" id="J-name" placeholder="Name" /> <br /><label><input type="checkbox" name="J-isAdmin" id="J-isAdmin"> 管理员</label>',
            ok: function () {
                var userName = $('#J-name').val();
                var isAdmin = $('#J-isAdmin')[0].checked;
                console.log(userName + isAdmin)
                var html = '<div class="user-card"><div class="name">' + userName + '</div><div class="info-act"><span class="is-admin">' + (isAdmin ? '管理员' : '') + '</span><span class="act"><a href="#" class="J-modify">修改</a> <span class="gap-line">|</span> <a href="#" class="J-delet" data-id="<%= userList[i]._id%>">删除</a></span></div></div>'
                $.ajax({
                    type: 'post',
                    url: './add-user',
                    data: {
                        userName: userName,
                        isAdmin: isAdmin
                    },
                    success: function(msg) {
                        console.log('ajax success');
                        console.log(msg);
                        if (msg) {
                            alert('User exsist!');
                        } else {
                            _this.parents('.user-card').before(html);
                        }
                    },
                    error: function(err) {
                        console.log('ajax error');
                        console.log(err.responseText);
                    }
                })
            },
            okValue: '确定',
            cancelValue: '取消',
            cancel: function () {}
        });
        d.show();
        return false;
    })
    
    $(document)
        .on('click', '.J-modify', function () {
            var d = dialog({
                title: '欢迎',
                content: '<div class="c">还没做！</div>',
                ok: function () {

                }
            });
            d.width(300).show();
            return false;
        })
        .on('click', '.J-delet', function () {
                var _this = $(this)
                var userName = _this.parents('.user-card').find('.J-user-name').text();

                var d = dialog({
                    title: '删除用户',
                    content: '<div class="c">确定删除 <b>' + userName + '</b>？</div>',
                    ok: function () {
                        $.ajax({
                            type: 'post',
                            url: './del-user',
                            data: {
                                userName: userName
                            },
                            success: function(msg) {
                                console.log('good')
                                console.log(msg)
                                _this.parents('.user-card').remove()
                            },
                            error: function(err) {
                                console.log('ouch')
                            }
                        })
                    },
                    okValue: '确定',
                    cancelValue: '取消',
                    cancel: function () {}
                });
                d.width(300).show();
                return false;

        })
})