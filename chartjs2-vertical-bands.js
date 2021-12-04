/**
 * Vertical bands for ChartJS 2
 * highlights line chart background when attr in dataset set to true
 * (for first dataset only)
 *
 * Settings (chart.config.options.plugins.verticalbands):
 * - backgroundColor
 * - attr - boolean
 */

 const plugin = {
    id: 'verticalband',
    beforeDraw: function (chart) {

    if (chart.data.datasets.length > 0) {
        var ctx = chart.chart.ctx;
        var chartArea = chart.chartArea;

        var meta = chart.getDatasetMeta(0);
        var data = chart.data.datasets[0].data;

        var attr = chart.config.options.plugins.verticalbands.attr;

        var bands = [];
        var band = [];
        var previous = false;
        var i, count;

        for (i = 0, count = data.length; i < count; i++) {
            if (data[i][attr] && !previous) {
                    band.push(meta.data[i]._model.x);
                    previous = true;
            }   else if (!data[i][attr] && previous) {
                    band.push(meta.data[i]._model.x);
                    previous = false;
                    bands.push(band);
                    band = [];
            }

            if (i == count - 1 && band.length == 1) {
                    band.push(meta.data[i]._model.x);
                    bands.push(band);
            }
        };

        if (bands.length > 0) {
            ctx.save();
            ctx.fillStyle = chart.config.options.plugins.verticalbands.backgroundColor;
            bands.forEach((x) => {ctx.fillRect(x[0], chartArea.top, x[1] - x[0], chartArea.bottom - chartArea.top)});
            ctx.restore();
        }
    }
    }
  }

Chart.plugins.register(plugin);