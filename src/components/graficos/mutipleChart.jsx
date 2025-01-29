/* eslint-disable react/prop-types */
import { Chart } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function MultipleChart({ chartData, title }) {
    return chartData.datasets !== undefined ? <Chart 
            data={chartData} 
            options={{
                plugins: {
                    title: {
                        display: false,
                        text: title,
                    },
                    /*tooltip: {
                        callbacks: {
                            label: function(context) {
                                var label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed.y !== null) {
                                    label += '$ ' + context.parsed.y;
                                }                                
                                return label;
                            }
                        }
                    }*/
                },
                responsive: true,
                scales:{
                    currency: {
                        type: 'linear',
                        position: 'left',
                        grid:{
                            display: false
                        },
                        ticks: {
                            callback: function(value, index, values) {
                                return '$ ' + value;
                            }
                        }
                    },
                    percentage:{
                        type: 'linear',
                        position: 'right',
                        grid:{
                            display: false
                        },
                        ticks: {
                            callback: function(value, index, values) {
                                return value + '%';
                            }
                        }
                    }
                },
                maintainAspectRatio: false
            }}
        /> : null;
}


export default MultipleChart;