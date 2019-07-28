'use strict';

(function () {
  var simularWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var simularListElement = document.querySelector('.setup-similar-list');

  // создание персонажа на основе шаблона с использованием данных массива wizards
  var renderWizard = function (wizard) {
    var wizardElement = simularWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;
    return wizardElement;
  };

  window.render = function (data) {
    // обнуляет список персонажей перед новым рендерингом
    simularListElement.innerHTML = '';
    var number = data.length > 4 ? 4 : data.length;
    var fragment = document.createDocumentFragment();
    for (var k = 0; k < number; k++) {
      fragment.appendChild(renderWizard(data[k]));
    }
    simularListElement.appendChild(fragment);
  };
})();
