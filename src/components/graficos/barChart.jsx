/* eslint-disable react/prop-types */
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function BarChart({ chartData, title }) {
    return chartData.datasets !== undefined ? <Bar 
            data={chartData} 
            options={{
                plugins: {
                    title: {
                        display: false,
                        text: title,
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
                        ticks: {
                            callback: function(value, index, values) {
                                return '$ ' + value;
                            }
                        }
                    }
                },
                maintainAspectRatio: false
            }}
        /> : null;
}


export default BarChart;