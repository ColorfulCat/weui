/**
 * Created by jfengjiang on 2015/9/11.
 */

$(function () {
    // 页面栈
    var stack = [];
    var $container = $('.js_container');
    var timer;
    $container.on('click', '.js_cell[data-id]', function () {
        var id = $(this).data('id');
        var $tpl = $($('#tpl_' + id).html()).addClass('slideIn').addClass(id);
        $container.append($tpl);
        stack.push($tpl);
        history.pushState({id: id}, '', '#' + id);

        // tooltips
        if (id == 'cell') {
            timer = setTimeout(function (){
                $($tpl).removeClass('slideIn');
                $('.js_tooltips').show();
                setTimeout(function (){
                    $('.js_tooltips').hide();
                }, 5000);
            }, 2000);
        }

    });

    // webkit will fired popstate on page loaded
    $(window).on('popstate', function () {
        var $top = stack.pop();
        if (!$top) {
            return;
        }
        $top.addClass('slideOut').on('animationend', function () {
            $top.remove();
        }).on('webkitAnimationEnd', function () {
            $top.remove();
        });

        // tooltips
        if(timer){
            clearTimeout(timer);
        }
    });

    // toast
    $container.on('click', '#showToast', function () {
        $('#toast').show();
        setTimeout(function () {
            $('#toast').hide();
        }, 5000);
    });
    $container.on('click', '#showLoadingToast', function () {
        $('#loadingToast').show();
        setTimeout(function () {
            $('#loadingToast').hide();
        }, 5000);
    });

    $container.on('click', '#showDialog1', function () {
        $('#dialog1').show();
        $('#dialog1').find('.btn_weui_dialog').on('click', function () {
            $('#dialog1').hide();
        });
    });
    $container.on('click', '#showDialog2', function () {
        $('#dialog2').show();
        $('#dialog2').find('.btn_weui_dialog').on('click', function () {
            $('#dialog2').hide();
        });
    })
});