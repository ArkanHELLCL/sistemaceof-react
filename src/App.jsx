/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import Header from './components/header.jsx'
import Sidebar from './components/sidebar.jsx'
import Footer from './components/footer.jsx'
import Main from './components/main.jsx';
import Papa from 'papaparse';

import Cubo from '../mock/data.json';

function App() {
  const [title, setTitle] = useState('Dashboard');
  const [user, setUser] = useState();
  const [data, setData] = useState();
  const [dataFormatted, setDataFormatted] = useState();
  const [headers, setHeaders] = useState([]);
  const [mesfinal, setMesFinal] = useState();

  useEffect(() => {
    fetch('https://ceofconsultores.com/system/home/getUsuario.php')
      .then(response => response.json())
      .then(user => {        
        const { data } = user;
        setUser(data[0])
      })
      .finally(() => {
        //console.log('finally');
      })
      .catch(error => console.error(error));
  }, []);  


  useEffect(() => {
    Papa.parse('https://ceofconsultores.com/system/home/uploads/76201608/data/base.csv', { 
      worker: true, 
      download: true,
      complete: function(results) {
        //setData(results);
      },
    });
    setData(Cubo);
    const idxMes = Cubo.data[0].indexOf('N_MES');
    const meses = Cubo.data.slice(1).map(row => row[idxMes]);
  
    // Rescatar el mes inicial y final del arreglo
    //const mesInicial = meses[0];
    //const mesFinal = meses[meses.length - 1];
    setMesFinal(parseInt(meses[meses.length - 1]));
    //console.log('Mes Inicial:', mesInicial);
    //console.log('Mes Final:', mesFinal);
  }, [Cubo]);


useEffect(() => {
  const Headers = data?.data[0];
  const rows = data?.data.slice(1);
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
      const monto = parseFloat(item["REAL " + anio].replaceAll('.', '').replaceAll(',', '.'));
  
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
                  Resultado: resultado,
                  Total: grouped[anio].data[resultado].total, // Monto acumulado para el Resultado
                  data: Object.keys(grouped[anio].data[resultado].data).map(nivel1 => ({
                      "Nivel 1": nivel1,
                      Total: grouped[anio].data[resultado].data[nivel1].total, // Monto acumulado para Nivel 1
                      data: Object.keys(grouped[anio].data[resultado].data[nivel1].data).map(nivel2 => ({
                          "Nivel 2": nivel2,
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
    //user && user.USR_Id && data && headers ?
    dataFormatted && headers && mesfinal &&
      <main className="dashtemplate">
        <Header title={title}/>
        <Sidebar setTitle={setTitle} user={user}/>
        <Footer user={user}/>
        <Main data={dataFormatted} mes={[mesfinal]}/>
      </main>        
  );
}

export default App;