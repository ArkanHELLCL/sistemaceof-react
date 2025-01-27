import Chart from 'chart.js/auto';
//import { getRelativePosition } from 'chart.js/helpers';


export default function Chartarea({cttx, datasetval, labels, label}) {
    const ctx = document.getElementById(cttx);
    const data = {
      labels: labels,
      datasets: [
        {
          label: label,
          data: datasetval,
          borderColor: '#8e7cb9',
          backgroundColor: 'transparent',
          fill: {
            target: 'origin',
            above: 'rgba(238, 237, 248, 0.5)',   // Area will be red above the origin
            below: 'rgba(238, 237, 248, 0.5)'    // And blue below the origin
          }
        }]
    };
    const config = {
        type: 'line',
        data: data,
        options: {
          borderWidth:1,
          pointBackgroundColor:'#3c245b',
          responsive: true,
          plugins: {
            filler: {
              propagate: false,
            },
            title: {
              display: false,
              //text: (ctx) => 'Gráfico 2 '
            }
          },
          interaction: {
            intersect: false,
          },
          scales: {
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
            }
        },
    };
    const chart = new Chart(ctx, config);
  
    return chart;
}