/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/material/Grid';
import VentasAnual  from '../grpemp/ventasAnual.jsx';
import UtilidadMesAnual from '../grpemp/utilidadMesAnual.jsx';
import UtilidadMes from '../grpemp/utilidadMes.jsx';
import UtilidadYTD from '../grpemp/utilidadYTD.jsx';
import RemuneracionesAnual from '../grpemp/remuneracionesAnual.jsx';
import GoaAnual from '../grpemp/goaAnual.jsx';
import PanelFinancieroAnual from '../grpemp/panelfinancieroAnual.jsx';
import CuboAnual from '../grpemp/cuboAnual.jsx';

const processData = (data) => {
    const result = [];
  
    data.forEach(yearData => {
      const year = yearData.anio;
      const yearResult = {
        year,
        resultado: {},
        nivel1: {},
        nivel2: {},
        total: { months: Array(13).fill(0) } // 12 months + 1 total
      };
  
      yearData.data.forEach(item => {
        const resultado = item.Resultado;
        if (!yearResult.resultado[resultado]) {
          yearResult.resultado[resultado] = { total: 0, months: Array(13).fill(0) }; // 12 months + 1 total
        }
        yearResult.resultado[resultado].total += item.Total;
  
        item.data.forEach(n1 => {
          const nivel1 = n1["Nivel 1"];
          if (!yearResult.nivel1[nivel1]) {
            yearResult.nivel1[nivel1] = { total: 0, months: Array(13).fill(0) }; // 12 months + 1 total
          }
          yearResult.nivel1[nivel1].total += n1.Total;
  
          n1.data.forEach(n2 => {
            const nivel2 = n2["Nivel 2"];
            if (!yearResult.nivel2[nivel2]) {
              yearResult.nivel2[nivel2] = { total: 0, months: Array(13).fill(0) }; // 12 months + 1 total
            }
            yearResult.nivel2[nivel2].total += n2.Total;
  
            n2.data.forEach(cuenta => {
              cuenta.data.forEach(mes => {
                const monthIndex = parseInt(mes.month.split('-')[1]) - 1;
                yearResult.resultado[resultado].months[monthIndex] += mes.value;
                yearResult.nivel1[nivel1].months[monthIndex] += mes.value;
                yearResult.nivel2[nivel2].months[monthIndex] += mes.value;
                yearResult.total.months[monthIndex] += mes.value;
              });
            });
          });
        });
  
        // Calcular el total anual para resultado, nivel1 y nivel2
        yearResult.resultado[resultado].months[12] = yearResult.resultado[resultado].months.slice(0, 12).reduce((acc, val) => acc + val, 0);
        Object.keys(yearResult.nivel1).forEach(nivel1 => {
          yearResult.nivel1[nivel1].months[12] = yearResult.nivel1[nivel1].months.slice(0, 12).reduce((acc, val) => acc + val, 0);
        });
        Object.keys(yearResult.nivel2).forEach(nivel2 => {
          yearResult.nivel2[nivel2].months[12] = yearResult.nivel2[nivel2].months.slice(0, 12).reduce((acc, val) => acc + val, 0);
        });
        yearResult.total.months[12] = yearResult.total.months.slice(0, 12).reduce((acc, val) => acc + val, 0);
      });
  
      result.push(yearResult);
    });
  
    return result;
};

