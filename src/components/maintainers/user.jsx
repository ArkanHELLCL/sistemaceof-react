/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo, useState, useEffect } from 'react';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { Box, Button, IconButton, Tooltip, Snackbar, Alert, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt'; 
import Grid from '@mui/material/Grid2';
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import { v4 as uuid } from "uuid";
import Swal from 'sweetalert2';
import UserAsocEmp from './userAsocEmp.jsx';

const User = ({ user, empresas }) => {
  const [validationErrors, setValidationErrors] = useState({});
  const [fetchedUsers, setFetchedUsers] = useState([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [isLoadingUsersError, setIsLoadingUsersError] = useState(false);
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const [isUpdatingUser, setIsUpdatingUser] = useState(false);
  const [isDeletingUser, setIsDeletingUser] = useState(false);
  const [crudStatus, setCrudStatus] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [userCredentials, setUserCredentials] = useState({});

  const VITE_API_GETUSUARIOS_URL = import.meta.env.VITE_API_GETUSUARIOS_URL;
  const VITE_API_POSTUSUARIOS_URL = import.meta.env.VITE_API_POSTUSUARIOS_URL;
  const VITE_API_PUTUSUARIOS_URL = import.meta.env.VITE_API_PUTUSUARIOS_URL;
  const VITE_API_DELUSUARIOS_URL = import.meta.env.VITE_API_DELUSUARIOS_URL;

  const unique_id = uuid();
  const small_id = unique_id.slice(0, 8);

  const estado = [
    { value: 'Activo', text: 1 },
    { value: 'Inactivo', text: 0 }
  ];

  const perfiles = [
    { value: 'Administrador', text: 1 },
    { value: 'Usuario', text: 3 }
  ];

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setIsLoadingUsers(true);
    fetch(`${VITE_API_GETUSUARIOS_URL}`)
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
        setFetchedUsers(data);
        setIsLoadingUsers(false);
        setCrudStatus({ type: 'success', message: 'Usuarios cargados con éxito.' });
      })
      .finally(() => {
      })
      .catch(() => {
        setFetchedUsers([]);
        setIsLoadingUsersError(true);
        setIsLoadingUsers(false);
        setCrudStatus({ type: 'error', message: 'Error al cargar los usuarios.' });
      });
  };

  const createUser = async (user) => {
    const userToCreate = { ...user };
    userToCreate.estadodesc = estado.find((e) => e.value === user.estadodesc).text;
    userToCreate.PER_Descripcion = perfiles.find((p) => p.value === user.PER_Descripcion).text;    
    userToCreate.USR_Clave = small_id;

    Swal.fire({
      title: '¿Estás seguro?',
      text: "¿Quieres crear este usuario?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, crear!'
    }).then((result) => {
      if (result.isConfirmed) {
        setIsCreatingUser(true);
        fetch(`${VITE_API_POSTUSUARIOS_URL}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userToCreate),
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
          setFetchedUsers(data);
          setIsCreatingUser(false);
          setCrudStatus({ type: 'success', message: 'Usuario creado con éxito.' });
          setUserCredentials({ usuario: userToCreate.USR_Usuario, clave: userToCreate.USR_Clave, title:'Usuario creado con éxito.'});
          setOpenDialog(true);
        })
        .catch(() => {
          setIsCreatingUser(false);
          setCrudStatus({ type: 'error', message: 'Error al crear el usuario.' });
        });
      }
    });
  };

  const updateUser = async (user) => {
    const userToUpdate = { ...user };
    userToUpdate.estadodesc = estado.find((e) => e.value === user.estadodesc).text;
    userToUpdate.PER_Descripcion = perfiles.find((p) => p.value === user.PER_Descripcion).text;    
    userToUpdate.USR_Clave = small_id;
    
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¿Quieres actualizar este usuario?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, actualizar!'
    }).then((result) => {
      if (result.isConfirmed) {
        setIsUpdatingUser(true);
        fetch(`${VITE_API_PUTUSUARIOS_URL}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userToUpdate),
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
          setFetchedUsers(data);
          setIsUpdatingUser(false);
          setCrudStatus({ type: 'success', message: 'Usuario actualizado con éxito.' });
          setUserCredentials({ usuario: userToUpdate.USR_Usuario, clave: userToUpdate.USR_Clave, title:'Usuario actualizado con éxito.'});
          setOpenDialog(true);
        })
        .catch(() => {
          setIsUpdatingUser(false);
          setCrudStatus({ type: 'error', message: 'Error al actualizar el usuario.' });
        });
      }
    });
  };

  const deleteUser = async (userId) => {
    if(userId === user.USR_Id){
      setCrudStatus({ type: 'error', message: 'No puedes eliminar tu propio usuario.' });
      return;
    }
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¿Quieres eliminar este usuario?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        setIsDeletingUser(true);
        fetch(`${VITE_API_DELUSUARIOS_URL}?USR_Id=${userId}`, {
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
          setFetchedUsers(data);
          setIsDeletingUser(false);
          setCrudStatus({ type: 'success', message: 'Usuario eliminado con éxito.' });
        })
        .catch(() => {
          setIsDeletingUser(false);
          setCrudStatus({ type: 'error', message: 'Error al eliminar el usuario.' });
        });
      }
    });
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
        accessorKey: 'USR_Nombre',
        header: 'Nombre',
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.USR_Nombre,
          helperText: validationErrors?.USR_Nombre,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              USR_Nombre: undefined,
            }),
        },
      },
      {
        accessorKey: 'USR_Apellido',
        header: 'Apellido',
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.USR_Apellido,
          helperText: validationErrors?.USR_Apellido,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              USR_Apellido: undefined,
            }),
        },
      },
       {
        accessorKey: 'USR_Mail',
        header: 'Email',
        muiEditTextFieldProps: {
          type: 'email',
          error: !!validationErrors?.USR_Mail,
          helperText: validationErrors?.USR_Mail,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              USR_Mail: undefined,
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
    deleteUser(row.original.USR_Id);
  };

  const handleCloseSnackbar = () => {
    setCrudStatus(null);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleCopyToClipboard = () => {
    const text = `Usuario: ${userCredentials.usuario}\nClave: ${userCredentials.clave}`;
    navigator.clipboard.writeText(text);
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
        <Tooltip title="Editar Usuario">
          <IconButton color="warning" onClick={() => table.setEditingRow(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Borrar Usuario">
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
        <PersonAddAltIcon />
      </Button>
    ),
    state: {
      isLoading: isLoadingUsers,
      isSaving: isCreatingUser || isUpdatingUser || isDeletingUser,
      showAlertBanner: isLoadingUsersError,
      showProgressBars: isLoadingUsers,
    },
    renderDetailPanel: ({ row }) => <UserAsocEmp row={row} user={user} empresas={empresas} />,
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
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle className='text-center'>{userCredentials.title} <br/>Credenciales del Usuario</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Usuario: {userCredentials.usuario}<br />
            Clave: {userCredentials.clave}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCopyToClipboard}>Copiar al portapapeles</Button>
          <Button onClick={handleCloseDialog}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </>
  )
};

const validateRequired = (value) => !!value?.length;

const validateEmail = (email) =>
  !email ||
  email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
);

function validateUser(user) {
  return {
    USR_Usuario: !validateRequired(user.USR_Usuario) ? 'Usuario es obligatorio' : '',
    USR_Nombre: !validateRequired(user.USR_Nombre) ? 'Nombre es obligatorio' : '',
    USR_Apellido: !validateRequired(user.USR_Apellido) ? 'Apellido es obligatorio' : '',
    USR_Mail: !validateRequired(user.USR_Mail) ? 'Correo es obligatorio' : !validateEmail(user.USR_Mail) ? 'Formato de correo no válido' : '',
    PER_Descripcion: !validateRequired(user.PER_Descripcion) ? 'Perfil es obligatorio' : '',    
    estadodesc: !validateRequired(user.estadodesc) ? 'Estado es Obligatorio' : '',
  };
}

export default User;