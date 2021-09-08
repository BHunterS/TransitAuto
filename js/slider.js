function slider(targetElement) {

    const targetButtons = targetElement.parentNode;
    const targetButtonRight = targetButtons.querySelector('.slider__button-right');
    const targetButtonLeft = targetButtons.querySelector('.slider__button-left');
    const targetTrack = targetButtons.parentNode;
    const targetItems = targetTrack.querySelector('.slider__items');
    let position = Number(targetItems.dataset.translate);
    const targetItem = targetItems.querySelector('.slider__item');
    const targetItemWidth = targetItem.clientWidth;
    const targetItemsCount = targetItems.querySelectorAll('.slider__item');
    const targetItemsLength = targetItemsCount.length;
    const targetDotsBlock = targetTrack.querySelector('.slider__dots');
    const movePosition = targetItemWidth;

    const setPosition = () => {
        targetItems.style.transform = `translateX(${position}px)`;
    };

    const checkBtns = () => {
        targetButtonRight.disabled = position <= -(targetItemsLength - 1) * targetItemWidth;
        targetButtonLeft.disabled = position >= 0;
    };

    const checkSliderDots = () => {
        let activeTargetDot;
        const targetDots = targetDotsBlock.querySelectorAll('.slider__dot');

        targetDots.forEach((item) => {
            item.classList.remove('_blue');
        });

        if (position === 0) {
            activeTargetDot = 0;
        } else {
            activeTargetDot = Math.abs(position / movePosition);
        };

        targetDots[activeTargetDot].classList.add('_blue');
    };



    if (targetElement.classList.contains('slider__button-right')) {
        position -= movePosition;
        targetItems.dataset.translate = position;

        checkBtns();
        checkSliderDots();
        setPosition();
    }

    if (targetElement.classList.contains('slider__button-left')) {
        position += movePosition;
        targetItems.dataset.translate = position;

        checkBtns();
        checkSliderDots();
        setPosition();
    }

    checkBtns();
}

function getWidth() {
    const sliderItemsCount = document.querySelectorAll('.slider__item');
    sliderItemsCount.forEach((item) => {
        const sliderTrack = item.parentNode.parentNode.clientWidth;
        item.style.minWidth = `${sliderTrack}px`;
    });
}

function sliderReset(sliderItems, sliderButtonsLeft, sliderButtonsRight, sliderDots) {
    sliderButtonsLeft.forEach((item) => {
        item.disabled = true;
    });

    sliderButtonsRight.forEach((item) => {
        item.disabled = false;
    });

    sliderItems.forEach((item) => {
        item.style.transform = 'none';
        item.dataset.translate = 0;
    });

    sliderDots.forEach((item) => {
        item.querySelectorAll('.slider__dot').forEach((item) => {
            item.classList.remove('_blue');
        });

        item.querySelector('.slider__dot').classList.add('_blue');
    });
}

window.addEventListener('resize', () => {
    const sliderItems = document.querySelectorAll('.slider__items');
    const sliderButtonsLeft = document.querySelectorAll('.slider__button-left');
    const sliderButtonsRight = document.querySelectorAll('.slider__button-right');
    const sliderDots = document.querySelectorAll('.slider__dots');

    sliderReset(sliderItems, sliderButtonsLeft, sliderButtonsRight, sliderDots);

    getWidth();
});