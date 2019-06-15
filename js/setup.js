'use strict';

var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var wizards = [];
var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');
document.querySelector('.setup-similar').classList.remove('hidden');

var simularListElement = userDialog.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

// возвращает рандомное целое число от 0 до max (не включительно)
var getRandomInt = function (max) {
  return Math.floor(Math.random() * max);
};

// cоздание элемента на основе JS объекта
for (var i = 0; i < 4; i++) {
  wizards[i] = {
    name: NAMES[getRandomInt(NAMES.length)] + ' ' + SURNAMES[getRandomInt(SURNAMES.length)],
    coatColor: COAT_COLORS[getRandomInt(COAT_COLORS.length)],
    eyesColor: EYES_COLORS[getRandomInt(EYES_COLORS.length)]
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
