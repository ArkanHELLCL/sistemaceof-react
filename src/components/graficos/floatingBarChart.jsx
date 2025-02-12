/* eslint-disable react/prop-types */
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import ChartDataLabels from 'chartjs-plugin-datalabels';

function FloatingBarChart({ chartData, title }) {
    return chartData.datasets !== undefined ? <Bar 
            data={chartData}
            plugins={[ChartDataLabels]}
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
                                    return `${TooltipItem.label}: ${(TooltipItem.dataset.data[TooltipItem.dataIndex][1] || 0 ).toLocaleString?.('en-ES', {
                                        style: 'currency',
                                        currency: 'USD',
                                        minimumFractionDigits: 0,
                                        maximumFractionDigits: 0,
                                      }).replaceAll(',', '.')}`;
                                if(TooltipItem.dataIndex === TooltipItem.dataset.data.length-1)
                                    return `${TooltipItem.label}: ${(TooltipItem.dataset.data[TooltipItem.dataIndex] || 0).toLocaleString?.('en-ES', {
                                        style: 'currency',
                                        currency: 'USD',
                                        minimumFractionDigits: 0,
                                        maximumFractionDigits: 0,
                                      }).replaceAll(',', '.')}`;
                                return `${TooltipItem.label}: ${((TooltipItem.dataset.data[TooltipItem.dataIndex][0] || 0 )-(TooltipItem.dataset.data[TooltipItem.dataIndex][1] || 0)).toLocaleString?.('en-ES', {
                                    style: 'currency',
                                    currency: 'USD',
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 0,
                                  }).replaceAll(',', '.')}`;
                            }
                        }
                    },
                    datalabels: {
                        /*align: function(context) {
                            console.log(context);                           
                            var index = context.dataIndex;
                            var value = context.dataset.data[index][0] - context.dataset.data[index][1] || 0;
                            return value > 0 ? 'topx' : 'bootm';
                        },*/
                        anchor : function(context) {
                            var index = context.dataIndex;
                            var value
                            if(context.dataIndex === 0){
                                value = context.dataset.data[index][1] || 0;
                            }
                            else if(context.dataIndex === context.dataset.data.length-1){
                                value = context.dataset.data[index] || 0;
                            }
                            else{
                                value = context.dataset.data[index][0] - context.dataset.data[index][1] || 0;
                            }                            
                            return value > 0 ? 'end' : 'start';
                        },
                        backgroundColor: 'rgba(255, 255, 255, 0.7)',
                        borderColor: 'rgba(128, 128, 128, 0.7)',
                        borderRadius: 4,
                        borderWidth: 1,
                        color: function(context) {
                            var index = context.dataIndex;
                            var val;                            
                            if(context.dataIndex === 0){
                                val = context.dataset.data[index][1] || 0;
                            }
                            else if(context.dataIndex === context.dataset.data.length-1){
                                val = context.dataset.data[index] || 0;
                            }
                            else{
                                val = context.dataset.data[index][0] - context.dataset.data[index][1] || 0;
                            }
                            return val < 0 ? "red" :
                                val > 0 ? "blue" :
                                'gray';
                        },
                        font: {
                          size: 13,
                          weight: 'bolder',
                        },
                        offset: 8,
                        formatter: function(value, context) {
                            var index = context.dataIndex;
                            var val
                            if(context.dataIndex === 0){
                                val = context.dataset.data[index][1] || 0;
                            }
                            else if(context.dataIndex === context.dataset.data.length-1){
                                val = context.dataset.data[index] || 0;
                            }
                            else{
                                val = context.dataset.data[index][0] - context.dataset.data[index][1] || 0;
                            }
                            var glyph = val > 0 ? '▲' : val < 0 ? '▼' : '◆';
                            return glyph + ' ' + new Intl.NumberFormat('en-ES', { style: 'currency', currency: 'USD', maximumFractionDigits:0 }).format(val);
                        },
                        padding: 6
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