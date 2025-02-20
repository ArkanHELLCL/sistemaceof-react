/* eslint-disable react/prop-types */
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
const VITE_API_LOGOFF_URL = import.meta.env.VITE_API_LOGOFF_URL;

const handlleLogOff = () => {
  fetch(`${VITE_API_LOGOFF_URL}`)
  .then(response => response.json())
  .then(usr => {        
    window.location.href = 'https://ceofconsultores.com/system/'
  })
  .finally(() => {
  })
  .catch(error => window.location.href = 'https://ceofconsultores.com/system/');
}

export default function Footer({user}) {
  return (
    <footer className="footer text-white bg-black bg-opacity-30 pl-4 py-4">
      <div className='flex justify-between align-top'>
        <h2 className="opacity-30">Autenticado como:</h2>
        <div className="align-middle flex items-center gap-1 opacity-30 text-gray-300 hover:text-red-500 hover:opacity-100 cursor-pointer pr-4">
          <PowerSettingsNewIcon />
          <div className="text-gray-300 no-underline text-lg" onClick={handlleLogOff}>Salir</div>
        </div>
      </div>
      <h2 className="opacity-30">{user?.USR_Nombre + ' ' + user?.USR_Apellido}</h2>      
    </footer>
  );
}