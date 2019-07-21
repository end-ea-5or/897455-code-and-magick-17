'use strict';

(function () {
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALLS_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setup.querySelector('.setup-close');
  var setupInput = setup.querySelector('.setup-user-name');
  var setupWizard = setup.querySelector('.setup-wizard');
  var wizardFireball = setup.querySelector('.setup-fireball-wrap');
  var inputFocusVariable = false;
  document.querySelector('.setup-similar').classList.remove('hidden');
  var form = setup.querySelector('.setup-wizard-form');

  var simularListElement = setup.querySelector('.setup-similar-list');
  var simularWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

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

  // создание персонажа на основе шаблона с использованием данных массива wizards
  var renderWizard = function (wizard) {
    var wizardElement = simularWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;
    return wizardElement;
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

  // изменение цвета атрибутов персонажа по клику
  setupWizard.querySelector('.wizard-coat').addEventListener('click', function () {
    var colorCoat = COAT_COLORS[window.util.getRandomInt(COAT_COLORS.length)];
    setupWizard.querySelector('.wizard-coat').style.fill = colorCoat;
    setup.querySelector('[name="coat-color"]').value = colorCoat;
  });
  setupWizard.querySelector('.wizard-eyes').addEventListener('click', function () {
    var colorEyes = EYES_COLORS[window.util.getRandomInt(EYES_COLORS.length)];
    setupWizard.querySelector('.wizard-eyes').style.fill = colorEyes;
    setup.querySelector('[name="eyes-color"]').value = colorEyes;
  });
  wizardFireball.addEventListener('click', function () {
    var colorFireball = FIREBALLS_COLORS[window.util.getRandomInt(FIREBALLS_COLORS.length)];
    wizardFireball.style.backgroundColor = colorFireball;
    wizardFireball.querySelector('[name="fireball-color"]').value = colorFireball;
  });

  // обработчик успешной загрузки
  var successHandler = function (wizards) {
    var fragment = document.createDocumentFragment();
    for (var k = 0; k < 4; k++) {
      fragment.appendChild(renderWizard(wizards[k]));
    }
    simularListElement.appendChild(fragment);
  };

  // обработчик ошибки
  var errorHandler = function (errMessage) {
    var node = document.createElement('div');
    node.style = 'position: absolute; z-index: 110; color: white; font-size: 30px; text-align: center;';
    node.style.backgroundColor = 'red';
    node.style.width = '100%';
    node.style.boxShadow = '-1px -1px 14px -3px black';
    node.textContent = errMessage;
    form.insertBefore(node, form.querySelector('.setup-footer'));
  };

  // отправка формы на сервер
  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(form), function () {
      setup.classList.add('hidden');
    }, errorHandler);
  });

  // получение данных с сервера
  window.backend.load(successHandler, errorHandler);
})();
