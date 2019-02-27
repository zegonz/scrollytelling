$(window).load(function() {
    var animationSlide = {
        animate: false,
        stopScroll: false,
        getOut: false,
        translateVisualValue: 30,
        translateVisualShift: 30,
        init: function() {

            const container = document.querySelector('.scroll-slide')
            const containerTop = container.offsetTop - 20
            const articles = container.querySelectorAll('.scroll-slide__item')

            const articlesLastIndex = articles.length - 1

            let activeArticleIndex = 0
            let isInContainer = false
            let isRunning = false
            let runningTimeout = null

            $(window).on('scroll', function() {
                const scrollDiff = $(window).scrollTop() - containerTop

                if (scrollDiff !== 0) {
                    const isNextActivation = scrollDiff > 0 && activeArticleIndex < articlesLastIndex
                    const isPrevActivation = scrollDiff < 0 && activeArticleIndex > 0

                    const isActivation = isNextActivation || isPrevActivation

                    if (isActivation || isInContainer) {
                        window.scrollTo(0, containerTop)
                        $('.scroll-slide-visual__triggered-item').addClass('scroll-slide-visual__triggered-item--active');
                    }
                    if (!isRunning && !animationSlide.animate) {
                        isRunning = true

                        if (isActivation) {
                            isInContainer = true

                            if (isNextActivation) {
                                animationSlide.animate = true;
                                activeArticleIndex += 1
                                animationSlide.next(activeArticleIndex);
                            } else {
                                animationSlide.animate = true;
                                activeArticleIndex -= 1
                                animationSlide.prev(activeArticleIndex);
                            }

                        } else {
                            isInContainer = false
                        }
                    }
                    clearTimeout(runningTimeout);
                    var runningTimeout = setTimeout(function(){
                        isRunning = false
                    }, 100);
                }
            });

        },
        next: function(step) {
            var items = $('.scroll-slide__item');
            var beforeEl = items.eq(step - 1);
            var newEl = items.eq(step);
            beforeEl.removeClass('scroll-slide__item--active')
            .on('transitionend webkitTransitionEnd oTransitionEnd', function(e) {
                $(this).off('transitionend webkitTransitionEnd oTransitionEnd');
                animationSlide.animate = false;
                newEl.addClass('scroll-slide__item--active');
                animationSlide.visual(step - 1);
                animationSlide.control(step);
            });
        },
        prev: function(step) {
            var items = $('.scroll-slide__item');
            var beforeEl = items.eq(step + 1);
            var newEl = items.eq(step);
            beforeEl.removeClass('scroll-slide__item--active')
            .on('transitionend webkitTransitionEnd oTransitionEnd', function(e) {
                $(this).off('transitionend webkitTransitionEnd oTransitionEnd');
                animationSlide.animate = false;
                newEl.addClass('scroll-slide__item--active');
                animationSlide.visualPrev(step);
                animationSlide.control(step);
            });
        },
        visual: function(step) {
            animationSlide.animate = true;
            var visualItem = $('.scroll-slide-visual__item');
            visualItem.eq(step)
            .addClass('scroll-slide-visual__item--active')
            .css('transform', 'translateY(-'+ animationSlide.translateVisualValue + 'px)')
            .on('transitionend webkitTransitionEnd oTransitionEnd', function(e) {
                $(this).off('transitionend webkitTransitionEnd oTransitionEnd');
                animationSlide.animate = false;
                animationSlide.translateVisualValue += animationSlide.translateVisualShift;
            });
        },
        visualPrev: function(step) {
            animationSlide.animate = true;
            var visualItem = $('.scroll-slide-visual__item');
            visualItem.eq(step).removeClass('scroll-slide-visual__item--active')
            .css('transform', 'translateY(-200%)')
            .on('transitionend webkitTransitionEnd oTransitionEnd', function(e) {
                $(this).off('transitionend webkitTransitionEnd oTransitionEnd');
                animationSlide.animate = false;
            });
            if(step == 0)
                animationSlide.translateVisualValue = 30;
        },
        control: function(step) {
            var el = $('.slide-position__bullet');
            var label = $('.slide-position__label');
            el.eq(step).addClass('slide-position__bullet--active');
            label.removeClass('slide-position__label--active');
            el.eq(step).find('.slide-position__label').addClass('slide-position__label--active');
        }
    }

    animationSlide.init();

});