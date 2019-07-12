'use strict';

(function () {
  var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALLS_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var wizards = [];
  var setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setup.querySelector('.setup-close');
  var setupInput = setup.querySelector('.setup-user-name');
  var setupWizard = setup.querySelector('.setup-wizard');
  var wizardFireball = setup.querySelector('.setup-fireball-wrap');
  var inputFocusVariable = false;
  document.querySelector('.setup-similar').classList.remove('hidden');

  var simularListElement = setup.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

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

  // cоздание элемента на основе JS объекта
  for (var i = 0; i < 4; i++) {
    wizards[i] = {
      name: NAMES[window.util.getRandomInt(NAMES.length)] + ' ' + SURNAMES[window.util.getRandomInt(SURNAMES.length)],
      coatColor: COAT_COLORS[window.util.getRandomInt(COAT_COLORS.length)],
      eyesColor: EYES_COLORS[window.util.getRandomInt(EYES_COLORS.length)]
    };
  }

  // создание персонажа на основе шаблона с использованием данных массива wizards
  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
    return wizardElement;
  };

  var fragment = document.createDocumentFragment();

  for (var k = 0; k < wizards.length; k++) {
    fragment.appendChild(renderWizard(wizards[k]));
  }

  simularListElement.appendChild(fragment);

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
})();
