$(function(){
    console.log('hahahahah')
    var loginUser = $.cookie('user');
    if (loginUser) {
        $('.J-user').text(loginUser)
    } else {

    }

    $('.J-logout').on('click', function(){
        $.removeCookie('user');
        window.location.href = '/';
        return false;
    })

    $('.J-demo-link').on('click', function(){
        $.get($(this).attr('href'), function(data) {
            $('#J-choose-demo').remove();
            $('#J-demo-wrapper').html(data);
        })
        return false;
    })
});