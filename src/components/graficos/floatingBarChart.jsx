/* eslint-disable react/prop-types */
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function FloatingBarChart({ chartData, title }) {
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
                            label: function(TooltipItem) {
                                if(TooltipItem.dataIndex === 0)
                                    return `${TooltipItem.label}: ${TooltipItem.dataset.data[TooltipItem.dataIndex][1].toLocaleString?.('en-ES', {
                                        style: 'currency',
                                        currency: 'USD',
                                        minimumFractionDigits: 0,
                                        maximumFractionDigits: 0,
                                      }).replaceAll(',', '.')}`;
                                if(TooltipItem.dataIndex === TooltipItem.dataset.data.length-1)
                                    return `${TooltipItem.label}: ${TooltipItem.dataset.data[TooltipItem.dataIndex].toLocaleString?.('en-ES', {
                                        style: 'currency',
                                        currency: 'USD',
                                        minimumFractionDigits: 0,
                                        maximumFractionDigits: 0,
                                      }).replaceAll(',', '.')}`;
                                return `${TooltipItem.label}: ${(TooltipItem.dataset.data[TooltipItem.dataIndex][0]-TooltipItem.dataset.data[TooltipItem.dataIndex][1]).toLocaleString?.('en-ES', {
                                    style: 'currency',
                                    currency: 'USD',
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 0,
                                  }).replaceAll(',', '.')}`;
                            }
                        }
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
                                return new Intl.NumberFormat('en-ES', { style: 'currency', currency: 'USD', maximumFractionDigits:0 }).format(value);
                            }
                        }
                    }
                },
                maintainAspectRatio: false
            }}
        /> : null;
}


export default FloatingBarChart;