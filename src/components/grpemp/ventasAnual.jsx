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
                    borderColor: '#8e7cb9',
                    backgroundColor: 'rgba(238, 237, 248, 0.8)',
                    fill: {
                        target: 'origin',
                        above: 'rgba(238, 237, 248, 0.5)',   // Area will be red above the origin
                        below: 'rgba(238, 237, 248, 0.5)'    // And blue below the origin
                    },
                    borderWidth: 1,
                    tension: 0.5
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
                label: "Ventas Mensuales",
                data: result?.map(data => data.venta),
                borderColor: '#8e7cb9',
                backgroundColor: 'rgba(238, 237, 248, 0.8)',
                fill: {
                    target: 'origin',
                    above: 'rgba(238, 237, 248, 0.5)',   // Area will be red above the origin
                    below: 'rgba(238, 237, 248, 0.5)'    // And blue below the origin
                },
                borderWidth: 1,
                tension: 0.5
              }
            ]
        })
    }, [UserData, empresa, anio]);

    useEffect(() => {
        if(aniosSelected.length === 1){
            setTitle('Gráfico de Ventas Mensuales año ' + aniosSelected[0].title );
        }
        else if(aniosSelected.length > 1){
            setTitle('Gráfico de Ventas Mensuales años ' + aniosSelected.map(item => item.title).join(', '));
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
                        disableClearable={true}
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
                <Grid item xs={12} sx={{height: '400px'}}>
                    <LineChart chartData={grpconfig} title={title}/>
                </Grid>
            </Grid>
        </> : null
}