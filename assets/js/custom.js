(function($){
    function marQFun() {
        let widthResize = jQuery(window).width();
        let appendMarQ = jQuery('.marquee_style_area');
        let banner_list = jQuery('.banner_list');
        let why_sameningeld_img = jQuery('.why_sameningeld_img');

        if (widthResize < 992) {
            jQuery('.header_container').prepend(appendMarQ);
            jQuery('.banner_form_wrap').after(banner_list);
        }else {
            jQuery('.right_headerInner').prepend(appendMarQ);
            jQuery('.banner_title').after(banner_list);
        }

        if (widthResize < 768) {
            jQuery('.why_sameningeld_content_inner').append(why_sameningeld_img);
        }else {
            jQuery('.why_sameningeld_imgcol').append(why_sameningeld_img);
        }
    }

    marQFun();
    jQuery(window).resize(function() {
        marQFun();
    });

    jQuery('.common_btn').click(function () {
        let header_Height = jQuery('.header_container').height();
        var Lochref = jQuery(this).attr('href');
        jQuery("html, body").stop().animate({
        scrollTop: jQuery(Lochref).offset().top - header_Height
        }, 1500);
        return false;
    });

    if(matchMedia('only screen and (max-width: 991px)').matches) {
        var $mwo = $('.marquee-with-options');
        jQuery('.marquee').marquee();
        jQuery('.marquee-with-options').marquee({
            speed: 40,
            gap: 0,
            delayBeforeStart: 0,
            direction: 'left',
            duplicated: true,
            pauseOnHover: true
        });

        //pause and resume links
        jQuery('.pause').click(function(e){
            e.preventDefault();
            $mwo.trigger('pause');
        });

        jQuery('.resume').click(function(e){
            e.preventDefault();
            $mwo.trigger('resume');
        });

        //toggle
        jQuery('.toggle').hover(function(e){
            $mwo.trigger('pause');
            },function(){
            $mwo.trigger('resume');
        })
        .click(function(e){
            e.preventDefault();
        })
    }


    jQuery( ".toggle_view_bg" ).click(function(e) {
        if(jQuery(this).parent('.toggle_view_item').hasClass('active')) {
        } else {
            $( ".toggle_view_bg" ).each(function() {
                if(jQuery(this).parent('.toggle_view_item').hasClass('active')) {
                    jQuery(this).parent('.toggle_view_item').toggleClass('active');
                    jQuery(this).next('.show_details').slideToggle('hide');
                }
            });
        }
        jQuery(this).parent('.toggle_view_item').toggleClass('active');
        jQuery(this).next('.show_details').slideToggle('slow');
        e.preventDefault();
    });
})(jQuery);

    


