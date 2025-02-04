/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import DoughnutChart from '../graficos/doughnutChart.jsx';

export default function UtilidadYTD({data, anio}){
    const [grpconfig, setGrpconfig] = useState({});         //Configuración del gráfico
    const [title, setTitle] = useState('Gráfico de Utilidades');

    useEffect(() => {
        if(data?.length>0 && anio.length === 1){
            const col=[];
            let valor = parseInt(data[0]["nivel1"]['1.1. INGRESO DE EXPLOTACION']?.months?.slice(0,12).reduce((acc, val) => acc + val, 0))
            valor = valor ? valor : 0;
            console.log(valor,"Ingresos" );
            col.push({"cuenta" : "Ingresos","valor" : valor ? valor : 0});

            valor = parseInt(data[0]["nivel1"]['1.2. COSTOS DE EXPLOTACION']?.months?.slice(0,12).reduce((acc, val) => acc + val, 0))
            valor = valor ? valor : 0;
            col.push({"cuenta" : "Costos de Explotación","valor" : valor ? valor : 0});

            valor = parseInt(data[0]["nivel2"]['1.3.1. REMUNERACION Y HONORARIOS']?.months?.slice(0,12).reduce((acc, val) => acc + val, 0))
            valor = valor ? valor : 0;
            col.push({"cuenta" : "Remuneraciones","valor" : valor ? valor : 0});

            valor = parseInt(data[0]["nivel1"]['1.3. GASTOS DE ADMINISTRACION Y VENTAS']?.months?.slice(0,12).reduce((acc, val) => acc + val, 0)) 
            let valor2 = parseInt(data[0]["nivel2"]['1.3.1. REMUNERACION Y HONORARIOS']?.months?.slice(0,12).reduce((acc, val) => acc + val, 0))
            valor = valor ? valor : 0;
            valor2 = valor2 ? valor2 : 0;
            valor = valor - valor2;
            col.push({"cuenta" : "Gastos Operacionales","valor" : valor ? valor : 0});

            valor =  parseInt(data[0]["nivel1"]['2.1. INGRESOS NO OPERACIONALES']?.months?.slice(0,12).reduce((acc, val) => acc + val, 0))
            valor = valor ? valor : 0;
            col.push({"cuenta" : "Ingresos No Oper.","valor" : valor ? valor : 0});

            valor = parseInt(data[0]["nivel1"]['2.2. GASTOS NO OPERACIONALES']?.months?.slice(0,12).reduce((acc, val) => acc + val, 0)) 
            valor2 = parseInt(data[0]["nivel1"]['2.1. INGRESOS NO OPERACIONALES']?.months?.slice(0,12).reduce((acc, val) => acc + val, 0))
            valor = valor ? valor : 0;
            valor2 = valor2 ? valor2 : 0;
            valor = valor - valor2;
            col.push({"cuenta" : "Costos No Oper.","valor" : valor ? valor : 0});        

            col.push({"cuenta" : "Utilidad", "valor" : col.reduce((acc, item) => acc + parseInt(item.valor), 0)});

            setGrpconfig({
                labels: col?.map(item => item.cuenta),
                datasets: [
                {
                    label: "Gráfico de Utilidades YTD",
                    data: col?.map(item => item.valor),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 205, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(201, 203, 207, 0.2)',
                        'rgba(233, 180, 257, 0.2)'
                    ],
                    borderColor: [
                        'rgb(255, 99, 132)',
                        'rgb(255, 159, 64)',
                        'rgb(255, 205, 86)',
                        'rgb(75, 192, 192)',
                        'rgb(54, 162, 235)',
                        'rgb(153, 102, 255)',
                        'rgb(201, 203, 207)',
                        'rgb(233, 180, 257)'
                    ],
                    borderWidth: 1
                }
                ]
            })
        }
    }, [data, anio]);

    useEffect(() => {
        if(anio.length === 1){
            setTitle('Gráfico de Utilidades YTD ' + ' año ' + anio[0] );
        }        
        else{
           setTitle('Gráfico de Utilidades YTD');
        }
    }, [anio]);

    return grpconfig ? 
        <>
            <Grid container spacing={2} className='pb-4'>
                <Grid item xs={12} className='pb-4'>
                    <div className="flex justify-center rounded-xl bg-[#4cbab5] text-white shadow-md py-4 align-middle">
                        <h2 className="text-2xl font-light text-center">{title}</h2>
                    </div>
                </Grid>                            
                <Grid item xs={12} sx={{height: '400px'}}> 
                    <DoughnutChart chartData={grpconfig} title={title}/> 
                </Grid>
            </Grid>
            
        </> : null
}