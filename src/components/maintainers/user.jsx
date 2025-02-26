/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo, useState, useEffect } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import { Box, Button, IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Grid from '@mui/material/Grid2';
import { MRT_Localization_ES } from 'material-react-table/locales/es';

const User = ({user}) => {
  const [validationErrors, setValidationErrors] = useState({});
  const [fetchedUsers, setFetchedUsers] = useState([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
  const [isLoadingUsersError, setIsLoadingUsersError] = useState(false);
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const [isUpdatingUser, setIsUpdatingUser] = useState(false);
  const [isDeletingUser, setIsDeletingUser] = useState(false);

  const VITE_API_GETUSUARIOS_URL = import.meta.env.VITE_API_GETUSUARIOS_URL;
  const VITE_API_POSTEMPRESAS_URL = import.meta.env.VITE_API_POSTEMPRESAS_URL;
  const VITE_API_PUTEEMPRESAS_URL = import.meta.env.VITE_API_PUTEEMPRESAS_URL;
  const VITE_API_DELEEMPRESAS_URL = import.meta.env.VITE_API_DELEEMPRESAS_URL;

  const tpoGraph = [
    {value :'Sin Tipo', text:1},
    {value :'Tipo 1', text:2},
    {value :'Tipo 2', text:3},
    {value :'Tipo 3', text:4},    
  ];

  const estado = [
    {value :'Activo', text:1},
    {value :'Inactivo', text:0}
  ];

  const perfiles = [
    {value :'Administrador', text:1},
    {value :'Usuario', text:2}
  ];

  const empresas = [
    {value :'Empresa 1', text:1},
    {value :'Empresa 2', text:2}
  ];

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setIsLoadingUsers(true);    
    fetch(`${VITE_API_GETUSUARIOS_URL}`)
    .then(response => response.json())
    .then(Users => {
      const {data} = Users;
      setFetchedUsers(data);
      setIsLoadingUsers(false);
    })
    .finally(() => {
    })
    .catch(error => {
      setIsLoadingUsersError(true);
      setIsLoadingUsers(false);
    })
  };

  const createUser = async (user) => {
    setIsCreatingUser(true);
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      const newUser = await response.json();
      setFetchedUsers((prevUsers) => [...prevUsers, newUser]);
      setIsCreatingUser(false);
    } catch (error) {
      setIsCreatingUser(false);
    }
  };

  const updateUser = async (user) => {
    const userToUpdate = { ...User };
    userToUpdate.destipografico = tpoGraph.find((g) => g.value === user.destipografico).text;

    console.log(userToUpdate);
    setIsUpdatingUser(true);
    try {
      await fetch(`/api/users/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userToUpdate),
      });
      setFetchedUsers((prevUsers) =>
        prevUsers.map((prevUser) =>
          prevUser.id === user.id ? user : prevUser,
        ),
      );
      setIsUpdatingUser(false);
    } catch (error) {
      setIsUpdatingUser(false);
    }
  };

  const deleteUser = async (userId) => {
    setIsDeletingUser(true);
    try {
      await fetch(`/api/users/${userId}`, {
        method: 'DELETE',
      });
      setFetchedUsers((prevUsers) =>
        prevUsers.filter((user) => user.id !== userId),
      );
      setIsDeletingUser(false);
    } catch (error) {
      setIsDeletingUser(false);
    }
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: 'USR_Id',
        header: 'Id',
        enableEditing: false,
        size: 80,
      },
      {
        accessorKey: 'USR_Usuario',
        header: 'Usuario',
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.USR_Usuario,
          helperText: validationErrors?.USR_Usuario,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              USR_Usuario: undefined,
            }),
        },
      },      
      {
        accessorKey: 'PER_Descripcion',
        header: 'Perfil',
        editVariant: 'select',    
        editSelectOptions: perfiles,
        muiEditTextFieldProps: {
          select: true,
          required: true,
          error: !!validationErrors?.PER_Descripcion,
          helperText: validationErrors?.PER_Descripcion,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              PER_Descripcion: undefined,
            }),
        },
      },
      {
        accessorKey: 'EMP_Descripcion',
        header: 'Empresa',
        editVariant: 'select',    
        editSelectOptions: empresas,
        muiEditTextFieldProps: {
          select: true,
          required: true,
          error: !!validationErrors?.EMP_Descripcion,
          helperText: validationErrors?.EMP_Descripcion,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              EMP_Descripcion: undefined,
            }),
        },
      },  
      {
        accessorKey: 'estadodesc',
        header: 'Estado',       
        editVariant: 'select',       
        editSelectOptions: estado,
        muiEditTextFieldProps: {
          select: true,
          required: true,
          error: !!validationErrors?.estadodesc,
          helperText: validationErrors?.estadodesc,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              estadodesc: undefined,
            }),
        },
      },
    ],
    [validationErrors],
  );

  //CREATE action
  const handleCreateUser = async ({ values, table }) => {
    const newValidationErrors = validateUser(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    await createUser(values);
    table.setCreatingRow(null); //exit creating mode
  };

  //UPDATE action
  const handleSaveUser = async ({ values, table }) => {
    const newValidationErrors = validateUser(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    await updateUser(values);
    table.setEditingRow(null); //exit editing mode
  };

  //DELETE action
  const openDeleteConfirmModal = (row) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      deleteUser(row.original.id);
    }
  };

  const table = useMaterialReactTable({
    columns,
    data: fetchedUsers,
    createDisplayMode: 'row', // ('modal', and 'custom' are also available)
    editDisplayMode: 'row', // ('modal', 'cell', 'table', and 'custom' are also available)
    enableEditing: true,
    getRowId: (row) => row.id,
    muiToolbarAlertBannerProps: isLoadingUsersError
      ? {
          color: 'error',
          children: 'Error loading data',
        }
      : undefined,    
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
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleCreateUser,
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleSaveUser,
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <Tooltip title="Edit">
          <IconButton onClick={() => table.setEditingRow(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <Button
        variant="contained"
        onClick={() => {
          table.setCreatingRow(true); //simplest way to open the create row modal with no default values
        }}
      >
        Crear nuevo Usuario
      </Button>
    ),
    state: {
      isLoading: isLoadingUsers,
      isSaving: isCreatingUser || isUpdatingUser || isDeletingUser,
      showAlertBanner: isLoadingUsersError,
      showProgressBars: isLoadingUsers,
    },
  });
  return (
      <Grid container spacing={2} className='pb-4'>
        <Grid size={{ xs: 12, xl: 12 }} className='pb-4'>
            <div className="flex justify-center rounded-xl bg-[#5d4889] text-white shadow-md py-4 align-middle">
                <h2 className="text-2xl font-light text-center">{'Usuarios registrados en el sistema'}</h2>
            </div>
        </Grid>                          
        <Grid size={{ xs: 12, xl: 12 }} sx={{height: '100%'}}> 
          <MaterialReactTable table={table} />
        </Grid>
      </Grid> 
    )
};

const validateRequired = (value) => !!value.length;
const validateEmail = (email) =>
  !email ||
  email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );

const validateRut = (rut) => {
  const re = /^[0-9]+-[0-9kK]{1}$/;
  if (!re.test(rut)) return false;
  const [rutBody, dv] = rut.split('-');
  let sum = 0;
  let multiplier = 2;
  for (let i = rutBody.length - 1; i >= 0; i--) {
    sum += rutBody[i] * multiplier;
    multiplier = multiplier < 7 ? multiplier + 1 : 2;
  }
  const dvExpected = 11 - (sum % 11);
  const dvNormalized = dvExpected === 11 ? '0' : dvExpected === 10 ? 'k' : dvExpected.toString();
  return dvNormalized.toLowerCase() === dv.toLowerCase();
};

const validateUrl = (url) => !url || /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/gm.test(url);

function validateUser(user) {
  return {
    label: !validateRequired(user.label) ? 'Razón Social es obligatoria' : '',
    EMP_Codigo: !validateRequired(user.EMP_Codigo) ? 'RUT es obligatorio' : !validateRut(user.EMP_Codigo) ? 'RUT no es válido' : '',
    EMP_Email: !validateEmail(user.EMP_Email) ? 'Incorrect Email Format' : '',
    EMP_UrlLogo: !validateUrl(user.EMP_UrlLogo) ? 'Formato de URL incorrecto' : '',
    destipografico: !validateRequired(user.destipografico) ? 'Tipo de Gráfico es obligatorio' : '',
    estadodesc: !validateRequired(user.estadodesc) ? 'Obligatorio' : '',
  };
}

export default User;