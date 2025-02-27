/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { Suspense, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/material/Grid2';
import Graphtype1 from './dashboard/graphtype1.jsx';
import Graphtype2 from './dashboard/graphtype2.jsx';
import Graphtype3 from './dashboard/graphtype3.jsx';
import Loading from '../loading.jsx';

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

export default function DashBoard({data, mes, user, empresas, empresa, setEmpresa, menu}){
  const [datosFiltrados, setDatosFiltrados] = useState([]);
  const [sumaNiveles, setSumaNiveles] = useState([]);
  const [sumaNivelesFitrado, setSumaNivelesFiltrado] = useState([]);
  const [anioSelected, setAnioSelected] = useState([]);
  const [mesSelected, setMesSelected] = useState();
  const [Anios, setAnios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if(data?.data?.length>0 && data?.data[0]?.anio && mes){
      const Anios = data?.data?.map(item => (
        { label: `${item.anio}`, year: item.anio }
      ));
      const selectdMes = meses?.filter(item => item.month === mes[0]).sort((a, b) => a.month - b.month)
      setMesSelected(selectdMes);
      const aSelected = Anios && Anios[Anios?.length - 1] ? [Anios[Anios?.length - 1]] : [];
      setAnios(Anios);
      setAnioSelected(aSelected);
      const DatosFiltrados = data?.data?.filter(item => item.anio === aSelected[0]?.year)[0]?.data || []; 
      const result = processData(data?.data) || [];
      setDatosFiltrados(DatosFiltrados);
      setSumaNiveles(result);
      const resultFiltrado = result.filter(item => item.year === aSelected[0]?.year) || [];
      setSumaNivelesFiltrado(resultFiltrado);
      setLoading(false);
    }
  }, [data, empresa, menu, mes]);

  return (
    loading ? <Loading /> :
      data?.data?.length>0 && data?.data[0]?.anio && anioSelected[0] && mesSelected[0] ?
        <Grid container spacing={1}>
          <Grid size={{ xs: 12, xl: 4 }} className='sticky !-top-3 bg-white z-10 opacity-85 !pt-2'>
            <Autocomplete
              disablePortal
              disableClearable={true}
              id="graficos-anios"
              value={anioSelected[0]}
              options={Anios}
              sx={{ width: "100%"}}
              onChange={(event, newValue) => {
                  setAnioSelected([
                      newValue,
                  ]);
              }}

              renderInput={(params) => <TextField {...params} label="Año a visualizar" variant="standard"/>}
            />
          </Grid>
          <Grid size={{ xs: 12, xl: 4 }} className='sticky !-top-3 bg-white z-10 opacity-85 !pt-2'>
            <Autocomplete
              disablePortal
              disableClearable={true}
              id="graficos-meses"
              value={mesSelected[0]?.label}
              options={meses}
              sx={{ width: "100%"}}
              onChange={(event, newValue) => {
                  setMesSelected([
                      newValue,
                  ]);
              }}

              renderInput={(params) => <TextField {...params} label="Mes" variant="standard"/>}
            />
          </Grid>{  
            user?.PER_Id === 1 ?
              <Grid size={{ xs: 12, xl: 4 }} className='sticky !-top-3 bg-white z-10 opacity-85 !pt-2'>
                <Autocomplete
                  disablePortal
                  disableClearable={true}
                  id="empresas"
                  value={empresa}
                  options={empresas}
                  onChange={(event, newValue) => {setEmpresa(newValue)}}
                  sx={{ width: "100%"}}
                  renderInput={(params) => <TextField {...params} label="Empresa" variant="standard" />}
                />
              </Grid>
            : <Grid size={{ xs: 12, xl: 4 }}/>
            }{
              ((user?.PER_Id === 1 && empresa?.tipografico === 1) || (user?.PER_Id > 1 && user?.EMP_TipoGrafico === 1))  &&
                <Suspense fallback={<Loading />}>
                  <Graphtype1 anioSelected={anioSelected} mes={[mesSelected[0]?.month]} datosFiltrados={datosFiltrados} sumaNiveles={sumaNiveles} sumaNivelesFitrado={sumaNivelesFitrado} Anios={Anios}/>
                </Suspense>
            }{
              ((user?.PER_Id === 1 && empresa?.tipografico === 2) || (user?.PER_Id > 1 && user?.EMP_TipoGrafico === 2))  &&
                <Suspense fallback={<Loading />}>
                  <Graphtype2 anioSelected={anioSelected} mes={[mesSelected[0]?.month]} datosFiltrados={datosFiltrados} sumaNiveles={sumaNiveles} sumaNivelesFitrado={sumaNivelesFitrado} Anios={Anios}/>
                </Suspense>
            }{
              ((user?.PER_Id === 1 && empresa?.tipografico === 3) || (user?.PER_Id > 1 && user?.EMP_TipoGrafico === 3))  &&
                <Suspense fallback={<Loading />}>
                  <Graphtype3 anioSelected={anioSelected} mes={[mesSelected[0]?.month]} datosFiltrados={datosFiltrados} sumaNiveles={sumaNiveles} sumaNivelesFitrado={sumaNivelesFitrado} Anios={Anios}/>
                </Suspense>
            }
        </Grid>
    : 
      <>
        <Grid container spacing={1}>
          {  
            user?.PER_Id === 1 ?
              <Grid size={{ xs: 12, xl: 4 }} className='sticky !-top-3 bg-white z-10 opacity-85 !pt-2'>
                <Autocomplete
                  disablePortal
                  disableClearable={true}
                  id="empresas"
                  value={empresa}
                  options={empresas}
                  onChange={(event, newValue) => {setEmpresa(newValue)}}
                  sx={{ width: "100%"}}
                  renderInput={(params) => <TextField {...params} label="Empresa" variant="standard" />}
                />
              </Grid>
            : <Grid size={{ xs: 12, xl: 4 }}/>
            }
        </Grid>
        <div className="flex justify-center items-center h-96">
          <p className="text-2xl font-semibold">No hay datos para mostrar</p>
        </div>
      </>
  );
}