$.getJSON(`../assets/json/${window.location.search.substr(1).split("=")[1]}`, data => {
    let bar = '<div class="bar"></div>';
    if(data.text !== undefined) {
        let string = `<div class="page">`;
        string += `<div class="bar top"></div><h1>${data.name}</h1>`;

        /* Add on for image version 
         *
         *  if(data.profil !== undefined)
         *      string += `<img class="description" width="200" height="150" src="../assets/images/${data.id}/${data.profil}" />`;
         *
         */

        string += `<p class="description">`;
        data.text.forEach(element => string += `${element.value}<br/>`);
        string += `</p><div class="bar bottom"></div></div>`;

        $(".content").append(string);
    }

    data.images.forEach(element => {
        $(".content").append(`<div class="page"><img width="980px" height="613px" src="../assets/images/${data.id}/${element.src}"></div>`);
    });
});

$(function() {
    $('.slider.touch').pagesSliderTouch();
});

(function($) {
    var PagesSliderTouch = function (slider, options) {
        this.options = $.extend({
            endDuration: 300
        }, options);

        this.slider = slider;
        this.content = slider.children().first();
        this.currentIndex = 0;
        this.pages = this.content.children();
        this.slider.width(this.pages.first().width());

        var totalWidth = 0;
        this.pages.each(function (index, page) {
            totalWidth += $(page).width();
        });
        this.content.width(totalWidth);

        this.bindEvents();
    };
    $.extend(PagesSliderTouch.prototype, {
        bindEvents: function () {
            this._removeTransition = $.proxy(this.removeTransition, this);
            this._startDrag = $.proxy(this.startDrag, this);
            this._doDrag = $.proxy(this.doDrag, this);
            this._endDrag = $.proxy(this.endDrag, this);

            this.content
                .on('dragstart', this._startDrag)
                .on('transitionend', this._removeTransition);
            $('body')
                .on('drag', this._doDrag)
                .on('dragend', this._endDrag);
        },
        destroy: function () {
            this.content
                .off('dragstart', this._startDrag)
                .off('transitionend', this._removeTransition);
            $('body')
                .off('drag', this._doDrag)
                .off('dragend', this._endDrag);
        },
        startDrag: function (event) {
            this.enableDrag = true;
        },
        doDrag: function (event) {
            if (this.enableDrag) {
                var position = this.pages.eq(this.currentIndex).position();
                var delta = event.gesture.deltaX;

                this.content.css('transform', 'translate3d(' + (delta - position.left) + 'px, 0, 0)');
                event.preventDefault();
            }
        },
        endDrag: function (event) {
            if (this.enableDrag) {
                this.enableDrag = false;

                var delta = event.gesture.deltaX;
                if (Math.abs(delta) > this.slider.width() / 5) {
                    if (delta < 0) {
                        this.next();
                    } else {
                        this.prev();
                    }
                } else {
                    this.current();
                }
            }
            if(this.currentIndex === 0) {
                $('#left').hide();
            } else if(this.currentIndex === this.pages.length - 1) {
                $('#right').hide();
            } else {
                $('#left').show();
                $('#right').show();
            }
        },
        removeTransition: function() {
            this.content.css('transition', 'none');
        },
        goToIndex: function (index) {
            var position = this.pages.eq(index).position();

            this.content
                .css('transition', 'all ' + this.options.endDuration + 'ms ease')
                .css('transform', 'translate3d(' + (-1 * (position.left)) + 'px, 0, 0)');

            this.currentIndex = index;
        },
        current: function () {
            this.goToIndex(this.currentIndex);
        },
        next: function () {
            if (this.currentIndex >= this.pages.length - 1) {
                this.current();
            } else {
                this.goToIndex(this.currentIndex + 1);
            }
        },
        prev: function () {
            if (this.currentIndex <= 0) {
                this.current();
            } else {
                this.goToIndex(this.currentIndex - 1);
            }
        }
    });

    $.fn.pagesSliderTouch = function(options) {
        this.hammer();
        this.each(function(index, slider) {
            var $this = $(slider);
            var pagesSliderTouch = new PagesSliderTouch($this, options);
            $this.data('pagesSliderTouch', pagesSliderTouch);
            $('#quit').click(() => pagesSliderTouch.goToIndex(0));
        });
        return this;
    };
})(jQuery);

$('#left').hide();