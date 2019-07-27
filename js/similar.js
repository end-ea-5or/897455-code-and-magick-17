'use strict';

(function () {

  var setup = document.querySelector('.setup');
  var form = setup.querySelector('.setup-wizard-form');
  var wizards = [];
  var coatColor;
  var eyesColor;


  var getRank = function (wizard) {
    var rank = 0;
    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }
    return rank;
  };

  // функция для фильтрации данных
  var updateWizards = function () {
    window.render(wizards.sort(function (a, b) {
      if (getRank(b) === getRank(a)) {
        return b.name - a.name;
      } else {
        return getRank(b) - getRank(a);
      }
    }));
  };

  window.wizard.onEyesChange = function (color) {
    eyesColor = color;
    window.debounce(updateWizards);
  };

  window.wizard.onCoatChange = function (color) {
    coatColor = color;
    window.debounce(updateWizards);
  };

  // обработчик успешной загрузки
  var successHandler = function (data) {
    wizards = data;
    updateWizards();
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

  // получение данных с сервера
  window.backend.load(successHandler, errorHandler);

  // отправка формы на сервер
  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(form), function () {
      setup.classList.add('hidden');
    }, errorHandler);
  });
})();
