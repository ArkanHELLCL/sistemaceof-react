/* eslint-disable react/prop-types */
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import Swal from 'sweetalert2';
import { Snackbar, Alert } from '@mui/material';
import { useState } from 'react';

const VITE_API_LOGOFF_URL = import.meta.env.VITE_API_LOGOFF_URL;

export default function Footer({user}) {
  const [uploadStatus, setUploadStatus] = useState(null);
  
  const handlleLogOff = () => {
    setUploadStatus(null);
    Swal.fire({
      title: 'Cerrar Sesión',
      text: "¿Quieres cerrar tu sesión?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'No',
      confirmButtonText: 'Sí, cerrar!'
    }).then((result) => {
      if (result.isConfirmed) {
        /*Swal.fire({
          title: 'Cerrando Sesión',
          icon: 'success',
          showCancelButton: false,
          showConfirmButton: false
        })*/
        fetch(`${VITE_API_LOGOFF_URL}`)
        .then(response => response.json())
        .then(() => {        
          window.location.href = 'https://ceofconsultores.com/system/'
        })
        .finally(() => {
        })
        .catch(() => window.location.href = 'https://ceofconsultores.com/system/');
      }else{
        setUploadStatus({ type: 'error', message: 'Se ha cancelado el cierre de sesión' });
      }
    })
}
  
  const handleCloseSnackbar = () => {
    setUploadStatus(null);
  };

  return (
    user ? 
      <>
        <footer className="footer text-white bg-black bg-opacity-30 pl-4 py-4">
          <div className='flex align-top'>
            <h2 className="opacity-30">Autenticado como:</h2>
            <button onClick={()=>handlleLogOff()} id="btnLogOff" className='pr-4'>            
            </button>
            <label htmlFor='btnLogOff' className="align-middle flex items-center gap-1 pl-5 opacity-30 text-gray-300 hover:text-red-500 hover:opacity-100 cursor-pointer text-lg" ><PowerSettingsNewIcon />Salir</label>
          </div>
          <h2 className="opacity-30">{user?.USR_Nombre + ' ' + user?.USR_Apellido}</h2>      
        </footer>
        {uploadStatus && (
          <Snackbar open={true} autoHideDuration={6000} onClose={handleCloseSnackbar}>
            <Alert onClose={handleCloseSnackbar} severity={uploadStatus.type} sx={{ width: '100%' }}>
              {uploadStatus.message}
            </Alert>
          </Snackbar>
        )}    
      </>
    :
      <div className="flex justify-center items-center h-96">
        <p className="text-2xl font-semibold">No hay datos para mostrar</p>
      </div>
  );
}