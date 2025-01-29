/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/material/Grid';
import { UserData } from '../../../mock/data.js';
import LineChart from '../graficos/lineChart.jsx';

const anios =[
    { "title": "2022", "year": 2022 },
    { "title": "2023", "year": 2023 },
    { "title": "2024", "year": 2024 },
    { "title": "2025", "year": 2025 }
]

export default function VentasAnual({empresa, anio}){
    const [grpconfig, setGrpconfig] = useState({});         //Configuración del gráfico
    //const fixedOptions = [graficos[1]];
    const fixedOptions = [];
    const selectedAnios = anios?.filter(item => anio?.includes(item.year)).sort((a, b) => a.year - b.year)
    const [aniosSelected, setAniosSelected] = useState(selectedAnios);
    const [title, setTitle] = useState('Gráfico de Ventas');
    const [orderedData, setOrderedData] = useState([]);     //Todos los datos ordenados por año
    const [resultData, setResultData] = useState([]);       //Datos filtrados por año(s) seleccionado(s)

    useEffect(() => {
        const yearArray = aniosSelected.map(item => item.year);
        const filteredArray = orderedData?.filter(item => yearArray?.includes(item.anio));
        const result = filteredArray?.flatMap(item => item.data);
        setResultData(result);
        if(result.length>0){
            setGrpconfig({
                labels: result.map(data => data.month),
                datasets: [
                {
                    label: "Ventas Anuales",
                    data: result?.map(data => data.venta),
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
        const filteredArray = orderedData?.filter(item => anio?.includes(item.anio));
        const result = filteredArray.flatMap(item => item.data);
        setResultData(result);
        setGrpconfig({
            labels: result.map(data => data.month),
            datasets: [
              {
                label: "Ventas Anuales",
                data: result?.map(data => data.venta),
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
    }, [UserData, empresa, anio]);

    useEffect(() => {
        if(aniosSelected.length === 1){
            setTitle('Gráfico de Ventas año ' + aniosSelected[0].title );
        }
        else if(aniosSelected.length > 1){
            setTitle('Gráfico de Ventas año ' + aniosSelected.map(item => item.title).join(', '));
        }
        else{
           setTitle('Gráfico de Ventas');
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
                <Grid item xs={12}> 
                    <Autocomplete
                        multiple
                        id="anios-ventas"
                        value={aniosSelected}
                        onChange={(event, newValue) => {
                            setAniosSelected([
                            ...newValue.filter((option) => !fixedOptions.includes(option)),
                            ]);
                        }}
                        options={anios}
                        getOptionLabel={(option) => option.title}
                        renderTags={(tagValue, getTagProps) =>
                            tagValue.map((option, index) => {
                            const { key, ...tagProps } = getTagProps({ index });
                            return (
                                <Chip
                                    key={key}
                                    label={option.title}
                                    {...tagProps}
                                    disabled={fixedOptions.includes(option)}
                                />
                            );
                            })
                        }
                        style={{ width: '100%' }}
                        renderInput={(params) => (
                            <TextField {...params} label="Años seleccionados" placeholder="Año" variant="standard"/>
                        )}
                    />
                </Grid>
            </Grid>
            <LineChart chartData={grpconfig} title={title}/> 
        </> : null
}