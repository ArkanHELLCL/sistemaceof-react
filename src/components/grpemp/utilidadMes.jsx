/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid2';
import FloatingBarChart from '../graficos/floatingBarChart.jsx';

const meses = [
    { "label": "Enero", "month": 1 },
    { "label": "Febrero", "month": 2 },
    { "label": "Marzo", "month": 3 },
    { "label": "Abril", "month": 4 },
    { "label": "Mayo", "month": 5 },
    { "label": "Junio", "month": 6 },
    { "label": "Julio", "month": 7 },
    { "label": "Agosto", "month": 8 },
    { "label": "Septiembre", "month": 9 },
    { "label": "Octubre", "month": 10 },
    { "label": "Noviembre", "month": 11 },
    { "label": "Diciembre", "month": 12 }
]

export default function UtilidadMes({data, anio, mes}){
    const [grpconfig, setGrpconfig] = useState({});         //Configuración del gráfico
    const [title, setTitle] = useState('Gráfico de Ventas');
    const tabla = (mes) => {
        const col=[];
        let valor = parseFloat(data[0]["nivel1"]['1.1.']?.months?.slice(0,12).filter((item, idx) => idx === mes)[0]) || 0;
        let result = [0,valor];
        let valorAnt = valor;
        col.push({"cuenta" : "Ingresos","valor" : result});
        

        valor = parseFloat(data[0]["nivel1"]['1.2.']?.months?.slice(0,12).filter((item, idx) => idx === mes)[0]) || 0;
        if(valor !== 0){
            valor = valorAnt + valor;
            result = [valor, valorAnt]
            valorAnt = valor;
        }else{
            result = [valorAnt, valorAnt]
        }
        col.push({"cuenta" : "Costos de Explotación","valor" : result});
        

        valor = parseFloat(data[0]["nivel2"]['1.3.1.']?.months?.slice(0,12).filter((item, idx) => idx === mes)[0] || 0)
        if(valor !== 0){
            valor = valorAnt + valor;
            result = [valor, valorAnt]
            valorAnt = valor;
        }else{
            result = [valorAnt, valorAnt]
        }
        col.push({"cuenta" : "Remuneraciones","valor" : result});

        valor = parseFloat(data[0]["nivel1"]['1.3.']?.months?.slice(0,12).filter((item, idx) => idx === mes)[0] || 0) 
        let valor2 = parseFloat(data[0]["nivel2"]['1.3.1.']?.months?.slice(0,12).filter((item, idx) => idx === mes)[0] || 0)
        valor = valor ? valor : 0;
        valor2 = valor2 ? valor2 : 0;
        valor = valor - valor2;
        if(valor !== 0){
            valor = valorAnt + valor;
            result = [valor, valorAnt]
            valorAnt = valor;
        }else{
            result = [valorAnt, valorAnt]
        }
        col.push({"cuenta" : "Gastos Operacionales","valor" : result});

        valor =  parseFloat(data[0]["nivel1"]['2.1.']?.months?.slice(0,12).filter((item, idx) => idx === mes)[0] || 0)
        if(valor !== 0){
            valor = valorAnt + valor;
            result = [valor, valorAnt]
            valorAnt = valor;
        }else{
            result = [valorAnt, valorAnt]
        }
        col.push({"cuenta" : "Ingresos No Oper.","valor" : result});

        valor = parseFloat(data[0]["nivel1"]['2.2.']?.months?.slice(0,12).filter((item, idx) => idx === mes)[0] || 0)         
        valor2 = parseFloat(data[0]["nivel1"]['2.1.']?.months?.slice(0,12).filter((item, idx) => idx === mes)[0] || 0)
        valor = valor ? valor : 0;
        valor2 = valor2 ? valor2 : 0;
        //valor = valor + valor2;
        if(valor !== 0){
            valor = valorAnt + valor;
            result = [valor, valorAnt]
            valorAnt = valor;
        }else{
            result = [valorAnt, valorAnt]
        }
        col.push({"cuenta" : "Costos No Oper.","valor" : result});  
                
        col.push({"cuenta" : "Utilidad", "valor" : col.slice(1).reduce((acc, item) => acc + (parseFloat(item.valor[0] - item.valor[1])), 0) + col[0].valor[1]} || 0);

        setGrpconfig({
            labels: col?.map(item => item.cuenta),
            datasets: [
            {
                label: "Gráfico de Utilidades por Mes",
                data: col?.map(item => item.valor),
                backgroundColor: col.map((item, index) => {
                    if (index === 0 || index === col.length - 1) {
                        return '#6aa1d7';
                    }
                    return item.valor[0] > item.valor[1] ? '#3f3088' : '#39bbd2'; 
                }),
                borderColor: col.map((item, index) => {
                    if (index === 0 || index === col.length - 1) {
                        return '#6aa1d7';
                    }
                    return item.valor[0] > item.valor[1] ? '#3f3088' : '#39bbd2'; 
                }),
                borderWidth: 1,
                minBarLength: 5
            }
            ]
        })
    }

    useEffect(() => {
        if(data.length>0 && anio.length === 1){
            tabla(mes[0].month-1)
        }
    }, [mes]);

    useEffect(() => {
        if(data?.length>0 && anio.length === 1){
            tabla(mes[0]-1)
        }
    }, [data,  mes]);

    useEffect(() => {
        if(anio.length === 1){
            setTitle('Gráfico de Utilidades Mes ' + meses[mes[0]-1]?.label + ' año ' + anio[0] );
        }        
        else{
           setTitle('Gráfico de Utilidades Mes');
        }
    }, [anio, mes]);

    return grpconfig ? 
        <>
            <Grid container spacing={2} className='pb-4'>
                <Grid size={{ xs: 12, xl: 12 }} className='pb-4'>
                    <div className="flex justify-center rounded-xl bg-[#5d4889] text-white shadow-md py-4 align-middle">
                        <h2 className="text-2xl font-light text-center">{title}</h2>
                    </div>
                </Grid>                
                <Grid size={{ xs: 12, xl: 12 }} sx={{height: '400px'}}> 
                    <FloatingBarChart chartData={grpconfig} title={title}/> 
                </Grid>
                <Grid size={{ xs: 12, xl: 12 }} className='flex justify-center mt-4'>                    
                    <div className='flex items-center mr-4'>
                        <div className='w-4 h-4 bg-[#6aa1d7] mr-2'></div>
                        <span>Total</span>
                    </div>
                    <div className='flex items-center mr-4'>
                        <div className='w-4 h-4 bg-[#3f3088] mr-2'></div>
                        <span>Aumento</span>
                    </div>
                    <div className='flex items-center'>
                        <div className='w-4 h-4 bg-[#39bbd2] mr-2'></div>
                        <span>Disminución</span>
                    </div>                                   
                </Grid>
            </Grid> 
        </> : null
}