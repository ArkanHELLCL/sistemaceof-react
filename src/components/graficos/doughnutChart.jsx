/* eslint-disable react/prop-types */
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import ChartDeferred from 'chartjs-plugin-deferred';
ChartJS.register(ChartDeferred);

function DoughnutChart({ chartData, title }) {
    return chartData.datasets !== undefined ? <Doughnut 
            data={chartData} 
            options={{
                plugins: {
                    title: {
                        display: false,
                        text: title,
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                               const dataset = context.dataset;
                                const total = dataset.data.reduce((previousValue, currentValue) => previousValue + currentValue, 0);
                                console.log(total);
                                const currentValue = dataset.data[context.dataIndex];
                                const percentage = Math.floor(((currentValue / total) * 100) + 0.5);         
                                return `${context.label}: ${percentage}%`;                              
                            }
                        }
                    },
                    deferred: {
                        xOffset: 150,   // defer until 150px of the canvas width are inside the viewport
                        yOffset: '50%', // defer until 50% of the canvas height are inside the viewport
                        delay: 0      // delay of 500 ms after the canvas is considered inside the viewport
                    }
                },
                responsive: true,                
                maintainAspectRatio: false
            }}
        /> : null;
}


export default DoughnutChart;