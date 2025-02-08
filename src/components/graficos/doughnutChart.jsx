/* eslint-disable react/prop-types */
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function DoughnutChart({ chartData, title }) {
    return chartData.datasets !== undefined ? <Doughnut 
            data={chartData} 
            options={{
                plugins: {
                    title: {
                        display: false,
                        text: title,
                    },
                    /*tooltip: {
                        callbacks: {
                            label: function(tooltipItem) {
                                const dataset = tooltipItem.dataset;
                                const total = dataset.data.reduce((previousValue, currentValue) => previousValue + currentValue, 0);
                                console.log(total);
                                const currentValue = dataset.data[tooltipItem.dataIndex];
                                const percentage = Math.floor(((currentValue / total) * 100) + 0.5);         
                                return `${tooltipItem.label}: ${percentage}%`;
                            }
                        }
                      }*/
                },
                responsive: true,                
                maintainAspectRatio: false
            }}
        /> : null;
}


export default DoughnutChart;