'use strict';

(function () {
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALLS_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var setup = document.querySelector('.setup');
  var setupWizard = setup.querySelector('.setup-wizard');
  var wizardFireball = setup.querySelector('.setup-fireball-wrap');

  var wizard = {
    onEyesChange: function (_color) {},
    onCoatChange: function (_color) {},
  };

  // изменение цвета атрибутов персонажа по клику
  setupWizard.querySelector('.wizard-coat').addEventListener('click', function () {
    var colorCoat = COAT_COLORS[window.util.getRandomInt(COAT_COLORS.length)];
    setupWizard.querySelector('.wizard-coat').style.fill = colorCoat;
    setup.querySelector('[name="coat-color"]').value = colorCoat;
    wizard.onCoatChange(colorCoat);
  });
  setupWizard.querySelector('.wizard-eyes').addEventListener('click', function () {
    var colorEyes = EYES_COLORS[window.util.getRandomInt(EYES_COLORS.length)];
    setupWizard.querySelector('.wizard-eyes').style.fill = colorEyes;
    setup.querySelector('[name="eyes-color"]').value = colorEyes;
    wizard.onEyesChange(colorEyes);
  });
  wizardFireball.addEventListener('click', function () {
    var colorFireball = FIREBALLS_COLORS[window.util.getRandomInt(FIREBALLS_COLORS.length)];
    wizardFireball.style.backgroundColor = colorFireball;
    wizardFireball.querySelector('[name="fireball-color"]').value = colorFireball;
  });
  window.wizard = wizard;
})();
