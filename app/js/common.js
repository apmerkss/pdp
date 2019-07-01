$(function() {

});

$(document).ready(function(){
    var btnOpen = $('.js-share-open'),
        socialView = $('.product__share-buttons'),
        btnClose = $('.js-share-close');

    btnOpen.on('click' ,function(){
        socialView.toggleClass('product__share-buttons_visible product__share-buttons_hidden');
    });

    btnClose.on('click' , function(){
        socialView.toggleClass('product__share-buttons_visible product__share-buttons_hidden');
    });

    $(document).on('click' ,function (e){
        if (!socialView.is(e.target) && !socialView.has(e.target).length && !btnOpen.is(e.target) && !btnOpen.has(e.target).length) {
            socialView.removeClass('product__share-buttons_visible');
        }
    });
});

var sliderOn = false;

$(document).ready(function () {
    var screen = $( window ).width();
    if (screen < 748 && !sliderOn) {
        sliderInit();
        sliderOn = true;
    }

    $( window ).resize(function() {
        var screen = $( window ).width();

        if  (screen > 747) {
            $( ".cloned" ).remove();
            $( ".crossSell__list" ).removeAttr("style");
            sliderOn = false;
        }

        if (screen < 748 && sliderOn==false) {
            sliderInit();
            sliderOn = true;
        }

    });
});

function sliderInit() {
    $( ".cloned" ).remove();
    var slideNow = 2;
    var carousel = $('.crossSell__list');
    var slideCount = carousel.children().length;
    carousel.find(".crossSell__item").eq(0).clone().appendTo(carousel).addClass('cloned');
    carousel.find(".crossSell__item").eq(slideCount - 1).clone().prependTo(carousel).addClass('cloned');
    slideCount += 2;
    var translateWidth = -$('.crossSell__slider-viewport').width() * (slideNow - 1);
    var slideWidth = $('.crossSell__item').width();
    var viewport = slideWidth * slideCount;
    carousel.css({
        'width': viewport + 'px',
    });

    moveSlide(translateWidth);
    viewportTransition(0.8);

    $('.js-crossSell-right').click(function () {
        nextSlide();
    });
    $('.js-crossSell-left').click(function () {
        prevSlide();
    });

    function nextSlide() {

        if (slideNow == (slideCount - 1) ) {
            setTimeout(funcToFirst, 800);

            function funcToFirst() {
                translateWidth = -slideWidth;
                slideNow = 2;
                viewportTransition(0);
                moveSlide(translateWidth);
            }
        }

        if (slideNow <= (slideCount - 1)) {
            viewportTransition(0.8);
            translateWidth = -$('.crossSell__slider-viewport').width() * (slideNow);
            moveSlide(translateWidth);
            slideNow++;
        }

    }

    function prevSlide() {

        if (slideNow == 2 ) {
            translateWidth = -slideWidth * (slideCount - 1);
            slideNow = slideCount;
            viewportTransition(0);
            moveSlide(translateWidth);
        }

        if (slideNow > 2) {
            setTimeout(funcToLast, 10);
            function funcToLast() {
                translateWidth = -slideWidth * (slideNow - 2);
                viewportTransition(0.8);
                moveSlide(translateWidth);
                slideNow--;
            }
        }

    }

    function moveSlide(translateWidth) {
        $('.crossSell__list').css({
            'transform': 'translate(' + translateWidth + 'px, 0)',
            '-webkit-transform': 'translate(' + translateWidth + 'px, 0)',
            '-ms-transform': 'translate(' + translateWidth + 'px, 0)',
        });

    }

    function viewportTransition(time) {
        $('.crossSell__list').css({
            '-webkit-transition': 'all ' + time + 's',
            '-o-transition': 'all ' + time + 's',
            'transition': 'all ' + time + 's',
        });
    }
}