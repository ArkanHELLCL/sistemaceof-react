import { useEffect, useState } from 'react';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
//import ChartArea from './graficos/chartArea.jsx';
import BarChart from './graficos/barChart.jsx';
import Grid from '@mui/material/Grid';

import { empresas as emps } from '../../mock/empresas.json';
import { graficos } from '../../mock/graficos.json';
import { UserData } from '../../mock/data.js';

export default function Main () {    
    const [empresas, setEmpresas] = useState([]);
    const [empresa, setEmpresa] = useState('');
    //const fixedOptions = [graficos[1]];
    const fixedOptions = [];
    const [value, setValue] = useState([...fixedOptions, graficos[6], graficos[2]]);

    useEffect(() => {
        setEmpresas(emps);
        setEmpresa(emps[0]);
    }, []);

    const [userData, setUserData] = useState({
        labels: UserData.map((data) => data.month),
        datasets: [
          {
            label: "Users Gained",
            data: UserData.map((data) => data.venta),
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
          },
        ],
      });

    return (
        <section className="main bg-white w-full px-10 pt-4 pb-20">
            <h2 className="text-2xl font-light">Personalización del Dashboard </h2>
            <div className="pt-4 mt-4 space-y-2 font-medium border-t border-purple-300 pb-4"></div>
            <div className='flex align-bottom gap-6 pb-4'>
                <Autocomplete
                    disablePortal
                    id="empresas"
                    value={empresa}
                    options={empresas}
                    sx={{ width: 300}}
                    renderInput={(params) => <TextField {...params} label="Empresa" variant="standard"/>}
                />
            
                <Autocomplete
                    multiple
                    id="fixed-tags-demo"
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
            <Grid container spacing={2}>
                <Grid item xs={6} className='h-[400px]'>
                    <BarChart chartData={userData} title={'Gráfico de Ventas'}/>
                </Grid>
                <Grid item xs={6} className='h-[400px]'>
                    <BarChart chartData={userData} title={'Gráfico 2'}/>
                </Grid>
                <Grid item xs={12} className='h-[600px] w-full'>
                    <BarChart chartData={userData} title={''} />
                </Grid>
            </Grid>
                            
        </section>
    );
}