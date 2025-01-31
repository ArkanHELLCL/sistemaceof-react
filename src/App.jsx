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

  useEffect(() => {
    fetch('https://ceofconsultores.com/system/home/getUsuario.php')
      .then(response => response.json())
      .then(user => {        
        const { data } = user;
        setUser(data[0])
      })
      .catch(error => console.error(error));
  }, []);  

  //window.location.href = '../'

  useEffect(() => {
    Papa.parse('https://ceofconsultores.com/system/home/uploads/76201608/data/base.csv', { 
      worker: true, 
      download: true,
      complete: function(results) {
        setData(results);
      }
    });
    setData(Cubo);
}, []);


// Función para agrupar los datos por mes
function agruparPorMeses(data) {
  const grupos = {};
  data.forEach(item => {
      const cuenta = item[0] + '/' + item[1] + '/' + item[2] + '/' + item[3]; //CUENTA
      /*const resultado = item[0]; //RESULTADO
      const nivel1 = item[1];    //NIVEL 1
      const nivel2 = item[2];    //NIVEL 2
      const cuenta = item[3];    //CUENTA*/
      const valor = item[6];  //REAL 2024
      const mes = item[8];    //N_MES

      if (!grupos[cuenta]) {
          grupos[cuenta] = {};
      }
      grupos[cuenta][mes] = valor;
  });
  return grupos;
}

// Función para crear la tabla
function crearTabla(data) {
  console.log(data),'data';
  const grupos = agruparPorMeses(data);
  console.log(grupos,'grupos');
  const meses = Array.from({ length: 12 }, (_, i) => i + 1); // Meses del 1 al 5
  let html ='<table width="100%" border="1" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">';

  // Crear la cabecera de la tabla
  html += '<thead>';
  html += '<tr>';
  const headers = ['Resultado','Nivel 1','Nivel 2','Cuenta', ...meses.map(mes => `Mes ${mes}`)];
  headers.forEach(headerText => {
      html += `<th>${headerText}</th>`;
  });

  // Crear el cuerpo de la tabla
  html += '<tbody>';
  
  Object.keys(grupos).forEach(cuenta => {
      html += '<tr>';
      html += `<td>${cuenta.split("/")[0]}</td>`;      
      html += `<td>${cuenta.split("/")[1]}</td>`;
      html += `<td>${cuenta.split("/")[2]}</td>`;
      html += `<td>${cuenta.split("/")[3]}</td>`;
      meses.forEach(mes => {
          html += '<td>';
          html += grupos[cuenta][mes] || 0;
          html += '</td>';
      });
      html += '</tr>';
  });

  document.body.innerHTML = html;
}


useEffect(() => {
  const headers = data?.data[0];
  const rows = data?.data.slice(1);
  //console.log(ano,"ano");

  //console.log(headers,"headers");
  //console.log(rows,"rows");

  const formattedData = rows?.map(row => {
      const obj = {};
      headers.forEach((header, index) => {
          obj[header] = row[index];
      });
      return obj;
  });
  
  //console.log(formattedData,"formattedData");
  const anioFiltrado = "2024"; // Año que queremos filtrar
  const datosFiltrados = formattedData?.filter(item => item["ANO"] === anioFiltrado);


  //const grouped = formattedData?.reduce((acc, item) => {
  const grouped = datosFiltrados?.reduce((acc, item) => {    
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
      //if (!acc[anio][resultado][nivel1][nivel2][cuenta][mes]) acc[anio][resultado][nivel1][nivel2][cuenta][mes] = 0;
  
      // Sumar los montos
      
      //acc[anio][resultado][nivel1][nivel2][cuenta][mes] += monto;        
      // Sumar los montos y acumular
      acc[anio].data[resultado].total += monto;
      acc[anio].data[resultado].data[nivel1].total += monto;
      acc[anio].data[resultado].data[nivel1].data[nivel2].total += monto;
      acc[anio].data[resultado].data[nivel1].data[nivel2].data[cuenta].total += monto;

      // Agregar el monto por mes
      if (!acc[anio].data[resultado].data[nivel1].data[nivel2].data[cuenta].data[mes]) {
          acc[anio].data[resultado].data[nivel1].data[nivel2].data[cuenta].data[mes] = 0;
      }
      acc[anio].data[resultado].data[nivel1].data[nivel2].data[cuenta].data[mes] += monto;
      return acc;
  }, {});

  //console.log(grouped,"grouped");
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
      console.log(resultpivot,"resultpivot");   //ok el resultado para el año 2024

      // Convertir a JSON
      //const jsonResult = JSON.stringify(resultpivot, null, 4);
      setDataFormatted(resultpivot);
      /*console.log(resultpivot);

      const { data : xx} = resultpivot//?.filter(item => item.anio === 2024);      
      const yy = xx.filter(item => item.anio === 2024)[0].data.map(item => item.data)[0].map(item => item.data.map(item => item.data.map(item => item.data)))//.map(item => item.data);
  
      console.log(yy);*/

      //console.log(headers,"headers");
      //console.log(rows,"rows");

      if (data) {
        const indexN_MES = headers.indexOf('N_MES');
        const indexReal2024 = headers.indexOf('REAL-2024');
        console.log(indexN_MES, 'indexN_MES');
        console.log(indexReal2024, 'indexReal2024');
  
        const filteredRows = rows.filter(item => item.includes('2024'));
        console.log(filteredRows, 'filteredRows');
          
        crearTabla(filteredRows);
      }
    }
}, [data]);

  return (
    //user && user.USR_Id && data ?
      <main className="dashtemplate">
        <Header title={title}/>
        <Sidebar setTitle={setTitle} user={user}/>
        <Footer user={user}/>
        <Main data={dataFormatted}/>
      </main>  
      /*: 
       <div className="flex justify-center items-center h-screen">
          <div className="text-2xl font-light">Cargando...</div>
        </div>        */
  );
}

export default App;