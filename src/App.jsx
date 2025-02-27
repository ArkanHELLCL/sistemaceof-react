/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { Suspense, useEffect, useState } from 'react';
import Header from './components/header.jsx'
import Sidebar from './components/sidebar.jsx'
import Footer from './components/footer.jsx'
import Main from './components/main.jsx';
import Papa from 'papaparse';
import Loading from './components/loading.jsx';

function App() {
  const [title, setTitle] = useState('Dashboard');
  const [user, setUser] = useState();
  const [data, setData] = useState({});
  const [dataFormatted, setDataFormatted] = useState();
  const [headers, setHeaders] = useState([]);
  const [mesfinal, setMesFinal] = useState();
  const [menu, setMenu] = useState({"Dashboard" : true});
  const [empresas, setEmpresas] = useState([]);
  const [graficos, setGraficos] = useState([]);
  const [empresa, setEmpresa] = useState('');
  const [loading, setLoading] = useState(true);

  const VITE_API_GETEMPRESAS_URL = import.meta.env.VITE_API_GETEMPRESAS_URL;
  const VITE_API_GETUSUARIO_URL = import.meta.env.VITE_API_GETUSUARIO_URL;
  const VITE_API_GETGRAFICOS_URL = import.meta.env.VITE_API_GETGRAFICOS_URL;
  const VITE_API_GETBASECSV_URL = import.meta.env.VITE_API_GETBASECSV_URL;
  const VITE_CSVCONVERT_DOWNLOAD = import.meta.env.VITE_CSVCONVERT_DOWNLOAD;

  const getEmpresas = () => {
    fetch(`${VITE_API_GETEMPRESAS_URL}`)
    .then(response => response.json())
    .then(emps => {
      setEmpresas(emps.data)
      setEmpresa(emps.data[0])
      //getGraficos(emps.data[0]);
      //getBasecsv(emps.data[0]);
    })
    .finally(() => {
    })
    //.catch(error => window.location.href = 'https://ceofconsultores.com/system/');
    .catch(error => {
      setEmpresas([])
      setEmpresa([])
    });
  }

  const getGraficos = (empresa) => {
    if(empresa?.id===undefined) return;
    fetch(`${VITE_API_GETGRAFICOS_URL}?emp_id=${empresa?.id}`)
    .then(response => response.json())
    .then(grp => {        
      setGraficos(grp.data)
    })
    .finally(() => {
    })
    //.catch(error => window.location.href = 'https://ceofconsultores.com/system/');
    .catch(error => {
      setGraficos([])
    });
  }

  const getBasecsv = (empresa) => {
    if(empresa?.id===undefined) {
      setData({});
      setMesFinal(null);
      return;
    }
    setLoading(true);
    Papa.parse(`${VITE_API_GETBASECSV_URL}?file_id=${empresa?.id}`, { 
      worker: true, 
      download: VITE_CSVCONVERT_DOWNLOAD,
      skipEmptyLines: true,
      complete: function(results) {
        let meses = [];
        //if(results?.data[0] === undefined) {
        if(results?.errors.length > 0) {
          setData({});
          setMesFinal(null);
          setLoading(false);
          return
        }        
        const idxMes = results.data[0]?.indexOf('N_MES') || null;
        if(idxMes===null) {
          setData({});
          setMesFinal(null);
          return;
        }
        setData(results);
        meses = results.data?.slice(1).map(row => row[idxMes]) || [];
        setMesFinal(parseInt(meses[meses.length - 1]));
        setLoading(false);
      },
      error: function(err, file, inputElem, reason)
      {
        //window.location.href = 'https://ceofconsultores.com/system/'
        setData({"data":[]});
        setMesFinal(null);
        setLoading(false);
        return;
      },
    });    
  }
  
  //usuario
  useEffect(() => {
    fetch(`${VITE_API_GETUSUARIO_URL}`)
      .then(response => response.json())
      .then(usr => {        
        setUser(usr.data[0])
      })
      .finally(() => {
      })
      .catch(error => window.location.href = 'https://ceofconsultores.com/system/');
      /*.catch(error => {
        setUser([])
      );*/
  }, []);  

  useEffect(() => {
    if(user?.PER_Id === 1){
      getEmpresas();
    }else{
      if(user?.EMP_Id!==undefined && user?.PER_Id >= 2){
        setEmpresa({id:user?.EMP_Id,label:user?.EMP_Descripcion,tipografico:user?.EMP_TipoGrafico});
      }
    }
  },[user])

  //data
  useEffect(() => {
    if(empresa?.id!==undefined){
      getGraficos(empresa);
      getBasecsv(empresa);
    }
  },[empresa])

useEffect(() => {
  if(data?.data ===  undefined) return;
  const Headers = data?.data[0] || [];
  const rows = data?.data?.slice(1) || [];
  setHeaders(Headers);

  const formattedData = rows?.map(row => {
      const obj = {};
      Headers.forEach((header, index) => {
          obj[header] = row[index];
      });
      return obj;
  },[data]);

  const grouped = formattedData?.reduce((acc, item) => {
      const anio = item["ANO"];
      const resultado = item["RESULTADO"];
      const nivel1 = item["NIVEL 1"];
      const nivel2 = item["NIVEL 2"];
      const cuenta = item["CUENTA"];
      const mes = item["N_MES"];
      const monto = parseFloat(item["REAL " + anio]?.replaceAll('.', '').replaceAll(',', '.'));
  
      // Crear la estructura si no existe
      if (!acc[anio]) acc[anio] = {data:{}};
      if (!acc[anio].data[resultado]) acc[anio].data[resultado] = { total: 0, data: {} };
      if (!acc[anio].data[resultado].data[nivel1]) acc[anio].data[resultado].data[nivel1] = { total: 0, data: {} };
      if (!acc[anio].data[resultado].data[nivel1].data[nivel2]) acc[anio].data[resultado].data[nivel1].data[nivel2] = { total: 0, data: {} };
      if (!acc[anio].data[resultado].data[nivel1].data[nivel2].data[cuenta]) acc[anio].data[resultado].data[nivel1].data[nivel2].data[cuenta] = { total: 0, data: {} };  
      
      // Sumar los montos y acumular
      /*acc[anio].data[resultado].total += monto;
      acc[anio].data[resultado].data[nivel1].total += monto;
      acc[anio].data[resultado].data[nivel1].data[nivel2].total += monto;
      acc[anio].data[resultado].data[nivel1].data[nivel2].data[cuenta].total += monto;*/

      // Agregar el monto por mes
      if (!acc[anio].data[resultado].data[nivel1].data[nivel2].data[cuenta].data[mes]) {
          acc[anio].data[resultado].data[nivel1].data[nivel2].data[cuenta].data[mes] = 0;
      }
      acc[anio].data[resultado].data[nivel1].data[nivel2].data[cuenta].data[mes] += monto;
      return acc;
  }, {});

  if(grouped){
      const resultpivot = {
          data: Object.keys(grouped).map(anio => ({
              anio: parseInt(anio),                    
              data: Object.keys(grouped[anio].data).map(resultado => ({
                  Resultado: resultado.split(' ')[0].trim(),
                  label: resultado.substring(resultado.indexOf(' ') + 1).trim(),
                  Total: grouped[anio].data[resultado].total, // Monto acumulado para el Resultado
                  data: Object.keys(grouped[anio].data[resultado].data).map(nivel1 => ({
                      "Nivel 1": nivel1.split(' ')[0].trim(),
                      label: nivel1.substring(nivel1.indexOf(' ') + 1).trim(),
                      Total: grouped[anio].data[resultado].data[nivel1].total, // Monto acumulado para Nivel 1
                      data: Object.keys(grouped[anio].data[resultado].data[nivel1].data).map(nivel2 => ({
                          "Nivel 2": nivel2.split(' ')[0].trim(),
                          label: nivel2.substring(nivel2.indexOf(' ') + 1).trim(),
                          Total: grouped[anio].data[resultado].data[nivel1].data[nivel2].total, // Monto acumulado para Nivel 2
                          data: Object.keys(grouped[anio].data[resultado].data[nivel1].data[nivel2].data).map(cuenta => ({
                              Cuenta: cuenta,
                              Total: grouped[anio].data[resultado].data[nivel1].data[nivel2].data[cuenta].total, // Monto acumulado para Cuenta
                              data: Object.keys(grouped[anio].data[resultado].data[nivel1].data[nivel2].data[cuenta].data).map(mes => ({                                       
                                  month: anio + `-${mes}`,
                                  value: grouped[anio].data[resultado].data[nivel1].data[nivel2].data[cuenta].data[mes] // Monto por mes
                              }))
                          }))
                      }))
                  }))
              }))
          }))
      };

      // Convertir a JSON
      //const jsonResult = JSON.stringify(resultpivot, null, 4);
      setDataFormatted(resultpivot);     
  }
}, [data]);

  return (
    <main className="dashtemplate">{
      loading ? <Loading /> :
        <>
          <Header title={title} />
          <Sidebar setTitle={setTitle} user={user} setMenu={setMenu}/>
          <Footer user={user}/>
          <Main data={dataFormatted} mes={[mesfinal]} user={user} menu={menu} empresas={empresas} graficos={graficos} setGraficos={setGraficos} empresa={empresa} setEmpresa={setEmpresa}/>
        </>
    }
    </main>
  );
}

export default App;