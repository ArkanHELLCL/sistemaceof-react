/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/material/Grid';
import { UserData } from '../../../mock/data3.js';
import BarChart from '../graficos/barChart.jsx';

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

const anios = [
    { "label": "2022", "year": 2022 },
    { "label": "2023", "year": 2023 },
    { "label": "2024", "year": 2024 },
    { "label": "2025", "year": 2025 }
]

export default function UtilidadMes({anio, mes}){
    const [grpconfig, setGrpconfig] = useState({});         //Configuración del gráfico
    const selectedAnios = anios?.filter(item => item.year === anio[0]).sort((a, b) => a.year - b.year)
    const selectdMes = meses?.filter(item => item.month === mes[0]).sort((a, b) => a.month - b.month)
    const [aniosSelected, setAniosSelected] = useState(selectedAnios);
    const [mesSelected, setMesSelected] = useState(selectdMes);
    const [title, setTitle] = useState('Gráfico de Ventas');
    const [orderedData, setOrderedData] = useState();     //Todos los datos ordenados por año
    const [resultData, setResultData] = useState();       //Datos filtrados por año(s) seleccionado(s)

    useEffect(() => {
        if(orderedData){
            const filteredArray = orderedData?.filter(item => item.anio === aniosSelected[0].year)[0].meses.filter(item => item.id === mesSelected[0].month)[0].data;
            setResultData(filteredArray);
            setGrpconfig({
                labels: filteredArray.map(item => item.cuenta),
                datasets: [
                {
                    label: "Gráfico de Utilidades por Mes",
                    data: filteredArray?.map(item => item.valor),
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

    }, [aniosSelected, mesSelected]);

    useEffect(() => {
        const OrderedData = UserData?.sort((a, b) => a.anio - b.anio);
        setOrderedData(OrderedData);
        const filteredArray = OrderedData.filter(item => item.anio === anio[0])[0].meses.filter(item => item.id === mes[0])[0].data;
        const result = null
        setResultData(result);
        setGrpconfig({
            labels: filteredArray.map(item => item.cuenta),
            datasets: [
              {
                label: "Gráfico de Utilidades por Mes",
                data: filteredArray?.map(item => item.valor),
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
    }, [UserData, anio, mes]);

    useEffect(() => {
        if(aniosSelected.length === 1){
            setTitle('Gráfico de Utilidades Mes ' + mesSelected[0].label + ' año ' + aniosSelected[0].label );
        }        
        else{
           setTitle('Gráfico de Utilidades Mes');
        }
    }, [aniosSelected, mesSelected]);

    return grpconfig ? 
        <>
            <Grid container spacing={2} className='pb-4'>
                <Grid item xs={12} className='pb-4'>
                    <div className="flex justify-center rounded-xl bg-[#5d4889] text-white shadow-md py-4 align-middle">
                        <h2 className="text-2xl font-light text-center">{title}</h2>
                    </div>
                </Grid>
                <Grid item xs={6}> 
                    <Autocomplete
                        disablePortal
                        id="utilidad-anios"
                        value={aniosSelected[0].label}
                        options={anios}
                        sx={{ width: "100%"}}
                        onChange={(event, newValue) => {
                            setAniosSelected([
                                newValue,
                            ]);
                        }}

                        renderInput={(params) => <TextField {...params} label="Año" variant="standard"/>}
                    />
                </Grid>
                <Grid item xs={6}> 
                    <Autocomplete
                        disablePortal
                        id="utilidad-meses"
                        value={mesSelected[0].label}
                        options={meses}
                        sx={{ width: "100%"}}
                        onChange={(event, newValue) => {
                            setMesSelected([
                                newValue,
                            ]);
                        }}

                        renderInput={(params) => <TextField {...params} label="Mes" variant="standard"/>}
                    />
                </Grid>
                <Grid item xs={12} sx={{height: '400px'}}> 
                    <BarChart chartData={grpconfig} title={title}/> 
                </Grid>
            </Grid>
            
        </> : null
}