'use strict';

(function () {
  var CLOUD_WIDTH = 420;
  var CLOUD_HEIGHT = 270;
  var CLOUD_X = 100;
  var CLOUD_Y = 10;
  var GAP = 10; // отступ
  var TEXT_GAP = 20; // отступ заглавного текста
  var LINE_GAP = 20; // отступ между строк
  var GIST_HEIGHT = 150; // высота гистограммы
  var BAR_WIDTH = 40; // ширина колонки
  var BAR_GAP = 50; // расстояние между колонками

  // отрисовка облака
  var renderCloud = function (ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
  };

  // вывод статистики
  window.renderStatistics = function (ctx, names, times) {
    renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
    renderCloud(ctx, CLOUD_X, CLOUD_Y, '#ffffff');

    ctx.fillStyle = '#000000';
    ctx.font = '16 PT Mono';
    ctx.fillText('Ура вы победили!', CLOUD_X + TEXT_GAP, CLOUD_Y + TEXT_GAP * 1.5);
    ctx.fillText('Список результатов:', CLOUD_X + TEXT_GAP, CLOUD_Y + TEXT_GAP * 1.5 + LINE_GAP);
    ctx.textBaseline = 'hanging';

    var maxTime = window.util.getMaxElement(times);

    for (var i = 0; i < names.length; i++) {
      var colorBar = 'rgba(255, 0, 0, 1)';
      if (names[i] !== 'Вы') {
        colorBar = window.util.getColorHslRandomSat(240, 50);
      }
      var barHeight = (times[i] * (GIST_HEIGHT - LINE_GAP)) / maxTime;
      ctx.fillStyle = colorBar;
      ctx.fillRect(CLOUD_X + BAR_GAP + i * (BAR_GAP + BAR_WIDTH), CLOUD_Y + CLOUD_HEIGHT - TEXT_GAP - LINE_GAP - barHeight, BAR_WIDTH, barHeight);
      ctx.fillStyle = '#000000';
      ctx.fillText(names[i], CLOUD_X + BAR_GAP + i * (BAR_GAP + BAR_WIDTH), CLOUD_Y + CLOUD_HEIGHT - TEXT_GAP * 1.5);
      ctx.fillText(Math.round(times[i]), CLOUD_X + BAR_GAP + i * (BAR_GAP + BAR_WIDTH), CLOUD_Y + CLOUD_HEIGHT - TEXT_GAP * 3 - barHeight);
    }
  };
})();
