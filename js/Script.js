$(document).ready(function () {
  
    //mobile: main_toggle
    $('.toggle').click(function () {
        var accordion = $('#accordionFlushExample');
        if(accordion.is(":visible")){
            accordion.slideUp();
        }else{
            accordion.slideDown();
        }
    });


    //gnbSearchInput 검색버튼
    $('.search').click(function () {
        var submenu = $('.gnbSearchInput');
        if(submenu.is(":visible")){
            submenu.slideUp();
        }else{
             submenu.slideDown();
        }
    });

    $('.btnSearchClose').click(function () {
        $('.gnbSearchInput').slideUp();
    });


    //main_img_wrap
    $('.main_img>li').each(function (index) {
        $(this).attr('data-index', index);
    });
    var c = 0;
    function auto() {
        a = setInterval(function () {
                c++;
                if (c > 2) {
                    c = 0;
            }
            $('.main_img>li[data-index=' + c + ']').fadeIn();
            $('.main_img>li[data-index!=' + c + ']').fadeOut();
        }, 3000)
    };
    auto();

    var click_num = 0;
    $('.main_arrow_right').click(function () {
        click_num += 1;
        if (click_num > 2) {
            click_num = 0;
        }
        $('.main_img>li[data-index=' + click_num + ']').fadeIn();
        $('.main_img>li[data-index!=' + click_num + ']').fadeOut();
    }).hover(function () {
        clearInterval(a);
    }, function () {
        auto(c);
    });   
    $('.main_arrow_left').click(function () { 
        click_num -= 1;
        if (click_num < 0) {
            click_num = 2;
        }        
        $('.main_img>li[data-index=' + click_num + ']').fadeIn();
        $('.main_img>li[data-index!=' + click_num + ']').fadeOut();
    }).hover(function () {
        clearInterval(a);
    }, function () {
        auto(c);
    });  




    //wedding_wrap
    $('.main_content>div').each(function(index){
        $(this).attr('data-index',index);
    });
    var click_num = 0;
    $('.btn_arrow_right').click(function () {
        click_num += 1;
        if (click_num > 2) {
            click_num = 0;
        }
        $('.main_content>div[data-index=' + click_num + ']').fadeIn();
        $('.main_content>div[data-index!=' + click_num + ']').fadeOut();
        wedding_img_move();
    })
    function wedding_img_move() {        
        $('.wedding_img_wrap>ol').animate({
            left: -570
        }, 300, function () {
            $('.wedding_img_wrap>ol').css('left', '0px').find('li:first').appendTo('.wedding_img_wrap>ol');

        })
    }
    $('.btn_arrow_left').click(function () {
        click_num -= 1;
        if (click_num < 0) {
            click_num = 2;
        }
        $('.main_content>div[data-index=' + click_num + ']').fadeIn();
        $('.main_content>div[data-index!=' + click_num + ']').fadeOut();
        wedding_img_move_bak();
    })
    function wedding_img_move_bak() {        
        $('.wedding_img_wrap>ol').animate({
            left: 0
        }, 300, function () {
            $('.wedding_img_wrap>ol').css('left', '-570px').find('li:last').prependTo('.wedding_img_wrap>ol');

        })
    }



    //760사이즈부터 wedding_img_wrap_mobile
    $('.btn_arrow_right_mo').click(function () {
        click_num += 1;
        if (click_num > 2) {
            click_num = 0;
        }
        $('.main_content>div[data-index=' + click_num + ']').fadeIn();
        $('.main_content>div[data-index!=' + click_num + ']').fadeOut();
        wedding_img_move_ver2();
    })
    function wedding_img_move_ver2() {        
        $('.wedding_img_wrap_mobile>ol').animate({
            left: -360
        }, 300, function () {
            $('.wedding_img_wrap_mobile>ol').css('left', '0px').find('li:first').appendTo('.wedding_img_wrap_mobile>ol');

        })
    }
    $('.btn_arrow_left_mo').click(function () {
        click_num -= 1;
        if (click_num < 0) {
            click_num = 2;
        }
        $('.main_content>div[data-index=' + click_num + ']').fadeIn();
        $('.main_content>div[data-index!=' + click_num + ']').fadeOut();
        wedding_img_move_ver2_bak();
    })
    function wedding_img_move_ver2_bak() {        
        $('.wedding_img_wrap_mobile>ol').animate({
            left: 0
        }, 300, function () {
            $('.wedding_img_wrap_mobile>ol').css('left', '-360px').find('li:last').prependTo('.wedding_img_wrap_mobile>ol');

        })
    }


   

    //mo_weddingPick_gallery 영역
    var n = 0;
    function weddingPick_gallery_auto() {      
        g = setInterval(function () {
            $('.mo_weddingPick_gallery').animate({
                left: -365
            }, 300, function () {
                $('.mo_weddingPick_gallery').css('left', '0px').find('div:first').appendTo('.mo_weddingPick_gallery');
    
            })
        },2000)
       
    }
    weddingPick_gallery_auto();
    $('.weddingPick_gallery').on({
        mouseenter: function () {
            clearInterval(g)
        },
        mouseleave: function () {
            weddingPick_gallery_auto();
        }
    })



  
    //WeddingPick_wrap영역_스크롤시 event_wrap 효과
    $(window).scroll(function(){
		var scrollArea = $(".WeddingPick_content li").offset().top,
            scroll_listMargin = Number( $(".WeddingPick_content li div").css("marginBottom").replace("px", "") ); //replace: css px 제거, 숫자값만 가져오기      
		    scrollArea_h = scrollArea + $(".WeddingPick_content li").outerHeight()- $(".event_wrap").outerHeight() - scroll_listMargin,
		    scrollMain_t = $(this).scrollTop() - scrollArea;
            
		if ( $(this).scrollTop() < scrollArea ){
			$(".event_wrap").css("top", "");
		} else if ( $(this).scrollTop() >= scrollArea && $(this).scrollTop() <= scrollArea_h ){
			$(".event_wrap").css("top", scrollMain_t);
		} else if ( $(this).scrollTop() > scrollArea_h ){
			$(".event_wrap").css("top", $(".WeddingPick_content li").outerHeight() - $(".event_wrap").outerHeight()- scroll_listMargin);
		}
	});



    //Wedding_consulting_wrap영역_탭
    $('.tab_content').each(function (index) {
        $(this).attr('data-index', index);
    })    
    $('.tab_btn li').each(function (index) {
        $(this).attr('data-index', index);
    }).click(function () {
        var i = $(this).attr('data-index');        
        $('.tab_content[data-index=' + i + ']').css('display', 'flex');
        $('.tab_content[data-index!=' + i + ']').css('display', 'none');
        $('.tab_btn li[data-index=' + i + ']').addClass('active');
        $('.tab_btn li[data-index!=' + i + ']').removeClass('active');
    });

        





    //sub01_3 map Area
    $('.map').each(function(index){
        $(this).attr('data-index', index);
    });

    $('#mapTabMenu>li').each(function(index){
        $(this).attr('data-index', index);
    }).click(function(){
        let mapT = $(this).attr('data-index');

        $('.map[data-index='+ mapT + ']').css('display','block');
        $('.map[data-index!='+ mapT + ']').css('display','none');
        $('#mapTabMenu>li[data-index='+ mapT + ']').addClass('mapActive');
        $('#mapTabMenu>li[data-index!='+ mapT + ']').removeClass('mapActive');
    });
    



    // FAQ Area
    var faqClicknum = 0;
    $('.faq li').click(function(){
        ++faqClicknum;
        if(faqClicknum %2 == 0){
            $(this).animate({
                height:'430px'
            });
            var faqHeight =  $('.faq li').not($(this)).height();
            if(faqHeight == 430){
                $('.faq li').not($(this)).animate({
                    height:'80px'
                });
            }
        }else {
            $(this).animate({
                height:'80px'
            });
        }
    });






})