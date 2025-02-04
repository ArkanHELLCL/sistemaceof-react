/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import MultipleChart from '../graficos/mutipleChart.jsx';

export default function RemuneracionesAnual({data, anio}){
    const [grpconfig, setGrpconfig] = useState({});         //Configuración del gráfico
    const [title, setTitle] = useState('Gráfico de Ventas');

    useEffect(() => {
        if(data.length>0 && anio.length === 1){  
            const series = []          
            let filteredArray = data[0]["nivel1"]['1.1. INGRESO DE EXPLOTACION']?.months?.slice(0,12) || Array(12).fill(0);
            let result = filteredArray.slice(0,12).map((item,idx) => {
                const mes = idx+1;
                return {
                    month: anio[0] + '-' + mes,
                    venta: item
                }
            });
            const labels = result.map(data => data.month);
            series.push({
                label: "Ingresos ($)",
                data: result.map(data => data.venta),
                type: 'bar',
                backgroundColor: 'rgba(255, 159, 64, 0.2)',
                borderColor: 'rgb(255, 159, 64)',
                borderWidth: 1,
                yAxisID: 'currency',
            })

            filteredArray = data[0]["nivel2"]['1.3.1. REMUNERACION Y HONORARIOS']?.months?.slice(0,12) || Array(12).fill(0);
            result = filteredArray?.slice(0,12).map((item,idx) => {
                const mes = idx+1;
                return {
                    month: anio[0] + '-' + mes,
                    venta: Math.abs(item)
                }
            });

            series.push({
                label: "Remuneraciones ($)",
                data: result.map(data => data.venta),
                type: 'bar',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgb(255, 99, 132)',
                borderWidth: 1,
                yAxisID: 'currency',
            })
            
            filteredArray = series[0].data.map((item, idx) => ((item > 0 ? series[1].data[idx] / item  : 0) * 100));
            result = filteredArray?.slice(0,12).map((item,idx) => {
                const mes = idx+1;
                return {
                    month: anio[0] + '-' + mes,
                    venta: item
                }
            });

            series.push({
                label: "Ratio Mano de Obra (%)",
                data: result.map(data => data.venta),
                type: 'line',
                borderColor: '#8e7cb9',
                backgroundColor: 'rgba(238, 237, 248, 0.8)',
                borderWidth: 1,
                yAxisID: 'percentage',
                tension: 0.5
            })

            setGrpconfig({
                labels: labels,
                datasets: series
            })        
        }else{
            setGrpconfig({
                labels: [],
                datasets: []
            })            
        }
    }, [data, anio]);

    useEffect(() => {
        if(anio.length === 1){
            setTitle('Gráfico de Remuneraciones ' + ' año ' + anio[0] );
        }        
        else{
           setTitle('Gráfico de Remuneraciones');
        }
    }, [anio]);

    return grpconfig ? 
        <>
            <Grid container spacing={2} className='pb-4'>
                <Grid item xs={12} className='pb-4'>
                    <div className="flex justify-center rounded-xl bg-[#5d4889] text-white shadow-md py-4 align-middle">
                        <h2 className="text-2xl font-light text-center">{title}</h2>
                    </div>
                </Grid>                            
                <Grid item xs={12} sx={{height: '400px'}}> 
                    <MultipleChart chartData={grpconfig} title={title}/> 
                </Grid>
            </Grid>
            
        </> : null
}