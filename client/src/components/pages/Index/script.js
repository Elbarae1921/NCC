import $ from 'jquery';

const script = () => {
    var prevVal = window.innerWidth;
    if(window.innerWidth > 900) {
        $('.pane').on({
            'mouseenter': function () { $(this.firstElementChild).fadeIn(200, () => { this.firstElementChild.style.visibility = 'visible' }) },
            'mouseleave': function () { $(this.firstElementChild).fadeOut(0) },
        });
    }

    $(window).on('resize', function() {
        if(window.innerWidth > 900) {
            if(prevVal <= 900) {
                $('.pane').find('.button-container').css('visibility', 'hidden');
                $('.pane').on({
                    'mouseenter': function () { $(this.firstElementChild).fadeIn(200, () => { this.firstElementChild.style.visibility = 'visible' }) },
                    'mouseleave': function () { $(this.firstElementChild).fadeOut(0) },
                });
            }
        }
        else {
            $('.pane').off();
            $('.pane').find('.button-container').css('display', 'flex');
        }
        prevVal = window.innerWidth;
    });
}

export default script;