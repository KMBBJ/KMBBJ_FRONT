import React, { useEffect, useState } from 'react';
// import Highcharts from 'highcharts/highstock';
import "../../assets/styles/Charts/ChartComponent.css";

const Chart = () => {
  const [options, setOptions] = useState(null);

  useEffect(() => {
    const fetchDynamicData = () => {
      const initialData = [
        [
            1317888000000,
            372.5101,
            375,
            372.2,
            372.52
        ],
        [
            1317888060000,
            372.4,
            373,
            372.01,
            372.16
        ],
        [
            1317888120000,
            372.16,
            372.4,
            371.39,
            371.62
        ],
        [
            1317888180000,
            371.62,
            372.16,
            371.55,
            371.75
        ],
        [
            1317888240000,
            371.75,
            372.4,
            371.57,
            372
        ],
        [
            1317888300000,
            372,
            372.3,
            371.8,
            372.24
        ],
        [
            1317888360000,
            372.22,
            372.45,
            372.22,
            372.3
        ],
        [
            1317888420000,
            372.3,
            373.25,
            372.3,
            373.15
        ],
        [
            1317888480000,
            373.01,
            373.5,
            373,
            373.24
        ],
        [
            1317888540000,
            373.36,
            373.88,
            373.19,
            373.88
        ],
        [
            1317888600000,
            373.8,
            374.34,
            373.75,
            374.29
        ],
        [
            1317888660000,
            374.29,
            374.43,
            374,
            374.01
        ],
        [
            1317888720000,
            374.05,
            374.35,
            373.76,
            374.35
        ],
        [
            1317888780000,
            374.41,
            375.24,
            374.37,
            374.9
        ],
        [
            1317888840000,
            374.83,
            375.73,
            374.81,
            374.96
        ],
        [
            1317888900000,
            374.81,
            375.4,
            374.81,
            375.25
        ],
        [
            1317888960000,
            375.2,
            375.7,
            375.14,
            375.19
        ],
        [
            1317889020000,
            375.43,
            375.43,
            374.75,
            374.76
        ],
        [
            1317889080000,
            374.94,
            375.5,
            374.81,
            375.13
        ],
        [
            1317889140000,
            375.12,
            375.48,
            375,
            375.04
        ],
        [
            1317889200000,
            375.24,
            375.24,
            375,
            375.08
        ],
        [
            1317889260000,
            375.16,
            375.16,
            374.51,
            374.51
        ],
        [
            1317889320000,
            374.51,
            374.75,
            374.2,
            374.27
        ],
        [
            1317889380000,
            374.22,
            374.55,
            373.83,
            374.55
        ],
        [
            1317889440000,
            374.69,
            374.86,
            374.01,
            374.2
        ],
        [
            1317889500000,
            374.32,
            374.65,
            374.31,
            374.51
        ],
        [
            1317889560000,
            374.65,
            375.12,
            374.51,
            375.12
        ],
        [
            1317889620000,
            375.13,
            375.25,
            374.83,
            375.22
        ],
        [
            1317889680000,
            375.16,
            375.22,
            375,
            375
        ],
        [
            1317889740000,
            375,
            375,
            374.66,
            374.8
        ],
        [
            1317889800000,
            374.88,
            375,
            374.5,
            374.85
        ],
        [
            1317889860000,
            374.41,
            374.67,
            374.25,
            374.67
        ],
        [
            1317889920000,
            374.5,
            374.75,
            374.27,
            374.42
        ],
        [
            1317889980000,
            374.4,
            374.93,
            374.38,
            374.85
        ],
        [
            1317890040000,
            374.86,
            375.3,
            374.8,
            375.09
        ],
        [
            1317890100000,
            375,
            375.18,
            374.9,
            375.02
        ],
        [
            1317890160000,
            375.02,
            375.08,
            374.86,
            374.87
        ],
        [
            1317890220000,
            374.93,
            375.75,
            374.93,
            375.75
        ],
        [
            1317890280000,
            375.75,
            376.5,
            375.75,
            376.31
        ],
        [
            1317890340000,
            376.31,
            377.2,
            376.19,
            377.04
        ],
        [
            1317890400000,
            377.2,
            377.33,
            376.45,
            376.47
        ],
        [
            1317890460000,
            376.75,
            376.99,
            376.53,
            376.54
        ],
        [
            1317890520000,
            376.54,
            376.67,
            376.08,
            376.35
        ],
        [
            1317890580000,
            376.41,
            376.94,
            376.2,
            376.5
        ],
        [
            1317890640000,
            376.46,
            376.51,
            376.06,
            376.09
        ],
        [
            1317890700000,
            376.38,
            376.84,
            376.09,
            376.78
        ],
        [
            1317890760000,
            376.55,
            376.6,
            376.41,
            376.44
        ],
        [
            1317890820000,
            376.45,
            376.87,
            376.31,
            376.87
        ],
        [
            1317890880000,
            376.83,
            377,
            376.63,
            376.95
        ],
        [
            1317890940000,
            376.95,
            377,
            376.1,
            376.1
        ],
        [
            1317891000000,
            376.1,
            376.17,
            375.64,
            375.65
        ],
        [
            1317891060000,
            375.68,
            376.05,
            375.32,
            376.05
        ],
        [
            1317891120000,
            376.03,
            376.04,
            375.5,
            375.72
        ],
        [
            1317891180000,
            375.83,
            376.195,
            375.7,
            376
        ],
        [
            1317891240000,
            376.01,
            376.6,
            376,
            376.5
        ],
        [
            1317891300000,
            376.5,
            376.53,
            376.11,
            376.21
        ],
        [
            1317891360000,
            376.17,
            376.3,
            376.1,
            376.25
        ],
        [
            1317891420000,
            376.4,
            376.4,
            376.13,
            376.29
        ],
        [
            1317891480000,
            376.15,
            376.39,
            376.1,
            376.39
        ],
        [
            1317891540000,
            376.4,
            377.11,
            376.4,
            377
        ],
        [
            1317891600000,
            377.01,
            377.15,
            376.79,
            377.15
        ],
        [
            1317891660000,
            377.02,
            377.15,
            376.55,
            376.88
        ],
        [
            1317891720000,
            376.67,
            376.76,
            376.52,
            376.53
        ],
        [
            1317891780000,
            376.78,
            376.91,
            376.53,
            376.82
        ],
        [
            1317891840000,
            376.73,
            376.86,
            376.7,
            376.75
        ],
        [
            1317891900000,
            376.7,
            376.71,
            376.5,
            376.57
        ],
        [
            1317891960000,
            376.53,
            376.74,
            376.2,
            376.2
        ],
        [
            1317892020000,
            376.17,
            376.17,
            375.91,
            376
        ],
        [
            1317892080000,
            376,
            376,
            375.77,
            375.77
        ],
        [
            1317892140000,
            375.78,
            375.88,
            375.51,
            375.57
        ],
        [
            1317892200000,
            375.57,
            375.79,
            375.34,
            375.63
        ],
        [
            1317892260000,
            375.63,
            375.78,
            375.35,
            375.41
        ],
        [
            1317892320000,
            375.38,
            375.61,
            375.35,
            375.58
        ],
        [
            1317892380000,
            375.55,
            375.57,
            375.34,
            375.48
        ],
        [
            1317892440000,
            375.43,
            375.57,
            375.12,
            375.13
        ],
        [
            1317892500000,
            375.15,
            375.3,
            374.86,
            375
        ],
        [
            1317892560000,
            374.9,
            375.31,
            374.72,
            375.14
        ],
        [
            1317892620000,
            375,
            375.2,
            374.9,
            375.06
        ],
        [
            1317892680000,
            375.18,
            375.6,
            375.12,
            375.6
        ],
        [
            1317892740000,
            375.6,
            375.87,
            375.5,
            375.5
        ],
        [
            1317892800000,
            375.49,
            375.49,
            375.04,
            375.25
        ],
        [
            1317892860000,
            375.25,
            375.46,
            375,
            375.24
        ],
        [
            1317892920000,
            375.38,
            375.45,
            375,
            375.1
        ],
        [
            1317892980000,
            375.09,
            375.24,
            374.83,
            374.97
        ],
        [
            1317893040000,
            375.01,
            375.01,
            374.8,
            374.87
        ],
        [
            1317893100000,
            374.98,
            375.12,
            374.98,
            375
        ],
        [
            1317893160000,
            374.9,
            374.95,
            374.75,
            374.87
        ],
        [
            1317893220000,
            374.89,
            375.44,
            374.87,
            375.12
        ],
        [
            1317893280000,
            375.06,
            375.12,
            373.56,
            374.05
        ],
        [
            1317893340000,
            374.1,
            374.3,
            373.16,
            373.21
        ],
        [
            1317893400000,
            373.39,
            375,
            372.58,
            374.8
        ],
        [
            1317893460000,
            374.899,
            375.23,
            374.33,
            374.75
        ],
        [
            1317893520000,
            374.79,
            376.71,
            374.69,
            376.31
        ],
        [
            1317893580000,
            376.32,
            376.37,
            375.27,
            375.331
        ],
        [
            1317893640000,
            375.3301,
            377.44,
            375.33,
            377.43
        ],
        [
            1317893700000,
            377.43,
            378.14,
            376.83,
            377.08
        ],
        [
            1317893760000,
            377.18,
            378,
            376.5,
            376.7
        ],
        [
            1317893820000,
            376.83,
            377,
            375.51,
            375.79
        ],
        [
            1317893880000,
            375.6501,
            376.74,
            375.23,
            376.39
        ],
        [
            1317893940000,
            376.38,
            378.75,
            376.25,
            378.5
        ],
        [
            1317894000000,
            378.54,
            378.63,
            376.75,
            376.87
        ],
        [
            1317894060000,
            376.8664,
            377.62,
            376.64,
            376.908
        ],
        [
            1317894120000,
            376.8336,
            377.88,
            376.8289,
            377.55
        ],
        [
            1317894180000,
            377.36,
            377.9,
            376.52,
            376.75
        ],
        [
            1317894240000,
            376.83,
            377.73,
            376.71,
            376.98
        ],
        [
            1317894300000,
            377,
            377.69,
            376.87,
            377.1212
        ],
        [
            1317894360000,
            377.225,
            377.33,
            376.01,
            376.26
        ],
        [
            1317894420000,
            376.42,
            376.64,
            375.55,
            375.5534
        ],
        [
            1317894480000,
            375.74,
            375.94,
            374.77,
            375.3
        ],
        [
            1317894540000,
            375.3313,
            376,
            374.92,
            375.06
        ],
        [
            1317894600000,
            375.11,
            375.46,
            374.82,
            374.92
        ],
        [
            1317894660000,
            374.82,
            375.68,
            374.64,
            375.668
        ],
        [
            1317894720000,
            375.62,
            376.13,
            375.46,
            376.13
        ],
        [
            1317894780000,
            376.14,
            376.6,
            375.89,
            376.34
        ],
        [
            1317894840000,
            376.39,
            376.39,
            375.55,
            375.99
        ],
        [
            1317894900000,
            376,
            376.28,
            375.42,
            376.21
        ],
        [
            1317894960000,
            376,
            377.38,
            375.7,
            376.591
        ],
        [
            1317895020000,
            376.59,
            377.46,
            376.57,
            376.9348
        ],
        [
            1317895080000,
            376.9481,
            377.749,
            376.84,
            377.563
        ],
        [
            1317895140000,
            377.452,
            377.65,
            376.43,
            376.78
        ],
        [
            1317895200000,
            376.94,
            377.01,
            375.75,
            375.98
        ],
        [
            1317895260000,
            376.27,
            377.29,
            375.95,
            376.98
        ],
        [
            1317895320000,
            376.9962,
            377.3,
            376.69,
            376.71
        ],
        [
            1317895380000,
            376.75,
            377.5,
            376.75,
            377.41
        ],
        [
            1317895440000,
            377.26,
            377.49,
            376.89,
            377.368
        ],
        [
            1317895500000,
            377.345,
            378,
            377.17,
            378
        ],
        [
            1317895560000,
            377.97,
            378.3199,
            377.68,
            377.97
        ],
        [
            1317895620000,
            378.01,
            378.07,
            377.25,
            377.37
        ],
        [
            1317895680000,
            377.37,
            377.75,
            377.05,
            377.12
        ],
        [
            1317895740000,
            377.16,
            377.79,
            377.01,
            377.4512
        ]
    ];

    const calculateMovingAverage = (data, period) => {
        return data.map((item, index, array) => {
          if (index < period - 1) {
            return null; // period보다 작은 경우 null 반환
          }
          const sum = array.slice(index - period + 1, index + 1).reduce((acc, val) => acc + val[4], 0);
          return sum / period;
        });
      };

      const calculateBollingerBands = (data, period) => {
        const movingAverages = calculateMovingAverage(data, period);
        const bbu = [];
        const bbd = [];
    
        movingAverages.forEach((ma, index) => {
          if (index < period - 1) {
            bbu.push(null);
            bbd.push(null);
            return;
          }
    
          const slice = data.slice(index - period + 1, index + 1);
          const mean = ma;
          const stdDev = Math.sqrt(slice.reduce((acc, val) => acc + Math.pow(val[4] - mean, 2), 0) / period);
          bbu.push(mean + 2 * stdDev);
          bbd.push(mean - 2 * stdDev);
        });
    
        return { bbu, bbd };
      };

      const updateIndicators = (data) => {
        const ma5 = calculateMovingAverage(data, 5);
        const ma20 = calculateMovingAverage(data, 20);
        const ma60 = calculateMovingAverage(data, 60);
        const { bbu, bbd } = calculateBollingerBands(data, 20);

        return { ma5, ma20, ma60, bbu, bbd };
      };

      const initialIndicators = updateIndicators(initialData);

      const enrichedData = initialData.map((item, index) => ({
        timestamp: item[0],
        open: item[1],
        high: item[2],
        low: item[3],
        close: item[4],
        ma5: initialIndicators.ma5[index],
        ma20: initialIndicators.ma20[index],
        ma60: initialIndicators.ma60[index],
        bbu: initialIndicators.bbu[index],
        bbd: initialIndicators.bbd[index]
      }));

      const options = {
        title: {
          text: 'Dynamic data in Highcharts Stock'
        },
        xAxis: {
          type: 'datetime',
          minRange: 60 * 1000, // 최소 범위를 1분으로 설정
          tickInterval: 10 * 60 * 1000, // 10분 간격으로 세로선 표시
          gridLineWidth: 1, // 세로선 두께 설정
          overscroll: 500000,
          range: 4 * 200000,
        },
        rangeSelector: {
          buttons: [{
            type: 'minute',
            count: 15,
            text: '15m'
          }, {
            type: 'hour',
            count: 1,
            text: '1h'
          }, {
            type: 'all',
            count: 1,
            text: 'All'
          }],
          selected: 1,
          inputEnabled: false
        },
        navigator: {
          series: {
            color: '#000000'
          }
        },
        series: [{
          type: 'candlestick',
          name: 'Price',
          color: '#FF9999',  // 음봉 색상 (연한 빨강)
          upColor: '#9999FF', // 양봉 색상 (연한 파랑)
          lineColor: '#FF0000', // 음봉 외곽선 색상 (빨강)
          upLineColor: '#0000FF', // 양봉 외곽선 색상 (파랑)
          lineWidth: 2, // 외곽선 두께 설정
          upLineWidth: 2, // 양봉 외곽선 두께 설정
          data: initialData.map(item => [item[0], item[1], item[2], item[3], item[4]])
        },{
            type: 'line',
            name: 'MA5',
            data: enrichedData.map(item => [item.timestamp, item.ma5]).filter(item => item[1] !== null),
            color: 'blue',
            lineWidth: 1.5,
          }, {
            type: 'line',
            name: 'MA20',
            data: enrichedData.map(item => [item.timestamp, item.ma20]).filter(item => item[1] !== null),
            color: 'green',
            lineWidth: 1.5,
          }, {
            type: 'line',
            name: 'MA60',
            data: enrichedData.map(item => [item.timestamp, item.ma60]).filter(item => item[1] !== null),
            color: 'red',
            lineWidth: 1.5,
          }, {
            type: 'line',
            name: 'BBU',
            data: enrichedData.map(item => [item.timestamp, item.bbu]).filter(item => item[1] !== null),
            color: 'orange',
            dashStyle: 'ShortDash',
            lineWidth: 1.5,
          }, {
            type: 'line',
            name: 'BBD',
            data: enrichedData.map(item => [item.timestamp, item.bbd]).filter(item => item[1] !== null),
            color: 'orange',
            dashStyle: 'ShortDash',
            lineWidth: 1.5,
          }],
        chart: {
          events: {
            load() {
              const chart = this;
              const series = chart.series[0];
              let i = 0;

              const getNewPoint = (i, data) => {
                const lastPoint = data[data.length - 1];

                if (i === 0 || i % 10 === 0) {
                  return [
                    lastPoint[0] + 60000,
                    lastPoint[4],
                    lastPoint[4],
                    lastPoint[4],
                    lastPoint[4]
                  ];
                }

                const updatedLastPoint = data[data.length - 1];
                const newClose = Highcharts.correctFloat(
                  lastPoint[4] + Highcharts.correctFloat(Math.random() - 0.5, 2),
                  4
                );

                return [
                  updatedLastPoint[0],
                  data[data.length - 2][4],
                  newClose >= updatedLastPoint[2] ? newClose : updatedLastPoint[2],
                  newClose <= updatedLastPoint[3] ? newClose : updatedLastPoint[3],
                  newClose
                ];
              };

              const updateChart = () => {
                const data = series.options.data;
                const newPoint = getNewPoint(i, data);
                const lastPoint = data[data.length - 1];

                if (lastPoint[0] !== newPoint[0]) {
                  series.addPoint(newPoint);
                } else {
                  series.options.data[data.length - 1] = newPoint;
                  series.setData(data);
                }

                const updatedIndicators = updateIndicators(data);

                chart.series[1].setData(data.map((item, idx) => [item[0], updatedIndicators.ma5[idx]]).filter(item => item[1] !== null));
                chart.series[2].setData(data.map((item, idx) => [item[0], updatedIndicators.ma20[idx]]).filter(item => item[1] !== null));
                chart.series[3].setData(data.map((item, idx) => [item[0], updatedIndicators.ma60[idx]]).filter(item => item[1] !== null));
                chart.series[4].setData(data.map((item, idx) => [item[0], updatedIndicators.bbu[idx]]).filter(item => item[1] !== null));
                chart.series[5].setData(data.map((item, idx) => [item[0], updatedIndicators.bbd[idx]]).filter(item => item[1] !== null));

                i++;
              };


              setInterval(updateChart, 1000);
            }
          }
        }
      };

      setOptions(options);
    };

    fetchDynamicData();
  }, []);

  useEffect(() => {
    if (options) {
      Highcharts.stockChart('container', options);
    }
  }, [options]);

  return (
    <div id="container"></div>
  );
};

export default Chart;