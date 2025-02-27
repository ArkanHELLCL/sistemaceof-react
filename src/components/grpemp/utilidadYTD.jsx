/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid2';
import DoughnutChart from '../graficos/doughnutChart.jsx';

export default function UtilidadYTD({data, anio, mes}){
    const [grpconfig, setGrpconfig] = useState({});         //Configuración del gráfico
    const [title, setTitle] = useState('Gráfico de Utilidades');
    
    useEffect(() => {
        if(data?.length>0 && anio.length === 1){
            const col=[];
            let valor = parseFloat(data[0]["nivel1"]['1.1.']?.months?.slice(0,12).reduce((acc, val) => acc + val, 0))
            valor = valor ? valor : 0;
            col.push({"cuenta" : "Ingresos","valor" : valor ? valor : 0});

            valor = parseFloat(data[0]["nivel1"]['1.2.']?.months?.slice(0,12).reduce((acc, val) => acc + val, 0))
            valor = valor ? valor : 0;
            col.push({"cuenta" : "Costos de Explotación","valor" : valor ? valor : 0});

            valor = parseFloat(data[0]["nivel2"]['1.3.1.']?.months?.slice(0,12).reduce((acc, val) => acc + val, 0))
            valor = valor ? valor : 0;
            col.push({"cuenta" : "Remuneraciones","valor" : valor ? valor : 0});

            valor = parseFloat(data[0]["nivel1"]['1.3.']?.months?.slice(0,12).reduce((acc, val) => acc + val, 0)) 
            let valor2 = parseFloat(data[0]["nivel2"]['1.3.1.']?.months?.slice(0,12).reduce((acc, val) => acc + val, 0))
            valor = valor ? valor : 0;
            valor2 = valor2 ? valor2 : 0;
            valor = valor - valor2;
            col.push({"cuenta" : "Gastos Operacionales","valor" : valor ? valor : 0});

            valor =  parseFloat(data[0]["nivel1"]['2.1.']?.months?.slice(0,12).reduce((acc, val) => acc + val, 0))
            valor = valor ? valor : 0;
            col.push({"cuenta" : "Ingresos No Oper.","valor" : valor ? valor : 0});

            valor = parseFloat(data[0]["nivel1"]['2.2.']?.months?.slice(0,12).reduce((acc, val) => acc + val, 0)) 
            valor2 = parseFloat(data[0]["nivel1"]['2.1.']?.months?.slice(0,12).reduce((acc, val) => acc + val, 0))
            valor = valor ? valor : 0;
            valor2 = valor2 ? valor2 : 0;
            valor = valor - valor2;
            col.push({"cuenta" : "Costos No Oper.","valor" : valor ? valor : 0});        

            col.push({"cuenta" : "Utilidad", "valor" : col.reduce((acc, item) => acc + parseFloat(item.valor), 0)});

            setGrpconfig({
                labels: col?.map(item => item.cuenta),
                datasets: [
                {
                    label: "Gráfico de Utilidades YTD",
                    data: col?.map(item => item.valor),
                    backgroundColor: [
                        'rgb(255, 99, 132)',
                        'rgb(255, 159, 64)',
                        'rgb(255, 205, 86)',
                        'rgb(75, 192, 192)',
                        'rgb(54, 162, 235)',
                        'rgb(153, 102, 255)',
                        'rgb(201, 203, 207)',
                        'rgb(233, 180, 257)'
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
                <Grid size={{ xs: 12, xl: 12 }} className='pb-4'>
                    <div className="flex justify-center rounded-xl bg-[#4cbab5] text-white shadow-md py-4 align-middle">
                        <h2 className="text-2xl font-light text-center">{title}</h2>
                    </div>
                </Grid>                            
                <Grid size={{ xs: 12, xl: 12 }} sx={{height: '400px'}}> 
                    <DoughnutChart chartData={grpconfig} title={title}/> 
                </Grid>
            </Grid>
            
        </> : null
}