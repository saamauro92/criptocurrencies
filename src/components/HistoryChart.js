import React, { useEffect, useRef, useState } from 'react'
import { Chart, registerables } from 'chart.js';
import { useParams } from "react-router-dom";
import 'chartjs-adapter-date-fns';
import { historyOptions } from '../utils/utils';

Chart.register(...registerables);

const HistoryChart = ({ data }) => {



  const chartRef = useRef();
  const { day, week, year, detail } = data;
  const [timeFormat, setTimeFormat] = useState("24h");
  const [isRebuildingCanvas, setIsRebuildingCanvas] = useState(false);
  let currentParam = useParams();


  const determineTimeFormat = () => {
    switch (timeFormat) {
      case "24h":
        return day;
      case "7d":
        return week;
      case "1y":
        return year;
      default:
        return day;
    }
  };


  useEffect(() => {
    setIsRebuildingCanvas(true);
  }, [timeFormat]);


  useEffect(() => {
    if (isRebuildingCanvas) {
      setIsRebuildingCanvas(false);
    }
  }, [isRebuildingCanvas]);


  useEffect(() => {

    const chartCanvas = chartRef.current
    if (isRebuildingCanvas || !chartCanvas) {
      return;
    }

    const chartInstance = new Chart(chartRef.current, {

      type: 'line',

      data: {

        datasets: [{
          label: `${detail} price USD`.toUpperCase(),
          parsing: {
            yAxisKey: 'y',
            xAxisKey: 't',
          },
          data: determineTimeFormat(),
          borderColor: 'rgb(75, 192, 192)',
          pointRadius: 2,

          borderWidth: 1
        }]
      },
      options: { ...historyOptions }


    })
    return () => {
      chartInstance.destroy();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [day, detail, isRebuildingCanvas, timeFormat, week, year]);

  return <div className="history-chart">

    <div className="">
      <button
        onClick={() => setTimeFormat("24h")}
        className={timeFormat === '24h' ? "btn-chart-active" : "btn-chart"}
      >
        24h
      </button>
      <button
        onClick={() => setTimeFormat("7d")}
        className={timeFormat === '7d' ? "btn-chart-active" : "btn-chart"}
      >
        7d
      </button>
      <button
        onClick={() => setTimeFormat("1y")}
        className={timeFormat === '1y' ? "btn-chart-active" : "btn-chart"}

      >
        1y
      </button>
    </div>

    <div className="history-chart-canvas">

      {detail === currentParam.id ?
        <canvas ref={chartRef} id="myChart" /> : null
      }

    </div>


  </div>
}


export default HistoryChart;


