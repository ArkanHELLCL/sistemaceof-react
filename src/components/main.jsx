/* eslint-disable react/prop-types */
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
import RemuneracionesAnual from './grpemp/remuneracionesAnual.jsx';
import GoaAnual from './grpemp/goaAnual.jsx';
import PanelFinancieroAnual from './grpemp/panelfinancieroAnual.jsx';
import CuboAnual from './grpemp/cuboAnual.jsx';

/*
const processData = (data) => {
    const result = {
      resultado: {},
      nivel1: {},
      nivel2: {}
    };
    
    data.forEach(item => {
      const resultado = item.Resultado;
      if (!result.resultado[resultado]) {
        result.resultado[resultado] = { total: 0, months: Array(12).fill(0) };
      }
      result.resultado[resultado].total += item.Total;

      item.data.forEach(n1 => {
        const nivel1 = n1["Nivel 1"];
        if (!result.nivel1[nivel1]) {
          result.nivel1[nivel1] = { total: 0, months: Array(12).fill(0) };
        }
        result.nivel1[nivel1].total += n1.Total;

        n1.data.forEach(n2 => {
          const nivel2 = n2["Nivel 2"];
          if (!result.nivel2[nivel2]) {
            result.nivel2[nivel2] = { total: 0, months: Array(12).fill(0) };
          }
          result.nivel2[nivel2].total += n2.Total;

          n2.data.forEach(cuenta => {
            cuenta.data.forEach(mes => {
              const monthIndex = parseInt(mes.month.split('-')[1]) - 1;
              result.resultado[resultado].months[monthIndex] += mes.value;
              result.nivel1[nivel1].months[monthIndex] += mes.value;
              result.nivel2[nivel2].months[monthIndex] += mes.value;
            });
          });
        });
      });
    });    

    return result;
};*/


const processData = (data) => {
    const result = {};

    data.forEach(yearData => {
      const year = yearData.anio;
      if (!result[year]) {
        result[year] = {
          resultado: {},
          nivel1: {},
          nivel2: {}
        };
      }

      yearData.data.forEach(item => {
        const resultado = item.Resultado;
        if (!result[year].resultado[resultado]) {
          result[year].resultado[resultado] = { total: 0, months: Array(12).fill(0) };
        }
        result[year].resultado[resultado].total += item.Total;

        item.data.forEach(n1 => {
          const nivel1 = n1["Nivel 1"];
          if (!result[year].nivel1[nivel1]) {
            result[year].nivel1[nivel1] = { total: 0, months: Array(12).fill(0) };
          }
          result[year].nivel1[nivel1].total += n1.Total;

          n1.data.forEach(n2 => {
            const nivel2 = n2["Nivel 2"];
            if (!result[year].nivel2[nivel2]) {
              result[year].nivel2[nivel2] = { total: 0, months: Array(12).fill(0) };
            }
            result[year].nivel2[nivel2].total += n2.Total;

            n2.data.forEach(cuenta => {
              cuenta.data.forEach(mes => {
                const monthIndex = parseInt(mes.month.split('-')[1]) - 1;
                result[year].resultado[resultado].months[monthIndex] += mes.value;
                result[year].nivel1[nivel1].months[monthIndex] += mes.value;
                result[year].nivel2[nivel2].months[monthIndex] += mes.value;
              });
            });
          });
        });
      });
    });

    return result;
  };


export default function Main ({data, headers}) {    
    const [empresas, setEmpresas] = useState([]);
    const [empresa, setEmpresa] = useState('');
    const fixedOptions = [];
    const [value, setValue] = useState([...fixedOptions, graficos[6], graficos[2]]);
    const [datosFiltrados, setDatosFiltrados] = useState([]);
    const [sumaNiveles, setSumaNiveles] = useState([]);
    const Anios = data.data.map(item => (
        { label: `${item.anio}`, year: item.anio }
    ))
    const [anios, setAnios] = useState(Anios); 
    const [anioSelected, setAnioSelected] = useState([anios[anios.length - 1]]);

    //const anioFiltrado = 2024; // Año que queremos filtrar
    
    console.log('dataPivotesAllYears', data);
    useEffect(() => {
        setEmpresas(emps);
        setEmpresa(emps[0].label);
        console.log('data', data);
        console.log('anioSelected', anioSelected);
        const DatosFiltrados = data.data?.filter(item => item.anio === 2024)[0].data;
        console.log('datosFiltrados', DatosFiltrados);
        
        const result = processData(data.data);
        setDatosFiltrados(DatosFiltrados);
        setSumaNiveles(result);
        console.log(result, 'result');
    }, [data, anios, anioSelected]);    

    /* */
    console.log('anioSelected[0]?.year', anioSelected);
    return ( 
        datosFiltrados && sumaNiveles && anios &&
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
            <   Grid item xs={6}> 
                    <Autocomplete
                        disablePortal
                        disableClearable={true}
                        id="utilidad-anios"
                        value={anios[anios.length - 1]}
                        options={anios}
                        sx={{ width: "100%"}}
                        onChange={(event, newValue) => {
                            setAnioSelected([
                                newValue,
                            ]);
                        }}

                        renderInput={(params) => <TextField {...params} label="Año" variant="standard"/>}
                    />
                </Grid>  
                <Grid item xs={6}> 
                </Grid>
                <Grid item xs={6}>                    
                    <VentasAnual empresa={empresa} anio={[anios[anios.length - 1].year]} data={data.data} anios={anios}/>
                </Grid>
                <Grid item xs={6}>                    
                    <UtilidadMes empresa={empresa} anio={[anios[anios.length - 1].year]} mes={[11]} data={datosFiltrados}/>
                </Grid>
                <Grid item xs={8}>
                    <UtilidadMesAnual empresa={empresa} anio={[anios[anios.length - 1].year]} data={datosFiltrados}/>
                </Grid>
                <Grid item xs={4}>                    
                    <UtilidadYTD empresa={empresa} anio={[anios[anios.length - 1].year]} mes={[11]} data={datosFiltrados}/>
                </Grid>
                <Grid item xs={12}>                    
                    <RemuneracionesAnual empresa={empresa} anio={[anios[anios.length - 1].year]} data={datosFiltrados}/>
                </Grid>
                <Grid item xs={12}>                    
                    <GoaAnual empresa={empresa} anio={[anios[anios.length - 1].year]} data={datosFiltrados}/>
                </Grid>
                <Grid item xs={12}>                    
                    <PanelFinancieroAnual empresa={empresa} anio={[anios[anios.length - 1].year]} mes={[11]} data={datosFiltrados}/>
                </Grid>
                <Grid item lg={12} xs={12}>
                    <CuboAnual empresa={empresa} anio={[anios[anios.length - 1].year]} data={datosFiltrados} headers={headers} />
                </Grid>
            </Grid>                    
        </section>
    );
}