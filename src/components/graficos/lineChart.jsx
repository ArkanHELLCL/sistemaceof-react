/* eslint-disable react/prop-types */
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function LineChart({ chartData, title }) {
  return chartData.datasets !== undefined ? <Line 
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

export default LineChart;