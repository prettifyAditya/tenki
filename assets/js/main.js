$(function () {
    if(!$('header').is('.header-fixed')){
        $(window).on('scroll', function() {
            $(this).scrollTop() > 100 ? $('header').addClass('header-fixed') : $('header').removeClass('header-fixed');
        }); 
        $(window).scrollTop() > 100 ? $('header').addClass('header-fixed') : $('header').removeClass('header-fixed');
    }
    const $backToTop = $('.back-to-top');

    $(window).on('scroll', function () {
        if($backToTop){
            $backToTop.toggleClass('active', $(this).scrollTop() > 200);
        }
    });
    $backToTop.on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, 1000);
    });

    //

    const labelInput = $("input, textarea");
    labelInput.on('change', function () {
        if ($(this).val() !== "") {
            $(this).addClass("valid");
        } else {
            $(this).removeClass("valid");
        }
    });
    const formControls = $(".form-control");
    formControls.on('focus input change blur', throttle(handleForm));
    formControls.each(function () {
        handleForm.call(this);
    });

    //

    niceSelect($);
    $('select').niceSelect();

    //

    adjustWhatsAppUrls();
    $(window).resize(function () {
        adjustWhatsAppUrls();
    });

    //

    $('[data-slide]').click(function(){
        $(".plus-ico").toggleClass('active');
        var slide = $(this).data('slide');
        $(slide).stop().slideToggle();
        // window.scrollBy({ top: 100, behavior: 'smooth' });
    })

    $('.title').click(function () {
        var parentLi = $(this).closest('.hasDropdown');
        var slideMenu = parentLi.find('.dropdown-menu-ham');
        
        $('.dropdown-menu-ham').not(slideMenu).slideUp();
        $('.title').not(this).removeClass('active');
    
        $(this).toggleClass('active');
        slideMenu.stop().slideToggle();
    });

    startCountAnimation();
    $(window).scroll(function () {
        startCountAnimation();
    })

    //
    window.addEventListener('load', handleAnimations);
    window.addEventListener('resize', handleAnimations);
    window.addEventListener('orientationchange', handleAnimations);
    handleAnimations();

    //

    document.querySelectorAll('img.svg').forEach(img => {
        fetch(img.src)
            .then(response => response.text())
            .then(data => {
                const svg = new DOMParser().parseFromString(data, 'image/svg+xml').querySelector('svg');
                if (svg) {
                    svg.classList.add('svg');
                    img.replaceWith(svg);
                }
            });
    });    

    //

    $(document).on('click', '.tab-nav [data-tab]:not(.disabled-btn)', function () {
        var tab = $(this).addClass('active').siblings().removeClass('active').end().data('tab');
        $('.tab-nav-content >*[data-tab= ' + tab + ']').addClass('active').siblings().removeClass('active');
    });
    
    //

    $(document).on('click', '[data-scrollTo]',function () {
        headerheight = parseInt($(':root').css('--headerfixed')) + parseInt($(':root').css('--headerstripfixed'));
        var section = $(this).attr('data-scrollTo');
        if (section) {
            $('html, body').stop().animate({
                scrollTop: $(section).offset().top - headerheight
            }, 1000);
        }
    });

    //

    $(document).on('click', '[data-model]',function () {
        var model = $(this).attr('data-model');
        openModel(model);
    });

    $(document).on('click','.overlay,.close', function () {
        closeModel();
    });

    //

    $('[data-discount]').each(function() {
        var mrp = parseFloat($(this).find('[data-mrp]').attr('data-mrp'));
        var sp = parseFloat($(this).find('[data-sp]').attr('data-sp'));
    
        if (!isNaN(mrp) && !isNaN(sp)) {  
            if (mrp > sp) { // Ensure discount calculation is valid
                var discount = ((mrp - sp) / mrp) * 100;
                $(this).find('[data-discount]').text(discount.toFixed(2));
                console.log(discount);
            } else {  
                $(this).find('[data-discountli]').remove(); // Remove if no discount
            }
        }
    });    

    //

    $('.tdur-search').click(function(){
        $('.search-product-amjkr').focus();
    })

    $('input.search-product-amjkr').on('keyup change', function () {
        if ($(this).val().length > 1) {
            $('.secsrch-cjrvs-sec').hide();
            $('.search-result-prdct-wrap').fadeIn();
            productNotFound('.search-result-prdct',true);
        }
        else {
            $('.secsrch-cjrvs-sec').fadeIn();
            $('.search-result-prdct-wrap').hide();
            productNotFound('.search-result-prdct',false);
        }
    });

    $('.close-search-whktk').click(function(){
        $('input.search-product-amjkr').val('').change();
    })

    //

    $('input[type="file"].form-control').on('change', function () {
        var fileName = $(this).val().replace(/C:\\fakepath\\/i, '');
        if (fileName) {
            $(this).siblings('.file-name').css('--filenameinitial', `"${fileName}"`);
        } else {
            $(this).siblings('.file-name').css('--filenameinitial', 'var(--filename)');
        }
    });

    //

    const inputs = document.querySelectorAll(".otpInput input");

    inputs.forEach(function(input, index) {
        input.setAttribute("data-index", index);
        input.addEventListener("keyup", handleOtp);
        input.addEventListener("paste", handleOnPasteOtp);
    });
    function handleOtp(e) {
        var input = e.target;
        var value = input.value;
        var isValidInput = value.match(/[0-9a-z]/gi);
        input.value = "";
        input.value = isValidInput ? value[0] : "";
        var fieldIndex = parseInt(input.getAttribute("data-index"));
        if (fieldIndex < inputs.length - 1 && isValidInput) {
            inputs[fieldIndex + 1].focus();
        }
        if (e.key === "Backspace" && fieldIndex > 0) {
            inputs[fieldIndex - 1].focus();
        }
        if (fieldIndex == inputs.length - 1 && isValidInput) {
            submit();
        }
    }
    function handleOnPasteOtp(e) {
        e.preventDefault();
        var pastedText = (e.clipboardData || window.clipboardData).getData("text");
        for (var i = 0; i < pastedText.length; i++) {
            if (pastedText[i].match(/[0-9a-z]/gi)) {
                inputs[i].value = pastedText[i];
                inputs[i].dispatchEvent(new Event("keyup"));
            }
        }
    }
 
    function submit() {
        console.log('Submit Form');
    }
 
 
    $('.back-to-login').click(function(){
        $('.otp-verify').hide();
        $('#loginForm').show();
    });

    $('.otp-pop-btn').click(function(){
        $('.otp-verify').show();
        $('#loginForm').hide();
    });

    //

    $(document).on('click', '[data-video]',function () {
        lenis.stop();
        var src = $(this).attr('data-video');
        if (src.includes('youtube.com/embed/')) {
            var videoId = src.split('embed/')[1].split('?')[0];
            src += '&autoplay=1&mute=1&loop=1&playlist=' + videoId;
            $('#iframe1').attr('src', src);
        }
        else{
            $('#iframe1').attr('src', src);
        }
        $('.video-pop').addClass('is-open');
    });
    $('.close-video').on('click', function () {
        lenis.start();
        $('#iframe1').attr('src', '');
        $('.video-pop').removeClass('is-open');
    });

    //

    $('.summery-detail-content .col:has(article) .title').click(function(){
        var $parentCol = $(this).parent('.col');
        $('.summery-detail-content .col').not($parentCol).find('article').stop().slideUp();
        $('.summery-detail-content .col').not($parentCol).removeClass('active');
        $parentCol.toggleClass('active');
        $(this).siblings('article').stop().slideToggle();
    }); 

    //convert tab nav to dropdown in mobile

    if ($(window).width() < 991) {
        $('.tab-filter').each(function () {
            var $this = $(this);
            setTimeout(function () {
                var activeText = $this.find('li.active').text();
                $this.find('ul').before(`<span class="tab-filter-span">${activeText}</span>`);
            }, 0);        

            $(document).on('click','.tab-filter-span',function(){
                $(this).siblings('ul').stop().slideToggle();
            })
        });

        $(document).on('click', function (e) {
            if (!$(e.target).closest('.tab-filter-span').length) {
                $('.tab-filter ul').stop().slideUp();
            }
        });
    }
    
    $('.adi-select-wrap').each(function() {
        const $wrap = $(this);
        const $label = $wrap.find('.label');
        const initialLabelText = $label.text();
        const $menu = $wrap.find('.adi-select-menu');
        const $input = $wrap.find('input');

        $label.on('click', function(e) {
            e.stopPropagation();
            $('.adi-select-menu').not($menu).slideUp();
            $menu.stop().slideToggle();
        });
        $('body').click(function(){
            $menu.slideUp();
        })

        if ($input.is(':checked')) {
            $wrap.addClass('active');
            if ($wrap.hasClass('chng-label')) {
                const selectedText = $input.filter(':checked').map(function() {
                    return $(this).val();
                }).get().join(', '); 
                $label.text(selectedText || initialLabelText);
            }
        }
    
        $input.on('change', function() {
            const checkedCount = $input.filter(':checked').length;
            $wrap.toggleClass('active', checkedCount > 0);
    
            if ($wrap.hasClass('chng-label')) {
                const selectedText = $input.filter(':checked').map(function() {
                    return $(this).val();
                }).get().join(', '); 
                $menu.slideUp();
                $label.text(selectedText || initialLabelText);
            }
        });

        $menu.on('click', function(e) {
            e.stopPropagation();
        });
    }); 

    // MobileHam
    function mobileHam(){
        if (window.matchMedia("(max-width: 991px)").matches){
            $('.list-filter-wrap .colB').addClass('model');
            if (!$('.list-filter-wrap .colB > .close').length) {
                $('.list-filter-wrap .colB').append('<button class="close filterClose" type="button"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="none" stroke="#000" stroke-width="2" d="M22 12H2m9-9l-9 9l9 9" /></svg></button>');
            }         
            $('.filterPopBtn').on('click', function(){
                $('.list-filter-wrap').css('z-index', 6);
            })
        }
        else{
            $('.header-category-strip, .list-filter-wrap .colB').removeClass('model');
            $('.header-category-strip, .list-filter-wrap .colB').find('.close').remove();
        }
    }

    $(document).on('click', '.filterClose', function () {
        $('.list-filter-wrap').css('z-index', 4);
    });

    $(document).ready(function(){
        mobileHam();
    });

    $(window).resize(function(){
        mobileHam();
    });


    //Sliders

    function commonSlider1(containerSelector, prevButtonSelector, nextButtonSelector) {
        return new Swiper(containerSelector, {
            loop: false,
            speed: 1500,
            navigation: {
                prevEl: prevButtonSelector,
                nextEl: nextButtonSelector,
            },
            breakpoints: {
                0: {
                    slidesPerView: 1.2,
                    spaceBetween: 10,
                },
                675: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                },
                992: {
                    slidesPerView: 3,
                    spaceBetween: 15,
                }
            }
        });
    }
    commonSlider1('.product-slider', '.product-prev', '.product-next')
    commonSlider1('.testimonial-slider', '.testimonial-prev', '.testimonial-next')
    commonSlider1('.more-categories-slider', '.more-categories-prev', '.more-categories-next')

    new Swiper('.text-slider', {
        loop: false,
        speed: 1500,
        slidesPerView: 1,
        spaceBetween: 10,
        autoplay: {
            delay: 1000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
        },
        direction:"vertical"
    });

    new Swiper('.patents_slider', {
        loop: true,
        speed: 3000,
        autoplay: {
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
        },
        breakpoints: {
            0: {
                slidesPerView: 4,
                spaceBetween: 20,
            },
            675: {
                slidesPerView: 5,
                spaceBetween: 20,
            },
            991: {
                slidesPerView: 6,
                spaceBetween: 20,
            }
        },
    });

    new Swiper('.property-slider', {
        loop: false,
        speed: 1000,
        grid:{
            rows: 2,
            fill: "row",
        },
        navigation: {
            prevEl: ".property-prev",
            nextEl: ".property-next",
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
                spaceBetween: 10,
            },
            675: {
                slidesPerView: 2,
                spaceBetween: 15,
            }
        },
    })

    });


//

