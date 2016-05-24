$(function(){

    $('#J-submit').on('click', function(){
        var id = $('#J-id').val();
        var password = $('#J-password').val();

        if (!id || !password) {
            alert('请输入正确的用户名和密码')
        } else {
            $.ajax({
                type: 'post',
                url: './login',
                data: {
                    id: id,
                    password: password
                },
                success: function(msg) {
                    console.log('ajax success');
                    console.log(msg);
                    if (msg) {
                        window.location.href = '/mail-list';
                        $.cookie('user', id);

                    } else {
                        alert('用户名或密码不正确');
                        return false;
                    }
                },
                error: function(err) {
                    console.log('ajax error');
                    console.log(err.responseText);
                    return false;
                }
            })        
        }
    
    })
    $('#J-login-form').on('submit', function(){
        return false;
    })
});