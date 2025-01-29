import { useEffect, useState } from 'react';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/material/Grid';
import { empresas as emps } from '../../mock/empresas.json';
import { graficos } from '../../mock/graficos.json';
import VentasAnual  from './grpemp/ventasAnual.jsx';
import UtilidadMesAnual from './grpemp/utilidadMesAnual.jsx';
import UtilidadMes from './grpemp/utilidadMes.jsx';
import UtilidadYTD from './grpemp/utilidadYTD.jsx';

export default function Main () {    
    const [empresas, setEmpresas] = useState([]);
    const [empresa, setEmpresa] = useState('');
    //const fixedOptions = [graficos[1]];
    const fixedOptions = [];
    const [value, setValue] = useState([...fixedOptions, graficos[6], graficos[2]]);

    useEffect(() => {
        setEmpresas(emps);
        setEmpresa(emps[0].label);
    }, []);


    return (
        <section className="main bg-white w-full px-10 pt-4 pb-20">
            <h2 className="text-2xl font-light">Personalización del Dashboard </h2>
            <div className="pt-4 mt-4 space-y-2 font-medium border-t border-purple-300 pb-4"></div>
            <div className='flex align-bottom gap-6 pb-4'>
                <Autocomplete
                    disablePortal
                    disableClearable={true}
                    id="empresas"
                    value={empresa}
                    options={empresas}
                    sx={{ width: 300}}
                    renderInput={(params) => <TextField {...params} label="Empresa" variant="standard"/>}
                />
                <Autocomplete
                    multiple
                    disableClearable={true}
                    id="graficos"
                    value={value}
                    onChange={(event, newValue) => {
                        setValue([
                        ...fixedOptions,
                        ...newValue.filter((option) => !fixedOptions.includes(option)),
                        ]);
                    }}
                    options={graficos}
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
                    style={{ width: 500 }}
                    renderInput={(params) => (
                        <TextField {...params} label="Gráficos autorizados" placeholder="Gráfico" variant="standard"/>
                    )}
                />
                <button className="bg-[#68488a] hover:bg-[#424685] transition-all text-white font-bold py-2 px-10 rounded"> Guardar </button>
            </div>
            <h2 className="text-2xl font-light pb-2 pt-4">Visualización del Dashboard </h2>
            <div className="pt-4 mt-4 space-y-2 font-medium border-t border-purple-300"></div>            
            <Grid container spacing={4}>
                <Grid item xs={6}>                    
                    <VentasAnual empresa={empresa} anio={[2024,2022]} />
                </Grid>
                <Grid item xs={6}>                    
                    <UtilidadMes empresa={empresa} anio={[2024]} mes={[11]} />
                </Grid>
                <Grid item xs={8}>
                    <UtilidadMesAnual empresa={empresa} anio={[2024]} />
                </Grid>
                <Grid item xs={4}>                    
                    <UtilidadYTD empresa={empresa} anio={[2024]} mes={[11]}/>
                </Grid>
            </Grid>                    
        </section>
    );
}