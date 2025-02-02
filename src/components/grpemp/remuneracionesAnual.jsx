/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/material/Grid';
import { UserData } from '../../../mock/data5.js';
import MultipleChart from '../graficos/mutipleChart.jsx';

export default function RemuneracionesAnual({anio}){
    const [grpconfig, setGrpconfig] = useState({});         //Configuración del gráfico
    const [title, setTitle] = useState('Gráfico de Ventas');
    const [orderedData, setOrderedData] = useState();     //Todos los datos ordenados por año
    const [resultData, setResultData] = useState();       //Datos filtrados por año(s) seleccionado(s)

    useEffect(() => {
        if(orderedData){
            const filteredArray = orderedData.filter(item => item.anio === anio[0])[0].data;
            setResultData(filteredArray);
            setGrpconfig({
                labels: filteredArray[0].data.map(item => item.month),
                datasets: [
                {
                    label: filteredArray[0].label,
                    data: filteredArray[0].data.map(item => item.valor),
                    type: 'bar',
                    backgroundColor: 'rgba(255, 159, 64, 0.2)',
                    borderColor: 'rgb(255, 159, 64)',
                    borderWidth: 1,
                    yAxisID: 'currency',
                },
                {
                    label: filteredArray[1].label,
                    data: filteredArray[1].data.map(item => item.valor),
                    type: 'bar',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgb(255, 99, 132)',
                    borderWidth: 1,
                    yAxisID: 'currency',
                },
                {
                    label: filteredArray[2].label,
                    data: filteredArray[2].data.map(item => item.valor),
                    type: 'line',
                    borderColor: '#8e7cb9',
                    backgroundColor: 'rgba(238, 237, 248, 0.8)',
                    borderWidth: 1,
                    yAxisID: 'percentage',
                    tension: 0.5
                }
                ]
            })
        }

    }, [anio]);

    useEffect(() => {
        const OrderedData = UserData?.sort((a, b) => a.anio - b.anio);
        setOrderedData(OrderedData);
        const filteredArray = OrderedData.filter(item => item.anio === anio[0])[0].data;
        setResultData(filteredArray);
        setGrpconfig({
            labels: filteredArray[0].data.map(item => item.month),
            datasets: [
              {
                label: filteredArray[0].label,
                data: filteredArray[0].data.map(item => item.valor),
                type: 'bar',
                backgroundColor: 'rgba(255, 159, 64, 0.2)',
                borderColor: 'rgb(255, 159, 64)',
                borderWidth: 1,
                yAxisID: 'currency',
              },
              {
                label: filteredArray[1].label,
                data: filteredArray[1].data.map(item => item.valor),
                type: 'bar',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgb(255, 99, 132)',
                borderWidth: 1,
                yAxisID: 'currency',
              },
              {
                label: filteredArray[2].label,
                data: filteredArray[2].data.map(item => item.valor),
                type: 'line',
                borderColor: '#8e7cb9',
                backgroundColor: 'rgba(238, 237, 248, 0.8)',
                borderWidth: 1,
                yAxisID: 'percentage',
                tension: 0.5
              }
            ]
        })
    }, [UserData, anio]);

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