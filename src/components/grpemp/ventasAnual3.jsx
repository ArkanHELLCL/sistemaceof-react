/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/material/Grid2';
import LineChart from '../graficos/lineChart.jsx';

const bgcolor = [
    'rgba(238, 237, 248, 0.8)',
    'rgba(255, 159, 64, 0.2)',
    'rgba(255, 205, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(201, 203, 207, 0.2)',
    'rgba(233, 180, 257, 0.2)'
]

const bdcolor = [
    '#8e7cb9',
    'rgb(255, 159, 64)',
    'rgb(255, 205, 86)',
    'rgb(75, 192, 192)',
    'rgb(54, 162, 235)',
    'rgb(153, 102, 255)',
    'rgb(201, 203, 207)',
    'rgb(233, 180, 257)'
]

export default function VentasAnual3({data, anios}){
    const [grpconfig, setGrpconfig] = useState({});         //Configuración del gráfico
    const fixedOptions = [];
    const [aniosSelected, setAniosSelected] = useState([anios[anios.length-1]]);
    const [title, setTitle] = useState('Gráfico de Ventas');

    useEffect(() => {
        const yearArray = aniosSelected?.map(item => item?.year);
        let labels = [];
        let dataset = [];
        let filteredArray = data?.filter(item => 
            yearArray?.includes(item.year)).map(item => {
                const year = item.year;
                return (
                    item["nivel1"]['1.1.']?.months.slice(0,12).map((item, idx) => {
                        const mes = idx+1;
                        return {
                            month: year + '-' + mes,
                            venta: item
                        }
                    })
                )
            }
        )

        let result = filteredArray.flatMap(item => item);
        labels = result.map(data => data.month)
        dataset = [
            {
                label: "Ventas Totales",
                data: result?.map(data => data.venta),
                borderColor: "#6aa1d7",
                backgroundColor: "6aa1d7",                
                borderWidth: 1,
                tension: 0.5
            }
        ]

        filteredArray = data?.filter(item => 
            yearArray?.includes(item.year)).map(item => {
                const year = item.year;
                return (
                    item["nivel2"]['1.1.1.']?.months.slice(0,12).map((item, idx) => {
                        const mes = idx+1;
                        return {
                            month: year + '-' + mes,
                            venta: item
                        }
                    })
                )
            }
        )

        result = filteredArray.flatMap(item => item);
        labels = result.map(data => data.month)
        dataset.push(
            {
                label: "Ventas Nacionales",
                data: result?.map(data => data.venta),
                borderColor: "#3f3088",
                backgroundColor: "#3f3088",                
                borderWidth: 1,
                tension: 0.5
            }
        )

        filteredArray = data?.filter(item => 
            yearArray?.includes(item.year)).map(item => {
                const year = item.year;
                return (
                    item["nivel2"]['1.1.2.']?.months.slice(0,12).map((item, idx) => {
                        const mes = idx+1;
                        return {
                            month: year + '-' + mes,
                            venta: item
                        }
                    })
                )
            }
        )

        result = filteredArray.flatMap(item => item);
        labels = result.map(data => data.month)
        dataset.push(
            {
                label: "Ventas Paypal",
                data: result?.map(data => data.venta),
                borderColor: "#39bbd2",
                backgroundColor: "#39bbd2",                
                borderWidth: 1,
                tension: 0.5
            }
        )

        if(dataset.length>0){
            setGrpconfig({
                labels: labels,
                datasets: dataset
            })
        }

    }, [data, aniosSelected]);

    useEffect(() => {
        if(aniosSelected?.length === 1){
            setTitle('Gráfico de Ventas Mensuales año ' + aniosSelected[0]?.label );
        }
        else if(aniosSelected?.length > 1){  
            setTitle('Gráfico de Ventas Mensuales años ' + aniosSelected?.map(item => item?.label).join(', '));
        }
        else{
           setTitle('Gráfico de Ventas');
        }
    }, [aniosSelected]);

    return grpconfig ? 
        <>
            <Grid container spacing={2} className='pb-4'>
                <Grid size={{ xs: 12, xl: 12 }} className='pb-4'>
                    <div className="flex justify-center rounded-xl bg-[#06a7d7] text-white shadow-md py-4 align-middle">
                        <h2 className="text-2xl font-light text-center">{title}</h2>
                    </div>
                </Grid>
                <Grid size={{ xs: 12, xl: 12 }}>
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
                        getOptionLabel={(option) => option.label}
                        renderTags={(tagValue, getTagProps) =>
                            tagValue.map((option, index) => {
                            const { key, ...tagProps } = getTagProps({ index });
                            return (
                                <Chip
                                    key={key}
                                    label={option?.label}
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
                <Grid size={{ xs: 12, xl: 12 }} sx={{height: '400px'}}>
                    <LineChart chartData={grpconfig} title={title}/>
                </Grid>
            </Grid>
        </> : null
}