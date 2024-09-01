import React, { useEffect } from 'react';
import Highcharts from 'highcharts/highstock';
import { fetchKlineData } from '../../hooks/Coin/fetchKlineData';
import { getRecentKlineData } from '../../services/Charts/ChartService';
import "../../assets/styles/Charts/ChartComponent.css";

// MA 계산 함수
const calculateMovingAverage = (data, period) => {
  return data.map((item, index, array) => {
    if (index < period - 1) {
      return null; // period보다 작은 경우 null 반환
    }
    const sum = array.slice(index - period + 1, index + 1)
                      .reduce((acc, val) => acc + val.closePrice, 0);
    return sum / period;
  });
};

const updateIndicators = (data) => {
  const ma10 = calculateMovingAverage(data, 10);
  const ma20 = calculateMovingAverage(data, 20);
  const ma30 = calculateMovingAverage(data, 30);
  return { ma10, ma20, ma30 };
};

const Chart = ({ symbol }) => {
  useEffect(() => {
    // 차트의 기본 설정
  const options = {
    title: {
        text: `${symbol}`
    },
    accessibility: {
      enabled: false
    },
    xAxis: {
      type: 'datetime',
      minRange: 60 * 60 * 1000, // 최소 범위를 30분으로 설정
      tickInterval: 60 * 60 * 1000, // 1시간 간격으로 세로선 표시
      gridLineWidth: 2, // 세로선 두께 설정
      overscroll: 500000,
      range: 4 * 200000,
    }, yAxis: [{
            labels: {
                align: 'right',
                x: -3
            },
            title: {
                text: 'OHLC'
            },
            height: '60%',
            lineWidth: 2,
            resize: {
                enabled: true
            }
        }, {
            labels: {
                align: 'right',
                x: -3
            },
            title: {
                text: 'Volume'
            },
            top: '65%',
            height: '35%',
            offset: 0,
            lineWidth: 2
        }],

        tooltip: {
            split: true
        },
    rangeSelector: {
        buttons: [{
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
        lastPrice: {
            enabled: true,
            label: {
                enabled: true,
                backgroundColor: '#FF7F7F'
            }
        }}, {
          type: 'column',
          name: 'Volume',
          yAxis: 1,
      }, {
        type: 'line',
        name: 'MA10',
        color: 'blue',
        lineWidth: 1.5,
      }, {
        type: 'line',
        name: 'MA20',
        color: 'green',
        lineWidth: 1.5,
      }, {
        type: 'line',
        name: 'MA30',
        color: 'red',
        lineWidth: 1.5,
      }],
  };
      
 // 차트 초기화 및 실시간 데이터 업데이트를 설정하는 함수
async function initializeChart(symbol) {
  const { klineData5m } = await fetchKlineData(symbol);
  
  // API로부터 받아온 데이터를 차트 형식에 맞게 변환
  const formattedData = klineData5m.data.map(item => [
      item.timezone,
      item.openPrice,
      item.highPrice,
      item.lowPrice,
      item.closePrice
  ]);

  const volume = klineData5m.data.map(item => [
    item.timezone,
    item.volume
  ])

  const initialIndicators = updateIndicators(klineData5m.data);

  const enrichedData = klineData5m.data.map((item, index) => ({
    timestamp: item.timezone,
    ma10: initialIndicators.ma10[index],
    ma20: initialIndicators.ma20[index],
    ma30: initialIndicators.ma30[index],
    }));


  formattedData.sort((a, b) => a[0] - b[0]);
  volume.sort((a, b) => a[0] - b[0]);
  enrichedData.sort((a, b) => a[0] - b[0]);

  // 변환된 데이터를 차트 옵션에 적용
  options.series[0].data = formattedData;
  options.series[1].data = volume;
  options.series[2].data = enrichedData.map(item => [item.timestamp, item.ma10]).filter(item => item[1] !== null);
  options.series[3].data = enrichedData.map(item => [item.timestamp, item.ma20]).filter(item => item[1] !== null);
  options.series[4].data = enrichedData.map(item => [item.timestamp, item.ma30]).filter(item => item[1] !== null);

  // 차트 로드 시 실행될 로직 설정
  options.chart = {
      events: {
          load() {
              const chart = this;
              const series = chart.series[0];

              setInterval(async () => {
                  const recentKlineData = await getRecentKlineData(symbol);

                  // 새로운 포인트 생성
                  const newPoint = [
                      recentKlineData.data.timezone,
                      recentKlineData.data.openPrice,
                      recentKlineData.data.highPrice,
                      recentKlineData.data.lowPrice,
                      recentKlineData.data.closePrice
                  ];
                  if (series.options && series.options.data) {
                    const data = series.options.data;
                    const lastPoint = data[data.length - 1];
                    // x 값이 다르면 새로운 포인트 추가
                  if (lastPoint[0] < newPoint[0]) {
                      data[data.length] = newPoint;
                  } else {
                      // 동일한 x 값이면 기존 포인트 업데이트
                      data[data.length - 1] = newPoint;
                      series.setData(data);
                  }


                  // 전체 데이터를 기반으로 이동평균 및 볼린저 밴드 업데이트
                  const updatedIndicators = updateIndicators(data);
                  chart.series[1].setData(data.map((item, idx) => [item[0], updatedIndicators.ma10[idx]]).filter(item => item[1] !== null));
                  chart.series[2].setData(data.map((item, idx) => [item[0], updatedIndicators.ma20[idx]]).filter(item => item[1] !== null));
                  chart.series[3].setData(data.map((item, idx) => [item[0], updatedIndicators.ma30[idx]]).filter(item => item[1] !== null));
                }
              }, 300000); // 5분마다 업데이트
          }
      }
  };

  // 차트를 생성 및 적용
  Highcharts.stockChart('container', options);
  }

  // 심볼을 사용하여 차트를 초기화
  initializeChart(symbol);

  // Cleanup 이전 차트를 제거하고 새 차트를 생성
  return () => {
    Highcharts.charts.forEach((chart) => {
      if (chart) chart.destroy();
    });
  };
}, [symbol]);

  return (
    <div id="container"></div>
  );
};

export default Chart;