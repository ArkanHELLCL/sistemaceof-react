/* eslint-disable react/prop-types */
import { Bar } from "react-chartjs-2";
//import { Chart as ChartJS } from "chart.js/auto";

function BarChart({ chartData, title }) {
  return <Bar 
            data={chartData} 
            options={{
                plugins: {
                    title: {
                        display: true,
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
                        }
                    }
                },
                maintainAspectRatio: false
            }}
        />;
}

export default BarChart;