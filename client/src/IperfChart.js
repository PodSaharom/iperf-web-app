import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

function IperfChart({ data }) {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.intervals.map(interval => interval.sum.start),
        datasets: [{
          label: 'Throughput',
          data: data.intervals.map(interval => interval.sum.bits_per_second),
        }],
      },
    });
  }, [data]);

  return <canvas ref={chartRef}></canvas>;
}

export default IperfChart;
