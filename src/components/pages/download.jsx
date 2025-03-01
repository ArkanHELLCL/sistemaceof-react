/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState, useMemo, useCallback } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/material/Grid2';
import { CloudUpload, InsertDriveFile, Delete } from '@mui/icons-material';
import { Box, IconButton, LinearProgress, Snackbar, Alert, Button, Tooltip } from '@mui/material';
import Swal from 'sweetalert2';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { MRT_Localization_ES } from 'material-react-table/locales/es';

const VITE_API_UPLOAD_URL = import.meta.env.VITE_API_UPLOAD_URL;
const VITE_API_LISTFILES_URL = import.meta.env.VITE_API_LISTFILES_URL;
const VITE_API_DELFILES_URL = import.meta.env.VITE_API_DELFILES_URL;
const VITE_API_DOWNLOAD_URL = import.meta.env.VITE_API_DOWNLOAD_URL;

export default function Download({ user, empresas, empresa:emp }) {
  const [files, setFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [empresa, setEmpresa] = useState(emp);
  const [fileDownload, setFileDownload] = useState('');

  useEffect(() => {
    if (empresa) {
      getUploadedFiles();
    }
  }, [empresa,emp]);

  const getUploadedFiles = () => {
    if (empresa) {
      fetch(`${VITE_API_LISTFILES_URL}?tipo=2&cliente_id=${empresa?.id}`)
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            if (response.status !== 500) {
              window.location.href = '../';
            } else {
              throw new Error(response);
            }
          }
        })
        .then(files => {
          const filteredFiles = files.data.filter(file => 
            file.nombre.endsWith('.csv') || 
            file.nombre.endsWith('.xls') || 
            file.nombre.endsWith('.xlsx') || 
            file.nombre.endsWith('.pdf') ||
            file.nombre.endsWith('.jpg') ||
            file.nombre.endsWith('.png')
          );
          setUploadedFiles(filteredFiles);
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
      const allowedTypes = ['text/csv', 'application/pdf', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'image/jpeg', 'image/png'];
      const droppedFiles = Array.from(e.dataTransfer.files).filter(file => allowedTypes.includes(file.type));
      if (droppedFiles.length > 0) {
        setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
        setUploadProgress(0);
      } else {
        setUploadStatus({ type: 'error', message: 'Solo se permiten archivos CSV, PDF, XLS, XLSX, JPG y PNG.' });
      }
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.target.files && e.target.files.length > 0) {
      const allowedTypes = ['text/csv', 'application/pdf', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'image/jpeg', 'image/png'];
      const selectedFiles = Array.from(e.target.files).filter(file => allowedTypes.includes(file.type));
      if (selectedFiles.length > 0) {
        setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
        setUploadProgress(0);
      } else {
        setUploadStatus({ type: 'error', message: 'Solo se permiten archivos CSV, PDF, XLS, XLSX, JPG y PNG.' });
      }
    }
  };

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
        formData.append('tipo', 2);

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

  const handleDownload = (fileName) => {
    setFileDownload(fileName);    
  };

  useEffect(() => {
    if (fileDownload) {
      if (empresa) {
        fetch(`${VITE_API_DOWNLOAD_URL}?file=${fileDownload}&client_id=${empresa?.id}`)
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            if (response.status !== 500) {
              window.location.href = '../';
            } else {
              throw new Error(response);
            }
          }
        })
        .then(blob => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.style.display = 'none';
          a.href = url;
          a.download = fileDownload;
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
        })
        .catch(error => console.log(error));
      }
    }
  }, [fileDownload, empresa]);

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
        Cell: ({ cell }) => (
          <span
            onClick={() => handleDownload(cell.getValue())}
            onMouseEnter={(e) => {
              e.target.style.color = 'blue';
              e.target.style.textDecoration = 'underline';
              e.target.style.cursor = 'pointer';
            }}
            onMouseLeave={(e) => {
              e.target.style.color = 'inherit';
              e.target.style.textDecoration = 'none';
              e.target.style.cursor = 'default';
            }}
          >
            {cell.getValue()}
          </span>
        ),
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

  const handleDeleteRow = useCallback(
    (row) => {
      if (
        //!confirm(`Are you sure you want to delete ${row.getValue('nombre')}`)
        Swal.fire({
          title: '¿Estás seguro?',
          text: "¿Quieres eliminar el archivo " + row.getValue('nombre') + "?",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sí, eliminalo!'
        }).then((result) => {
          if (result.isConfirmed) {
            if (empresa) {
              const data = {"tipo": 2, "cliente_id": empresa?.id, "files": row.getValue('nombre')};
              fetch(`${VITE_API_DELFILES_URL}`,{method: 'POST', body: JSON.stringify(data)})
              .then(response => {
                if (response.ok) {
                  return response.json();
                } else {
                  if (response.status !== 500) {
                    window.location.href = '../';
                  } else {
                    throw new Error(response);
                  }
                }
              })
              .then(() => {
                setUploadStatus({ type: 'success', message: 'Archivo eliminado correctamente.' });
                getUploadedFiles();
              })
              .catch(error => setUploadStatus({ type: 'error', message: error }));
            }else{
              setUploadStatus({ type: 'error', message: 'No hay empresa seleccionada.' });
            }
          }
        })
      ) {
        return;
      }      
    },
    [empresa],
  );

  const table = useMaterialReactTable({
    columns,
    data: uploadedFiles,    
    enableColumnActions: false,
    enableExpanding: false,
    enableRowActions: user?.PER_Id == 1,
    enableColumnDragging:false,
    enableDensityToggle: false,
    enableFullScreenToggle: false,
    enableHiding: false,
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
    renderRowActions: ({ row }) => (
      <Box sx={{ display: 'flex', gap: '1rem' }}>        
        <Tooltip arrow placement="right" title="Delete">
          <IconButton color="error" onClick={() => handleDeleteRow(row)}>
            <Delete />
          </IconButton>
        </Tooltip>
      </Box>
    ),
  });

  useEffect(() => {
    getUploadedFiles();
  }, [empresa]);

  return (    
      <section className=''>{
        user?.PER_Id == 1 &&
          <>
            <div>
              <Grid container spacing={1}>
                <Grid size={{ xs: 12, xl: 12 }} className='pb-4'>
                    <div className="flex justify-center rounded-xl bg-[#5d4889] text-white shadow-md py-4 align-middle">
                        <h2 className="text-2xl font-light text-center">{'Subir Documentos'}</h2>
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
                  accept=".csv, .pdf, .xls, .xlsx, .jpg, .png"
                  className="hidden"
                  id="file-upload"
                  name="file-upload"
                  onChange={handleChange}
                  multiple
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
        </>                
        }
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