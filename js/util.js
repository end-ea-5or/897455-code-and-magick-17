'use strict';

(function () {
  window.util = {
    // возвращает рандомное целое число от 0 до max (не включительно)
    getRandomInt: function (max) {
      return Math.floor(Math.random() * max);
    },
    // поиск максимального элемента массива
    getMaxElement: function (arr) {
      var maxElement = arr[0];
      for (var i = 0; i < arr.length; i++) {
        if (maxElement < arr[i]) {
          maxElement = arr[i];
        }
      }
      return maxElement;
    },
    // возвращает цвет в формате hsl с рандомной насыщенностью
    getColorHslRandomSat: function (hue, lightness) {
      return 'hsl(' + hue + ', ' + Math.round(Math.random() * 100) + '%' + ', ' + lightness + '%)';
    }
  };
})();
