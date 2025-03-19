/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo, useState, useEffect } from 'react';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { Box, Button, IconButton, Tooltip, Snackbar, Alert } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Grid from '@mui/material/Grid2';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import Swal from 'sweetalert2';

const UserAsocEmp = ({ row, user, empresas }) => {
  const [validationAsocErrors, setValidationAsocErrors] = useState({});
  const [crudStatus, setCrudStatus] = useState(null);
  const [isLoadingEmpresas, setIsLoadingEmpresas] = useState(false);
  const [isLoadingEmpresasError, setIsLoadingEmpresasError] = useState(false);
  const [isCreatingAsocEmp, setIsCreatingAsocEmp] = useState(false);  
  const [isDeletingAsocEmp, setIsDeletingAsocEmp] = useState(false);
  const [fetchedEmpresas, setFetchedEmpresas] = useState(true);

  const VITE_API_GETASOCEMPRESAS_URL = import.meta.env.VITE_API_GETASOCEMPRESAS_URL;
  const VITE_API_POSTASOCEMPRESAS_URL = import.meta.env.VITE_API_POSTASOCEMPRESAS_URL;
  const VITE_API_DELASOCEMPRESAS_URL = import.meta.env.VITE_API_DELASOCEMPRESAS_URL;

  const lstempresas = empresas.map((empresa) => {
    return { value: empresa.label, text: empresa.id };
  });

  useEffect(() => {
    fetchEmpresas(row.original.USR_Id);
  }, [row.original.USR_Id]);

  const createAsocEmp = async (emp) => {
    const empToCreate = { ...emp };
    console.log(empToCreate);
    empToCreate.USR_Id = row.original.USR_Id;
    empToCreate.EMP_Descripcion = lstempresas.find((e) => e.value === user.EMP_Descripcion).text;
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¿Quieres crear esta asociación?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, crear!'
    }).then((result) => {
      if (result.isConfirmed) {
        setIsCreatingAsocEmp(true);
        fetch(`${VITE_API_POSTASOCEMPRESAS_URL}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(empToCreate),
        })
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
        .then(newUser => {
          const { data } = newUser;
          setFetchedEmpresas(data);
          setIsCreatingAsocEmp(false);
          setCrudStatus({ type: 'success', message: 'Asociación creada con éxito.' });
        })
        .catch(() => {
          setIsCreatingAsocEmp(false);
          setCrudStatus({ type: 'error', message: 'Error al crear la asociación.' });
        });
      }
    });
  };

  const  saveAsocEmp = async (emp) => {
    const empToSave = { ...emp };
    console.log(empToSave);
    empToSave.EMP_Descripcion = lstempresas.find((e) => e.value === user.EMP_Descripcion).text;
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¿Quieres guardar esta asociación?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, guardar'
    }).then((result) => {
      if (result.isConfirmed) {
        setIsCreatingAsocEmp(true);
        fetch(`${VITE_API_POSTASOCEMPRESAS_URL}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(empToSave),
        })
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
        .then(newUser => {
          const { data } = newUser;
          setFetchedEmpresas(data);
          setIsCreatingAsocEmp(false);
          setCrudStatus({ type: 'success', message: 'Asociación guardada con éxito.' });
        })
        .catch(() => {
          setIsCreatingAsocEmp(false);
          setCrudStatus({ type: 'error', message: 'Error al guardar la asociación.' });
        });
      }
    });
  };

  const fetchEmpresas = async (USR_Id) => {
    console.log(USR_Id);
    setIsLoadingEmpresas(true);
    fetch(`${VITE_API_GETASOCEMPRESAS_URL}?USR_Id=${USR_Id}`)
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
      .then(users => {
        const { data } = users;
        setFetchedEmpresas(data);
        setIsLoadingEmpresas(false);
        setCrudStatus({ type: 'success', message: 'Empresas cargadas con éxito.' });
        return data;
      })
      .finally(() => {
      })
      .catch(() => {
        setFetchedEmpresas([]);
        setIsLoadingEmpresasError(true);
        setIsLoadingEmpresas(false);
        setCrudStatus({ type: 'error', message: 'Error al cargar las empresas.' });
      });
  };

  const deleteAsocEmp = async (userId) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¿Quieres eliminar esta empresa?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        setIsDeletingAsocEmp(true);
        fetch(`${VITE_API_DELASOCEMPRESAS_URL}?USR_Id=${userId}`, {
          method: 'DELETE',
        })
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
        .then(urers => {
          const { data } = urers;
          setFetchedEmpresas(data);
          setIsDeletingAsocEmp(false);
          setCrudStatus({ type: 'success', message: 'Empresa eliminada con éxito.' });
        })
        .catch(() => {
          setIsDeletingAsocEmp(false);
          setCrudStatus({ type: 'error', message: 'Error al eliminar la empresa.' });
        });
      }
    });
  };

  // Nueva definición de columnas para subrows
  const columns = useMemo(
    () => [
      {
        accessorKey: 'USR_Id',
        header: 'User Id',
        enableEditing: false,
      },
      {
        accessorKey: 'EMP_Id',
        header: 'Emp Id',
        enableEditing: false,
      },
      {
        accessorKey: 'EMP_Descripcion',
        header: 'Empresa Asignada',
        editVariant: 'select',
        enableEditing: true,
        editSelectOptions: lstempresas,
        muiEditTextFieldProps: {
          select: true,
          required: true,
          error: !!validationAsocErrors?.EMP_Descripcion,
          helperText: validationAsocErrors?.EMP_Descripcion,
          onFocus: () =>
            setValidationAsocErrors({
              ...validationAsocErrors,
              EMP_Descripcion: undefined,
            }),
        },
      },
      {
        accessorKey: 'EMP_Codigo',
        header: 'RUT Empresa',
        enableEditing: false,
      },
      {
        accessorKey: 'EMP_Email',
        header: 'Email Empresa',
        enableEditing: false,
      },
    ],
    [validationAsocErrors],
  );

  //CREATE ASOC action
  const handleCreateAsocEmp = async ({ values, table }) => {    
    const newValidationErrors = validateEmp(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationAsocErrors(newValidationErrors);
      return;
    }
    setValidationAsocErrors({});
    await createAsocEmp(values);
    table.setCreatingRow(null); //exit creating mode
  };

  const handleSaveAsocEmp = async ({ values, table }) => {
    const newValidationErrors = validateEmp(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationAsocErrors(newValidationErrors);
      return;
    }
    setValidationAsocErrors({});
    await saveAsocEmp(values);
    table.setEditingRow(null); //exit editing mode
  }

  //DELETE action
  const openDeleteConfirmModal = (row) => {
    deleteAsocEmp(row.original.USR_Id);
  };

  const handleCloseSnackbar = () => {
    setCrudStatus(null);
  };

  /*
  const DetailPanel = ({ row }) => {
    //if (isLoading) return <CircularProgress />;
    //if (isError) return <Alert severity="error">Error Loading User Info</Alert>;
    //console.log(row.USR_Id)
    //useEffect(() => {
    //  fetchEmpresas(row.original.USR_Id);
    //}, [row.original.USR_Id]);
    //fetchEmpresas(row.original.USR_Id);
    return (
      <MaterialReactTable
          columns={subRowColumns}
          data={fetchedEmpresas}
          createDisplayMode={'row'}
          editDisplayMode={'row'}
          getRowId={(row) => row.EMP_Id*10}
          muiToolbarAlertBannerProps={isLoadingEmpresasError
            ? {
              color: 'error',
              children: 'Error leyendo los datos',
            }
            : undefined
          }
          enableEditing={true}
          enableColumnActions={false}
          enableExpanding={false}
          enableRowActions={user?.PER_Id == 1}
          enableColumnDragging={false}
          enableDensityToggle={false}
          enableFullScreenToggle={false}
          enableHiding={false}
          paginationDisplayMode={'pages'}
          positionToolbarAlertBanner={'bottom'}
          localization={ MRT_Localization_ES}
          initialState= {{
            showGlobalFilter: true,
            density: 'compact',
            columnPinning: {
              left: ['mrt-row-expand', 'mrt-row-select'],
              right: ['mrt-row-actions'],
            },
          }}
          muiPaginationProps={{
            color: 'secondary',
            rowsPerPageOptions: [10, 20, 30],
            shape: 'rounded',
            variant: 'outlined',
          }}          
          renderTopToolbarCustomActions={({ table }) => (
            <Button
              color='success'
              variant="contained"
              onClick={() => {                
                table.setCreatingRow(true);
              }}
            >
              Asociar nueva Empresa
            </Button>
          )}
          renderRowActions={({ row, table }) => (
            <Box sx={{ display: 'flex', gap: '1rem' }}>
              <Tooltip title="Eliminar Empresa">
                <IconButton color="error" onClick={() => handleDeleteAsocEmp(row, table)}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </Box>
          )}
          state={{
            isLoading: isLoadingEmpresas,
            isSaving: isCreatingAsocEmp || isDeletingAsocEmp,
            showAlertBanner: isLoadingEmpresasError,
            showProgressBars: isLoadingEmpresas,
          }}
          onCreatingRowCancel={() => setValidationAsocErrors({})}
          onCreatingRowSave={handleCreateAsocEmp}
          onEditingRowCancel={() => setValidationAsocErrors({})}
        />
    )
  }; */

  const table = useMaterialReactTable({
    columns,
    data: fetchedEmpresas,
    createDisplayMode: 'row', // ('modal', and 'custom' are also available)
    editDisplayMode: 'row', // ('modal', 'cell', 'table', and 'custom' are also available)
    enableEditing: true,
    getRowId: (row) => row.id,
    muiToolbarAlertBannerProps: isLoadingEmpresasError
      ? {
        color: 'error',
        children: 'Error leyendo los datos',
      }
      : undefined,
    enableColumnActions: false,
    enableExpanding: false,
    enableRowActions: user?.PER_Id == 1,
    enableColumnDragging: false,
    enableDensityToggle: false,
    enableFullScreenToggle: false,
    enableHiding: false,
    enableGlobalFilter: false,
    enableFilters: false,
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
    onCreatingRowCancel: () => setValidationAsocErrors({}),
    onCreatingRowSave: handleCreateAsocEmp,
    onEditingRowCancel: () => setValidationAsocErrors({}),
    onEditingRowSave: handleSaveAsocEmp,
    renderRowActions: ({ row }) => (
      <Box sx={{ display: 'flex', gap: '1rem' }}>        
        <Tooltip title="Borrar Empresa">
          <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>        
      </Box>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <Button
        variant="contained"
        color="success"
        onClick={() => {
          table.setCreatingRow(true); //simplest way to open the create row modal with no default values
        }}
      >
        <AddBusinessIcon />
      </Button>
    ),
    state: {
      isLoading: isLoadingEmpresas,
      isSaving: isCreatingAsocEmp || isDeletingAsocEmp,
      showAlertBanner: isLoadingEmpresasError,
      showProgressBars: isLoadingEmpresas,
    },
    muiTableBodyRowProps: ({ row }) => ({
      onClick: (event) => {
        console.info(event, row.id);
      },
      sx: {
        cursor: 'pointer', //you might want to change the cursor too when adding an onClick
      },
    }),
  });
  return (
    <>
      <Grid container spacing={2} className='pb-4'>
        <Grid size={{ xs: 12, xl: 12 }} className='pb-4'>
          <div className="flex justify-center rounded-xl bg-[#5d4889] text-white shadow-md py-4 align-middle">
            <h2 className="text-2xl font-light text-center">{'Usuarios registrados en el sistema'}</h2>
          </div>
        </Grid>
        <Grid size={{ xs: 12, xl: 12 }} sx={{ height: '100%' }}>
          <MaterialReactTable table={table} />
        </Grid>
      </Grid>{
        crudStatus && (
          <Snackbar open={true} autoHideDuration={6000} onClose={handleCloseSnackbar}>
            <Alert onClose={handleCloseSnackbar} severity={crudStatus.type} sx={{ width: '100%' }}>
              {crudStatus.message}
            </Alert>
          </Snackbar>
        )}      
    </>
  )
};

const validateRequired = (value) => !!value?.length;

function validateEmp(emp){
  return {
    EMP_Descripcion: !validateRequired(emp.EMP_Descripcion) ? 'Empresa es obligatoria' : '',
  };
}

export default UserAsocEmp;