jQuery(document).ready(function(){
    setTimeout(function() { 
        var total_items = jQuery(".entrepreneurs_carouselslider_item").length;
        var total_itemsMath = Math.ceil(total_items / 3);

        var entrepreneurs_carouselslider = jQuery(".entrepreneurs_carouselslider");
        entrepreneurs_carouselslider.owlCarousel({
            loop:true,
            margin:0,
            items: 1,
            nav:true,
            dots:false,
            mouseDrag: true,
            touchDrag: true,
            autoHeight: true,
            responsiveClass:true,
            responsive:{
                0:{
                    stagePadding: 0,
                    nav:true,
                    dots:true,
                    dotsEach: total_itemsMath,
                },
                768:{
                    stagePadding: 0,
                    nav:true,
                    dots:false,
                },
            }
        });
    }, 300);

    if(matchMedia('only screen and (max-width: 767px)').matches) {
        var two_col_item = jQuery(".two_col_bx").length;
        var toraltwo_colMath = Math.ceil(two_col_item / 2);
        var facts_numbers_carouselmobile = $(".facts_numbers_carouselmobile");
        var oWLcarousel;
        var carouselOptions = {
            loop:true,
            margin:0,
            items: 1,
            nav:true,
            dots:true,
            mouseDrag: true,
            touchDrag: true,
            autoHeight: false,
            responsiveClass:true,
            slideBy: "page",
            responsive: {
                0: {
                    items: 1,
                    rows: 2,
                    dotsEach: toraltwo_colMath,
                },
            },
        };
    

        //Taken from Owl Carousel so we calculate width the same way
        var viewport = function () {
            var width;
            if (carouselOptions.responsiveBaseElement && carouselOptions.responsiveBaseElement !== window) {
                width = $(carouselOptions.responsiveBaseElement).width();
            } else if (window.innerWidth) {
                width = window.innerWidth;
            } else if (document.documentElement && document.documentElement.clientWidth) {
                width = document.documentElement.clientWidth;
            } else {
                console.warn("Can not detect viewport width.");
            }
            return width;
        };

        var severalRows = false;
        var orderedBreakpoints = [];
        for (var breakpoint in carouselOptions.responsive) {
            if (carouselOptions.responsive[breakpoint].rows > 1) {
                severalRows = true;
            }
            orderedBreakpoints.push(parseInt(breakpoint));
        }

        //Custom logic is active if oWLcarousel is set up to have more than one row for some given window width
        if (severalRows) {
            orderedBreakpoints.sort(function (a, b) {
                return b - a;
            });
            var slides = facts_numbers_carouselmobile.find("[data-slide-index]");
            var slidesNb = slides.length;
            if (slidesNb > 0) {
                var rowsNb;
                var previousRowsNb = undefined;
                var colsNb;
                var previousColsNb = undefined;

                //Calculates number of rows and cols based on current window width
                var updateRowsColsNb = function () {
                    var width = viewport();
                    for (var i = 0; i < orderedBreakpoints.length; i++) {
                        var breakpoint = orderedBreakpoints[i];
                        if (width >= breakpoint || i == orderedBreakpoints.length - 1) {
                            var breakpointSettings = carouselOptions.responsive["" + breakpoint];
                            rowsNb = breakpointSettings.rows;
                            colsNb = breakpointSettings.items;
                            break;
                        }
                    }
                };

                var updateCarousel = function () {
                    updateRowsColsNb();
                    //oWLcarousel is recalculated if and only if a change in number of columns/rows is requested
                    if (rowsNb != previousRowsNb || colsNb != previousColsNb) {
                        var reInit = false;
                        if (oWLcarousel) {
                            //Destroy existing oWLcarousel if any, and set html markup back to its initial state
                            oWLcarousel.trigger("destroy.owl.carousel");
                            oWLcarousel = undefined;
                            slides = facts_numbers_carouselmobile.find("[data-slide-index]").detach().appendTo(facts_numbers_carouselmobile);
                            facts_numbers_carouselmobile.find(".two_col_bx").remove();
                            reInit = true;
                        }

                        //This is the only real 'smart' part of the algorithm

                        //First calculate the number of needed columns for the whole oWLcarousel
                        var perPage = rowsNb * colsNb;
                        var pageIndex = Math.floor(slidesNb / perPage);
                        var fakeColsNb = pageIndex * colsNb + (slidesNb >= pageIndex * perPage + colsNb ? colsNb : slidesNb % colsNb);

                        //Then populate with needed html markup
                        var count = 0;
                        for (var i = 0; i < fakeColsNb; i++) {
                            //For each column, create a new wrapper div
                            var fakeCol = $('<div class="two_col_bx"></div>').appendTo(facts_numbers_carouselmobile);
                            for (var j = 0; j < rowsNb; j++) {
                                //For each row in said column, calculate which slide should be present
                                var index = Math.floor(count / perPage) * perPage + (i % colsNb) + j * colsNb;
                                if (index < slidesNb) {
                                    //If said slide exists, move it under wrapper div
                                    slides
                                        .filter("[data-slide-index=" + index + "]")
                                        .detach()
                                        .appendTo(fakeCol);
                                }
                                count++;
                            }
                        }
                        //end of 'smart' part

                        previousRowsNb = rowsNb;
                        previousColsNb = colsNb;

                        if (reInit) {
                            //re-init oWLcarousel with new markup
                            oWLcarousel = facts_numbers_carouselmobile.owlCarousel(carouselOptions);
                        }
                    }
                };

                //Trigger possible update when window size changes
                $(window).on("resize", updateCarousel);

                //We need to execute the algorithm once before first init in any case
                updateCarousel();
            }
        }
        //init
        oWLcarousel = facts_numbers_carouselmobile.owlCarousel(carouselOptions);
    }

    // couner js
    let number = document.getElementById("countdown");
    let counterDSK = 6;
    setInterval(() => {
        if(counterDSK == 0){
            clearInterval();
        }else{
            counterDSK -= 1;
            number.innerHTML = counterDSK;
        }
    }, 900);
});


jQuery(window).scroll(function(){
    var receivebtnHeight = jQuery('.header_btn_wrap .common_btn').height();
    var First_offH = jQuery('.visible_itme1').offset().top - 72;
    var Second_offH = jQuery('.visible_itme2').offset().top - 72;

    var First_innerH = jQuery('.visible_itme1').height();
    var Second_innerH = jQuery('.visible_itme2').height();


    var scree_vh = jQuery(window).height();
    var scrollTop = jQuery(this).scrollTop();

    // offset top form scree height positiive
    var total_FoffstH_innH = First_offH + First_innerH;
    var total_SoffstH_innH = Second_offH + Second_innerH;

    // offset top form scree height nagetive
    var total_FoffH_SCNH = First_offH - scree_vh;
    var total_SoffH_SCNH = Second_offH - scree_vh;

    if (( scrollTop > total_FoffH_SCNH && scrollTop < total_FoffstH_innH )  || ( scrollTop > total_SoffH_SCNH && scrollTop < total_SoffstH_innH )) {
        jQuery('.header_area').removeClass('padding_manage');
    }else {
        jQuery('.header_area').addClass('padding_manage');
    }
});