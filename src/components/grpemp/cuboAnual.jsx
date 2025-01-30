import { useMemo, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/material/Grid';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import { UserData } from '../../../mock/data8.js';

const anios = [
    { "label": "2022", "year": 2022 },
    { "label": "2023", "year": 2023 },
    { "label": "2024", "year": 2024 },
    { "label": "2025", "year": 2025 }
]

export default function CuboAnual({anio}){
    const selectedAnios = anios?.filter(item => item.year === anio[0]).sort((a, b) => a.year - b.year)
    const [aniosSelected, setAniosSelected] = useState(selectedAnios);
    const [title, setTitle] = useState('Gráfico de Ventas');
    const [resultData, setResultData] = useState();       //Datos filtrados por año(s) seleccionado(s)

    const initialExpandedRootRows = useMemo(
        () =>
            UserData
            .map((originalRow) => originalRow.id) //get all the root row ids, use recursion for additional levels
            .reduce((a, v) => ({ ...a, [v]: true }), {}), //convert to an object with all the ids as keys and `true` as values
        [],
      );
  const columns = useMemo(
    //column definitions...
    () => [
      {
        accessorKey: 'firstName',
        header: 'First Name',
      },
      {
        accessorKey: 'lastName',
        header: 'Last Name',
      },

      {
        accessorKey: 'address',
        header: 'Address',
      },
      {
        accessorKey: 'city',
        header: 'City',
      },

      {
        accessorKey: 'state',
        enableColumnOrdering: false,
        header: 'State',
      },
    ],
    [],
    //end
  );

  const table = useMaterialReactTable({
    columns,
    data:UserData,
    enableExpandAll: false, //hide expand all double arrow in column header
    enableExpanding: true,
    getRowId: (originalRow) => originalRow.id,
    enableFilters: false,
    enableDensityToggle: false,
    enableBottomToolbar: false,
    enableFullScreenToggle: false,
    enableHiding: false,
    enableColumnOrdering: false,
    enableRowOrdering: false,
    enableSorting: false,
    enableColumnActions: false,
    initialState: { 
        expanded: initialExpandedRootRows,
        density: 'compact'
    }, //only expand the root rows by default

  });

  useEffect(() => {
    if(aniosSelected.length === 1){
        setTitle('CUBO ' + ' año ' + aniosSelected[0].label );
    }        
    else{
       setTitle('CUBO');
    }
}, [aniosSelected]);

  return (
    <>
        <Grid container spacing={2} className='pb-4'>
            <Grid item xs={12} className='pb-4'>
                <div className="flex justify-center rounded-xl bg-[#5d4889] text-white shadow-md py-4 align-middle">
                    <h2 className="text-2xl font-light text-center">{title}</h2>
                </div>
            </Grid>
            <Grid item xs={3}> 
                <Autocomplete
                    disablePortal
                    disableClearable={true}
                    id="utilidad-anios"
                    value={aniosSelected[0].label}
                    options={anios}
                    sx={{ width: "100%"}}
                    onChange={(event, newValue) => {
                        setAniosSelected([
                            newValue,
                        ]);
                    }}

                    renderInput={(params) => <TextField {...params} label="Año" variant="standard"/>}
                />
            </Grid>                
            <Grid item xs={12} sx={{height: '400px'}}> 
                <MaterialReactTable table={table} />
            </Grid>
        </Grid>
    </>
    );
}