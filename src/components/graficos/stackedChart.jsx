/* eslint-disable react/prop-types */
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function StackedChart({ chartData, title }) {
    return chartData.datasets !== undefined ? <Bar 
            data={chartData} 
            options={{
                plugins: {
                    title: {
                        display: false,
                        text: title,
                    },
                    tooltip: {
                        mode: 'x'
                    }
                },
                responsive: true,
                scales:{
                    x: {
                        grid:{
                            display: false
                        },
                        stacked: true
                    },
                    y: {
                        grid:{
                            display: false
                        },
                        stacked: true
                    }
                },
                maintainAspectRatio: false
            }}
        /> : null;
}


export default StackedChart;