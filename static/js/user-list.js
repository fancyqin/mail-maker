$(function () {
    // var addUserHtml = '<tr><td><input type="text" name="J-name" id="J-name"></td><td><input type="checkbox" name="J-isAdmin" id="J-isAdmin"></td><td><a href="#" class="J-submit">确定</a> <a href="#" class="J-cancle">取消</a></td></tr>';

    $('.J-add-user').on('click', function () {
        // $('.J-user-list tr:last').before(addUserHtml);

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
                            alert('User exsist!')
                            console.log(1111111)
                        } else {
                            _this.parents('.user-card').before(html);
                            console.log(2222222)
                        }
                    },
                    error: function(err) {
                        console.log('ajax error');
                        console.log(err.responseText);
                    }
                })
            },
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
                content: '欢迎使用 artDialog 对话框组件！'
            });
            d.show();
            return false;
        })
        .on('click', '.J-delet', function () {
            if (confirm('Are you sure?')) {
                var _this = $(this)
                var userName = _this.parents('.user-card').find('.J-user-name').text();
                console.log(userName)
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
            }
                
            return false;
        })
        .on('click', '.J-cancle', function () {
            $(this).parents('tr').remove();
            return false;
        })
        .on('click', '.J-submit', function () {
            var _this = $(this);
            var userName = $('#J-name').val();
            var isAdmin = $('#J-isAdmin')[0].checked;
            console.log(userName + isAdmin)
            var html = '<tr><td class="J-user-name">' + userName + '</td><td>' + (isAdmin ? '是' : '否') + '</td><td><a href="#">修改</a> <a href="#" class="J-delet">删除</a></td></tr>'
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
                        alert('User exsist!')
                        console.log(1111111)
                    } else {
                        _this.parents('tr').replaceWith(html)
                        console.log(2222222)
                    }
                },
                error: function(err) {
                    console.log('ajax error');
                    console.log(err.responseText);
                }
            })
            return false;
        })
})