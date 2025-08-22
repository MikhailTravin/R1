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
    if ($('.top-block-intro__slider').length > 0) {
        const blockIntro = new Swiper('.top-block-intro__slider', {
            observer: true,
            observeParents: true,
            slidesPerView: 1,
            spaceBetween: 0,
            speed: 400,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.top-block-intro__pagination',
                clickable: true,
                type: 'bullets'
            }
        });
    }

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
    function initShowMore(containerSelector, itemSelector, buttonSelector, itemsToShow, breakpoint) {
        const $container = $(containerSelector);
        const $content = $container.find('[data-showmore-content]');
        const $button = $container.find(buttonSelector);
        const $items = $content.find(itemSelector);

        let clickHandlerAdded = false;
        let isManualToggle = false;

        function checkItemsCount() {
            if ($items.length <= itemsToShow) {
                $button.attr('hidden', 'true');
            } else {
                $button.removeAttr('hidden');
            }
        }

        function handleShowMoreClick() {
            isManualToggle = true;

            const isActive = $(this).hasClass('_showmore-active');

            if (isActive) {
                $items.each(function (index) {
                    if (index >= itemsToShow) {
                        $(this).hide();
                    }
                });
                $(this).removeClass('_showmore-active');
            } else {
                $items.show();
                $(this).addClass('_showmore-active');
            }
        }

        function toggleShowMore() {
            if (isManualToggle && $(window).width() <= breakpoint) {
                return;
            }

            if ($(window).width() <= breakpoint) {
                if (!$button.hasClass('_showmore-active')) {
                    $items.each(function (index) {
                        if (index >= itemsToShow) {
                            $(this).hide();
                        } else {
                            $(this).css('display', 'flex');
                        }
                    });
                } else {
                    $items.css('display', 'flex');
                }

                if (!clickHandlerAdded) {
                    $button.on('click', handleShowMoreClick);
                    clickHandlerAdded = true;
                }

                checkItemsCount();
            } else {
                $items.css('display', 'flex');
                $button.removeClass('_showmore-active').attr('hidden', 'true');

                if (clickHandlerAdded) {
                    $button.off('click', handleShowMoreClick);
                    clickHandlerAdded = false;
                }

                isManualToggle = false; 
            }
        }

        toggleShowMore();

        let resizeTimer;
        $(window).on('resize', function () {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(toggleShowMore, 250);
        });
    }
    // Инициализация для блока услуг (5 элементов)
    initShowMore(
        '[data-showmore="992,max"].block-services__content',
        '.block-services__column',
        '[data-showmore-button]',
        5,
        992
    );
    // Инициализация для блока отзывов (2 элемента)
    initShowMore(
        '[data-showmore="992,max"].left-block-reviews__content',
        '.left-block-reviews__column',
        '[data-showmore-button]',
        2,
        992
    );

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
                            } else {
                                setTimeout(() => {
                                    if (typeof initShowMoreInSpoller === 'function') {
                                        initShowMoreInSpoller(contentBlock);
                                    }
                                }, 10);
                            }
                        } else {
                            $spollerTitle.attr('tabindex', '-1');
                            contentBlock.hidden = false;
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

                        const contentBlock = $spollerTitle.next()[0]; // DOM элемент

                        if ($spollerTitle.hasClass('_spoller-active')) {
                            _slideDown(contentBlock, spollerSpeed, () => {
                                if (typeof initShowMoreInSpoller === 'function') {
                                    setTimeout(() => initShowMoreInSpoller(contentBlock), 10);
                                }
                            });
                        } else {
                            _slideUp(contentBlock, spollerSpeed);
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
                    _slideUp(contentBlock, spollerSpeed);
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
});