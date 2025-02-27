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

const Enterprise = ({user}) => {
  const [validationErrors, setValidationErrors] = useState({});
  const [fetchedEmps, setFetchedEmps] = useState([]);
  const [isLoadingEmps, setIsLoadingEmps] = useState(true);
  const [isLoadingEmpsError, setIsLoadingEmpsError] = useState(false);
  const [isCreatingEmp, setIsCreatingEmp] = useState(false);
  const [isUpdatingEmp, setIsUpdatingEmp] = useState(false);
  const [isDeletingEmp, setIsDeletingEmp] = useState(false);

  const VITE_API_GETEMPRESAS_URL = import.meta.env.VITE_API_GETEMPRESAS_URL;
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

  useEffect(() => {
    fetchEmps();
  }, []);

  const fetchEmps = async () => {
    setIsLoadingEmps(true);    
    fetch(`${VITE_API_GETEMPRESAS_URL}`)
    .then(response => response.json())
    .then(emps => {
      const {data} = emps;
      setFetchedEmps(data);
      setIsLoadingEmps(false);
    })
    .finally(() => {
    })
    .catch(error => {
      setIsLoadingEmpsError(true);
      setIsLoadingEmps(false);
    })
  };

  const createEmp = async (emp) => {
    setIsCreatingEmp(true);
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emp),
      });
      const newEmp = await response.json();
      setFetchedEmps((prevEmps) => [...prevEmps, newEmp]);
      setIsCreatingEmp(false);
    } catch (error) {
      setIsCreatingEmp(false);
    }
  };

  const updateEmp = async (emp) => {
    const empToUpdate = { ...emp };
    empToUpdate.destipografico = tpoGraph.find((g) => g.value === emp.destipografico).text;

    setIsUpdatingEmp(true);
    try {
      await fetch(`/api/users/${emp.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(empToUpdate),
      });
      setFetchedEmps((prevEmps) =>
        prevEmps.map((prevEmp) =>
          prevEmp.id === emp.id ? emp : prevEmp,
        ),
      );
      setIsUpdatingEmp(false);
    } catch (error) {
      setIsUpdatingEmp(false);
    }
  };

  const deleteEmp = async (empId) => {
    setIsDeletingEmp(true);
    try {
      await fetch(`/api/users/${empId}`, {
        method: 'DELETE',
      });
      setFetchedEmps((prevEmps) =>
        prevEmps.filter((emp) => emp.id !== empId),
      );
      setIsDeletingEmp(false);
    } catch (error) {
      setIsDeletingEmp(false);
    }
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'Id',
        enableEditing: false,
        size: 80,
      },
      {
        accessorKey: 'label',
        header: 'Razón Social',
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.label,
          helperText: validationErrors?.label,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              label: undefined,
            }),
        },
      },
      {
        accessorKey: 'EMP_Codigo',
        header: 'RUT',
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.EMP_Codigo,
          helperText: validationErrors?.EMP_Codigo,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              EMP_Codigo: undefined,
            }),
        },
      },
      {
        accessorKey: 'EMP_Email',
        header: 'Email',
        muiEditTextFieldProps: {
          type: 'email',
          error: !!validationErrors?.EMP_Email,
          helperText: validationErrors?.EMP_Email,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              EMP_Email: undefined,
            }),
        },
      },
      {
        accessorKey: 'EMP_UrlLogo',
        header: 'URL del Logo',
        muiEditTextFieldProps: {
          type: 'url',
          error: !!validationErrors?.EMP_UrlLogo,
          helperText: validationErrors?.EMP_UrlLogo,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              EMP_UrlLogo: undefined,
            }),
        },
      },
      {
        accessorKey: 'destipografico',
        header: 'Tipo de Gráfico',       
        editVariant: 'select',       
        editSelectOptions: tpoGraph,
        muiEditTextFieldProps: {
          select: true,
          required: true,
          error: !!validationErrors?.destipografico,
          helperText: validationErrors?.destipografico,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              destipografico: undefined,
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
  const handleCreateEmp = async ({ values, table }) => {
    const newValidationErrors = validateEmp(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    await createEmp(values);
    table.setCreatingRow(null); //exit creating mode
  };

  //UPDATE action
  const handleSaveEmp = async ({ values, table }) => {
    const newValidationErrors = validateEmp(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    await updateEmp(values);
    table.setEditingRow(null); //exit editing mode
  };

  //DELETE action
  const openDeleteConfirmModal = (row) => {
    if (window.confirm('Are you sure you want to delete this emp?')) {
      deleteEmp(row.original.id);
    }
  };

  const table = useMaterialReactTable({
    columns,
    data: fetchedEmps,
    createDisplayMode: 'row', // ('modal', and 'custom' are also available)
    editDisplayMode: 'row', // ('modal', 'cell', 'table', and 'custom' are also available)
    enableEditing: true,
    getRowId: (row) => row.id,
    muiToolbarAlertBannerProps: isLoadingEmpsError
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
    onCreatingRowSave: handleCreateEmp,
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleSaveEmp,
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
        Crear nueva Empresa
      </Button>
    ),
    state: {
      isLoading: isLoadingEmps,
      isSaving: isCreatingEmp || isUpdatingEmp || isDeletingEmp,
      showAlertBanner: isLoadingEmpsError,
      showProgressBars: isLoadingEmps,
    },
  });
  return (
      <Grid container spacing={2} className='pb-4'>
        <Grid size={{ xs: 12, xl: 12 }} className='pb-4'>
            <div className="flex justify-center rounded-xl bg-[#5d4889] text-white shadow-md py-4 align-middle">
                <h2 className="text-2xl font-light text-center">{'Empresas registradas en el sistema'}</h2>
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

function validateEmp(emp) {
  return {
    label: !validateRequired(emp.label) ? 'Razón Social es obligatoria' : '',
    EMP_Codigo: !validateRequired(emp.EMP_Codigo) ? 'RUT es obligatorio' : !validateRut(emp.EMP_Codigo) ? 'RUT no es válido' : '',
    EMP_Email: !validateEmail(emp.EMP_Email) ? 'Incorrect Email Format' : '',
    EMP_UrlLogo: !validateUrl(emp.EMP_UrlLogo) ? 'Formato de URL incorrecto' : '',
    destipografico: !validateRequired(emp.destipografico) ? 'Tipo de Gráfico es obligatorio' : '',
    estadodesc: !validateRequired(emp.estadodesc) ? 'Obligatorio' : '',
  };
}

export default Enterprise;