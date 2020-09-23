function selectedActive(elem) {
        var selectedAttr = $(elem),
                selectionID = "." + $(selectedAttr).data("select");

        $(".selecton a").removeClass("active");
        $(selectedAttr).addClass("active");
        $(".food-menu").removeClass("active");

        if (selectionID == ".*") $(".food-menu").addClass("active");
        else $(selectionID).addClass("active");
}


function enableCounterUp(a) {
        var counterElement;
        if (isExists('#counter')) {
                counterElement = $('#counter');
        }
        else {
                return;
        }
        var oTop = $('#counter').offset().top - window.innerHeight;
        if (a == 0 && $(window).scrollTop() > oTop) {
                $('.counter-value').each(function () {
                        var $this = $(this),
                                countDuration = $this.data('duration'),
                                countTo = $this.attr('data-count');
                        $({countNum: $this.text()}).animate({countNum: countTo}, {
                                duration: countDuration,
                                easing: 'swing',
                                step: function () {
                                        $this.text(Math.floor(this.countNum));
                                },
                                complete: function () {
                                        $this.text(this.countNum);
                                }
                        });
                });
                a = 1;
        }
        return a;
}

function panelAccordian(){

        var panelTitle = $('.panel-title');
        panelTitle.on('click', function(){
                $(this).toggleClass('active');
                return false;
        });

}


function enableRadialProgress(){
        $(".radial-progress").each(function(){
                var $this = $(this),
                        progPercent = $this.data('prog-percent');

                var bar = new ProgressBar.Circle(this, {
                        color: '#fff',
                        strokeWidth: 3,
                        trailWidth: 0,
                        easing: 'easeInOut',
                        duration: 1400,
                        text: {},
                        from: { color: '#fff', width: 1 },
                        to: { color: '#EF002E', width: 3 },
                        // Set default step function for all animate calls
                        step: function(state, circle) {
                                circle.path.setAttribute('stroke', state.color);
                                circle.path.setAttribute('stroke-width', state.width);

                                var value = Math.round(circle.value() * 100);
                                if (value === 0) { circle.setText(''); } else { circle.setText(value); }
                        }
                });

                $(this).waypoint(function(){ bar.animate(progPercent); },{offset: "90%"})
        });
}

(function ($) {
	
	var liCount = $('.slider li').length;
	var ulWidth = (liCount * 100);
	var liWidth = (100/liCount);
	var leftIncrement = (ulWidth/liCount);


	$('.slider').height($('.slider li img').height());
  //$('.slider').height('300px');
	
	$('.slider img').on('load', function(){
    $('.loader').fadeOut();
		$('.slider').height($(this).height());
	})

	$(window).resize(function() {
		$('.slider').css('height', $('.slider li img').height());
	}); 
	
	$('.slider ul').css('width', ulWidth + '%');
	$('.slider li').css('width', liWidth + '%');

	$('.slider').append(function() {
		$(this).append('<div class="navigator"></div>');
		$(this).prepend('<span class="prev">Prev</span><span class="next">Next</span>');
		//$(this).append('<div class="autoPlay"><input id="chkBox" type="checkbox" class="chkbox" /><label for="chkBox">Auto Play?</label></div>');

		$(this).find('li').each(function(){
			$('.navigator').append('<span></span>');
		});
	});

  $('.slider').css('height', $('.slider li img').height());
  
	$('.navigator span:first-child').addClass('active');


	if(liCount > 2) {
		$('.slider ul').css('margin-left', -leftIncrement + '%');
		$('.slider ul li:last-child').prependTo('.slider ul');
	} else if(liCount == 1) {
		$('.slider span').css('display', 'none');
		$('.autoPlay').css('display', 'none');
	} else if(liCount == 2) {
		$('.slider .prev').css('display', 'none');
	}

	function moveLeft() {
		$('.slider ul').animate({
			left : -leftIncrement + '%'
		}, 500, function(){
			$('.slider ul li:first-child').appendTo('.slider ul');
			$('.slider ul').css('left', '');

			if($('.navigator span').hasClass('active')) {

				if($('.navigator span.active').is(':last-child')) {
					$('span.active').removeClass('active');
					$('.navigator span:first-child').addClass('active');
				} else {
					$('span.active').next().addClass('active');
					$('span.active').prev().removeClass('active');
				}
			}
		});
	}


	function moveRight() {
		$('.slider ul').animate({
			left : leftIncrement + '%'
		}, 500, function(){
			$('.slider ul li:last-child').prependTo('.slider ul');
			$('.slider ul').css('left', '');

			if($('.navigator span').hasClass('active')) {

				if($('.navigator span.active').is(':first-child')) {
					$('span.active').removeClass('active');
					$('.navigator span:last-child').addClass('active');
				} else {
					$('span.active').prev().addClass('active');
					$('span.active').next().removeClass('active');
				}
			}
		});
	}


	// $('.chkbox').click(function() {
	// 	if($('.chkbox').is(':checked')) {
	// 		$('.slider > span').hide();
	// 		$(this).next('label').text('Auto Playing')
	// 		invertalValue = setInterval(function() {
	// 			moveLeft();
	// 		}, 5000);
	// 	} else {
	// 		$(this).next('label').text('Auto Play?')
	// 		if(liCount == 2) {
	// 			$('.slider .next').show();
	// 		} else if(liCount > 2){
	// 			$('.slider > span').show();
	// 		}
	// 		clearInterval(invertalValue);
	// 	}
	// });
  
  if(liCount > 1) {
		invertalValue = setInterval(function() {
			moveLeft();
		}, 5000);
	}

	$('.prev').click(function(){
		moveRight();
	});

	$('.next').click(function(){
		moveLeft();
	});

})(jQuery);


