import SmartView from './smart.js';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {FORM_TYPES} from '../const';
import {countAmountByType, countDurationByTime, countMoneyByType} from '../utils/statistics';
import dayjs from 'dayjs';

const renderMoneyByChart = (moneyCtx, points) => new Chart(moneyCtx, {
  plugins: [ChartDataLabels],
  type: 'horizontalBar',
  data: {
    labels: FORM_TYPES.map((item) => item.toUpperCase()),
    datasets: [{
      data: FORM_TYPES.map((item) => countMoneyByType(points, item)),
      backgroundColor: '#ffffff',
      hoverBackgroundColor: '#ffffff',
      anchor: 'start',
    }],
  },
  options: {
    plugins: {
      datalabels: {
        font: {
          size: 13,
        },
        color: '#000000',
        anchor: 'end',
        align: 'start',
        formatter: (pointCost) =>`€ ${pointCost}`,
      },
    },
    title: {
      display: true,
      text: 'MONEY',
      fontColor: '#000000',
      fontSize: 23,
      position: 'left',
    },
    scales: {
      yAxes: [{
        ticks: {
          fontColor: '#000000',
          padding: 5,
          fontSize: 13,
        },
        gridLines: {
          display: false,
          drawBorder: false,
        },
        barThickness: 44,
      }],
      xAxes: [{
        ticks: {
          display: false,
          beginAtZero: true,
        },
        gridLines: {
          display: false,
          drawBorder: false,
        },
        minBarLength: 50,
      }],
    },
    legend: {
      display: false,
    },
    tooltips: {
      enabled: false,
    },
  },
});


const renderTypeByChart = (typeCtx, points) => new Chart(typeCtx, {
  plugins: [ChartDataLabels],
  type: 'horizontalBar',
  data: {
    labels: FORM_TYPES.map((item) => item.toUpperCase()),
    datasets: [{
      data: FORM_TYPES.map((item) => countAmountByType(points, item)),
      backgroundColor: '#ffffff',
      hoverBackgroundColor: '#ffffff',
      anchor: 'start',
    }],
  },
  options: {
    plugins: {
      datalabels: {
        font: {
          size: 13,
        },
        color: '#000000',
        anchor: 'end',
        align: 'start',
        formatter: (val) => `${val}k`,
      },
    },
    title: {
      display: true,
      text: 'TYPE',
      fontColor: '#000000',
      fontSize: 23,
      position: 'left',
    },
    scales: {
      yAxes: [{
        ticks: {
          fontColor: '#000000',
          padding: 5,
          fontSize: 13,
        },
        gridLines: {
          display: false,
          drawBorder: false,
        },
        barThickness: 44,
      }],
      xAxes: [{
        ticks: {
          display: false,
          beginAtZero: true,
        },
        gridLines: {
          display: false,
          drawBorder: false,
        },
        minBarLength: 50,
      }],
    },
    legend: {
      display: false,
    },
    tooltips: {
      enabled: false,
    },
  },
});


const renderDurationByChart = (typeCtx, points) => new Chart(typeCtx, {
  plugins: [ChartDataLabels],
  type: 'horizontalBar',
  data: {
    labels: FORM_TYPES.map((item) => item.toUpperCase()),
    datasets: [{
      data: FORM_TYPES.map((item) => countDurationByTime(points, item)),
      backgroundColor: '#ffffff',
      hoverBackgroundColor: '#ffffff',
      anchor: 'start',
    }],
  },
  options: {
    plugins: {
      datalabels: {
        font: {
          size: 13,
        },
        color: '#000000',
        anchor: 'end',
        align: 'start',
        formatter: function (val) {
          if (dayjs.duration(val).days() > 0) {
            return `${dayjs.duration(val).days().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})}D ${dayjs.duration(val).hours().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})}H ${dayjs.duration(val).minutes().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})}M`;
          } else if (dayjs.duration(val).days() === 0 && dayjs.duration(val).hours() > 0) {
            return  `${dayjs.duration(val).hours().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})}H ${dayjs.duration(val).minutes().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})}M`;
          } else {
            return `${dayjs.duration(val).minutes().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})}M`;
          }
        },
      },
    },
    title: {
      display: true,
      text: 'TYPE',
      fontColor: '#000000',
      fontSize: 23,
      position: 'left',
    },
    scales: {
      yAxes: [{
        ticks: {
          fontColor: '#000000',
          padding: 5,
          fontSize: 13,
        },
        gridLines: {
          display: false,
          drawBorder: false,
        },
        barThickness: 44,
      }],
      xAxes: [{
        ticks: {
          display: false,
          beginAtZero: true,
        },
        gridLines: {
          display: false,
          drawBorder: false,
        },
        minBarLength: 50,
      }],
    },
    legend: {
      display: false,
    },
    tooltips: {
      enabled: false,
    },
  },
});


const createStatisticsTemplate = () =>
  `<section class="statistics">
          <h2 class="visually-hidden">Trip statistics</h2>

          <div class="statistics__item">
            <canvas class="statistics__chart" id="money" width="900"></canvas>
          </div>

          <div class="statistics__item">
            <canvas class="statistics__chart" id="type" width="900"></canvas>
          </div>

          <div class="statistics__item">
            <canvas class="statistics__chart" id="time-spend" width="900"></canvas>
          </div>
        </section>`;


export default class Statistics extends SmartView {
  constructor(points) {
    super();
    this._data = points;

    this._moneyChart = null;
    this._typeChart = null;
    this._timeChart = null;

    this._setCharts();
  }

  removeElement() {
    super.removeElement();
  }

  getTemplate() {
    return createStatisticsTemplate(this._data);
  }

  restoreHandlers() {
    this._setCharts();
  }

  _setCharts() {
    if (this._moneyChart !== null) {
      this._moneyChart = null;
    }

    if (this._typeChart !== null) {
      this._typeChart = null;
    }

    if (this._timeChart !== null) {
      this._timeChart = null;
    }

    const BAR_HEIGHT = 55;
    const moneyCtx = this.getElement().querySelector('#money');
    moneyCtx.height = BAR_HEIGHT * 5;

    const typeCtx = this.getElement().querySelector('#type');
    typeCtx.height = BAR_HEIGHT * 5;

    const durationCtx = this.getElement().querySelector('#time-spend');
    durationCtx.height = BAR_HEIGHT * 5;

    this._moneyChart = renderMoneyByChart(moneyCtx, this._data);
    this._typeChart = renderTypeByChart(typeCtx, this._data);
    this._timeChart = renderDurationByChart(durationCtx, this._data);

  }
}
