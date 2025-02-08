/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import StackedChart from '../graficos/stackedChart.jsx';

const bgcolor = [
    'rgba(255, 99, 132, 0.2)',
    'rgba(255, 159, 64, 0.2)',
    'rgba(255, 205, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(201, 203, 207, 0.2)',
    'rgba(233, 180, 257, 0.2)'
]

const bdcolor = [
    'rgb(255, 99, 132)',
    'rgb(255, 159, 64)',
    'rgb(255, 205, 86)',
    'rgb(75, 192, 192)',
    'rgb(54, 162, 235)',
    'rgb(153, 102, 255)',
    'rgb(201, 203, 207)',
    'rgb(233, 180, 257)'
]

export default function UtilidadMesAnual({data, anio}){
    const [grpconfig, setGrpconfig] = useState({});         //Configuración del gráfico
    const [title, setTitle] = useState('Gráfico de Ventas');

    useEffect(() => {        
        if(data?.length>0 && anio.length === 1){
            const year = data[0].year
            const col=[];
            let valor = (data[0]["nivel1"]['1.1. INGRESO DE EXPLOTACION']?.months?.slice(0,12).map((item, idx)  => { 
                const mes = year + '-' + parseInt(idx + 1)
                return {"month" : mes, "valor" : item} }))
            col.push({"label" : "Ingresos","data" : valor ? valor : []});

            valor = (data[0]["nivel1"]['1.2. COSTOS DE EXPLOTACION']?.months?.slice(0,12).map((item, idx)  => { 
                const mes = year + '-' + parseInt(idx + 1)
                return {"month" : mes, "valor" : item} }))
            col.push({"label" : "Costos de Explotación" , "data" : valor ? valor : []});

            valor = (data[0]["nivel2"]['1.3.1. REMUNERACION Y HONORARIOS']?.months?.slice(0,12).map((item, idx)  => { 
                const mes = year + '-' + parseInt(idx + 1)
                return {"month" : mes, "valor" : item} }))
            col.push({"label" : "Remuneraciones","data" : valor ? valor : []});

            let nivel2Months = data[0]["nivel2"]['1.3.1. REMUNERACION Y HONORARIOS']?.months?.slice(0, 12) || Array(12).fill(0);
            let nivel1Months = data[0]["nivel1"]['1.3. GASTOS DE ADMINISTRACION Y VENTAS']?.months?.slice(0, 12) || Array(12).fill(0);
            
            valor = nivel1Months.map((value, idx) => { 
                const mes = year + '-' + parseInt(idx + 1)
                return {"month" : mes, "valor" : value - nivel2Months[idx]}
            });
            col.push({"label" : "Gastos Operacionales","data" : valor ? valor : []});

            valor = (data[0]["nivel1"]['2.1. INGRESOS NO OPERACIONALES']?.months?.slice(0,12).map((item, idx)  => { 
                const mes = year + '-' + parseInt(idx + 1)
                return {"month" : mes, "valor" : item} }))
            col.push({"label" : "Ingresos No Oper.","data" : valor ? valor : []});

            nivel2Months = data[0]["nivel1"]['2.2. GASTOS NO OPERACIONALES']?.months?.slice(0, 12) || Array(12).fill(0);
            nivel1Months = data[0]["nivel1"]['2.1. INGRESOS NO OPERACIONALES']?.months?.slice(0, 12) || Array(12).fill(0);

            valor = nivel2Months.map((value, idx) => { 
                const mes = year + '-' + parseInt(idx + 1)
                return {"month" : mes, "valor" : value - nivel1Months[idx] || 0}
            });
            col.push({"label" : "Costos No Oper.","data" : valor ? valor : []});

            const sumColumns = Array(12).fill(0);
            col.forEach(item => {
                item.data.forEach((mes, idx) => {
                    sumColumns[idx] += mes.valor;
                });
            });
            valor = sumColumns.map((value, idx) => { 
                const mes = year + '-' + parseInt(idx + 1)
                return {"month" : mes, "valor" : value}
            });
            
            col.push({"label" : "Utilidad","data" : valor ? valor : []});
            const result = col.map((item, index) => {
                const label = item.label
                const axisLabel = item.data.map(item => item.month)
                const data = item.data.map(subitem => {
                    let valor
                    //const valor = subitem.valor ? label.toUpperCase().trim() === 'UTILIDAD' : Math.abs(subitem.valor)
                    if(label.toUpperCase().trim() === 'UTILIDAD')
                        valor = subitem.valor
                    else
                        valor = Math.abs(subitem.valor)                        
                    //console.log(label, valor)
                    return valor
                })
                const result = {
                    labels: axisLabel,
                    datasets: {
                        label: label,
                        data: data,
                        backgroundColor: bgcolor[index],
                        borderColor: bdcolor[index],
                        borderWidth: 1
                    }
                }
                return result
            });            
            const labels = col.map(item => item.data.map(item => item.month))[0]
            setGrpconfig({
                labels:labels,
                datasets:result.map(item => item.datasets)
            })            
        }
        
    }, [data]);

    useEffect(() => {
        if(anio.length === 1){
            setTitle('Gráfico de Utilidades año ' + anio[0] );
        }
        else if(anio.length > 1){
            setTitle('Gráfico de Utilidades años' + anio.map(item => item.title).join(', '));
        }
        else{
           setTitle('Gráfico de Utilidades');
        }
    }, [anio]);

    return grpconfig ? 
        <>
            <Grid container spacing={2} className='pb-4'>
                <Grid item xs={12} className='pb-4'>
                    <div className="flex justify-center rounded-xl bg-[#06a7d7] text-white shadow-md py-4 align-middle">
                        <h2 className="text-2xl font-light text-center">{title}</h2>
                    </div>
                </Grid>                
                <Grid item xs={12} sx={{height: '400px'}}>
                    <StackedChart chartData={grpconfig} title={title} /> 
                </Grid>
            </Grid>            
        </> : null
}