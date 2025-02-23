/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/material/Grid2';
import { CloudUpload, InsertDriveFile, Delete, Description } from '@mui/icons-material';
import { IconButton, LinearProgress, Snackbar, Alert, Button } from '@mui/material';
import Swal from 'sweetalert2';

const VITE_API_UPLOAD_URL = import.meta.env.VITE_API_UPLOAD_URL;

export default function Upload({ empresas }) {
  const [files, setFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [empresa, setEmpresa] = useState('');
 
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFiles = Array.from(e.dataTransfer.files).filter(file => file.type === 'text/csv');
      if (droppedFiles.length > 0) {
        setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
        setUploadProgress(0);
      } else {
        setUploadStatus({ type: 'error', message: 'Solo se permiten archivos CSV.' });
      }
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files).filter(file => file.type === 'text/csv');
      if (selectedFiles.length > 0) {
        setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
        setUploadProgress(0);
      } else {
        setUploadStatus({ type: 'error', message: 'Solo se permiten archivos CSV.' });
      }
    }
  };
/*
  const simulateUpload = (files) => {
    const interval = setInterval(() => {
      setUploadProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          setUploadStatus({ type: 'success', message: 'Archivos subidos con éxito.' });
          const newFiles = files.map(file => ({
            name: file.name,
            size: (file.size / 1024).toFixed(2) + ' KB',
            user: 'Usuario1', // Aquí puedes poner el nombre del usuario que subió el archivo
            date: new Date().toLocaleString(),
          }));
          setUploadedFiles((prevFiles) => [...prevFiles, ...newFiles]);
          setFiles([]); // Limpiar los archivos seleccionados
          document.getElementById('file-upload').value = ''; // Limpiar el input file
          return 100;
        }
        return prevProgress + 10;
      });
    }, 200);
  };

  const handleDelete = (fileName) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo!'
    }).then((result) => {
      if (result.isConfirmed) {
        setUploadedFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
        Swal.fire(
          'Eliminado!',
          'El archivo ha sido eliminado.',
          'success'
        );
      }
    });
  };*/

  const handleUpload = () => {
    if (!empresa) {
      setUploadStatus({ type: 'error', message: 'No hay empresa seleccionada.' });
      return;
    }
    if (files.length === 0) {
      setUploadStatus({ type: 'error', message: 'No hay archivos seleccionados para subir.' });
      return;
    }

    Swal.fire({
      title: '¿Estás seguro?',
      text: "¿Quieres subir estos archivos?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, subirlos!'
    }).then((result) => {
      if (result.isConfirmed) {
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
          formData.append('file[]', files[i]);
        }
        formData.append('cliente_id', empresa?.id);
        formData.append('tipo', 1);

        const xhr = new XMLHttpRequest();
        xhr.open('POST', VITE_API_UPLOAD_URL, true);

        xhr.upload.addEventListener('progress', (event) => {
          if (event.lengthComputable) {
            setUploadProgress((event.loaded / event.total) * 100);
          }
        });

        xhr.addEventListener('load', () => {
          if (xhr.status === 200) {
            setUploadStatus({ type: 'success', message: 'Archivos subidos con éxito.' });
            const newFiles = files.map(file => ({
              name: file.name,
              size: (file.size / 1024).toFixed(2) + ' KB',
              user: 'Usuario1', // Aquí puedes poner el nombre del usuario que subió el archivo
              date: new Date().toLocaleString(),
            }));
            setUploadedFiles((prevFiles) => [...prevFiles, ...newFiles]);
            setFiles([]); // Limpiar los archivos seleccionados
            document.getElementById('file-upload').value = ''; // Limpiar el input file
          } else {
            setUploadStatus({ type: 'error', message: 'Error al subir los archivos.' });
          }
        });

        xhr.addEventListener('error', () => {
          setUploadStatus({ type: 'error', message: 'Error al subir los archivos.' });
        });

        xhr.send(formData);
      }
    });
  };

  const handleCloseSnackbar = () => {
    setUploadStatus(null);
  };

  return (
    <section className=''>
      <div>
        <Grid container spacing={1}>
          <Grid size={{ xs: 12, xl: 12 }} className=''>
            <h1 className="text-4xl font-bold mb-0" style={{ color: '#5D4889' }}>Subir datos de empresa</h1>
          </Grid>
          <Grid size={{ xs: 12, xl: 6 }} className=''>
            <Autocomplete
              disablePortal
              disableClearable={true}
              id="empresas"
              value={empresa}
              options={empresas}
              onChange={(event, newValue) => { setEmpresa(newValue) }}
              sx={{ width: "100%" }}
              renderInput={(params) => <TextField {...params} label="Empresa" variant="standard" />}
            />
          </Grid>
        </Grid>
      </div>
      <div className="flex flex-col items-center justify-start h-full p-8 w-full relative">
        <div
          className={`border-4 border-dashed rounded-lg p-8 mb-4 w-full text-center peer/hoverfile cursor-pointer text-[#5D4889] group ${dragActive ? 'border-blue-500' : 'border-gray-300'}`}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={() => document.getElementById('file-upload').click()}
        >          
          <IconButton component="span" className='group-hover:!text-[#5D4889] group-hover:!scale-125 transition-all duration-500'>
            <CloudUpload fontSize="large" />
          </IconButton>
          <p className="mt-2">Arrastra tus archivos aquí o haz clic para subir</p>
          {files.length > 0 && (
            <div className="mt-4">
              {files.map((file, index) => (
                <div key={index} className="flex items-center">
                  <InsertDriveFile fontSize="large" />
                  <p className="ml-2">{file.name}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        <input
            type="file"
            accept=".csv"
            className="hidden"
            id="file-upload"
            name="file-upload"
            onChange={handleChange}            
          />
        {files.length > 0 && (
          <div className="w-full my-4">
            <LinearProgress variant="determinate" value={uploadProgress} className='mb-4' />
          </div>
        )}
        <Button variant="contained" color="primary" onClick={handleUpload} className="my-8">
          Subir Archivos
        </Button>
        {uploadStatus && (
          <Snackbar open={true} autoHideDuration={6000} onClose={handleCloseSnackbar}>
            <Alert onClose={handleCloseSnackbar} severity={uploadStatus.type} sx={{ width: '100%' }}>
              {uploadStatus.message}
            </Alert>
          </Snackbar>
        )}        
      </div>
    </section>
  );
}