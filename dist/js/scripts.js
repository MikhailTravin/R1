$(document).ready(function () {

    const modules_flsModules = {};

    let bodyLockStatus = true;

    let bodyUnlock = (delay = 500) => {
        if (bodyLockStatus) {
            const lockPaddingElements = $("[data-lp]");
            setTimeout(() => {
                lockPaddingElements.css("padding-right", "");
                $("body").css("padding-right", "");
                $("html").removeClass("lock");
            }, delay);
            bodyLockStatus = false;
            setTimeout(() => {
                bodyLockStatus = true;
            }, delay);
        }
    };

    let bodyLock = (delay = 500) => {
        if (bodyLockStatus) {
            const lockPaddingElements = $("[data-lp]");
            const lockPaddingValue = window.innerWidth - document.body.offsetWidth + "px";
            lockPaddingElements.css("padding-right", lockPaddingValue);
            $("body").css("padding-right", lockPaddingValue);
            $("html").addClass("lock");
            bodyLockStatus = false;
            setTimeout(() => {
                bodyLockStatus = true;
            }, delay);
        }
    };

    function functions_FLS(message) {
        setTimeout(() => {
            if (window.FLS) console.log(message);
        }, 0);
    }

    let _slideUp = (target, duration = 500, showmore = 0) => {
        if (!$(target).hasClass("_slide")) {
            $(target).addClass("_slide")
                .css({
                    "transition-property": "height, margin, padding",
                    "transition-duration": duration + "ms",
                    "height": $(target).outerHeight() + "px",
                    "overflow": "hidden",
                    "height": showmore ? showmore + "px" : "0px",
                    "padding-top": 0,
                    "padding-bottom": 0,
                    "margin-top": 0,
                    "margin-bottom": 0
                });

            window.setTimeout(() => {
                $(target).prop("hidden", !showmore ? true : false)
                    .css({
                        "height": !showmore ? "" : null,
                        "padding-top": "",
                        "padding-bottom": "",
                        "margin-top": "",
                        "margin-bottom": "",
                        "overflow": !showmore ? "" : null,
                        "transition-duration": "",
                        "transition-property": ""
                    })
                    .removeClass("_slide");

                $(document).trigger("slideUpDone", {
                    target: target
                });
            }, duration);
        }
    };

    let _slideDown = (target, duration = 500, showmore = 0) => {
        if (!$(target).hasClass("_slide")) {
            $(target).addClass("_slide")
                .prop("hidden", $(target).prop("hidden") ? false : null)
                .css({
                    "height": showmore ? "" : null,
                    "overflow": "hidden",
                    "height": showmore ? showmore + "px" : "0px",
                    "padding-top": 0,
                    "padding-bottom": 0,
                    "margin-top": 0,
                    "margin-bottom": 0
                });

            const height = $(target).outerHeight();
            $(target).css({
                "transition-property": "height, margin, padding",
                "transition-duration": duration + "ms",
                "height": height + "px",
                "padding-top": "",
                "padding-bottom": "",
                "margin-top": "",
                "margin-bottom": ""
            });

            window.setTimeout(() => {
                $(target).css({
                    "height": "",
                    "overflow": "",
                    "transition-duration": "",
                    "transition-property": ""
                }).removeClass("_slide");

                $(document).trigger("slideDownDone", {
                    target: target
                });
            }, duration);
        }
    };

    let _slideToggle = (target, duration = 500) => {
        if ($(target).prop("hidden")) {
            return _slideDown(target, duration);
        } else {
            return _slideUp(target, duration);
        }
    };

    function getHash() {
        if (location.hash) {
            return location.hash.replace('#', '');
        }
    }

    function dataMediaQueries(array, dataSetValue) {
        const media = $(array).filter(function () {
            return $(this).data(dataSetValue);
        });

        if (media.length) {
            const breakpointsArray = media.map(function () {
                const params = $(this).data(dataSetValue);
                const paramsArray = params.split(",");
                return {
                    value: paramsArray[0],
                    type: paramsArray[1] ? paramsArray[1].trim() : "max",
                    item: this
                };
            }).get();

            const mdQueries = uniqArray(
                breakpointsArray.map(item => `(${item.type}-width: ${item.value}px),${item.value},${item.type}`)
            );

            const mdQueriesArray = mdQueries.map(breakpoint => {
                const [query, value, type] = breakpoint.split(",");
                const matchMedia = window.matchMedia(query);
                const itemsArray = breakpointsArray.filter(item => item.value === value && item.type === type);
                return { itemsArray, matchMedia };
            });

            return mdQueriesArray;
        }
    }

    function uniqArray(array) {
        return array.filter(function (item, index, self) {
            return self.indexOf(item) === index;
        });
    }

    //Слайдер
    if ($('.block-reviews2__slider').length > 0) {
        const blockReviews2 = new Swiper('.block-reviews2__slider', {
            observer: true,
            observeParents: true,
            slidesPerView: 4,
            spaceBetween: 20,
            autoHeight: true,
            speed: 400,
            navigation: {
                nextEl: '.block-reviews2__arrow-next',
                prevEl: '.block-reviews2__arrow-prev',
            },
            pagination: {
                el: '.block-reviews2__pagination',
                clickable: true,
                type: 'bullets'
            },
            breakpoints: {
                0: {
                    slidesPerView: 1.5,
                    spaceBetween: 15,
                },
                480: {
                    slidesPerView: 2.5,
                    spaceBetween: 15,
                },
                768: {
                    slidesPerView: 3.5,
                    spaceBetween: 20,
                },
                992: {
                    slidesPerView: 4,
                    spaceBetween: 20,
                },
            },
        });
    }
    if ($('.gallery-block-service__slider').length > 0) {
        const blockGalleryService = new Swiper('.gallery-block-service__slider', {
            observer: true,
            observeParents: true,
            slidesPerView: 2,
            spaceBetween: 15,
            speed: 400,
            navigation: {
                nextEl: '.gallery-block-service__arrow-next',
                prevEl: '.gallery-block-service__arrow-prev',
            },
            pagination: {
                el: '.gallery-block-service__pagination',
                clickable: true,
                type: 'bullets'
            },
            breakpoints: {
                480: {
                    slidesPerView: 3,
                    spaceBetween: 15,
                },
                768: {
                    slidesPerView: 4,
                    spaceBetween: 20,
                },
                1300: {
                    slidesPerView: 5,
                    spaceBetween: 20,
                },
            },
        });
    }
    if ($('.block-certificates1__slider').length > 0) {
        const blockCertificates = new Swiper('.block-certificates1__slider', {
            observer: true,
            observeParents: true,
            slidesPerView: 4,
            spaceBetween: 20,
            speed: 400,
            navigation: {
                nextEl: '.block-certificates1__arrow-next',
                prevEl: '.block-certificates1__arrow-prev',
            },
            pagination: {
                el: '.block-certificates1__pagination',
                clickable: true,
                type: 'bullets'
            },
            breakpoints: {
                0: {
                    slidesPerView: 1.5,
                    spaceBetween: 15,
                },
                480: {
                    slidesPerView: 2.5,
                    spaceBetween: 15,
                },
                768: {
                    slidesPerView: 3.5,
                    spaceBetween: 20,
                },
                992: {
                    slidesPerView: 4,
                    spaceBetween: 20,
                },
            },
        });
    }
    if ($('.certificates-block-service__slider').length > 0) {
        const blockCertificates2 = new Swiper('.certificates-block-service__slider', {
            observer: true,
            observeParents: true,
            slidesPerView: 2,
            spaceBetween: 15,
            speed: 400,
            navigation: {
                nextEl: '.certificates-block-service__arrow-next',
                prevEl: '.certificates-block-service__arrow-prev',
            },
            pagination: {
                el: '.certificates-block-service__pagination',
                clickable: true,
                type: 'bullets'
            },
            breakpoints: {
                480: {
                    slidesPerView: 3,
                    spaceBetween: 15,
                },
                768: {
                    slidesPerView: 4,
                    spaceBetween: 15,
                },
                992: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                },
                1200: {
                    slidesPerView: 4,
                    spaceBetween: 20,
                },
            },
        });
    }
    if ($('.block-main-article__slider').length > 0) {
        const blockMainArticle = new Swiper('.block-main-article__slider', {
            observer: true,
            observeParents: true,
            slidesPerView: 1.5,
            spaceBetween: 15,
            speed: 400,
            navigation: {
                nextEl: '.block-main-article__arrow-next',
                prevEl: '.block-main-article__arrow-prev',
            },
            pagination: {
                el: '.block-main-article__pagination',
                clickable: true,
                type: 'bullets'
            },
            breakpoints: {
                480: {
                    slidesPerView: 2,
                    spaceBetween: 15,
                },
                650: {
                    slidesPerView: 3,
                    spaceBetween: 15,
                },
                768: {
                    slidesPerView: 4,
                    spaceBetween: 15,
                },
                992: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                },
                1200: {
                    slidesPerView: 4,
                    spaceBetween: 20,
                },
            },
        });
    }
    const sliderContainers = $('.cart-catalog__slider');
    sliderContainers.each(function (index) {
        const paginationEl = $(this).closest('.cart-catalog').find('.cart-catalog__pagination')[0];
        new Swiper(this, {
            observer: true,
            observeParents: true,
            slidesPerView: 1,
            spaceBetween: 0,
            speed: 400,
            pagination: {
                el: paginationEl,
                clickable: true,
            }
        });
    });

    function indents() {
        const $pagination = $('.top-block-intro__pagination');
        const $mainHomeBody = $('.container');
        const $mainHome = $('.block-intro');

        const wMainHomeBody = parseFloat($mainHomeBody.css('width'));
        const wMainHome = parseFloat($mainHome.css('width'));
        const sumMainHome = ((wMainHome - wMainHomeBody) / 2) + 15;

        if ($(window).width() > 767.98) {
            $pagination.css('right', sumMainHome + 'px');
        } else {
            $pagination.css('right', 'auto');
        }
    }

    $(window).on('scroll', indents);
    $(window).on('resize', indents);
    $(document).ready(function () {
        indents();
    });

    //Показать еще
    function showMore() {
        $(window).on("load", function (e) {
            const $showMoreBlocks = $('[data-showmore]');
            let showMoreBlocksRegular;

            if ($showMoreBlocks.length) {
                $showMoreBlocks.each(function () {
                    const $block = $(this);
                    const showmoreData = $block.data('showmore');

                    if (typeof showmoreData === 'string' && showmoreData.includes(',')) {
                        const parts = showmoreData.split(',');
                        if (parts.length === 2) {
                            const breakpoint = parseInt(parts[0].trim());
                            const type = parts[1].trim();

                            const itemSelector = '.block-prices__column';
                            const buttonSelector = '[data-showmore-button]';
                            const itemsCount = 6;

                            initAdvancedShowMore($block, itemSelector, buttonSelector, itemsCount, breakpoint, type);
                        }
                    }
                });

                showMoreBlocksRegular = $showMoreBlocks.filter(function () {
                    const showmoreData = $(this).data('showmore');
                    return !$(this).data('showmore-media') &&
                        (typeof showmoreData !== 'string' || !showmoreData.includes(','));
                }).get();

                if (showMoreBlocksRegular.length) initItems(showMoreBlocksRegular);

                $(document).on("click", showMoreActions);
                $(window).on("resize", showMoreActions);
            }

            function initItems(showMoreBlocks, matchMedia) {
                $.each(showMoreBlocks, function () {
                    initItem($(this), matchMedia);
                });
            }

            function initItem($showMoreBlock, matchMedia = false) {
                const $showMoreContent = $showMoreBlock.find('[data-showmore-content]').first();
                const $showMoreButton = $showMoreBlock.find('[data-showmore-button]').first();

                $showMoreContent.css({
                    'height': 'auto',
                    'overflow': 'hidden'
                });

                const hiddenHeight = getHeight($showMoreBlock, $showMoreContent);
                const originalHeight = getOriginalHeight($showMoreContent);

                if (!matchMedia || matchMedia.matches) {
                    if (hiddenHeight < originalHeight) {
                        if ($showMoreBlock.hasClass('_showmore-active')) {
                            $showMoreContent.css('height', originalHeight + 'px');
                        } else {
                            $showMoreContent.css('height', hiddenHeight + 'px');
                        }
                        $showMoreButton.prop('hidden', false);
                    } else {
                        $showMoreContent.css('height', 'auto');
                        $showMoreButton.prop('hidden', true);
                        $showMoreBlock.removeClass('_showmore-active');
                    }
                } else {
                    $showMoreContent.css('height', 'auto');
                    $showMoreButton.prop('hidden', true);
                    $showMoreBlock.removeClass('_showmore-active');
                }
            }

            function getHeight($showMoreBlock, $showMoreContent) {
                let hiddenHeight = 0;
                const showMoreType = $showMoreBlock.data('showmore') || 'size';
                const rowGap = parseFloat($showMoreContent.css('rowGap')) || 0;

                if (showMoreType === 'items') {
                    const showMoreTypeValue = parseInt($showMoreContent.data('showmore-content')) || 3;
                    const $showMoreItems = $showMoreContent.children();

                    if ($showMoreItems.length === 0) return 0;

                    for (let index = 0; index < Math.min(showMoreTypeValue, $showMoreItems.length); index++) {
                        const $showMoreItem = $showMoreItems.eq(index);
                        hiddenHeight += $showMoreItem.outerHeight(true);

                        if (index < showMoreTypeValue - 1 && rowGap) {
                            hiddenHeight += rowGap;
                        }
                    }
                } else {
                    hiddenHeight = parseInt($showMoreContent.data('showmore-content')) || 150;
                }
                return hiddenHeight;
            }

            function getOriginalHeight($showMoreContent) {
                const currentHeight = $showMoreContent.height();
                $showMoreContent.css('height', 'auto');
                const originalHeight = $showMoreContent[0].scrollHeight;
                $showMoreContent.css('height', currentHeight + 'px');
                return originalHeight;
            }

            function showMoreActions(e) {
                const $target = $(e.target);
                const targetType = e.type;

                if (targetType === 'click') {
                    if ($target.closest('[data-showmore-button]').length) {
                        const $showMoreButton = $target.closest('[data-showmore-button]');
                        const $showMoreBlock = $showMoreButton.closest('[data-showmore]');

                        const showmoreData = $showMoreBlock.data('showmore');
                        if (typeof showmoreData === 'string' && showmoreData.includes(',')) {
                            return;
                        }

                        const $showMoreContent = $showMoreBlock.find('[data-showmore-content]');
                        const showMoreSpeed = $showMoreBlock.data('showmore-button') || 500;
                        const hiddenHeight = getHeight($showMoreBlock, $showMoreContent);
                        const originalHeight = getOriginalHeight($showMoreContent);

                        if (!$showMoreContent.is(':animated')) {
                            if ($showMoreBlock.hasClass('_showmore-active')) {
                                $showMoreContent.stop().animate({ height: hiddenHeight }, showMoreSpeed, function () {
                                });
                            } else {
                                $showMoreContent.stop().animate({ height: originalHeight }, showMoreSpeed, function () {
                                });
                            }
                            $showMoreBlock.toggleClass('_showmore-active');
                        }
                    }
                } else if (targetType === 'resize') {
                    if (showMoreBlocksRegular && showMoreBlocksRegular.length) {
                        initItems(showMoreBlocksRegular);
                    }
                }
            }

            function initAdvancedShowMore($container, itemSelector, buttonSelector, itemsToShow, breakpoint, type = 'max') {
                const $content = $container.find('[data-showmore-content]');
                const $button = $container.find(buttonSelector);
                const $items = $content.find(itemSelector);

                let clickHandlerAdded = false;
                let isManualToggle = false;

                function checkItemsCount() {
                    if ($items.length <= itemsToShow) {
                        $button.attr('hidden', 'true');
                        $container.removeClass('_showmore-available');
                    } else {
                        $button.removeAttr('hidden');
                        $container.addClass('_showmore-available');
                    }
                }

                function handleShowMoreClick(e) {
                    e.preventDefault();
                    isManualToggle = true;

                    const isActive = $button.hasClass('_showmore-active');

                    if (isActive) {
                        $items.each(function (index) {
                            if (index >= itemsToShow) {
                                $(this).slideUp(300);
                            }
                        });
                        $button.removeClass('_showmore-active');
                        $container.removeClass('_showmore-open');
                    } else {
                        $items.each(function (index) {
                            if (index >= itemsToShow) {
                                $(this).slideDown(300);
                            }
                        });
                        $button.addClass('_showmore-active');
                        $container.addClass('_showmore-open');
                    }
                }

                function toggleShowMore() {
                    const windowWidth = $(window).width();
                    let shouldShowMore = false;

                    if (type === 'max') {
                        shouldShowMore = windowWidth <= breakpoint;
                    } else if (type === 'min') {
                        shouldShowMore = windowWidth >= breakpoint;
                    }

                    if (isManualToggle && shouldShowMore) {
                        return;
                    }

                    if (shouldShowMore) {
                        if (!$button.hasClass('_showmore-active')) {
                            $items.each(function (index) {
                                if (index >= itemsToShow) {
                                    $(this).hide();
                                } else {
                                    $(this).show();
                                }
                            });
                            $container.removeClass('_showmore-open');
                        } else {
                            $items.show();
                            $container.addClass('_showmore-open');
                        }

                        if (!clickHandlerAdded) {
                            $button.on('click', handleShowMoreClick);
                            clickHandlerAdded = true;
                        }

                        checkItemsCount();
                    } else {
                        $items.show();
                        $button.removeClass('_showmore-active').attr('hidden', 'true');
                        $container.removeClass('_showmore-open');

                        if (clickHandlerAdded) {
                            $button.off('click', handleShowMoreClick);
                            clickHandlerAdded = false;
                        }

                        isManualToggle = false;
                    }
                }

                toggleShowMore();
                checkItemsCount();

                let resizeTimer;
                $(window).on('resize', function () {
                    clearTimeout(resizeTimer);
                    resizeTimer = setTimeout(toggleShowMore, 250);
                });
            }
        });
    }
    showMore();

    //Динамический адаптив
    class DynamicAdapt {
        constructor(type) {
            this.type = type;
        }
        init() {
            this.objects = [];
            this.daClassname = '_dynamic_adapt_';
            this.nodes = $('[data-da]').toArray();

            this.nodes.forEach((node) => {
                const $node = $(node);
                const data = $node.data('da').trim();
                const dataArray = data.split(',');
                const object = {};
                object.element = $node;
                object.parent = $node.parent();
                object.destination = $(dataArray[0].trim());
                object.breakpoint = dataArray[1] ? dataArray[1].trim() : '767.98';
                object.place = dataArray[2] ? dataArray[2].trim() : 'last';
                object.index = this.indexInParent(object.parent, object.element);
                this.objects.push(object);
            });

            this.arraySort(this.objects);

            this.mediaQueries = this.objects
                .map(({ breakpoint }) => `(${this.type}-width: ${breakpoint / 16}em),${breakpoint}`)
                .filter((item, index, self) => self.indexOf(item) === index);
            this.mediaQueries.forEach((media) => {
                const mediaSplit = media.split(',');
                const matchMedia = window.matchMedia(mediaSplit[0]);
                const mediaBreakpoint = mediaSplit[1];

                const objectsFilter = this.objects.filter(({ breakpoint }) => breakpoint === mediaBreakpoint);
                matchMedia.addEventListener('change', () => {
                    this.mediaHandler(matchMedia, objectsFilter);
                });
                this.mediaHandler(matchMedia, objectsFilter);
            });
        }
        mediaHandler(matchMedia, objects) {
            if (matchMedia.matches) {
                objects.forEach((object) => {
                    this.moveTo(object.place, object.element, object.destination);
                });
            } else {
                objects.forEach(({ parent, element, index }) => {
                    if (element.hasClass(this.daClassname)) {
                        this.moveBack(parent, element, index);
                    }
                });
            }
        }
        moveTo(place, $element, $destination) {
            $element.addClass(this.daClassname);
            if (place === 'last' || place >= $destination.children().length) {
                $destination.append($element);
                return;
            }
            if (place === 'first') {
                $destination.prepend($element);
                return;
            }
            $destination.children().eq(place).before($element);
        }
        moveBack($parent, $element, index) {
            $element.removeClass(this.daClassname);
            if ($parent.children().eq(index).length) {
                $parent.children().eq(index).before($element);
            } else {
                $parent.append($element);
            }
        }
        indexInParent($parent, $element) {
            return $parent.children().index($element);
        }
        arraySort(arr) {
            if (this.type === 'min') {
                arr.sort((a, b) => {
                    if (a.breakpoint === b.breakpoint) {
                        if (a.place === b.place) {
                            return 0;
                        }
                        if (a.place === 'first' || b.place === 'last') {
                            return -1;
                        }
                        if (a.place === 'last' || b.place === 'first') {
                            return 1;
                        }
                        return 0;
                    }
                    return a.breakpoint - b.breakpoint;
                });
            } else {
                arr.sort((a, b) => {
                    if (a.breakpoint === b.breakpoint) {
                        if (a.place === b.place) {
                            return 0;
                        }
                        if (a.place === 'first' || b.place === 'last') {
                            return 1;
                        }
                        if (a.place === 'last' || b.place === 'first') {
                            return -1;
                        }
                        return 0;
                    }
                    return b.breakpoint - a.breakpoint;
                });
            }
        }
    }
    const da = new DynamicAdapt("max");
    da.init();

    //Селект
    class SelectConstructor {
        constructor(props, data = null) {
            let defaultConfig = {
                init: true,
                logging: true,
                speed: 150
            }
            this.config = $.extend({}, defaultConfig, props);
            this.selectClasses = {
                classSelect: "select",
                classSelectBody: "select__body",
                classSelectTitle: "select__title",
                classSelectValue: "select__value",
                classSelectLabel: "select__label",
                classSelectInput: "select__input",
                classSelectText: "select__text",
                classSelectLink: "select__link",
                classSelectOptions: "select__options",
                classSelectOptionsScroll: "select__scroll",
                classSelectOption: "select__option",
                classSelectContent: "select__content",
                classSelectRow: "select__row",
                classSelectData: "select__asset",
                classSelectDisabled: "_select-disabled",
                classSelectTag: "_select-tag",
                classSelectOpen: "_select-open",
                classSelectActive: "_select-active",
                classSelectFocus: "_select-focus",
                classSelectMultiple: "_select-multiple",
                classSelectCheckBox: "_select-checkbox",
                classSelectOptionSelected: "_select-selected",
                classSelectPseudoLabel: "_select-pseudo-label",
            }
            this._this = this;
            if (this.config.init) {
                const selectItems = data ? $(data) : $('select');
                if (selectItems.length) {
                    this.selectsInit(selectItems);
                }
            }
        }

        getSelectClass(className) {
            return `.${className}`;
        }

        getSelectElement(selectItem, className) {
            return {
                originalSelect: selectItem.find('select'),
                selectElement: selectItem.find(this.getSelectClass(className)),
            }
        }

        selectsInit(selectItems) {
            const _this = this;
            selectItems.each(function (index) {
                _this.selectInit($(this), index + 1);
            });

            $(document).on('click', function (e) {
                _this.selectsActions(e);
            });

            $(document).on('keydown', function (e) {
                _this.selectsActions(e);
            });

            $(document).on('focusin', function (e) {
                _this.selectsActions(e);
            });

            $(document).on('focusout', function (e) {
                _this.selectsActions(e);
            });
        }

        selectInit(originalSelect, index) {
            const _this = this;
            let selectItem = $("<div>").addClass(this.selectClasses.classSelect);

            originalSelect.before(selectItem);
            selectItem.append(originalSelect);
            originalSelect.hide();

            if (index) originalSelect.data('id', index);

            if (this.getSelectPlaceholder(originalSelect[0])) {
                originalSelect.data('placeholder', this.getSelectPlaceholder(originalSelect[0]).value);

                if (this.getSelectPlaceholder(originalSelect[0]).label.show) {
                    const selectItemTitle = this.getSelectElement(selectItem, this.selectClasses.classSelectTitle).selectElement;
                    selectItemTitle.prepend(`<span class="${this.selectClasses.classSelectLabel}">${this.getSelectPlaceholder(originalSelect[0]).label.text ? this.getSelectPlaceholder(originalSelect[0]).label.text : this.getSelectPlaceholder(originalSelect[0]).value}</span>`);
                }
            }

            selectItem.append(`<div class="${this.selectClasses.classSelectBody}"><div hidden class="${this.selectClasses.classSelectOptions}"></div></div>`);

            this.selectBuild(originalSelect[0]);

            const speed = originalSelect.data('speed') ? originalSelect.data('speed') : this.config.speed;
            originalSelect.data('speed', speed);
            this.config.speed = +speed;

            originalSelect.on('change', function (e) {
                _this.selectChange(e);
            });
        }

        selectBuild(originalSelect) {
            const selectItem = $(originalSelect).parent();
            const $originalSelect = $(originalSelect);

            selectItem.data('id', $originalSelect.data('id'));

            if ($originalSelect.data('classModif')) {
                selectItem.addClass(`select_${$originalSelect.data('classModif')}`);
            }

            if (originalSelect.multiple) {
                selectItem.addClass(this.selectClasses.classSelectMultiple);
            } else {
                selectItem.removeClass(this.selectClasses.classSelectMultiple);
            }

            if (originalSelect.hasAttribute('data-checkbox') && originalSelect.multiple) {
                selectItem.addClass(this.selectClasses.classSelectCheckBox);
            } else {
                selectItem.removeClass(this.selectClasses.classSelectCheckBox);
            }

            this.setSelectTitleValue(selectItem, originalSelect);
            this.setOptions(selectItem, originalSelect);

            if (originalSelect.hasAttribute('data-search')) {
                this.searchActions(selectItem);
            }

            if (originalSelect.hasAttribute('data-open')) {
                this.selectAction(selectItem);
            }

            this.selectDisabled(selectItem, originalSelect);
        }

        selectsActions(e) {
            const targetElement = $(e.target);
            const targetType = e.type;

            if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelect)).length || targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTag)).length) {
                let selectItem = targetElement.closest('.select').length ? targetElement.closest('.select') : $(`.${this.selectClasses.classSelect}[data-id="${targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTag)).data('selectId')}"]`);
                const originalSelect = this.getSelectElement(selectItem).originalSelect;

                if (targetType === 'click') {
                    if (!originalSelect.prop('disabled')) {
                        if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTag)).length) {
                            const targetTag = targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTag));
                            const optionItem = $(`.${this.selectClasses.classSelect}[data-id="${targetTag.data('selectId')}"] .select__option[data-value="${targetTag.data('value')}"]`);
                            this.optionAction(selectItem, originalSelect[0], optionItem);
                        } else if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTitle)).length) {
                            this.selectAction(selectItem);
                        } else if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelectOption)).length) {
                            const optionItem = targetElement.closest(this.getSelectClass(this.selectClasses.classSelectOption));
                            this.optionAction(selectItem, originalSelect[0], optionItem);
                        }
                    }
                } else if (targetType === 'focusin' || targetType === 'focusout') {
                    if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelect)).length) {
                        if (targetType === 'focusin') {
                            selectItem.addClass(this.selectClasses.classSelectFocus);
                        } else {
                            selectItem.removeClass(this.selectClasses.classSelectFocus);
                        }
                    }
                } else if (targetType === 'keydown' && e.code === 'Escape') {
                    this.selectsСlose();
                }
            } else {
                this.selectsСlose();
            }
        }

        selectsСlose(selectOneGroup) {
            const selectsGroup = selectOneGroup ? selectOneGroup : $(document);
            const selectActiveItems = selectsGroup.find(`${this.getSelectClass(this.selectClasses.classSelect)}${this.getSelectClass(this.selectClasses.classSelectOpen)}`);

            if (selectActiveItems.length) {
                selectActiveItems.each((index, selectActiveItem) => {
                    this.selectСlose($(selectActiveItem));
                });
            }
        }

        selectСlose(selectItem) {
            const originalSelect = this.getSelectElement(selectItem).originalSelect;
            const selectOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;

            if (!selectOptions.hasClass('_slide')) {
                selectItem.removeClass(this.selectClasses.classSelectOpen);
                _slideUp(selectOptions, originalSelect.data('speed'));
                setTimeout(() => {
                    selectItem.css('z-index', '');
                }, originalSelect.data('speed'));
            }
        }

        selectAction(selectItem) {
            const originalSelect = this.getSelectElement(selectItem).originalSelect[0];
            const selectOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
            const selectOpenzIndex = $(originalSelect).data('zIndex') ? $(originalSelect).data('zIndex') : 3;

            this.setOptionsPosition(selectItem);
            this.selectsСlose();

            setTimeout(() => {
                if (!selectOptions.hasClass('_slide')) {
                    selectItem.toggleClass(this.selectClasses.classSelectOpen);
                    _slideToggle(selectOptions, $(originalSelect).data('speed'));

                    if (selectItem.hasClass(this.selectClasses.classSelectOpen)) {
                        selectItem.css('z-index', selectOpenzIndex);
                    } else {
                        setTimeout(() => {
                            selectItem.css('z-index', '');
                        }, $(originalSelect).data('speed'));
                    }
                }
            }, 0);
        }

        setSelectTitleValue(selectItem, originalSelect) {
            const selectItemBody = this.getSelectElement(selectItem, this.selectClasses.classSelectBody).selectElement;
            const selectItemTitle = this.getSelectElement(selectItem, this.selectClasses.classSelectTitle).selectElement;

            if (selectItemTitle.length) selectItemTitle.remove();
            selectItemBody.prepend(this.getSelectTitleValue(selectItem, originalSelect));

            if (originalSelect.hasAttribute('data-search')) {
                this.searchActions(selectItem);
            }
        }

        getSelectTitleValue(selectItem, originalSelect) {
            let selectTitleValue = this.getSelectedOptionsData(originalSelect, 2).html;

            if (originalSelect.multiple && originalSelect.hasAttribute('data-tags')) {
                selectTitleValue = this.getSelectedOptionsData(originalSelect).elements.map(option => `<span role="button" data-select-id="${$(selectItem).data('id')}" data-value="${option.value}" class="_select-tag">${this.getSelectElementContent(option)}</span>`).join('');

                if (originalSelect.dataset.tags && $(originalSelect.dataset.tags).length) {
                    $(originalSelect.dataset.tags).html(selectTitleValue);
                    if (originalSelect.hasAttribute('data-search')) selectTitleValue = false;
                }
            }

            selectTitleValue = selectTitleValue.length ? selectTitleValue : (originalSelect.dataset.placeholder ? originalSelect.dataset.placeholder : '');

            let pseudoAttribute = '';
            let pseudoAttributeClass = '';
            if (originalSelect.hasAttribute('data-pseudo-label')) {
                pseudoAttribute = originalSelect.dataset.pseudoLabel ? ` data-pseudo-label="${originalSelect.dataset.pseudoLabel}"` : ` data-pseudo-label="Заповніть атрибут"`;
                pseudoAttributeClass = ` ${this.selectClasses.classSelectPseudoLabel}`;
            }

            if (this.getSelectedOptionsData(originalSelect).values.length) {
                $(selectItem).addClass(this.selectClasses.classSelectActive);
            } else {
                $(selectItem).removeClass(this.selectClasses.classSelectActive);
            }

            if (originalSelect.hasAttribute('data-search')) {
                return `<div class="${this.selectClasses.classSelectTitle}"><span${pseudoAttribute} class="${this.selectClasses.classSelectValue}"><input autocomplete="off" type="text" placeholder="${selectTitleValue}" data-placeholder="${selectTitleValue}" class="${this.selectClasses.classSelectInput}"></span></div>`;
            } else {
                const customClass = this.getSelectedOptionsData(originalSelect).elements.length && this.getSelectedOptionsData(originalSelect).elements[0].dataset.class ? ` ${this.getSelectedOptionsData(originalSelect).elements[0].dataset.class}` : '';
                return `<button type="button" class="${this.selectClasses.classSelectTitle}"><span${pseudoAttribute} class="${this.selectClasses.classSelectValue}${pseudoAttributeClass}"><span class="${this.selectClasses.classSelectContent}${customClass}">${selectTitleValue}</span></span></button>`;
            }
        }

        getSelectElementContent(selectOption) {
            const selectOptionData = selectOption.dataset.asset ? `${selectOption.dataset.asset}` : '';
            const selectOptionDataHTML = selectOptionData.indexOf('img') >= 0 ? `<img src="${selectOptionData}" alt="">` : selectOptionData;
            let selectOptionContentHTML = ``;
            selectOptionContentHTML += selectOptionData ? `<span class="${this.selectClasses.classSelectRow}">` : '';
            selectOptionContentHTML += selectOptionData ? `<span class="${this.selectClasses.classSelectData}">` : '';
            selectOptionContentHTML += selectOptionData ? selectOptionDataHTML : '';
            selectOptionContentHTML += selectOptionData ? `</span>` : '';
            selectOptionContentHTML += selectOptionData ? `<span class="${this.selectClasses.classSelectText}">` : '';
            selectOptionContentHTML += selectOption.textContent;
            selectOptionContentHTML += selectOptionData ? `</span>` : '';
            selectOptionContentHTML += selectOptionData ? `</span>` : '';
            return selectOptionContentHTML;
        }

        getSelectPlaceholder(originalSelect) {
            const selectPlaceholder = Array.from(originalSelect.options).find(option => !option.value);
            if (selectPlaceholder) {
                return {
                    value: selectPlaceholder.textContent,
                    show: selectPlaceholder.hasAttribute("data-show"),
                    label: {
                        show: selectPlaceholder.hasAttribute("data-label"),
                        text: selectPlaceholder.dataset.label
                    }
                }
            }
        }

        getSelectedOptionsData(originalSelect, type) {
            let selectedOptions = [];
            if (originalSelect.multiple) {
                selectedOptions = Array.from(originalSelect.options).filter(option => option.value).filter(option => option.selected);
            } else {
                selectedOptions.push(originalSelect.options[originalSelect.selectedIndex]);
            }
            return {
                elements: selectedOptions.map(option => option),
                values: selectedOptions.filter(option => option.value).map(option => option.value),
                html: selectedOptions.map(option => this.getSelectElementContent(option))
            }
        }

        getOptions(originalSelect) {
            const selectOptionsScroll = originalSelect.hasAttribute('data-scroll') ? `data-simplebar` : '';
            const customMaxHeightValue = +originalSelect.dataset.scroll ? +originalSelect.dataset.scroll : null;

            let selectOptions = Array.from(originalSelect.options);
            if (selectOptions.length > 0) {
                let selectOptionsHTML = ``;

                if ((this.getSelectPlaceholder(originalSelect) && !this.getSelectPlaceholder(originalSelect).show) || originalSelect.multiple) {
                    selectOptions = selectOptions.filter(option => option.value);
                }

                selectOptionsHTML += `<div ${selectOptionsScroll} ${selectOptionsScroll ? `style="max-height: ${customMaxHeightValue}px"` : ''} class="${this.selectClasses.classSelectOptionsScroll}">`;

                selectOptions.forEach(selectOption => {
                    selectOptionsHTML += this.getOption(selectOption, originalSelect);
                });

                selectOptionsHTML += `</div>`;
                return selectOptionsHTML;
            }
        }

        getOption(selectOption, originalSelect) {
            const selectOptionSelected = selectOption.selected && originalSelect.multiple ? ` ${this.selectClasses.classSelectOptionSelected}` : '';
            const selectOptionHide = selectOption.selected && !originalSelect.hasAttribute('data-show-selected') && !originalSelect.multiple ? `hidden` : ``;
            const selectOptionClass = selectOption.dataset.class ? ` ${selectOption.dataset.class}` : '';
            const selectOptionLink = selectOption.dataset.href ? selectOption.dataset.href : false;
            const selectOptionLinkTarget = selectOption.hasAttribute('data-href-blank') ? `target="_blank"` : '';

            let selectOptionHTML = ``;
            selectOptionHTML += selectOptionLink ? `<a ${selectOptionLinkTarget} ${selectOptionHide} href="${selectOptionLink}" data-value="${selectOption.value}" class="${this.selectClasses.classSelectOption}${selectOptionClass}${selectOptionSelected}">` : `<button ${selectOptionHide} class="${this.selectClasses.classSelectOption}${selectOptionClass}${selectOptionSelected}" data-value="${selectOption.value}" type="button">`;
            selectOptionHTML += this.getSelectElementContent(selectOption);
            selectOptionHTML += selectOptionLink ? `</a>` : `</button>`;
            return selectOptionHTML;
        }

        setOptions(selectItem, originalSelect) {
            const selectItemOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
            selectItemOptions.html(this.getOptions(originalSelect));
        }

        setOptionsPosition(selectItem) {
            const originalSelect = this.getSelectElement(selectItem).originalSelect[0];
            const selectOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
            const selectItemScroll = this.getSelectElement(selectItem, this.selectClasses.classSelectOptionsScroll).selectElement;
            const customMaxHeightValue = +originalSelect.dataset.scroll ? `${+originalSelect.dataset.scroll}px` : ``;
            const selectOptionsPosMargin = +originalSelect.dataset.optionsMargin ? +originalSelect.dataset.optionsMargin : 10;

            if (!$(selectItem).hasClass(this.selectClasses.classSelectOpen)) {
                selectOptions.hidden = false;
                const selectItemScrollHeight = selectItemScroll.offsetHeight ? selectItemScroll.offsetHeight : parseInt(window.getComputedStyle(selectItemScroll[0]).getPropertyValue('max-height'));
                const selectOptionsHeight = selectOptions.offsetHeight > selectItemScrollHeight ? selectOptions.offsetHeight : selectItemScrollHeight + selectOptions.offsetHeight;
                const selectOptionsScrollHeight = selectOptionsHeight - selectItemScrollHeight;
                selectOptions.hidden = true;

                const selectItemHeight = selectItem.offsetHeight;
                const selectItemPos = selectItem.offset().top;
                const selectItemTotal = selectItemPos + selectOptionsHeight + selectItemHeight + selectOptionsScrollHeight;
                const selectItemResult = window.innerHeight - (selectItemTotal + selectOptionsPosMargin);

                if (selectItemResult < 0) {
                    const newMaxHeightValue = selectOptionsHeight + selectItemResult;
                    if (newMaxHeightValue < 100) {
                        selectItem.addClass('select--show-top');
                        selectItemScroll.css('max-height', selectItemPos < selectOptionsHeight ? `${selectItemPos - (selectOptionsHeight - selectItemPos)}px` : customMaxHeightValue);
                    } else {
                        selectItem.removeClass('select--show-top');
                        selectItemScroll.css('max-height', `${newMaxHeightValue}px`);
                    }
                }
            } else {
                setTimeout(() => {
                    selectItem.removeClass('select--show-top');
                    selectItemScroll.css('max-height', customMaxHeightValue);
                }, +$(originalSelect).data('speed'));
            }
        }

        optionAction(selectItem, originalSelect, optionItem) {
            const selectOptions = selectItem.find(`${this.getSelectClass(this.selectClasses.classSelectOptions)}`);
            if (!selectOptions.hasClass('_slide')) {
                if (originalSelect.multiple) {
                    optionItem.toggleClass(this.selectClasses.classSelectOptionSelected);

                    const originalSelectSelectedItems = this.getSelectedOptionsData(originalSelect).elements;
                    originalSelectSelectedItems.forEach(originalSelectSelectedItem => {
                        originalSelectSelectedItem.removeAttribute('selected');
                    });

                    const selectSelectedItems = selectItem.find(this.getSelectClass(this.selectClasses.classSelectOptionSelected));
                    selectSelectedItems.each((index, selectSelectedItem) => {
                        $(originalSelect).find(`option[value = "${$(selectSelectedItem).data('value')}"]`).prop('selected', true);
                    });
                } else {
                    if (!originalSelect.hasAttribute('data-show-selected')) {
                        setTimeout(() => {
                            if (selectItem.find(`${this.getSelectClass(this.selectClasses.classSelectOption)}[hidden]`).length) {
                                selectItem.find(`${this.getSelectClass(this.selectClasses.classSelectOption)}[hidden]`).show();
                            }
                            optionItem.hide();
                        }, this.config.speed);
                    }
                    $(originalSelect).val(optionItem.data('value') ? optionItem.data('value') : optionItem.text());
                    this.selectAction(selectItem);
                }

                this.setSelectTitleValue(selectItem, originalSelect);
                this.setSelectChange(originalSelect);
            }
        }

        selectChange(e) {
            const originalSelect = e.target;
            this.selectBuild(originalSelect);
            this.setSelectChange(originalSelect);
        }

        setSelectChange(originalSelect) {
            if (originalSelect.hasAttribute('data-validate')) {
                formValidate.validateInput(originalSelect);
            }

            if (originalSelect.hasAttribute('data-submit') && originalSelect.value) {
                let tempButton = $("<button>").attr("type", "submit");
                $(originalSelect).closest('form').append(tempButton);
                tempButton.click();
                tempButton.remove();
            }

            const selectItem = $(originalSelect).parent();
            this.selectCallback(selectItem, originalSelect);
        }

        selectDisabled(selectItem, originalSelect) {
            if (originalSelect.disabled) {
                selectItem.addClass(this.selectClasses.classSelectDisabled);
                this.getSelectElement(selectItem, this.selectClasses.classSelectTitle).selectElement.prop('disabled', true);
            } else {
                selectItem.removeClass(this.selectClasses.classSelectDisabled);
                this.getSelectElement(selectItem, this.selectClasses.classSelectTitle).selectElement.prop('disabled', false);
            }
        }

        searchActions(selectItem) {
            const originalSelect = this.getSelectElement(selectItem).originalSelect[0];
            const selectInput = this.getSelectElement(selectItem, this.selectClasses.classSelectInput).selectElement;
            const selectOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
            const selectOptionsItems = selectOptions.find(`.${this.selectClasses.classSelectOption} `);
            const _this = this;

            selectInput.on("input", function () {
                selectOptionsItems.each(function () {
                    if ($(this).text().toUpperCase().includes(selectInput.val().toUpperCase())) {
                        $(this).show();
                    } else {
                        $(this).hide();
                    }
                });
                if (selectOptions.is(':hidden')) {
                    _this.selectAction(selectItem);
                }
            });
        }

        selectCallback(selectItem, originalSelect) {
            $(document).trigger("selectCallback", {
                select: originalSelect
            });
        }
    }
    modules_flsModules.select = new SelectConstructor({});

    // Форма
    function formFieldsInit(options = { viewPass: true, autoHeight: false }) {
        $(document).on('focusin', 'input, textarea', function (e) {
            const targetElement = $(this)[0];
            if (!targetElement.hasAttribute('data-no-focus-classes')) {
                $(targetElement).addClass('_form-focus');
                $(targetElement).parent().addClass('_form-focus');
            }
            formValidate.removeError(targetElement);
            if (targetElement.hasAttribute('data-validate')) {
                formValidate.removeError(targetElement);
            }
        });

        $(document).on('focusout', 'input, textarea', function (e) {
            const targetElement = $(this)[0];
            if (!targetElement.hasAttribute('data-no-focus-classes')) {
                $(targetElement).removeClass('_form-focus');
                $(targetElement).parent().removeClass('_form-focus');
            }
            if (targetElement.hasAttribute('data-validate')) {
                formValidate.validateInput(targetElement);
            }
        });

        if (options.viewPass) {
            $(document).on('click', '.form__viewpass', function (e) {
                const viewpassBlock = $(this);
                const input = viewpassBlock.closest('.form__input').find('input');

                if (input.length) {
                    const isActive = viewpassBlock.hasClass('_viewpass-active');
                    input.attr('type', isActive ? 'password' : 'text');
                    viewpassBlock.toggleClass('_viewpass-active');
                } else {
                    console.error('Input не найден!');
                }
            });
        }

        if (options.autoHeight) {
            const textareas = $('textarea[data-autoheight]');
            if (textareas.length) {
                textareas.each(function () {
                    const textarea = $(this);
                    const startHeight = textarea.data('autoheight-min') ?
                        Number(textarea.data('autoheight-min')) : Number(textarea.outerHeight());
                    const maxHeight = textarea.data('autoheight-max') ?
                        Number(textarea.data('autoheight-max')) : Infinity;

                    setHeight(textarea, Math.min(startHeight, maxHeight));

                    textarea.on('input', function () {
                        if (this.scrollHeight > startHeight) {
                            textarea.css('height', 'auto');
                            setHeight(textarea, Math.min(Math.max(this.scrollHeight, startHeight), maxHeight));
                        }
                    });
                });

                function setHeight(textarea, height) {
                    textarea.css('height', height + 'px');
                }
            }
        }
    }
    formFieldsInit({
        viewPass: true,
        autoHeight: false
    });
    let formValidate = {
        getErrors(form) {
            let error = 0;
            let formRequiredItems = $(form).find('[data-required]');

            if (formRequiredItems.length) {
                formRequiredItems.each(function () {
                    if (($(this).is(':visible') || this.tagName === "SELECT") && !this.disabled) {
                        error += formValidate.validateInput(this);
                    }
                });
            }
            return error;
        },

        validateInput(formRequiredItem) {
            let error = 0;
            const $element = $(formRequiredItem);

            if (formRequiredItem.dataset.required === "email") {
                formRequiredItem.value = formRequiredItem.value.replace(" ", "");
                if (this.emailTest(formRequiredItem)) {
                    this.addError(formRequiredItem);
                    this.removeSuccess(formRequiredItem);
                    error++;
                } else {
                    this.removeError(formRequiredItem);
                    this.addSuccess(formRequiredItem);
                }
            } else if (formRequiredItem.type === "checkbox" && !formRequiredItem.checked) {
                this.addError(formRequiredItem);
                this.removeSuccess(formRequiredItem);
                error++;
            } else if (formRequiredItem.dataset.validate === "password-confirm") {
                const passwordInput = $('#password');
                if (!passwordInput.length) return error;

                if (formRequiredItem.value !== passwordInput.val()) {
                    this.addError(formRequiredItem);
                    this.removeSuccess(formRequiredItem);
                    error++;
                } else {
                    this.removeError(formRequiredItem);
                    this.addSuccess(formRequiredItem);
                }
            } else {
                if (!$element.val().trim()) {
                    this.addError(formRequiredItem);
                    this.removeSuccess(formRequiredItem);
                    error++;
                } else {
                    this.removeError(formRequiredItem);
                    this.addSuccess(formRequiredItem);
                }
            }

            return error;
        },

        addError(formRequiredItem) {
            const $element = $(formRequiredItem);
            $element.addClass('_form-error');
            $element.parent().addClass('_form-error');

            $element.parent().find('.form__error').remove();

            if (formRequiredItem.dataset.error) {
                $element.parent().append(`<div class="form__error">${formRequiredItem.dataset.error}</div>`);
            }
        },

        removeError(formRequiredItem) {
            const $element = $(formRequiredItem);
            $element.removeClass('_form-error');
            $element.parent().removeClass('_form-error');
            $element.parent().find('.form__error').remove();
        },

        addSuccess(formRequiredItem) {
            const $element = $(formRequiredItem);
            $element.addClass('_form-success');
            $element.parent().addClass('_form-success');
        },

        removeSuccess(formRequiredItem) {
            const $element = $(formRequiredItem);
            $element.removeClass('_form-success');
            $element.parent().removeClass('_form-success');
        },

        formClean(form) {
            $(form).trigger('reset');

            setTimeout(() => {
                $(form).find('input, textarea').each(function () {
                    $(this).parent().removeClass('_form-focus');
                    $(this).removeClass('_form-focus');
                    formValidate.removeError(this);
                });

                $(form).find('.checkbox__input').prop('checked', false);

                if (typeof flsModules !== 'undefined' && flsModules.select) {
                    $(form).find('div.select').each(function () {
                        const select = $(this).find('select')[0];
                        if (select) flsModules.select.selectBuild(select);
                    });
                }
            }, 0);
        },

        emailTest(formRequiredItem) {
            return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(formRequiredItem.value);
        }
    };
    function formSubmit() {
        $('form').each(function () {
            const form = this;

            $(form).on('submit', function (e) {
                formSubmitAction(form, e);
            });

            $(form).on('reset', function (e) {
                formValidate.formClean(form);
            });
        });

        async function formSubmitAction(form, e) {
            const error = !form.hasAttribute('data-no-validate') ? formValidate.getErrors(form) : 0;

            if (error === 0) {
                const ajax = form.hasAttribute('data-ajax');

                if (ajax) {
                    e.preventDefault();
                    const formAction = form.getAttribute('action') ? form.getAttribute('action').trim() : '#';
                    const formMethod = form.getAttribute('method') ? form.getAttribute('method').trim() : 'GET';
                    const formData = new FormData(form);

                    $(form).addClass('_sending');

                    try {
                        const response = await fetch(formAction, {
                            method: formMethod,
                            body: formData
                        });

                        if (response.ok) {
                            const responseResult = await response.json();
                            $(form).removeClass('_sending');
                            formSent(form, responseResult);
                        } else {
                            alert("Ошибка");
                            $(form).removeClass('_sending');
                        }
                    } catch (error) {
                        alert("Ошибка сети");
                        $(form).removeClass('_sending');
                    }
                } else if (form.hasAttribute('data-dev')) {
                    e.preventDefault();
                    formSent(form);
                }
            } else {
                e.preventDefault();
                const formError = $(form).find('._form-error');

                if (formError.length && form.hasAttribute('data-goto-error')) {
                    const formGoToErrorClass = form.dataset.gotoError ? form.dataset.gotoError : '._form-error';

                    if (typeof gotoBlock === 'function') {
                        gotoBlock(formGoToErrorClass, true, 1000);
                    }
                }
            }
        }

        function formSent(form, responseResult = '') {
            $(document).trigger('formSent', {
                form: form
            });

            setTimeout(() => {
                if (typeof flsModules !== 'undefined' && flsModules.popup) {
                    const popup = form.dataset.popupMessage;
                    if (popup) flsModules.popup.open(popup);
                }
            }, 0);

            formValidate.formClean(form);
        }
    }
    formSubmit();

    // Спойлер
    function spollers() {
        const $spollersArray = $('[data-spollers]');
        if ($spollersArray.length > 0) {
            const spollersRegular = $spollersArray.filter((index, item) => {
                return !$(item).data('spollers').split(',')[0];
            });

            const spollersMedia = $spollersArray.filter((index, item) => {
                return $(item).data('spollers').split(',')[0];
            });

            if (spollersRegular.length) initSpollers(spollersRegular);

            if (spollersMedia.length) {
                spollersMedia.each((index, item) => {
                    const $item = $(item);
                    const mediaArray = $item.data('spollers').split(',');
                    const mediaQuery = mediaArray[0].trim();
                    const mediaType = mediaArray[1] ? mediaArray[1].trim() : 'max';

                    const matchMedia = window.matchMedia(`(${mediaType}-width: ${mediaQuery}px)`);

                    const handleMediaChange = (e) => {
                        initSpollers($($item), e);
                    };

                    initSpollers($($item), matchMedia);

                    if (matchMedia.addEventListener) {
                        matchMedia.addEventListener('change', handleMediaChange);
                    } else {
                        matchMedia.addListener(handleMediaChange);
                    }
                });
            }

            function initSpollers(spollersArray, matchMedia = false) {
                spollersArray.each((index, spollersBlock) => {
                    const $spollersBlock = $(spollersBlock);

                    if (matchMedia.matches || !matchMedia) {
                        $spollersBlock.addClass('_spoller-init');
                        initSpollerBody($spollersBlock);
                        $spollersBlock.on('click', setSpollerAction);
                    } else {
                        $spollersBlock.removeClass('_spoller-init');
                        initSpollerBody($spollersBlock, false);
                        $spollersBlock.off('click', setSpollerAction);
                    }
                });
            }

            function initSpollerBody(spollersBlock, hideSpollerBody = true) {
                const $spollersBlock = $(spollersBlock);
                let $spollerTitles = $spollersBlock.find('[data-spoller]');

                if ($spollerTitles.length) {
                    $spollerTitles = $spollerTitles.filter((index, item) => {
                        return $(item).closest('[data-spollers]').is($spollersBlock);
                    });

                    $spollerTitles.each((index, spollerTitle) => {
                        const $spollerTitle = $(spollerTitle);
                        const contentBlock = $spollerTitle.next()[0]; // DOM элемент

                        if (hideSpollerBody) {
                            $spollerTitle.removeAttr('tabindex');
                            if (!$spollerTitle.hasClass('_spoller-active')) {
                                contentBlock.hidden = true;
                                $(contentBlock).css({
                                    'height': '0px',
                                    'overflow': 'hidden'
                                });
                            } else {
                                $(contentBlock).css({
                                    'height': 'auto',
                                    'overflow': 'visible'
                                });
                                setTimeout(() => {
                                    if (typeof initShowMoreInSpoller === 'function') {
                                        initShowMoreInSpoller(contentBlock);
                                    }
                                }, 10);
                            }
                        } else {
                            $spollerTitle.attr('tabindex', '-1');
                            contentBlock.hidden = false;
                            $(contentBlock).css({
                                'height': '',
                                'overflow': ''
                            });
                        }
                    });
                }
            }

            function setSpollerAction(e) {
                const $el = $(e.target);
                const $spollerTitle = $el.closest('[data-spoller]');

                if ($spollerTitle.length) {
                    const $spollerItem = $spollerTitle.closest('.spollers__item');
                    const $spollersBlock = $spollerTitle.closest('[data-spollers]');
                    const oneSpoller = $spollersBlock.is('[data-one-spoller]');
                    const spollerSpeed = $spollersBlock.data('spollers-speed') ? parseInt($spollersBlock.data('spollers-speed')) : 500;

                    if (!$spollersBlock.find('._slide').length) {
                        if (oneSpoller && !$spollerTitle.hasClass('_spoller-active')) {
                            hideSpollersBody($spollersBlock);
                        }

                        $spollerTitle.toggleClass('_spoller-active');
                        if ($spollerItem.length) $spollerItem.toggleClass('_spoller-active');

                        const contentBlock = $spollerTitle.next()[0];
                        const $contentBlock = $(contentBlock);

                        $contentBlock.css({
                            'transition': `height ${spollerSpeed}ms ease`,
                            'overflow': 'hidden'
                        });

                        if ($spollerTitle.hasClass('_spoller-active')) {
                            contentBlock.hidden = false;

                            $contentBlock.css('height', '0px');

                            const autoHeight = $contentBlock.css('height', 'auto').outerHeight();

                            $contentBlock.css('height', '0px');

                            setTimeout(() => {
                                $contentBlock.css('height', autoHeight + 'px');

                                setTimeout(() => {
                                    $contentBlock.css({
                                        'height': 'auto',
                                        'overflow': 'visible'
                                    });
                                    if (typeof initShowMoreInSpoller === 'function') {
                                        initShowMoreInSpoller(contentBlock);
                                    }
                                }, spollerSpeed);
                            }, 10);
                        } else {
                            const startHeight = $contentBlock.outerHeight();
                            $contentBlock.css('height', startHeight + 'px');

                            setTimeout(() => {
                                $contentBlock.css('height', '0px');

                                setTimeout(() => {
                                    contentBlock.hidden = true;
                                    $contentBlock.css({
                                        'height': '',
                                        'overflow': ''
                                    });
                                }, spollerSpeed);
                            }, 10);
                        }

                        e.preventDefault();
                    }
                }
            }

            function hideSpollersBody(spollersBlock) {
                const $spollersBlock = $(spollersBlock);
                const $spollerActiveTitle = $spollersBlock.find('[data-spoller]._spoller-active');
                const spollerSpeed = $spollersBlock.data('spollers-speed') ? parseInt($spollersBlock.data('spollers-speed')) : 500;

                if ($spollerActiveTitle.length && !$spollersBlock.find('._slide').length) {
                    $spollerActiveTitle.removeClass('_spoller-active');
                    const contentBlock = $spollerActiveTitle.next()[0];
                    const $contentBlock = $(contentBlock);

                    $contentBlock.css({
                        'transition': `height ${spollerSpeed}ms ease`,
                        'overflow': 'hidden'
                    });

                    const startHeight = $contentBlock.outerHeight();
                    $contentBlock.css('height', startHeight + 'px');

                    setTimeout(() => {
                        $contentBlock.css('height', '0px');

                        setTimeout(() => {
                            contentBlock.hidden = true;
                            $contentBlock.css({
                                'height': '',
                                'overflow': ''
                            });
                        }, spollerSpeed);
                    }, 10);
                }
            }
        }
    }
    spollers();

    // Добавление _header-scroll к шапке при скролле
    const header = $('.header');
    if (header.length) {
        $(window).on('scroll', function () {
            if ($(window).scrollTop() > 0) {
                header.addClass('_header-scroll');
            } else {
                header.removeClass('_header-scroll');
            }
        });
    }

    // Меню
    const iconMenu = $('.header__icon');
    const headerTop = $('.header__menu');

    if (iconMenu.length) {
        iconMenu.on("click", function (e) {
            e.stopPropagation();
            $('html').toggleClass("menu-open");
        });

        $(document).on('click', function (e) {
            const isClickInsideHeaderTop = headerTop.length && $(e.target).closest(headerTop).length;
            const isClickOnMenuIcon = e.target === iconMenu[0] || $(e.target).closest(iconMenu).length;

            if (!isClickInsideHeaderTop && !isClickOnMenuIcon) {
                $('html').removeClass("menu-open");
            }
        });
    }

    //Фильтр
    const $filterButtons = $('.filter-navigation__title');
    const $blogItems = $('.cart-article');

    if ($filterButtons.length) {
        $filterButtons.on('click', function () {
            const filterValue = $(this).data('filter');

            $filterButtons.removeClass('_active');
            $(this).addClass('_active');

            $blogItems.each(function () {
                const itemFilter = $(this).data('filter');

                if (filterValue === 'all' || filterValue === itemFilter) {
                    $(this).removeClass('_hide');
                } else {
                    $(this).addClass('_hide');
                }
            });
        });
    }

    //Яндекс карта
    const $map1 = $('#map1');
    if ($map1.length) {
        ymaps.ready(init);

        function init() {
            var myMap1 = new ymaps.Map('map1', {
                center: [55.585881, 37.634748],
                zoom: 15,
                controls: ['zoomControl'],
                behaviors: ['drag']
            });
            var myPlacemark1 = new ymaps.Placemark(myMap1.getCenter(), {
                latitude: 55.585881,
                longitude: 37.634748,
            }, {
                iconLayout: 'default#image',
                iconImageHref: 'img/location.svg',
                iconColor: '#ec6608',
                iconImageSize: [72, 72],
                iconImageOffset: [-36, -36],
            });

            myMap1.geoObjects.add(myPlacemark1);
        };
    }

    const $map2 = $('#map2');
    if ($map1.length) {
        ymaps.ready(init);

        function init() {
            var myMap2 = new ymaps.Map('map2', {
                center: [55.809838, 37.739950],
                zoom: 15,
                controls: ['zoomControl'],
                behaviors: ['drag']
            });
            var myPlacemark2 = new ymaps.Placemark(myMap2.getCenter(), {
                latitude: 55.809838,
                longitude: 37.739950,
            }, {
                iconLayout: 'default#image',
                iconImageHref: 'img/location.svg',
                iconColor: '#ec6608',
                iconImageSize: [72, 72],
                iconImageOffset: [-36, -36],
            });

            myMap2.geoObjects.add(myPlacemark2);
        };
    }

    //Фильтр каталог
    const $filterButton = $('.filter__button');
    const $filterElement = $('.filter');

    if ($filterButton.length && $filterElement.length) {
        $filterButton.on('click', function (e) {
            e.stopPropagation();
            $('html').toggleClass('filter-open');
        });

        $(document).on('click', function (e) {
            if (!$filterElement.is(e.target) &&
                !$filterElement.has(e.target).length &&
                !$filterButton.is(e.target)) {
                $('html').removeClass('filter-open');
            }
        });

        $filterElement.on('click', function (e) {
            e.stopPropagation();
        });
    }

    //Фильтр каталог
    const $filterButton2 = $('.block-service__button');
    const $filterElement2 = $('.spollers-service');

    if ($filterButton2.length && $filterElement2.length) {
        $filterButton2.on('click', function (e) {
            e.stopPropagation();
            $('html').toggleClass('filter-open');
        });

        $(document).on('click', function (e) {
            if (!$filterElement2.is(e.target) &&
                !$filterElement2.has(e.target).length &&
                !$filterButton2.is(e.target)) {
                $('html').removeClass('filter-open');
            }
        });

        $filterElement2.on('click', function (e) {
            e.stopPropagation();
        });

        $('.spollers-service__close').on('click', function () {
            $('html').removeClass('filter-open');
        });
    }

    //Количество
    function formQuantity() {
        $(document).on('click', '[data-quantity-plus], [data-quantity-minus]', function (e) {
            e.preventDefault();

            const $target = $(e.target);
            const $button = $target.closest('[data-quantity-plus], [data-quantity-minus]');
            const $quantity = $button.closest('[data-quantity]');
            const $valueElement = $quantity.find('[data-quantity-value]');

            let value = parseInt($valueElement.val());
            const maxValue = $valueElement.data('quantity-max');
            const minValue = $valueElement.data('quantity-min');

            if ($button.is('[data-quantity-plus]')) {
                value++;
                if (maxValue && maxValue < value) {
                    value = maxValue;
                }
            } else {
                value--;
                if (minValue) {
                    if (minValue > value) {
                        value = minValue;
                    }
                } else if (value < 1) {
                    value = 1;
                }
            }

            $valueElement.val(value);
        });
    }
    formQuantity();

    //Поиск
    const $searchElements = $('.search');
    if ($searchElements.length) {
        $searchElements.each(function () {
            const $currentSearch = $(this);
            const $searchContent = $currentSearch.find('.search__content');

            if ($searchContent.length) {
                $searchContent.on('click', function (e) {
                    e.stopPropagation();

                    $searchElements.not($currentSearch).removeClass('_active');

                    $currentSearch.toggleClass('_active');
                });
            }
        });

        $(document).on('click', function (e) {
            if (!$(e.target).closest('.search').length) {
                $searchElements.removeClass('_active');
            }
        });
    }

    //Табы
    function tabs() {
        const $tabs = $('[data-tabs]');
        let tabsActiveHash = [];

        if ($tabs.length > 0) {
            const hash = getHash();
            if (hash && hash.startsWith('tab-')) {
                tabsActiveHash = hash.replace('tab-', '').split('-');
            }

            $tabs.each(function (index) {
                const $tabsBlock = $(this);
                $tabsBlock.addClass('_tab-init');
                $tabsBlock.attr('data-tabs-index', index);
                $tabsBlock.on("click", setTabsAction);
                initTabs($tabsBlock);
            });

            let mdQueriesArray = dataMediaQueries($tabs.toArray(), "tabs");
            if (mdQueriesArray && mdQueriesArray.length) {
                mdQueriesArray.forEach(mdQueriesItem => {
                    mdQueriesItem.matchMedia.addEventListener("change", function () {
                        setTitlePosition(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
                    });
                    setTitlePosition(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
                });
            }
        }

        function setTitlePosition(tabsMediaArray, matchMedia) {
            tabsMediaArray.forEach(tabsMediaItem => {
                tabsMediaItem = tabsMediaItem.item;
                const $tabsMediaItem = $(tabsMediaItem);
                const $tabsTitles = $tabsMediaItem.find('[data-tabs-titles]');
                let $tabsTitleItems = $tabsMediaItem.find('[data-tabs-title]');
                const $tabsContent = $tabsMediaItem.find('[data-tabs-body]');
                let $tabsContentItems = $tabsMediaItem.find('[data-tabs-item]');

                $tabsTitleItems = $tabsTitleItems.filter((_, item) => $(item).closest('[data-tabs]').is($tabsMediaItem));
                $tabsContentItems = $tabsContentItems.filter((_, item) => $(item).closest('[data-tabs]').is($tabsMediaItem));

                $tabsContentItems.each(function (index) {
                    if (matchMedia.matches) {
                        $tabsContent.append($tabsTitleItems.eq(index));
                        $tabsContent.append($(this));
                        $tabsMediaItem.addClass('_tab-spoller');
                    } else {
                        $tabsTitles.append($tabsTitleItems.eq(index));
                        $tabsMediaItem.removeClass('_tab-spoller');
                    }
                });
            });
        }

        function initTabs($tabsBlock) {
            const tabsBlockIndex = $tabsBlock.data('tabs-index');
            const tabsActiveHashBlock = tabsActiveHash[0] == tabsBlockIndex;
            const $tabsTitles = $tabsBlock.find('[data-tabs-titles] > *');
            const $tabsContent = $tabsBlock.find('[data-tabs-body] > *');

            if (tabsActiveHashBlock) {
                const $tabsActiveTitle = $tabsBlock.find('[data-tabs-titles] > ._tab-active');
                $tabsActiveTitle.removeClass('_tab-active');
            }

            if ($tabsContent.length) {
                $tabsContent.each(function (index) {
                    const $title = $tabsTitles.eq(index);
                    const $content = $(this);

                    $title.attr('data-tabs-title', '');
                    $content.attr('data-tabs-item', '');

                    if (tabsActiveHashBlock && index == tabsActiveHash[1]) {
                        $title.addClass('_tab-active');
                    }
                    $content.prop('hidden', !$title.hasClass('_tab-active'));
                });
            }
            setTabsStatus($tabsBlock);
        }

        function setTabsStatus($tabsBlock) {
            let $tabsTitles = $tabsBlock.find('[data-tabs-title]');
            let $tabsContent = $tabsBlock.find('[data-tabs-item]');
            const tabsBlockIndex = $tabsBlock.data('tabs-index');

            function isTabsAnimate($tabsBlock) {
                if ($tabsBlock.attr('data-tabs-animate')) {
                    return $tabsBlock.data('tabs-animate') > 0 ? Number($tabsBlock.data('tabs-animate')) : 500;
                }
                return false;
            }
            const tabsBlockAnimate = isTabsAnimate($tabsBlock);

            if ($tabsContent.length > 0) {
                const isHash = $tabsBlock.attr('data-tabs-hash');
                $tabsContent = $tabsContent.filter((_, item) => $(item).closest('[data-tabs]').is($tabsBlock));
                $tabsTitles = $tabsTitles.filter((_, item) => $(item).closest('[data-tabs]').is($tabsBlock));

                $tabsContent.each(function (index) {
                    const $content = $(this);
                    const $title = $tabsTitles.eq(index);

                    if ($title.hasClass('_tab-active')) {
                        if (tabsBlockAnimate) {
                            _slideDown($content.get(0), tabsBlockAnimate);
                        } else {
                            $content.prop('hidden', false);
                        }
                        if (isHash && !$content.closest('.popup').length) {
                            setHash(`tab-${tabsBlockIndex}-${index}`);
                        }
                    } else {
                        if (tabsBlockAnimate) {
                            _slideUp($content.get(0), tabsBlockAnimate);
                        } else {
                            $content.prop('hidden', true);
                        }
                    }
                });
            }
        }

        function setTabsAction(e) {
            const $el = $(e.target);
            const $tabTitle = $el.closest('[data-tabs-title]');

            if ($tabTitle.length) {
                const $tabsBlock = $tabTitle.closest('[data-tabs]');

                if (!$tabTitle.hasClass('_tab-active') && !$tabsBlock.find('._slide').length) {
                    let $tabActiveTitle = $tabsBlock.find('[data-tabs-title]._tab-active');
                    $tabActiveTitle = $tabActiveTitle.filter((_, item) => $(item).closest('[data-tabs]').is($tabsBlock));

                    if ($tabActiveTitle.length) $tabActiveTitle.removeClass('_tab-active');
                    $tabTitle.addClass('_tab-active');
                    setTabsStatus($tabsBlock);
                }
                e.preventDefault();
            }
        }
    }
    tabs();

    // Попап
    class Popup {
        constructor(options) {
            let config = {
                logging: true,
                init: true,
                attributeOpenButton: "data-popup",
                attributeCloseButton: "data-close",
                fixElementSelector: "[data-lp]",
                youtubeAttribute: "data-popup-youtube",
                youtubePlaceAttribute: "data-popup-youtube-place",
                setAutoplayYoutube: true,
                classes: {
                    popup: "popup",
                    popupContent: "popup__content",
                    popupActive: "popup_show",
                    bodyActive: "popup-show"
                },
                focusCatch: true,
                closeEsc: true,
                bodyLock: true,
                hashSettings: {
                    goHash: true
                },
                on: {
                    beforeOpen: function () { },
                    afterOpen: function () { },
                    beforeClose: function () { },
                    afterClose: function () { }
                }
            };
            this.youTubeCode;
            this.isOpen = false;
            this.targetOpen = {
                selector: false,
                element: false
            };
            this.previousOpen = {
                selector: false,
                element: false
            };
            this.lastClosed = {
                selector: false,
                element: false
            };
            this._dataValue = false;
            this.hash = false;
            this._reopen = false;
            this._selectorOpen = false;
            this.lastFocusEl = false;
            this._focusEl = ["a[href]", 'input:not([disabled]):not([type="hidden"]):not([aria-hidden])', "button:not([disabled]):not([aria-hidden])", "select:not([disabled]):not([aria-hidden])", "textarea:not([disabled]):not([aria-hidden])", "area[href]", "iframe", "object", "embed", "[contenteditable]", '[tabindex]:not([tabindex^="-"])'];
            this.options = {
                ...config,
                ...options,
                classes: {
                    ...config.classes,
                    ...options?.classes
                },
                hashSettings: {
                    ...config.hashSettings,
                    ...options?.hashSettings
                },
                on: {
                    ...config.on,
                    ...options?.on
                }
            };
            this.bodyLock = false;
            this.options.init ? this.initPopups() : null;
        }

        initPopups() {
            this.eventsPopup();
        }

        eventsPopup() {
            $(document).on("click", (e) => {
                const buttonOpen = $(e.target).closest(`[${this.options.attributeOpenButton}]`);
                if (buttonOpen.length) {
                    e.preventDefault();
                    this._dataValue = buttonOpen.attr(this.options.attributeOpenButton) ? buttonOpen.attr(this.options.attributeOpenButton) : "error";
                    this.youTubeCode = buttonOpen.attr(this.options.youtubeAttribute) ? buttonOpen.attr(this.options.youtubeAttribute) : null;

                    if ("error" !== this._dataValue) {
                        if (!this.isOpen) this.lastFocusEl = buttonOpen;
                        this.targetOpen.selector = `${this._dataValue}`;
                        this._selectorOpen = true;
                        this.open();
                        return;
                    }
                    return;
                }

                const buttonClose = $(e.target).closest(`[${this.options.attributeCloseButton}]`);
                if (buttonClose.length || !$(e.target).closest(`.${this.options.classes.popupContent}`).length && this.isOpen) {
                    e.preventDefault();
                    this.close();
                    return;
                }
            });

            $(document).on("keydown", (e) => {
                if (this.options.closeEsc && e.which === 27 && e.code === "Escape" && this.isOpen) {
                    e.preventDefault();
                    this.close();
                    return;
                }
                if (this.options.focusCatch && e.which === 9 && this.isOpen) {
                    this._focusCatch(e);
                    return;
                }
            });

            if (this.options.hashSettings.goHash) {
                $(window).on("hashchange", () => {
                    if (window.location.hash) this._openToHash();
                    else this.close(this.targetOpen.selector);
                });

                $(window).on("load", () => {
                    if (window.location.hash) this._openToHash();
                });
            }
        }

        open(selectorValue) {
            if (bodyLockStatus) {
                this.bodyLock = $("html").hasClass("lock") && !this.isOpen ? true : false;

                if (selectorValue && typeof selectorValue === "string" && selectorValue.trim() !== "") {
                    this.targetOpen.selector = selectorValue;
                    this._selectorOpen = true;
                }

                if (this.isOpen) {
                    this._reopen = true;
                    this.close();
                }

                if (!this._selectorOpen) this.targetOpen.selector = this.lastClosed.selector;
                if (!this._reopen) this.previousActiveElement = document.activeElement;

                this.targetOpen.element = $(this.targetOpen.selector);

                if (this.targetOpen.element.length) {
                    if (this.youTubeCode) {
                        const codeVideo = this.youTubeCode;
                        const urlVideo = `https://www.youtube.com/embed/${codeVideo}?rel=0&showinfo=0&autoplay=1`;
                        const iframe = $("<iframe>")
                            .attr("allowfullscreen", "")
                            .attr("allow", `${this.options.setAutoplayYoutube ? "autoplay;" : ""}; encrypted-media`)
                            .attr("src", urlVideo);

                        if (!this.targetOpen.element.find(`[${this.options.youtubePlaceAttribute}]`).length) {
                            this.targetOpen.element.find(".popup__text").attr(this.options.youtubePlaceAttribute, "");
                        }

                        this.targetOpen.element.find(`[${this.options.youtubePlaceAttribute}]`).append(iframe);
                    }

                    const videoElement = this.targetOpen.element.find("video").get(0);
                    if (videoElement) {
                        videoElement.muted = true;
                        videoElement.currentTime = 0;
                        videoElement.play().catch((e) => console.error("Autoplay error:", e));
                    }

                    if (this.options.hashSettings.location) {
                        this._getHash();
                        this._setHash();
                    }

                    this.options.on.beforeOpen(this);
                    $(document).trigger("beforePopupOpen", { popup: this });

                    this.targetOpen.element.addClass(this.options.classes.popupActive);
                    $("html").addClass(this.options.classes.bodyActive);

                    if (!this._reopen) {
                        if (!this.bodyLock) bodyLock();
                    } else {
                        this._reopen = false;
                    }

                    this.targetOpen.element.attr("aria-hidden", "false");
                    this.previousOpen.selector = this.targetOpen.selector;
                    this.previousOpen.element = this.targetOpen.element;
                    this._selectorOpen = false;
                    this.isOpen = true;

                    this.options.on.afterOpen(this);
                    $(document).trigger("afterPopupOpen", { popup: this });
                }
            }
        }

        close(selectorValue) {
            if (selectorValue && typeof selectorValue === "string" && selectorValue.trim() !== "") {
                this.previousOpen.selector = selectorValue;
            }

            if (!this.isOpen || !bodyLockStatus) return;

            this.options.on.beforeClose(this);
            $(document).trigger("beforePopupClose", { popup: this });

            if (this.youTubeCode) {
                if (this.targetOpen.element.find(`[${this.options.youtubePlaceAttribute}]`).length) {
                    this.targetOpen.element.find(`[${this.options.youtubePlaceAttribute}]`).empty();
                }
            }

            this.previousOpen.element.removeClass(this.options.classes.popupActive);

            const videoElement = this.previousOpen.element.find("video").get(0);
            if (videoElement) videoElement.pause();

            this.previousOpen.element.attr("aria-hidden", "true");

            if (!this._reopen) {
                $("html").removeClass(this.options.classes.bodyActive);
                if (!this.bodyLock) bodyUnlock();
                this.isOpen = false;
            }

            $(document).trigger("afterPopupClose", { popup: this });
        }

        _getHash() {
            if (this.options.hashSettings.location) {
                this.hash = this.targetOpen.selector.includes("#") ?
                    this.targetOpen.selector :
                    this.targetOpen.selector.replace(".", "#");
            }
        }

        _openToHash() {
            let classInHash = $(`.${window.location.hash.replace("#", "")}`).length ?
                `.${window.location.hash.replace("#", "")}` :
                $(`${window.location.hash}`).length ?
                    `${window.location.hash}` :
                    null;

            const buttons = $(`[${this.options.attributeOpenButton}="${classInHash}"]`).length ?
                $(`[${this.options.attributeOpenButton}="${classInHash}"]`) :
                $(`[${this.options.attributeOpenButton}="${classInHash.replace(".", "#")}"]`);

            if (buttons.length && classInHash) this.open(classInHash);
        }

        _setHash() {
            history.pushState("", "", this.hash);
        }

        _removeHash() {
            history.pushState("", "", window.location.href.split("#")[0]);
        }

        _focusCatch(e) {
            const focusable = this.targetOpen.element.find(this._focusEl.join(", "));
            const focusArray = focusable.toArray();
            const focusedIndex = focusArray.indexOf(document.activeElement);

            if (e.shiftKey && focusedIndex === 0) {
                focusArray[focusArray.length - 1].focus();
                e.preventDefault();
            }

            if (!e.shiftKey && focusedIndex === focusArray.length - 1) {
                focusArray[0].focus();
                e.preventDefault();
            }
        }
    }
    modules_flsModules.popup = new Popup({});
    function menuOpen() {
        bodyLock();
        $("html").addClass("menu-open");
    }
    function menuClose() {
        bodyUnlock();
        $("html").removeClass("menu-open");
    }

    //Наблюдатель
    class ScrollWatcher {
        constructor(props) {
            let defaultConfig = {
                logging: true,
            }
            this.config = $.extend(defaultConfig, props);
            this.observer;
            if (!$('html').hasClass('watcher')) {
                this.scrollWatcherRun();
            }
        }

        scrollWatcherUpdate() {
            this.scrollWatcherRun();
        }

        scrollWatcherRun() {
            $('html').addClass('watcher');
            this.scrollWatcherConstructor($('[data-watch]'));
        }

        scrollWatcherConstructor(items) {
            if (items.length) {
                let uniqParams = [];

                items.each(function () {
                    let $item = $(this);
                    let dataWatch = $item.data('watch');
                    let dataWatchRoot = $item.data('watch-root');
                    let dataWatchMargin = $item.data('watch-margin');
                    let dataWatchThreshold = $item.data('watch-threshold');

                    if (dataWatch === 'navigator' && !dataWatchThreshold) {
                        let valueOfThreshold;
                        if ($item[0].clientHeight > 2) {
                            valueOfThreshold = window.innerHeight / 2 / ($item[0].clientHeight - 1);
                            if (valueOfThreshold > 1) {
                                valueOfThreshold = 1;
                            }
                        } else {
                            valueOfThreshold = 1;
                        }
                        $item.attr('data-watch-threshold', valueOfThreshold.toFixed(2));
                    }

                    let paramString = (dataWatchRoot || 'null') + '|' + (dataWatchMargin || '0px') + '|' + (dataWatchThreshold || 0);
                    if ($.inArray(paramString, uniqParams) === -1) {
                        uniqParams.push(paramString);
                    }
                });

                $.each(uniqParams, (index, uniqParam) => {
                    let uniqParamArray = uniqParam.split('|');
                    let paramsWatch = {
                        root: uniqParamArray[0],
                        margin: uniqParamArray[1],
                        threshold: uniqParamArray[2]
                    };

                    let groupItems = items.filter(function () {
                        let $item = $(this);
                        let watchRoot = $item.data('watch-root');
                        let watchMargin = $item.data('watch-margin');
                        let watchThreshold = $item.data('watch-threshold');

                        return (String(watchRoot || 'null') === paramsWatch.root &&
                            String(watchMargin || '0px') === paramsWatch.margin &&
                            String(watchThreshold || 0) === paramsWatch.threshold);
                    });

                    let configWatcher = this.getScrollWatcherConfig(paramsWatch);
                    if (configWatcher) {
                        this.scrollWatcherInit(groupItems, configWatcher);
                    }
                });
            }
        }

        getScrollWatcherConfig(paramsWatch) {
            let configWatcher = {};

            if (paramsWatch.root !== 'null') {
                let $root = $(paramsWatch.root);
                if ($root.length) {
                    configWatcher.root = $root[0];
                }
            }

            configWatcher.rootMargin = paramsWatch.margin;

            if (paramsWatch.margin.indexOf('px') < 0 && paramsWatch.margin.indexOf('%') < 0) {
                return null;
            }

            if (paramsWatch.threshold === 'prx') {
                paramsWatch.threshold = [];
                for (let i = 0; i <= 1.0; i += 0.005) {
                    paramsWatch.threshold.push(i);
                }
            } else {
                paramsWatch.threshold = paramsWatch.threshold.split(',');
            }

            configWatcher.threshold = paramsWatch.threshold;
            return configWatcher;
        }

        scrollWatcherCreate(configWatcher) {
            this.observer = new IntersectionObserver((entries, observer) => {
                $.each(entries, (index, entry) => {
                    this.scrollWatcherCallback(entry, observer);
                });
            }, configWatcher);
        }

        scrollWatcherInit(items, configWatcher) {
            this.scrollWatcherCreate(configWatcher);
            items.each((index, item) => {
                this.observer.observe(item);
            });
        }

        scrollWatcherIntersecting(entry, targetElement) {
            let $target = $(targetElement);
            if (entry.isIntersecting) {
                if (!$target.hasClass('_watcher-view')) {
                    $target.addClass('_watcher-view');
                }
            } else {
                if ($target.hasClass('_watcher-view')) {
                    $target.removeClass('_watcher-view');
                }
            }
        }

        scrollWatcherOff(targetElement, observer) {
            observer.unobserve(targetElement);
        }

        scrollWatcherCallback(entry, observer) {
            const targetElement = entry.target;
            this.scrollWatcherIntersecting(entry, targetElement);

            let $target = $(targetElement);
            if ($target.attr('data-watch-once') && entry.isIntersecting) {
                this.scrollWatcherOff(targetElement, observer);
            }

            $(document).trigger(new $.Event("watcherCallback", {
                detail: {
                    entry: entry
                }
            }));
        }
    }
    modules_flsModules.watcher = new ScrollWatcher({});

    //Прокрутка к блоку
    let gotoBlock = (targetBlock, noHeader = false, speed = 500, offsetTop = 0) => {
        const targetBlockElement = $(targetBlock);
        if (targetBlockElement.length) {
            let headerItem = '';
            let headerItemHeight = 0;
            if (noHeader) {
                headerItem = 'header.header';
                const headerElement = $(headerItem);
                if (!headerElement.hasClass('_header-scroll')) {
                    headerElement.css('transition-duration', '0s');
                    headerElement.addClass('_header-scroll');
                    headerItemHeight = headerElement.outerHeight();
                    headerElement.removeClass('_header-scroll');
                    setTimeout(() => {
                        headerElement.css('transition-duration', '');
                    }, 0);
                } else {
                    headerItemHeight = headerElement.outerHeight();
                }
            }
            if ($('html').hasClass("menu-open")) {
                menuClose();
            }

            let targetBlockElementPosition = targetBlockElement.offset().top;
            targetBlockElementPosition = headerItemHeight ? targetBlockElementPosition - headerItemHeight : targetBlockElementPosition;
            targetBlockElementPosition = offsetTop ? targetBlockElementPosition - offsetTop : targetBlockElementPosition;

            $('html, body').animate({
                scrollTop: targetBlockElementPosition
            }, speed);
        }
    };
    function pageNavigation() {
        $(document).on("click", pageNavigationAction);
        $(document).on("watcherCallback", pageNavigationAction);

        function pageNavigationAction(e) {
            if (e.type === "click") {
                const $targetElement = $(e.target);
                const $gotoLink = $targetElement.closest('[data-goto]');

                if ($gotoLink.length) {
                    const gotoLinkSelector = $gotoLink.data('goto') || '';
                    const noHeader = $gotoLink.is('[data-goto-header]');
                    const gotoSpeed = $gotoLink.data('goto-speed') || 500;
                    const offsetTop = $gotoLink.data('goto-top') ? parseInt($gotoLink.data('goto-top')) : 0;

                    if (modules_flsModules.fullpage) {
                        const $fullpageSection = $(gotoLinkSelector).closest('[data-fp-section]');
                        const fullpageSectionId = $fullpageSection.length ? +$fullpageSection.data('fp-id') : null;

                        if (fullpageSectionId !== null) {
                            modules_flsModules.fullpage.switchingSection(fullpageSectionId);
                            if ($('html').hasClass("menu-open")) {
                                menuClose();
                            }
                        }
                    } else {
                        gotoBlock(gotoLinkSelector, noHeader, gotoSpeed, offsetTop);
                    }
                    e.preventDefault();
                }
            } else if (e.type === "watcherCallback" && e.detail) {
                const entry = e.detail.entry;
                const targetElement = entry.target;

                if ($(targetElement).data('watch') === 'navigator') {
                    const $navigatorActiveItem = $('[data-goto]._navigator-active');
                    let $navigatorCurrentItem;

                    if (targetElement.id && $(`[data-goto="#${targetElement.id}"]`).length) {
                        $navigatorCurrentItem = $(`[data-goto="#${targetElement.id}"]`);
                    } else if (targetElement.classList.length) {
                        for (let index = 0; index < targetElement.classList.length; index++) {
                            const element = targetElement.classList[index];
                            if ($(`[data-goto=".${element}"]`).length) {
                                $navigatorCurrentItem = $(`[data-goto=".${element}"]`);
                                break;
                            }
                        }
                    }

                    if (entry.isIntersecting) {
                        if ($navigatorCurrentItem) {
                            $navigatorCurrentItem.addClass('_navigator-active');
                        }
                    } else {
                        if ($navigatorCurrentItem) {
                            $navigatorCurrentItem.removeClass('_navigator-active');
                        }
                    }
                }
            }
        }
    }
    pageNavigation();

    Fancybox.bind("[data-fancybox]", {
        // опции
    });

    function switchTabs() {
        const $activeTab = $('.block-reviews1__nav-title._tab-active');

        if ($activeTab.length === 0) return;

        const activeTabId = $activeTab.data('tabs');
        const $tabContents = $('.block-reviews1__content');

        if ($tabContents.length === 0) return;

        $tabContents.each(function () {
            const contentTabId = $(this).data('tabs');

            if (contentTabId === activeTabId) {
                $(this).removeClass('hide');
            } else {
                $(this).addClass('hide');
            }
        });
    }
    if ($('.block-reviews1__nav-title').length > 0 && $('.block-reviews1__content').length > 0) {
        switchTabs();

        $('.block-reviews1__nav-title').on('click', function () {
            $('.block-reviews1__nav-title').removeClass('_tab-active');

            $(this).addClass('_tab-active');

            switchTabs();
        });
    }

    //Маска телефона
    const telephone = document.querySelectorAll('input[type="tel"]');
    if (telephone) {
        Inputmask({ "mask": "+7 (999) 999 - 99 - 99" }).mask(telephone);
    }
});