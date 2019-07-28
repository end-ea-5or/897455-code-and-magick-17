'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setup.querySelector('.setup-close');
  var setupInput = setup.querySelector('.setup-user-name');
  var inputFocusVariable = false;
  document.querySelector('.setup-similar').classList.remove('hidden');

  // открытие окна
  var openPopup = function () {
    setup.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };

  // закрытие окна
  var closePopup = function () {
    setup.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
    document.removeEventListener('keydown', onPopupEnterPressClose);
  };

  // закрытие окна при нажатии на ESC
  var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE && !inputFocusVariable) {
      closePopup();
    }
  };

  // открытие окна при нажатии на ENTER
  var onPopupEnterPress = function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      openPopup();
    }
  };

  // закрытие окна при нажатии на ENTER
  var onPopupEnterPressClose = function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      closePopup();
    }
  };

  setupOpen.addEventListener('click', openPopup);
  setupClose.addEventListener('click', closePopup);
  setupClose.addEventListener('keydown', onPopupEnterPressClose);
  setupOpen.addEventListener('keydown', onPopupEnterPress);
  setupInput.addEventListener('focus', function () {
    inputFocusVariable = true;
  });
  setupInput.addEventListener('blur', function () {
    inputFocusVariable = false;
  });
})();
