/* eslint-disable react/prop-types */
import Header from './components/header.jsx'
import Sidebar from './components/sidebar.jsx'
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { useState } from 'react';

const Main = () => {
  return (
    <section className="main bg-white w-full p-4 py-4">
      <h2>Main</h2>
    </section>
  );
}

const Footer = () => {
  return (
    <footer className="footer text-white bg-black bg-opacity-30 pl-4 py-4">
      <div className='flex justify-between align-top'>
        <h2 className="opacity-30">Autenticado como:</h2>
        <div className="align-middle flex items-center gap-1 opacity-30 text-gray-300 hover:text-red-500 hover:opacity-100 cursor-pointer pr-4">
          <PowerSettingsNewIcon />
          <a href="#" className="text-gray-300 no-underline text-lg">Salir</a>
        </div>
      </div>
      <h2 className="opacity-30">Luis Castillo</h2>      
    </footer>
  );
}

function App() {
  const [title, setTitle] = useState('Dashboard');

  return (
    <main className="dashtemplate">
      <Header title={title}/>
      <Sidebar setTitle={setTitle}/>
      <Footer />
      <Main />
    </main>  
  );
}

export default App;