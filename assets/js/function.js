
// Open Model

function openModel(model) {
    lenis.stop();
    if ($(model).length) { 
        $('.model').removeClass('is-open');
        $(model).addClass('is-open');
        $('.overlay').addClass('is-open');
        $('body, html').addClass('overflow-hidden');
    } else {
        console.error(`Element '${model}' not found`);
    }
}

// Close Model

function closeModel(){
    lenis.start();
    $('.overlay,.model').removeClass('is-open');
    $('body,html').removeClass('overflow-hidden');
}

// Form label validation

function handleForm() {
    const input = $(this);
    let isValid = false;

    if (input.is('select')) {
        isValid = this.value !== "" && this.value !== "0";
        $(this).siblings('.custom-select').toggleClass("valid", isValid);
    } else {
        isValid = this.value !== "";
    }

    input.toggleClass("valid", isValid);
    input.parent('.form-group').toggleClass("active", isValid);
}

function throttle(callback, delay = 250) {
    let isThrottled = false;
    return function () {
        if (!isThrottled) {
        callback.apply(this, arguments);
        isThrottled = true;
        setTimeout(() => (isThrottled = false), delay);
        }
    };
}

//append not found div
function productNotFound(selector, condition) {
    const message = '<div class="product-not-found"><div class="nt-fnd-wrp"><img class="ico" src="assets/icon/not-found.gif" alt=""><p>Product Not Found!</p><a href="product-listing.html" class="btn">Continue Shopping</a></div></div>';
    $(selector).find('.product-not-found').remove();
    if (condition) $(selector).append(message);
}


// whatsapp url api to web

function adjustWhatsAppUrls() {
    var screenWidth = $(window).width();

    if (screenWidth > 991) {
        $('a[href^="https://api.whatsapp.com/"]').each(function() {
            var currentHref = $(this).attr('href');
            var newHref = currentHref.replace('https://api.whatsapp.com/', 'https://web.whatsapp.com/');
            $(this).attr('href', newHref);
        });
    }
}

//


function filterswiper(swiperSelector, slidetab) {
    const sliderElement = document.querySelector(swiperSelector);
    if (sliderElement && sliderElement.swiper) {
        const sliderInstance = sliderElement.swiper;
        function filterSlides(slideType) {
            sliderInstance.slides.forEach(slide => {
                const $slide = $(slide);
                $slide.toggle($slide.attr('data-slide') === slideType || !slideType);
            });
            sliderInstance.update();
        }
        $(slidetab).on('change', 'input', function () {
            const slideType = $(this).val();
            filterSlides(slideType);
        });
        const initialSlideType = $(slidetab).find('input:checked').val();
        filterSlides(initialSlideType);
    }
}


// show hide tab

function showtab(attr, tab) {
    $(`[data-${attr}]`).not(`[data-${attr}="${tab}"]`).hide();
    $(`[data-${attr}="${tab}"]`).show();
}

//count animation


function startCountAnimation() {
    $('[data-count]').each(function () {
        if($(this).visible()){
            var $this = $(this),
            countTo = $this.attr('data-count'),
            countNum = $this.text();

            $({ countNum: countNum }).animate({ countNum: countTo }, {
                duration: 1000,
                easing: 'swing',
                step: function () {
                    $this.text(Math.floor(this.countNum));
                },
                complete: function () {
                    $this.text(this.countNum);
                }
            });
        }
        else{
            $(this).html('0');
        }
        
    });
}

//

function handleAnimations(){
    if (window.innerWidth > 1007) {
        if($('[data-animate]').length > 0){
            enterView({
                selector: '[data-animate]',
                offset: 0,
                enter: function(el) {
                el.classList.add('kmr-animate');
                },
                exit: function (el) {
                el.classList.remove('kmr-animate');
                }
            });
        }
    }
}

//

function niceSelect($) {
    $.fn.niceSelect = function(method) {
        function createNiceSelect(select) {
            select.after($("<div></div>").addClass("custom-select").addClass(select.attr("class")||"").addClass(select.attr("disabled")?"disabled":"").attr("tabindex",select.attr("disabled")?null:"0").html('<span class="current"></span><ul class="list"></ul>'));

            var niceSelect = select.next();
            var options = select.find('option');
            var selectedOption = select.find('option:selected');

            niceSelect.find('.current').html(selectedOption.data('display') || selectedOption.text());

            options.each(function() {
                var option = $(this);
                var display = option.data('display');

                niceSelect.find("ul").append($("<li></li>").attr("data-value",option.val()).attr("data-display",display||null).addClass("option"+(option.is(":selected")?" selected":"")+(option.is(":disabled")?" disabled":"")).html(option.text()));
            });
        }

        if (typeof method === 'string') {
            if (method === 'update') {
                return this.each(function() {
                    var select = $(this);
                    var niceSelect = $(this).next('.custom-select');
                    var isOpen = niceSelect.hasClass('open');

                    if (niceSelect.length) {
                        niceSelect.remove();
                        createNiceSelect(select);

                        if (isOpen) {
                            select.next().trigger('click');
                        }
                    }
                });
            } else if (method === 'destroy') {
                this.each(function() {
                    var select = $(this);
                    var niceSelect = $(this).next('.custom-select');

                    if (niceSelect.length) {
                        niceSelect.remove();
                        select.css('display', '');
                    }
                });

                if ($('.custom-select').length === 0) {
                    $(document).off('.nice_select');
                }

                return this;
            } else {
                console.log('Method "' + method + '" does not exist.');
            }

            return this;
        }

        this.hide();

        this.each(function() {
            var select = $(this);

            if (!select.next().hasClass('custom-select')) {
                createNiceSelect(select);
            }
        });

        $(document).off('.nice_select');

        $(document).on('click.nice_select', '.custom-select', function() {
            var niceSelect = $(this);

            $('.custom-select').not(niceSelect).removeClass('open');
            niceSelect.toggleClass('open');

            if (niceSelect.hasClass('open')) {
                niceSelect.find('.option');
                niceSelect.find('.focus').removeClass('focus');
                niceSelect.find('.selected').addClass('focus');
            } else {
                niceSelect.focus();
            }
        });

        $(document).on('click.nice_select', function(event) {
            if ($(event.target).closest('.custom-select').length === 0) {
                $('.custom-select').removeClass('open').find('.option');
            }
        });

        $(document).on('click.nice_select', '.custom-select .option:not(.disabled)', function() {
            var option = $(this);
            var niceSelect = option.closest('.custom-select');

            niceSelect.find('.selected').removeClass('selected');
            option.addClass('selected');

            var display = option.data('display') || option.text();
            niceSelect.find('.current').text(display);

            niceSelect.prev('select').val(option.data('value')).trigger('change');
        });

        var pointerEvents = document.createElement('a').style;
        pointerEvents.cssText = 'pointer-events:auto';

        if (pointerEvents.pointerEvents !== 'auto') {
            $('html').addClass('no-csspointerevents');
        }

        return this;
    };
}

const lenis = new Lenis({
    duration: 1.4,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
    direction: 'vertical',
    gestureDirection: 'vertical',
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);