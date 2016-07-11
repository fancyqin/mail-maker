$(function () {

    var isSaved = false;

    $.extend({
        'demoLoad': function (name) {
            var num = name.length;
            if (num > 0) {
                for (var i = 0; i < num; i++) {
                    var thisName = name[i];
                    var box = $(".mod-space[data-name=" + thisName + "]");
                    var type = box.attr('data-type');
                    var place = $('#' + thisName);

                    var titleZh = place.siblings('.form-title:first').text();
                    box.attr('data-titleZh',titleZh);
                    switch (type) {
                        case 'img':
                            newImg(box, place);
                            break;
                        case 'txt':
                            newTxt(box, place);
                            break;
                        case 'richTxt':
                            //var EditorId = thisName + '-edit';
                            //newEditor(box, EditorId);
                            newEditor(box, place);
                            break;
                        case 'btn':
                            newBtn(box, place);
                            break;
                    }
                }
            }
        }
    });


    //富文本
    /*
    function newEditor(box, placeholderID) {
        var settings = {
            toolbars: [
                [   'undo','redo','|','bold', 'italic',  'underline',  'forecolor', '|', 'cleardoc',    '|','link',  '|', 'justifyleft', 'justifyright',  'justifycenter', '|', 'unlink'],
                ['source', 'fontfamily', 'fontsize' ,'addbr']
            ]
            ,wordCount:false
        };
        var ue = UE.getEditor(placeholderID, settings);
        var text = box.html().trim();
        var pID = placeholderID.substring(0,(placeholderID.length - 5));
        $('#'+pID).append('<div class="J-ph">加载中...</div>');
        text = text.replace(/\s+|\n/g, " ").replace(/>\s</g, "><");
        ue.ready(function(){
            $('#'+pID).find('.J-ph').hide();
            ue.setContent(text);
            ue.addListener('contentChange', function (ue) {
                var inner = this.getContent();
                box.html(inner);
                var $links = box.find('a');
                if ($links) {
                    $links.css({color: '#246bb3', textDecoration: 'none'})
                }
            })
        })
    }
    */

    function newEditor (box,place){
        var richTpl = $("#richTxtPlaceTpl").html();
        var tplPlace = template(richTpl);
        var rB = '.J-richBox';

        var txt = box.html().trim().replace(/\s+|\n/g, " ").replace(/>\s</g, "><").replace(/style="(.*?)"/g,"");
        var styles = box.attr('data-styles');
        var listyles = box.attr('data-ulstyles');


        place.append(tplPlace);
        place.find(rB).html(txt);




        place.on('blur',rB,function(){

            var _this = $(this);
            var innerHTML = _this.html().trim();
            var inner = innerHTML.replace(/\s+|\n/g, " ");
            box.html('').html(inner);

            box.find('p').attr('style',styles);
            box.find('a').attr('style','color:#337ab7;text-decoration: none;')
            box.find('li').attr('style',listyles);
            box.find('ul').attr('style','margin-left: 16px;list-style-type: disc');
            box.find('ol').attr('style','margin-left: 20px;list-style-type: decimal');
        });


        var conf = {
            toolbar:{
                buttons:['bold', 'italic', 'underline', 'anchor', 'orderedlist', 'unorderedlist']
            },
            paste:{
                forcePlainText: true
            }
        };
        var editor = new MediumEditor(rB,conf);


        /*
        var beginX,beginY,thisW;

        $(rB).on('mousedown',function(e){
            e.stopPropagation();
            isSelecting = true;
            // console.log(isSelecting,e);
            beginX = e.pageX;
            beginY = e.pageY;
        }).on('mouseup',function(e){
            isSelecting = false;
            e.stopPropagation();
            var selection = window.getSelection();
            var selectionInner = selection.toString();
            var range = selection.rangeCount && selection.getRangeAt(0);
            // var rangeText =  document.createRange();
            var $richB = $('.J-rich-edit-box');
            console.log(range);


            if(beginX && beginY){
                var centerX = (beginX + e.clientX)/2;
            }
            if (selectionInner && centerX){

                $richB.show();
                thisW = $richB.width();
                thisH = $richB.height();
                $richB.css({
                    left: (centerX - thisW/2) +'px',
                    top: (beginY-thisH - 20) +'px'
                })
            }else {
                $richB.hide()
            }
            //https://developer.mozilla.org/zh-CN/docs/Web/API/Range
            //range.deleteContents();  //del

            // console.log(isSelecting,selectionInner,range,e);
        })
         */

    }

    //图片

    function newImg(box, place) {
        var imgTpl = $("#imgPlaceTpl").html();
        var tplPlace = template(imgTpl);
        place.append(tplPlace);

        var $img = box.find('img');
        var imgSrc = $img.attr('src');
        var imgTitle = $img.attr('title');
        var imgAlt = $img.attr('alt');

        var $inputSrc = place.find('.imgSrc');
        var $inputTitle = place.find('.imgTitle');
        var $inputAlt = place.find('.imgAlt');

        $inputSrc.val(imgSrc);
        $inputTitle.val(imgTitle);
        $inputAlt.val(imgAlt);


        var $link = box.find('a');
        var $inputLink = place.find('.imgLink');
        if ($link.length > 0) {
            var linkUrl = $link.attr('href');
            $inputLink.val(linkUrl);
        }

        $inputLink.blur(function () {
            var val = $(this).val();
            var img = $img.prop('outerHTML');
            isHttp($inputLink, function () {
                box.html('');
                box.html('<a href="' + val + '">' + img + '</a>');
                $link.attr('href', val);
            });

        });
        $inputSrc.blur(function () {
            var val = $(this).val();
            box.find('img').attr('src', val);
        });
        $inputTitle.blur(function () {
            var val = $(this).val();
            box.find('img').attr('title', val);
        });
        $inputAlt.blur(function () {
            var val = $(this).val();
            box.find('img').attr('alt', val);
        });

        //上传图片
        var upload = place.find('.J-imgUpload');
        var idn = place.attr('id');
        var nidn = 'UploadIMG'+ idn;
        //console.log(nidn)
        upload.attr('id',nidn);
        uploadIMG(nidn,place,box);



    }



    //上传


    function uploadIMG(id,place,box){
        var uploader = new FOCUS.widget.Upload({
            priority: ['iframe'],
            placeholder: '#'+id,
            uploadURL:'http://edm.focuschina.com/uploadImg',
            filePostName:'file',
            fileTypes:'*.gif, *.jpg, *.png, *.jpeg',
            postParams:{
                month: new Date().getMonth()+1+'',
                mailTypeCode:'MICEN'
            },button: {
                text: '上传图片'
            }
        }).on('dialogComplete',function(){
            this.startUpload();
        }).on('uploadComplete', function(file){
            var nowDate = new Date();
            var imgUrl = 'http://edm.made-in-china.com/MICEN/'+ nowDate.getFullYear()+'/'+(nowDate.getMonth()+1)+'/'+  file.fullname;

            $.ajax({
                url:'/checkImg',
                data:{
                    imgurl: imgUrl
                },
                success: function(data){
                    if (data){
                        if (data.width ===0 || data.height ===0){
                            alert('上传失败');
                        }else{
                            place.find('.imgSrc').val(imgUrl);
                            box.find('img').attr('src',imgUrl);
                        }
                    }else{
                        var href = window.location.href;
                        if (confirm('上传失败，可能您未登录批邮业务系统，是否暂存并跳转至登录界面？')){
                            saveMail();
                            window.location = "http://edm.focuschina.com/loginIndex?nextUrl=" + href;
                        }

                    }
                }
            })
        })
    }



    //按钮

    function newBtn(box, place) {

        //设置按钮编辑模板
        var btnTpl = $("#btnPlaceTpl").html();
        var tplPlace = template(btnTpl);
        place.append(tplPlace);


        //设置按钮模板
        function btnTplSet(box, place, tplData) {
            var tplIdName = place.attr('id') + "-tpl";
            var tpl = $("#" + tplIdName).html();
            var tplItem = template(tpl, tplData);
            box.find('.btnWrap').html("").append(tplItem);
        }

        var btnDetail = box.find('.btnDetail');
        var btnVal = JSON.parse(btnDetail.val());
        var link = btnVal.link;
        var text = btnVal.title;
        var _width = btnVal.width;
        var tplData = {
            btnLink: link,
            btnTxt: text,
            btnWidth: _width
        };
        btnTplSet(box, place, tplData);

        var $btn = box.find('.btnBase');
        var btnTxt = $btn.text().trim();
        var btnLink = $btn.attr('href');

        var $inputTxt = place.find('.btnTxt');
        var $inputLink = place.find('.btnLink');

        $inputTxt.val(btnTxt);
        $inputLink.val(btnLink);

        $inputTxt.blur(function () {
            var val = $(this).val();
            $btn.text(val);
            var newWidth = $btn[0].offsetWidth + 'px';

            tplData.btnTxt = val;
            btnVal.title = val;
            tplData.btnWidth = newWidth;
            btnVal.width = newWidth;

            btnDetail.val(JSON.stringify(btnVal));
            btnTplSet(box, place, tplData);
        });
        $inputLink.blur(function () {
            var val = $(this).val();
            //$btn.attr('href',val);

            isHttp($inputLink, function () {
                tplData.btnLink = val;
                btnVal.link = val;

                btnDetail.val(JSON.stringify(btnVal));
                btnTplSet(box, place, tplData);
            })


        });

    }

    //文本

    function newTxt(box, place) {

        var txtTpl = $("#txtPlaceTpl").html();
        var tplPlace = template(txtTpl);
        place.append(tplPlace);

        var $txtBox = box.find('.txtBox');
        var txt = $txtBox.text().trim();
        var $inputTxt = place.find('.inputTxt');
        $inputTxt.val(txt);

        $inputTxt.blur(function () {
            var val = $inputTxt.val();
            $txtBox.text(val);
        })
    }


    //WEB版地址

    var $inputWEBUrl = $('#inputWEBUrl');
    $inputWEBUrl.val($('#WEBUrl').attr('href'));
    $inputWEBUrl.blur(function () {
        var val = $(this).val();
        isHttp($inputWEBUrl, function () {
            $('#WEBUrl').attr('href', val);
        })
    });



    //导出html

    var codePop = $('.code-pop');
    codePop.find('.close').click(function () {
        codePop.hide()
    });
    $('#exportMail').click(function () {
        var mailTitle = $('#mailTitle').val();
        var mailHTML = $('#tableInner').html().trim().replace(/\s+|\n/g, " ").replace(/>\s</g, "><");

        var mailTable = mailHTML.replace(/<div(.*?)>/g,"").replace(/<\/div>/g,"").replace(/<input(.*?)>/g,"").replace(/<script(.*?)<\/script>/g,"");

        $('body').append('<div id="mailCode" style="display:none">'+ mailTable +'</div>');

        $('#mailCode').find('.J-toggle.hide').remove();
        var finalCode = $('#mailCode').html();

        $('#mailCode').remove();

        var htmlCode = gethtmlCode(finalCode);

        if (mailTitle === '') {
            alert('邮件主题不能为空')
        }
        else {
            $('#codeCopy').val(htmlCode);
            codePop.show();
        }
        
    });

    $('#exportWebMail').click(function() {
        var lang = JSON.parse($('#mailHFType').val()).lang;
        var mailTitle = $('#mailTitle').val();
        var mailTable = $('#tableInner').html().trim().replace(/\s+|\n/g, " ").replace(/>\s</g, "><");
        if (mailTitle === '') {
            alert('邮件主题不能为空')
        }else{
            $('body').append('<div id="webCode" style="display:none">'+ mailTable +'</div>')

            $('#webCode .J-web').remove();

            var $hello = $('#webCode .J-webHello');
            if ($hello.length > 0) {
                switch(lang){
                    case 'en':
                        $hello.text('Dear Sir / Madam,');
                        break;
                    case 'cn':
                        $hello.text('尊敬的先生/女士，');
                        break;
                    case 'ru':
                        $hello.text('дравствуйте, Госпожа/Господин,');
                        break;
                    case 'fr':
                        $hello.text('Bonjour, Mesdames/Messieurs,');
                        break;
                    case 'es':
                        $hello.text('Hola, Señor/a,');
                        break;
                    case 'pt':
                        $hello.text('Prezado Sr./Sra.');
                        break;

                }
            }
            var webCodeHTML = $('#webCode').html();
            var webCode =  webCodeHTML.replace().replace(/<div(.*?)>/g,"").replace(/<\/div>/g,"").replace(/<input(.*?)>/g,"");
            var webCodeHtml = gethtmlCode(webCode);
            $('#codeCopy').val(webCodeHtml);
            codePop.show();

            $('#webCode').remove();
        }

    });


    //预览

    $('#priew').click(function () {
        var mailTable = $('#tableInner').html().trim().replace(/\s+|\n/g, " ").replace(/>\s</g, "><");
        var htmlCode = gethtmlCode(mailTable);
        var priew = window.open('', '');
        priew.document.write(htmlCode);

    });

    $('#save').click(function() {

        saveMail();
        
    });




    window.onbeforeunload = function (e) {
        if(!isSaved){
            var msg = '您正准备离开此页，您未保存的编辑数据将会丢失！！！！慎重啊，小主~';
            e.returnValue = msg;
            return msg;
        }
    };






    //切换mod

    $('#tableInner').on('click','.mod-space',function(){
        var id = $(this).attr('data-name');
        var $thisBox = $('#' + id).parents('.form-item:first');
        $('.form-item').removeClass('open');
        $thisBox.addClass('open');
        $('.mod-space').removeClass('current');
        $(this).addClass('current');
    });



    if($('.J-toggle').hasClass('hide')){
        $('.J-toggle.hide').each(function(){
            var a = $(this).attr('data-toggle');
            var $target = $('.toggle-box[data-toggle="'+a+'"]');
            $target.find('input[value="0"]').prop('checked',true);
        })

    }

    $('.toggle-box').on('change','input',function(e){
        var toggle = $(e.target).parents('.toggle-box').attr('data-toggle');
        var val = $('.toggle-box').find('input:checked').val();
        console.log(val);
        var $toggleItem = $('.J-toggle[data-toggle="'+toggle+'"]');
        if(val === '0'){
            $toggleItem.addClass('hide').hide();
        }else{

            $toggleItem.removeClass('hide').show();
        }
    })


    function gethtmlCode(mailTable) {
        var mailTitle = $('#mailTitle').val();
        var htmlCode = '<html>' +
            '<head>' +
            '<meta content="text/html; charset=utf-8" http-equiv="Content-Type">' +
            '<title>' + mailTitle + '</title>' +
            '<style type="text/css">' +
            'body{margin: 0 auto} center{display: none}' +
            '</style>' +
            '<!--[if gte mso 9]><style type="text/css">' +
            'center{display: block}' +
            '</style><![endif]-->' +
            '</head>' +
            '<body>' + mailTable + '</body>' +
            '</html>';
        return htmlCode;
    }


    function saveMail(){

        if ($('#mailTitle').val() == '') {
            alert('邮件主题不能为空')
        } else {

            var mailTitle = $('#mailTitle').val();
            var mailTable = $('#tableInner').html().trim().replace(/\s+|\n/g, " ").replace(/>\s</g, "><");
            var htmlCode = gethtmlCode(mailTable);


            var lang = JSON.parse($('#mailHFType').val()).lang;

            $('body').append('<div id="webCode" style="display:none">'+ mailTable +'</div>')

            $('#webCode .J-web').remove();

            var $hello = $('#webCode .J-webHello');
            if ($hello.length > 0) {
                switch(lang){
                    case 'en':
                        $hello.text('Dear Sir / Madam,');
                        break;
                    case 'cn':
                        $hello.text('尊敬的先生/女士，');
                        break;
                    case 'ru':
                        $hello.text('дравствуйте, Госпожа/Господин,');
                        break;
                    case 'fr':
                        $hello.text('Bonjour, Mesdames/Messieurs,');
                        break;
                    case 'es':
                        $hello.text('Hola, Señor/a,');
                        break;
                    case 'pt':
                        $hello.text('Prezado Sr./Sra.');
                        break;

                }
            }
            var webCode = $('#webCode').html();
            var webCodeHtml = gethtmlCode(webCode);

            // var date = new Date();
            // var formatDate = (date.getFullYear() + '.' + date.getMonth() + '.' + date.getDate()).toString();

            var mail = {
                _id: $("#J-mail-id").val(),
                title: $('#mailTitle').val(),
                type: $('#J-mail-module').val(),
                author: $.cookie('user'),
                description: $('#mailDescription').val(),
                mailHtml: htmlCode,
                webHtml: webCodeHtml,
                mailCode: mailTable
            };
            console.log(mail)

            if ($("#J-mail-id").length) {
                if($("#J-mail-modify").length) {
                    $.ajax({
                        type: 'post',
                        url: './modify-mail',
                        data: {
                            mail: mail
                        },
                        success: function(msg) {
                            console.log('ajax success');
                            console.log(msg);
                            alert('保存成功!');
                            isSaved = true;
                        }
                    })
                } else {
                    $.ajax({
                        type: 'post',
                        url: './save-mail-again',
                        data: {
                            mail: mail
                        },
                        success: function(msg) {
                            console.log('ajax success');
                            console.log(msg);
                            alert('保存成功!');
                            isSaved = true;
                        }
                    })
                }

            } else {
                $.ajax({
                    type: 'post',
                    url: './save-mail',
                    data: {
                        mail: mail
                    },
                    success: function(id) {
                        console.log('ajax success');
                        console.log(id);
                        alert('保存成功!');
                        isSaved = true;
                        $('body').append('<input id="J-mail-id" type="hidden" value="' + id + '">');
                    }
                })
            }

        }

    }


    //校验网址
    function isHttp(input, cb) {
        var val = input.val();
        var httpReg = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;
        input.removeClass('error');
        if (val) {
            if (!httpReg.test(val)) {
                alert('请输入正确的地址');
                input.addClass('error').focus();
            } else {
                input.removeClass('error');
                cb();
            }
        }

    }


    function changeMailType(){
        var $mBox = $('#mailType');
        var $inputMailType = $('#mailHFType');
        var $type = $mBox.find('.type');
        var $lang = $mBox.find('.lang');
        var mailType = JSON.parse($inputMailType.val());
        function modtype (modType,lang){
            var lang_header = lang+'_header';
            var lang_footer = lang+'_footer';
            var header = modType[lang_header];
            var footer = modType[lang_footer];
            var webURL = $inputWEBUrl.val();
            $('#header').html('').html(header);
            $('#footer').html('').html(footer);

            $('#WEBUrl').attr('href',webURL)
        }
        function setChange(mailType){
            var Type = mailType.type;
            var Lang = mailType.lang;
            var modType;
            switch (Type){
                case '1a':
                    modType = tpl.mail_1a;
                    $lang.show();
                    modtype(modType,Lang);
                    break;
                case '1b':
                    $lang.hide();
                    modType = tpl.mail_1b;
                    modtype(modType,'en');
                    break;
                case '1c':
                    modType = tpl.mail_1c;
                    $lang.show();
                    modtype(modType,Lang);
                    break;
                case '2a':
                    modType = tpl.mail_2a;
                    modtype(modType,Lang);
                    break;
                case '2b':
                    modType = tpl.mail_2b;
                    modtype(modType,Lang);
                    break;
                case '2c':
                    modType = tpl.mail_2c;
                    modtype(modType,Lang);
                    break;
            }
            $type.find('span').removeClass('on').siblings('span[data-type='+ Type +']').addClass('on');
            $lang.find('span').removeClass('on').siblings('span[data-lang='+ Lang +']').addClass('on');
        }
        setChange(mailType);

        $type.on('click','span',function(e){
            var $target = $(e.target);
            var typeVal = $target.attr('data-type');
            mailType.type = typeVal;
            if (typeVal === '1b'){
                mailType.lang = 'en';
            }
            $inputMailType.val(JSON.stringify(mailType));
            setChange(mailType);
        });
        $lang.on('click','span',function(e){
            var $target = $(e.target);
            var langVal = $target.attr('data-lang');
            mailType.lang = langVal;
            $inputMailType.val(JSON.stringify(mailType));
            setChange(mailType);
        });
    }
    changeMailType();






    function obDOMchange (){
        var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver
        var obtarget = document.querySelector('#tableInner');
        var observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                //console.log(mutation);
                isSaved = false;
            });
        });
        var config = { attributes: true, childList: true, characterData: true ,subtree: true}
        observer.observe(obtarget, config);
    }
    obDOMchange();


    function siderBarFixed(){
        var $topBox = $('.demo-fixed .ctrl-box');
        var $bottomBox = $('.demo-fixed .mod-box');
        $(window).on('scroll',function(){
            var top = $(window).scrollTop();
            var ruleTop = $topBox[0].clientHeight +$topBox[0].offsetTop;

            if (top > ruleTop){
                $bottomBox.addClass('fixed');
            }else {
                $bottomBox.removeClass('fixed');
            }

        })
    }
    siderBarFixed();



});