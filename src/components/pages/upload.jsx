/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState, useMemo } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/material/Grid2';
import { CloudUpload, InsertDriveFile, Delete, Description } from '@mui/icons-material';
import { IconButton, LinearProgress, Snackbar, Alert, Button } from '@mui/material';
import { Box, lighten } from '@mui/material';
import Swal from 'sweetalert2';
import { MaterialReactTable, useMaterialReactTable, MRT_GlobalFilterTextField, MRT_ToggleFiltersButton } from 'material-react-table';
import { MRT_Localization_ES } from 'material-react-table/locales/es';

const VITE_API_UPLOAD_URL = import.meta.env.VITE_API_UPLOAD_URL;
const VITE_API_LISTFILES_URL = import.meta.env.VITE_API_LISTFILES_URL;

export default function Upload({ empresas }) {
  const [files, setFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [empresa, setEmpresa] = useState('');
 
  const getUploadedFiles = () => {
    if (empresa) {
      fetch(`${VITE_API_LISTFILES_URL}?tipo=1&cliente_id=${empresa?.id}`)
        .then(response => response.json())
        .then(files => {
          setUploadedFiles(files.data);
        })
        .catch(error => console.log(error));
    }
  };
  
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
            getUploadedFiles();
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

  const columns = useMemo(
    () => [
      {
        accessorKey: 'nombre',
        id: 'nombre',
        header: 'Nombre',
        size: 50, //small column
        grow: false, //don't allow this column to grow (if layoutMode is grid)
        filterVariant: 'autocomplete',
        muiTableHeadCellProps: {
          sx: {
            fontWeight: '100',
            fontSize: '12px',
          },
        },
      },
      {
        accessorKey: 'tamano',
        header: 'Tamaño',
        size: 50, //small column
        filterVariant: 'autocomplete',
        muiTableHeadCellProps: {
          sx: {
            fontWeight: '100',
            fontSize: '12px',
          },
        },
      },
      {
        accessorKey: 'ultima_modificacion',
        header: 'Fecha de Modificación',
        size: 50, //small column
        filterVariant: 'autocomplete',
        muiTableHeadCellProps: {
          sx: {
            fontWeight: '100',
            fontSize: '12px',
          },
        },
      }
    ],
    [],
    //end
  );

  const table = useMaterialReactTable({
    columns,
    data: uploadedFiles,    
    enableColumnActions: false,
    enableExpanding: false,
    enableColumnFilterModes: true,
    enableColumnOrdering: true,
    enableGrouping: true,
    enableColumnPinning: true,
    enableFacetedValues: true,
    enableRowSelection: true,
    paginationDisplayMode: 'pages',
    positionToolbarAlertBanner: 'bottom',
    muiSearchTextFieldProps: {
      size: 'small',
      variant: 'outlined',
    },
    muiPaginationProps: {
      color: 'secondary',
      rowsPerPageOptions: [10, 20, 30],
      shape: 'rounded',
      variant: 'outlined',
    },
    localization: MRT_Localization_ES,
    initialState: {
        showGlobalFilter: true,
        density: 'compact',
        columnPinning: {
          left: ['mrt-row-expand', 'mrt-row-select'],
          right: ['mrt-row-actions'],
        },
    },
    renderTopToolbar: ({ table }) => {
      const handleDeactivate = () => {
        table.getSelectedRowModel().flatRows.map((row) => {
          alert('deactivating ' + row.getValue('nombre'));
        });
      };

      const handleActivate = () => {
        table.getSelectedRowModel().flatRows.map((row) => {
          alert('activating ' + row.getValue('nombre'));
        });
      };

      const handleContact = () => {
        table.getSelectedRowModel().flatRows.map((row) => {
          alert('contact ' + row.getValue('nombre'));
        });
      };
      console.log(table,table.getIsSomeRowsSelected(),table.getSelectedRowModel());
      return (
        <Box
          sx={(theme) => ({
            backgroundColor: lighten(theme.palette.background.default, 0.05),
            display: 'flex',
            gap: '0.5rem',
            p: '8px',
            justifyContent: 'space-between',
          })}
        >
          <Box sx={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            {/* import MRT sub-components */}
            <MRT_GlobalFilterTextField table={table} />
            <MRT_ToggleFiltersButton table={table} />
          </Box>
          <Box>
            <Box sx={{ display: 'flex', gap: '0.5rem' }}>
              <Button
                color="error"
                disabled={!table.getIsSomeRowsSelected()}
                onClick={handleDeactivate}
                variant="contained"
              >
                Deactivate
              </Button>
              <Button
                color="success"
                disabled={!table.getIsSomeRowsSelected()}
                onClick={handleActivate}
                variant="contained"
              >
                Activate
              </Button>
              <Button
                color="info"
                disabled={!table.getIsSomeRowsSelected()}
                onClick={handleContact}
                variant="contained"
              >
                Contact
              </Button>
            </Box>
          </Box>
        </Box>
      );
    },
  });

  useEffect(() => {
    getUploadedFiles();
  }, [empresa]);

  return (
    <section className=''>
      <div>
        <Grid container spacing={1}>
          <Grid size={{ xs: 12, xl: 12 }} className='pb-4'>
              <div className="flex justify-center rounded-xl bg-[#5d4889] text-white shadow-md py-4 align-middle">
                  <h2 className="text-2xl font-light text-center">{'Cargar Datos de Empresa'}</h2>
              </div>
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
      <Grid container spacing={2} className='pb-4'>
          <Grid size={{ xs: 12, xl: 12 }} className='pb-4'>
              <div className="flex justify-center rounded-xl bg-[#5d4889] text-white shadow-md py-4 align-middle">
                  <h2 className="text-2xl font-light text-center">{'Archivos en la carpeta de la Empresa'}</h2>
              </div>
          </Grid>                          
          <Grid size={{ xs: 12, xl: 12 }} sx={{height: '100%'}}> 
            <MaterialReactTable table={table} />
          </Grid>
      </Grid>      
    </section>
  );
}