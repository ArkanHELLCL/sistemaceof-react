/* eslint-disable react/prop-types */
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import ChartDeferred from 'chartjs-plugin-deferred';
ChartJS.register(ChartDeferred);

function BarChart({ chartData, title }) {
    return chartData.datasets !== undefined ? <Bar 
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
                                var label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed.y !== null) {
                                    label += new Intl.NumberFormat('en-US', {
                                        style: 'currency',
                                        currency: 'USD',
                                        minimumFractionDigits: 0,
                                        maximumFractionDigits: 0
                                    }).format(context.parsed.y).replaceAll(',', '.');
                                }                                
                                return label;
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
                scales:{
                    x: {
                        grid:{
                            display: false
                        }  
                    },
                    y: {
                        grid:{
                            display: false
                        },   
                        beginAtZero: true,                       
                        ticks: {
                            callback: function(value, index, values) {
                                //return '$ ' + value;
                                return new Intl.NumberFormat('en-ES', { style: 'currency', currency: 'USD', maximumFractionDigits:0 }).format((value));
                            }
                        }
                    }
                },
                maintainAspectRatio: false
            }}
        /> : null;
}


export default BarChart;