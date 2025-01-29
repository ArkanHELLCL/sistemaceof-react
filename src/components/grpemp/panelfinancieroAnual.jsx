import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/material/Grid';

const anios = [
    { "label": "2022", "year": 2022 },
    { "label": "2023", "year": 2023 },
    { "label": "2024", "year": 2024 },
    { "label": "2025", "year": 2025 }
]

export default function PanelFinancieroAnual({anio}){
    const selectedAnios = anios?.filter(item => item.year === anio[0]).sort((a, b) => a.year - b.year)
    const [aniosSelected, setAniosSelected] = useState(selectedAnios);
    const [title, setTitle] = useState('Panel Financiero');

    useEffect(() => {
        if(aniosSelected.length === 1){
            setTitle('Panel Financiero ' + ' año ' + aniosSelected[0].label );
        }        
        else{
           setTitle('Panel Financiero');
        }
    }, [aniosSelected]);

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
                    <table id="panelfinanciero">
                        <thead>
                            <tr>
                                <th rowSpan="2">Panel de Finanzas</th>
                                <th colSpan="5">RESULTADO DE NOVIEMBRE</th>
                                <th colSpan="3">YTD_NOV</th>
                            </tr>
                            <tr>
                                
                                <th rowSpan="2">Real 2024</th>
                                <th rowSpan="2">Mes Ant. OCTUBRE</th>
                                <th rowSpan="2">Crec. Mes Ant.</th>
                                <th rowSpan="2">Real 2023</th>
                                <th rowSpan="2">Crec. Año Ant.</th>
                                <th colSpan="3">Acumulado de Enero a Noviembre</th>
                            </tr>
                            <tr>
                                <th>(Pesos)</th>
                                <th>Real 2024</th>
                                <th> Año 2023</th>
                                <th>Crec.</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Costos de Explotación</td>
                                <td>0</td>
                                <td>-250000</td>
                                <td>100%</td>
                                <td>0</td>
                                <td>0%</td>
                                <td>-295440</td>
                                <td>0</td>
                                <td>0%</td>
                            </tr>
                            <tr>
                                <td>Margen de Explotación</td>
                                <td>8996759</td>
                                <td>2750000</td>
                                <td>227%</td>
                                <td>0</td>
                                <td>0%</td>
                                <td>41450319</td>
                                <td>0</td>
                                <td>0%</td>
                            </tr>
                            <tr>
                                <td>% Margen Explotación</td>
                                <td>100%</td>
                                <td>92%</td>
                                <td>9%</td>
                                <td>0%</td>
                                <td>0%</td>
                                <td>99%</td>
                                <td>0%</td>
                                <td>0%</td>
                            </tr>
                            <tr>
                                <td>Gastos Remuneraciones</td>
                                <td>-7416688</td>
                                <td>-655188</td>
                                <td>1032%</td>
                                <td>0%</td>
                                <td>0%</td>
                                <td>-20154783</td>
                                <td>0%</td>
                                <td>0%</td>
                            </tr>
                            <tr>
                                <td>Gastos Mantención</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0%</td>
                                <td>0</td>
                                <td>0%</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0%</td>
                            </tr>
                            <tr>
                                <td>Otros Gastos</td>
                                <td>-1760335</td>
                                <td>-10389053</td>
                                <td>83%</td>
                                <td>0</td>
                                <td>0%</td>
                                <td>-16778100</td>
                                <td>0</td>
                                <td>0%</td>
                            </tr>
                            <tr>
                                <td>Gastos de Adm. y Ventas</td>
                                <td>-9177023</td>
                                <td>-11044241</td>
                                <td>17%</td>
                                <td>0</td>
                                <td>0%</td>
                                <td>-36932883</td>
                                <td>0</td>
                                <td>0%</td>
                            </tr>
                            <tr>
                                <td>Resultado Operacional</td>
                                <td>-180264</td>
                                <td>-8294241</td>
                                <td>98%</td>
                                <td>0</td>
                                <td>0%</td>
                                <td>4517436</td>
                                <td>0</td>
                                <td>0%</td>
                            </tr>
                            <tr>
                                <td>% ROP</td>
                                <td>-2%</td>
                                <td>-276%</td>
                                <td>99%</td>
                                <td>0%</td>
                                <td>0%</td>
                                <td>11%</td>
                                <td>0%</td>
                                <td>0%</td>
                            </tr>
                            <tr>
                                <td>Ingresos No Operacionales</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0%</td>
                                <td>0</td>
                                <td>0%</td>
                                <td>-350000</td>
                                <td>0</td>
                                <td>0%</td>
                            </tr>
                            <tr>
                                <td>Utilidad</td>
                                <td>-180264</td>
                                <td>-8294241</td>
                                <td>98%</td>
                                <td>0</td>
                                <td>0%</td>
                                <td>4167436</td>
                                <td>0,0%</td>
                                <td>0,0%</td>
                            </tr>
                            <tr>
                                <td>% Utilidad</td>
                                <td>-2%</td>
                                <td>-276,5%</td>
                                <td>99,3%</td>
                                <td>0,0%</td>
                                <td>0,0%</td>
                                <td>10,0%</td>
                                <td>0,0%</td>
                                <td>0,0%</td>
                            </tr>
                            <tr>
                                <td>Ratio Costos Expl.</td>
                                <td>0%</td>
                                <td>8%</td>
                                <td>-100%</td>
                                <td>0%</td>
                                <td>0%</td>
                                <td>1%</td>
                                <td>0%</td>
                                <td>0%</td>
                            </tr>
                            <tr>
                                <td>Ratio Mano de Obra</td>
                                <td>82%</td>
                                <td>22%</td>
                                <td>277%</td>
                                <td>0%</td>
                                <td>0%</td>
                                <td>48%</td>
                                <td>0%</td>
                                <td>0%</td>
                            </tr>
                            <tr>
                                <td>Ratio Gastos Adm y Vta.</td>
                                <td>102%</td>
                                <td>368%</td>
                                <td>-72%</td>
                                <td>0%</td>
                                <td>0%</td>
                                <td>88%</td>
                                <td>0%</td>
                                <td>0%</td>
                            </tr>
                        </tbody>
                    </table>
                </Grid>
            </Grid>            
        </>
    )
}