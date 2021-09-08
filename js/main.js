"use strict";

window.onload = function () {
    const body = document.querySelector('body');
    const headerMenu = document.querySelector('.header__menu');

    function lockScroll() {
        body.classList.add('_lock');
    }

    function unlockScroll() {
        body.classList.remove('_lock');
    }

    function burgerMenu(headerMenu) {

        const burger = document.querySelector('.burger__menu');

        burger.addEventListener('click', (event) => {
            event.preventDefault();
            headerMenu.classList.toggle('_active');
            body.classList.toggle('_lock');
        });
    }

    function popups(targetElement, close) {

        const popups = document.querySelector('.popups');
        const popupsQuickSelectionItems = document.querySelector('.popups__quick-selection-items');
        let popupVisible = Number(popupsQuickSelectionItems.dataset.popup);
        const popupsQuickSelectionItemsCount = document.querySelectorAll('.popups__quick-selection-item');
        const popupsQuickSelectionItemsLength = popupsQuickSelectionItemsCount.length;

        popupsQuickSelectionItems.classList.remove('_lock');

        function closePopups() {
            popupsQuickSelectionItemsCount.forEach((item) => {
                item.classList.remove('_visible');
            });

            popupsQuickSelectionItems.dataset.popup = 0;
            popups.classList.remove('_visible');
            popupsQuickSelectionItems.classList.add('_lock');
        }

        if (close) {
            closePopups();
        } else {
            const popupsQuickSelectionItem = popupsQuickSelectionItemsCount[popupVisible];
            const popupsClose = popupsQuickSelectionItem.querySelector('.popups__close');

            popups.classList.add('_visible');

            popupsClose.addEventListener('click', (event) => {
                event.preventDefault();
                closePopups()
            });

            popupsQuickSelectionItemsCount.forEach((item) => {
                item.classList.remove('_visible');
            });

            popupsQuickSelectionItem.classList.add('_visible');
            popupsQuickSelectionItems.dataset.popup = popupVisible + 1;
        }
    }

    function spoiler() {

        const spoilers = document.querySelectorAll('.spoiler');

        spoilers.forEach((item) => {
            const spoilerButton = item.querySelector('.spoiler__button');
            spoilerButton.addEventListener('click', () => {
                item.classList.toggle('_active');
            });
        });
    }

    document.addEventListener('click', documentActions);

    function documentActions(event) {
        const targetElement = event.target;

        if (targetElement.classList.contains('slider__button-right') || targetElement.classList.contains('slider__button-left')) {
            slider(targetElement);
        }

        if (targetElement.classList.contains('popups__active-btn') || targetElement.classList.contains('popups__btn-further')) {
            headerMenu.classList.remove('_active');
            popups(targetElement, false);
            lockScroll();
        }

        if (targetElement.classList.contains('popups__end-button') || targetElement.classList.contains('popups__close')) {
            unlockScroll();
            popups(targetElement, true);
        }
    }

    if (document.querySelector('.slider')) {
        getWidth();
    }

    burgerMenu(headerMenu);
    spoiler();
}