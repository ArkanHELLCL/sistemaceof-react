/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/material/Grid';
import { UserData } from '../../../mock/data4.js';
import DoughnutChart from '../graficos/doughnutChart.jsx';

const anios = [
    { "label": "2022", "year": 2022 },
    { "label": "2023", "year": 2023 },
    { "label": "2024", "year": 2024 },
    { "label": "2025", "year": 2025 }
]

export default function UtilidadYTD({anio, mes}){
    const [grpconfig, setGrpconfig] = useState({});         //Configuración del gráfico
    const selectedAnios = anios?.filter(item => item.year === anio[0]).sort((a, b) => a.year - b.year)
    const [aniosSelected, setAniosSelected] = useState(selectedAnios);
    const [title, setTitle] = useState('Gráfico de Ventas');
    const [orderedData, setOrderedData] = useState();     //Todos los datos ordenados por año
    const [resultData, setResultData] = useState();       //Datos filtrados por año(s) seleccionado(s)

    useEffect(() => {
        if(orderedData){
            const filteredArray = orderedData?.filter(item => item.anio === aniosSelected[0].year)[0].data;
            setResultData(filteredArray);
            setGrpconfig({
                labels: filteredArray.map(item => item.cuenta),
                datasets: [
                {
                    label: "Gráfico de Utilidades YTD",
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

    }, [aniosSelected]);

    useEffect(() => {
        const OrderedData = UserData?.sort((a, b) => a.anio - b.anio);
        setOrderedData(OrderedData);
        const filteredArray = OrderedData.filter(item => item.anio === anio[0])[0].data;
        const result = null
        setResultData(result);
        setGrpconfig({
            labels: filteredArray.map(item => item.cuenta),
            datasets: [
              {
                label: "Gráfico de Utilidades YTD",
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
            setTitle('Gráfico de Utilidades YTD ' + ' año ' + aniosSelected[0].label );
        }        
        else{
           setTitle('Gráfico de Utilidades YTD');
        }
    }, [aniosSelected]);

    return grpconfig ? 
        <>
            <Grid container spacing={2} className='pb-4'>
                <Grid item xs={12} className='pb-4'>
                    <div className="flex justify-center rounded-xl bg-[#4cbab5] text-white shadow-md py-4 align-middle">
                        <h2 className="text-2xl font-light text-center">{title}</h2>
                    </div>
                </Grid>
                <Grid item xs={6}> 
                    <Autocomplete
                        disablePortal
                        disableClearable={true}
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
                <Grid item xs={12} sx={{height: '400px'}}> 
                    <DoughnutChart chartData={grpconfig} title={title}/> 
                </Grid>
            </Grid>
            
        </> : null
}