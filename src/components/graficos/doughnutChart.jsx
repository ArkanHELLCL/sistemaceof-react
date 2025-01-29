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
                    }
                },
                responsive: true,                
                maintainAspectRatio: false
            }}
        /> : null;
}


export default DoughnutChart;