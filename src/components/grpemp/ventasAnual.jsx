/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/material/Grid';
import { UserData } from '../../../mock/data.js';
import LineChart from '../graficos/lineChart.jsx';


export default function VentasAnual({empresa, anio, data, anios}){
    const [grpconfig, setGrpconfig] = useState({});         //Configuración del gráfico
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
        console.log(result, "resultventas")

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
        if(data.length>0 && anio.length === 1){            
            console.log(data, "dataVenta", anio[0])  
            const filteredArray = data?.filter(item => item.year === anio[0])[0]["nivel2"]['1.1.1. VENTAS NACIONALES'].months;
            console.log(filteredArray, "filteredArrayVenta")
            const result = filteredArray.slice(0,12).map((item,idx) => {
                const mes = idx+1;
                return {
                    month: anio[0] + '-' + mes,
                    venta: item
                }
            }
            );
            console.log(result, "resultventas")
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
                        above: 'rgba(238, 237, 248, 0.5)',
                        below: 'rgba(238, 237, 248, 0.5)'
                    },
                    borderWidth: 1,
                    tension: 0.5
                }
                ]
            })
        }
    }, [UserData, empresa, anio]);

    useEffect(() => {
        console.log(aniosSelected, "aniosSelected title")
        if(aniosSelected.length === 1){
            setTitle('Gráfico de Ventas Mensuales año ' + aniosSelected[0].label );
        }
        else if(aniosSelected.length > 1){  
            setTitle('Gráfico de Ventas Mensuales años ' + aniosSelected.map(item => item.label).join(', '));
        }
        else{
           setTitle('Gráfico de Ventas');
        }
    }, [aniosSelected,anio]);

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
                        getOptionLabel={(option) => option.label}
                        renderTags={(tagValue, getTagProps) =>
                            tagValue.map((option, index) => {
                            const { key, ...tagProps } = getTagProps({ index });
                            return (
                                <Chip
                                    key={key}
                                    label={option.label}
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