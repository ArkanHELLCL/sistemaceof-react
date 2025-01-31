/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import Header from './components/header.jsx'
import Sidebar from './components/sidebar.jsx'
import Footer from './components/footer.jsx'
import Main from './components/main.jsx';
import Papa from 'papaparse';

function App() {
  const [title, setTitle] = useState('Dashboard');
  const [user, setUser] = useState();
  const [data, setData] = useState();

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
        //console.log(results);
        setData(results);
      }
    });
    
}, []);

  return (
    user && user.USR_Id ?
      <main className="dashtemplate">
        <Header title={title}/>
        <Sidebar setTitle={setTitle} user={user}/>
        <Footer user={user}/>
        <Main user={user}/>
      </main>  
      : 
       <div className="flex justify-center items-center h-screen">
          <div className="text-2xl font-light">Cargando...</div>
        </div>        
  );
}

export default App;