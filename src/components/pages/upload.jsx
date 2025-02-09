import { useState } from 'react';
import { CloudUpload, InsertDriveFile } from '@mui/icons-material';
import { IconButton, LinearProgress, Button } from '@mui/material';

export default function Upload() {
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

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
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
      setUploadProgress(0);
      // Simular progreso de carga
      const interval = setInterval(() => {
        setUploadProgress((prevProgress) => {
          if (prevProgress >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prevProgress + 10;
        });
      }, 200);
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setUploadProgress(0);
      // Simular progreso de carga
      const interval = setInterval(() => {
        setUploadProgress((prevProgress) => {
          if (prevProgress >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prevProgress + 10;
        });
      }, 200);
    }
  };

  const handleUpload = () => {
    if (!file) {
      alert('Por favor, selecciona un archivo antes de enviarlo.');
      return;
    }
    // Lógica para enviar el archivo
    console.log('Archivo enviado:', file);
  };

  return (
    <div className="flex flex-col items-left justify-start h-full p-8">
      <h1 className="text-4xl font-bold mb-8">Subir datos de empresa</h1>
      <div
        className={`border-4 border-dashed rounded-lg p-8 w-full max-w-2xl text-center ${dragActive ? 'border-blue-500' : 'border-gray-300'}`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={() => document.getElementById('file-upload').click()}
      >
        <input
          type="file"
          accept=".csv"
          className="hidden"
          id="file-upload"
          onChange={handleChange}
        />
        <label htmlFor="file-upload" className="cursor-pointer">
          <IconButton component="span">
            <CloudUpload fontSize="large" />
          </IconButton>
          <p className="mt-2">Arrastra tu archivo aquí o haz clic para subir</p>
        </label>
        {file && (
          <div className="mt-4">
            <InsertDriveFile fontSize="large" />
            <p>{file.name}</p>
          </div>
        )}        
      </div>
      <div className="">
        <Button
            variant="contained"
            color="primary"
            className="mt-4"
            onClick={handleUpload}
        >
            Enviar Archivo
        </Button>
      </div>
      {file && (
        <div className="w-full max-w-2xl my-4">
          <LinearProgress variant="determinate" value={uploadProgress} className='mb-4'/>          
        </div>
      )}      
    </div>
  );
}