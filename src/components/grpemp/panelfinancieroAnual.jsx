/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/material/Grid';
import PanelFinancieroTable from '../graficos/panelfinancieroTable';
import { UserData } from '../../../mock/data7.js';

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

export default function PanelFinancieroAnual({anio, mes}){
    const selectdMes = meses?.filter(item => item.month === mes[0]).sort((a, b) => a.month - b.month)
    const [mesSelected, setMesSelected] = useState(selectdMes);
    const [title, setTitle] = useState('Panel Financiero');
    const [resultData, setResultData] = useState([]);

    useEffect(() => {
        const filteredArray = UserData?.filter(item => item.anio === anio[0])[0].data.filter(item => item.month === mesSelected[0].month)[0].rows;
        setResultData(filteredArray);
        
    }, [mesSelected, anio]);
    
    useEffect(() => {
        const filteredArray = UserData?.filter(item => item.anio === anio[0])[0].data.filter(item => item.month === mes[0])[0].rows;
        setResultData(filteredArray);
        
    }, [UserData, anio, mes]);

    useEffect(() => {
        if(anio.length === 1){
            setTitle('Panel Financiero ' + ' mes ' + mesSelected[0].label + ' año ' + anio[0]  );
        }        
        else{
           setTitle('Panel Financiero');
        }
    }, [anio, mesSelected]);

    return (
        <>
            <Grid container spacing={2} className='pb-20'>
                <Grid item xs={12} className='pb-4'>
                    <div className="flex justify-center rounded-xl bg-[#4cbab5] text-white shadow-md py-4 align-middle">
                        <h2 className="text-2xl font-light text-center">{title}</h2>
                    </div>
                </Grid>
                <Grid item xs={3}> 
                    <Autocomplete
                        disablePortal
                        disableClearable={true}
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
                <Grid item xs={12}>                  
                    <PanelFinancieroTable anio={anio[0]} mes={mesSelected[0].label} anioant={anio[0]-1} mesant={meses[mesSelected[0].month-2].label} rangomes={'Enero a Noviembre'} data={resultData} />
                </Grid>
            </Grid>            
        </>
    )
}