(function ($) {

        "use strict";

        // ACCORDIAN

        panelAccordian();

        // RADIAL PROGRESS BAR
        enableRadialProgress();

        enableSwiper();

        /*COUNTER*/
        var countLineProgress = 0;
        var countCounterUp = 0;
        var a = 0;
        countCounterUp = enableCounterUp(countCounterUp);

        $(window).on('scroll', function () {
                countCounterUp = enableCounterUp(countCounterUp);
        });

        /*CUSTOME ISOTOPE*/
        var selectedAttr = $('[data-select].active');
        selectedActive(selectedAttr);

        $('[data-select]').on("click", function () {
                var selectedAttr = $(this);
                selectedActive(selectedAttr);
                return false;
        });


        // DROPDOWN MENU

        var winWidth = $(window).width();
        dropdownMenu(winWidth);

        $(window).on('resize', function () {
                winWidth = $(window).width();
                dropdownMenu(winWidth);

        });


        $('[data-menu]').on('click', function () {

                var mainMenu = $(this).data('menu');

                $(mainMenu).toggleClass('visible-menu');

        });


})(jQuery);


function dropdownMenu(winWidth) {

        if (winWidth > 767) {

                $('.main-menu li.drop-down').on('mouseover', function () {
                        var $this = $(this),
                                menuAnchor = $this.children('a');

                        menuAnchor.addClass('mouseover');

                }).on('mouseleave', function () {
                        var $this = $(this),
                                menuAnchor = $this.children('a');

                        menuAnchor.removeClass('mouseover');
                });

        } else {

                $('.main-menu li.drop-down > a').on('click', function () {

                        if ($(this).attr('href') == '#') return false;
                        if ($(this).hasClass('mouseover')) {
                                $(this).removeClass('mouseover');
                        }
                        else {
                                $(this).addClass('mouseover');
                        }
                        return false;
                });
        }

}

function enableSwiper() {

        if (isExists('.swiper-container')) {

                $('.swiper-container').each(function (index) {

                        var swiperDirection = $(this).data('swiper-direction'),
                                swiperSlidePerView = $(this).data('swiper-slides-per-view'),
                                swiperBreakpoints = $(this).data('swiper-breakpoints'),
                                swiperSpeed = $(this).data('swiper-speed'),
                                swiperCrossFade = $(this).data('swiper-crossfade'),
                                swiperLoop = $(this).data('swiper-loop'),
                                swiperAutoplay = $(this).data('swiper-autoplay'),
                                swiperMousewheelControl = $(this).data('swiper-wheel-control'),
                                swipeSlidesPerview = $(this).data('slides-perview'),
                                swiperMargin = parseInt($(this).data('swiper-margin')),
                                swiperSlideEffect = $(this).data('slide-effect'),
                                swiperAutoHeight = $(this).data('autoheight'),
                                swiperScrollbar = ($(this).data('scrollbar') ? $(this).parentsUntil('.swiper-area').find('.swiper-scrollbar') : null);
                        swiperScrollbar = (isExists(swiperScrollbar) ? swiperScrollbar : null),
                                swprResponsive = $(this).data('swpr-responsive');

                        var swiper = new Swiper($(this)[0], {
                                pagination: $(this).find('.swiper-pagination'),
                                slidesPerView: (swiperSlidePerView ? swiperSlidePerView : 1),
                                direction: (swiperDirection ? swiperDirection : 'horizontal'),
                                loop: (swiperLoop ? swiperLoop : false),
                                nextButton: '.swiper-button-next',
                                prevButton: '.swiper-button-prev',
                                autoplay: (swiperAutoplay ? swiperAutoplay : false),
                                paginationClickable: true,
                                spaceBetween: (swiperMargin ? swiperMargin : 0),
                                mousewheelControl: ((swiperMousewheelControl) ? swiperMousewheelControl : false),
                                scrollbar: (swiperScrollbar ? swiperScrollbar : null),
                                scrollbarHide: false,
                                speed: (swiperSpeed ? swiperSpeed : 1000),
                                autoHeight: ((swiperAutoHeight == false) ? swiperAutoHeight : true),
                                effect: (swiperSlideEffect ? swiperSlideEffect : 'coverflow'),
                                fade: {crossFade: swiperCrossFade ? swiperCrossFade : false},
                                breakpoints: {
                                        1200: {slidesPerView: swprResponsive[3] ? swprResponsive[3] : 1,},
                                        992: {slidesPerView: swprResponsive[2] ? swprResponsive[2] : 1,},
                                        768: {slidesPerView: swprResponsive[1] ? swprResponsive[1] : 1,},
                                        576: {slidesPerView: swprResponsive[0] ? swprResponsive[0] : 1,}

                                },
                        });

                        $('.swiper-container').hover(function () {
                                swiper.stopAutoplay();
                        }, function () {
                                swiper.startAutoplay();
                        });


                });


        }
}

function isExists(elem) {
        if ($(elem).length > 0) {
                return true;
        }
        return false;
}

function initMap() {

        // Create a map object, and include the MapTypeId to add
        // to the map type control.

        var uluru = {lat: 56.946285, lng: 24.105078};
        var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 4,
                center: uluru
        });

        var image = 'images/google-marker.png';
        var marker = new google.maps.Marker({
                position: uluru,
                map: map,
                icon: image
        });
        //Associate the styled map with the MapTypeId and set it to display.
        map.mapTypes.set('styled_map', styledMapType);
        map.setMapTypeId('styled_map');
}