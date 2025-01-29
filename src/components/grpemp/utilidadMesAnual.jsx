/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/material/Grid';
import { UserData } from '../../../mock/data2.js';
import StackedChart from '../graficos/stackedChart.jsx';

const anios = [
    { "label": "2022", "year": 2022 },
    { "label": "2023", "year": 2023 },
    { "label": "2024", "year": 2024 },
    { "label": "2025", "year": 2025 }
]

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

export default function UtilidadMesAnual({empresa, anio}){
    const [grpconfig, setGrpconfig] = useState({});         //Configuración del gráfico
    const selectedAnios = anios?.filter(item => anio?.includes(item.year)).sort((a, b) => a.year - b.year)
    const [aniosSelected, setAniosSelected] = useState(selectedAnios);
    const [title, setTitle] = useState('Gráfico de Ventas');
    const [orderedData, setOrderedData] = useState([]);     //Todos los datos ordenados por año

    useEffect(() => {
        const yearArray = aniosSelected.map(item => item.year);
        const filteredArray = orderedData?.filter(item => yearArray?.includes(item.anio));
        if(filteredArray){   
            const result = filteredArray?.flatMap(item => item.data).map((item, index) => {
                const label = item.label
                const axisLabel = item.data.map(item => item.month)
                const data = item.data.map(item => item.valor)
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
            const labels = filteredArray.flatMap(item => item.data).map(item => item.data.map(item => item.month))[0]
            setGrpconfig({
                labels:labels,
                datasets:result.map(item => item.datasets)
            })
        }

    }, [aniosSelected]);

    useEffect(() => {
        const OrderedData = UserData?.sort((a, b) => a.anio - b.anio);
        setOrderedData(OrderedData);
        const filteredArray = orderedData?.filter(item => anio?.includes(item.anio));
        const result = filteredArray.flatMap(item => item.data).map((item, index) => {
            const label = item.label
            const axisLabel = item.data.map(item => item.month)
            const data = item.data.map(item => item.valor)
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
        const labels = filteredArray.flatMap(item => item.data).map(item => item.data.map(item => item.month))[0]
        setGrpconfig({
            labels:labels,
            datasets:result.map(item => item.datasets)
        })
        
    }, [UserData, empresa, anio]);

    useEffect(() => {
        if(aniosSelected.length === 1){
            setTitle('Gráfico de Utilidades por Mes año ' + aniosSelected[0].label );
        }
        else if(aniosSelected.length > 1){
            setTitle('Gráfico de Utilidades por Mes años' + aniosSelected.map(item => item.title).join(', '));
        }
        else{
           setTitle('Gráfico de Utilidades Mes');
        }
    }, [aniosSelected]);

    return grpconfig ? 
        <>
            <Grid container spacing={2} className='pb-4'>
                <Grid item xs={12} className='pb-4'>
                    <div className="flex justify-center rounded-xl bg-[#06a7d7] text-white shadow-md py-4 align-middle">
                        <h2 className="text-2xl font-light text-center">{title}</h2>
                    </div>
                </Grid>
                <Grid item xs={12}> 
                    <Autocomplete
                        disablePortal
                        disableClearable={true}
                        id="utilidad-anios"
                        value={aniosSelected[0].label}
                        options={anios}
                        sx={{ width: 300}}
                        onChange={(event, newValue) => {
                            setAniosSelected([
                                newValue,
                            ]);
                        }}
                        renderInput={(params) => <TextField {...params} label="Año" variant="standard"/>}
                    />
                </Grid>
                <Grid item xs={12} sx={{height: '400px'}}>
                    <StackedChart chartData={grpconfig} title={title} /> 
                </Grid>
            </Grid>            
        </> : null
}