export default function DashBoard({data, mes, user, empresas, graficos, setGraficos, empresa, setEmpresa}){
    const fixedOptions = [];
    const [datosFiltrados, setDatosFiltrados] = useState([]);
    const [sumaNiveles, setSumaNiveles] = useState([]);
    const [sumaNivelesFitrado, setSumaNivelesFiltrado] = useState([]);
    const Anios = data?.data?.map(item => (
        { label: `${item.anio}`, year: item.anio }
    ))
    const [anios, setAnios] = useState(Anios); 
    const [anioSelected, setAnioSelected] = useState([anios[anios?.length - 1]]);
    useEffect(() => {
        const DatosFiltrados = data?.data?.filter(item => item.anio === anioSelected[0].year)[0]?.data || []; 
        const result = processData(data?.data) || [];
        setDatosFiltrados(DatosFiltrados);
        setSumaNiveles(result);
        const resultFiltrado = result.filter(item => item.year === anioSelected[0].year) || [];
        setSumaNivelesFiltrado(resultFiltrado);
    }, [data, anios, anioSelected, empresas]);
    
    return ( 
        sumaNiveles && anios && sumaNivelesFitrado &&
        <>
          {            
            user?.PER_Id === 1 ?
              <>
                <h2 className="text-2xl font-light">Personalización del Dashboard </h2>
                <div className="pt-4 mt-4 space-y-2 font-medium border-t border-purple-300 pb-4"></div>
                <div className='flex align-bottom gap-6 pb-4'>
                  <Grid container spacing={4}>
                    <Grid item xl={5} xs={12}>
                        <Autocomplete
                            disablePortal
                            disableClearable={true}
                            id="empresas"
                            value={empresa}
                            options={empresas}
                            onChange={(event, newValue) => {setEmpresa(newValue)}}
                            sx={{ width: "100%"}}
                            renderInput={(params) => <TextField {...params} label="Empresa" variant="standard"/>}
                        />
                    </Grid>
                    <Grid item xl={5} xs={12}>
                        <Autocomplete
                            multiple
                            disableClearable={true}
                            id="graficos"
                            value={graficos || []}
                            onChange={(event, newValue) => {
                                setGraficos([
                                ...fixedOptions,
                                ...newValue.filter((option) => !fixedOptions.includes(option)),
                                ]);
                            }}
                            options={graficos || []}
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
                            sx={{ width: "100%"}}
                            renderInput={(params) => (
                                <TextField {...params} label="Gráficos autorizados" placeholder="Gráfico" variant="standard"/>
                            )}
                        />
                    </Grid>
                    <Grid item xl={2} xs={12}>
                        <button className="bg-[#68488a] hover:bg-[#424685] transition-all text-white font-bold py-2 px-10 rounded h-10"> Guardar </button>
                    </Grid>
                  </Grid>
                </div>
              </> : null
            }
            <h2 className="text-2xl font-light pb-2 pt-4">Visualización del Dashboard </h2>
            <div className="pt-4 mt-4 space-y-2 font-medium border-t border-purple-300 pb-6"></div>            
            <Grid container spacing={4}>
              <Grid item xl={6} xs={12} className='sticky !-top-3 bg-white z-10 opacity-85 !pt-2'>
                    <Autocomplete
                        disablePortal
                        disableClearable={true}
                        id="graficos-anios"
                        value={anioSelected[0]}
                        options={anios}
                        sx={{ width: "100%"}}
                        onChange={(event, newValue) => {
                            setAnioSelected([
                                newValue,
                            ]);
                        }}

                        renderInput={(params) => <TextField {...params} label="Año a visualizar" variant="standard"/>}
                    />
                </Grid>  
                <Grid item xl={6} xs={12}> 
                </Grid>                
                <Grid item xs={12} xl={4}>                    
                    <UtilidadMes anio={[anioSelected[0].year]} mes={mes} data={sumaNivelesFitrado}/>
                </Grid>
                <Grid item xs={12} xl={8}>
                    <VentasAnual data={sumaNiveles} anios={anios}/>
                </Grid>
                <Grid item xs={12} xl={8}>
                    <UtilidadMesAnual anio={[anioSelected[0].year]} data={sumaNivelesFitrado}/>
                </Grid>
                <Grid item xs={12} xl={4}>                    
                    <UtilidadYTD anio={[anioSelected[0].year]} mes={mes} data={sumaNivelesFitrado}/>
                </Grid>
                <Grid item xs={12} xl={12}>                    
                    <RemuneracionesAnual anio={[anioSelected[0].year]} data={sumaNivelesFitrado}/>
                </Grid>
                <Grid item xs={12} xl={12}>                    
                    <GoaAnual anio={[anioSelected[0].year]} data={sumaNivelesFitrado}/>
                </Grid>
                <Grid item xs={12} xl={12}>                    
                    <PanelFinancieroAnual anio={[anioSelected[0].year]} mes={mes} data={sumaNiveles}/>
                </Grid>
                <Grid item lg={12} xs={12}>
                    <CuboAnual anio={[anioSelected[0].year]} data={datosFiltrados} sumaNiveles={sumaNivelesFitrado}/>
                </Grid>
            </Grid>                    
          </>
    );
}