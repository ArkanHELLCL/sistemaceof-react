/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useMemo, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/material/Grid';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import { UserData } from '../../../mock/data8.js';


export default function CuboAnual({anio, data, headers}){
    const [title, setTitle] = useState('Gráfico de Ventas');
    const [resultData, setResultData] = useState();       //Datos filtrados por año(s) seleccionado(s)

    console.log('data', data);
    const dataCubo = useMemo(() => {
      return data.map((item,idx) => ({        
        id: idx,
        'cuenta': item['Resultado'],
        'enero': 0,
        'febrero': 0,
        'marzo': 0,
        'abril': 0,
        'mayo': 0,
        'junio': 0,
        'julio': 0,
        'agosto': 0,
        'septiembre': 0,
        'octubre': 0,
        'noviembre': 0,
        'diciembre': 0,
        subRows: item.data.map((n1item) => ({
          'cuenta': n1item['Nivel 1'],
          'enero': 0,
          'febrero': 0,
          'marzo': 0,
          'abril': 0,
          'mayo': 0,
          'junio': 0,
          'julio': 0,
          'agosto': 0,
          'septiembre': 0,
          'octubre': 0,
          'noviembre': 0,
          'diciembre': 0,
          subRows: n1item.data.map((n2item) => ({
            'cuenta': n2item['Nivel 2'],
            'enero': 0,
            'febrero': 0,
            'marzo': 0,
            'abril': 0,
            'mayo': 0,
            'junio': 0,
            'julio': 0,
            'agosto': 0,
            'septiembre': 0,
            'octubre': 0,
            'noviembre': 0,
            'diciembre': 0,
            subRows: n2item.data.map((cuentaitem) => ({
              'cuenta': cuentaitem['Cuenta'],
              'enero': cuentaitem.data.filter((mesitem) => mesitem.month === anio[0] + '-1')[0]?.value,
              'febrero': cuentaitem.data.filter((mesitem) => mesitem.month === anio[0] + '-2')[0]?.value,
              'marzo': cuentaitem.data.filter((mesitem) => mesitem.month === anio[0] + '-3')[0]?.value,
              'abril': cuentaitem.data.filter((mesitem) => mesitem.month === anio[0] + '-4')[0]?.value,
              'mayo': cuentaitem.data.filter((mesitem) => mesitem.month === anio[0] + '-5')[0]?.value,
              'junio': cuentaitem.data.filter((mesitem) => mesitem.month === anio[0] + '-6')[0]?.value,
              'julio': cuentaitem.data.filter((mesitem) => mesitem.month === anio[0] + '-7')[0]?.value,
              'agosto': cuentaitem.data.filter((mesitem) => mesitem.month === anio[0] + '-8')[0]?.value,
              'septiembre': cuentaitem.data.filter((mesitem) => mesitem.month === anio[0] + '-9')[0]?.value,
              'octubre': cuentaitem.data.filter((mesitem) => mesitem.month === anio[0] + '-10')[0]?.value,
              'noviembre': cuentaitem.data.filter((mesitem) => mesitem.month === anio[0] + '-11')[0]?.value,
              'diciembre': cuentaitem.data.filter((mesitem) => mesitem.month === anio[0] + '-12')[0]?.value,
            }))
          }))
        }))
      }))


    }, [data]);

    const initialExpandedRootRows = useMemo(
      () =>
          dataCubo
          .map((originalRow) => originalRow.id) //get all the root row ids, use recursion for additional levels
          .reduce((a, v) => ({ ...a, [v]: true }), {}), //convert to an object with all the ids as keys and `true` as values
      [],
    );      
    console.log(dataCubo, 'dataCubo');
    const columns = useMemo(
      //column definitions...
      () => [
        {
          accessorKey: 'cuenta',
          header: 'Cuenta',
        },
        {
          accessorKey: 'enero',
          header: 'Enero',
        },

        {
          accessorKey: 'febrero',
          header: 'Febereo',
        },
        {
          accessorKey: 'marzo',
          header: 'MArzo',
        },
        {
          accessorKey: 'abril',
          header: 'Abril',
        },
        {
          accessorKey: 'mayo',
          header: 'Mayo',
        },
        {
          accessorKey: 'junio',
          header: 'Junio',
        },
        {
          accessorKey: 'julio',
          header: 'Julio',
        },
        {
          accessorKey: 'agosto',
          header: 'Agosto',
        },
        {
          accessorKey: 'septiembre',
          header: 'Septiembre',
        },
        {
          accessorKey: 'octubre',
          header: 'Octubre',
        },
        {
          accessorKey: 'noviembre',
          header: 'Noviembre',
        },
        {
          accessorKey: 'diciembre',
          header: 'Diciembre',
        },
      ],
      [],
      //end
    );

    const table = useMaterialReactTable({
      columns,
      //data:UserData,
      data: dataCubo,
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
      if(anio.length === 1){
          setTitle('CUBO ' + ' año ' + anio[0]);
      }        
      else{
        setTitle('CUBO');
      }
    }, [anio]);

  return (
    <>
      <Grid container spacing={2} className='pb-4'>
          <Grid item xs={12} className='pb-4'>
              <div className="flex justify-center rounded-xl bg-[#5d4889] text-white shadow-md py-4 align-middle">
                  <h2 className="text-2xl font-light text-center">{title}</h2>
              </div>
          </Grid>                          
          <Grid item xs={12} sx={{height: '400px'}}> 
              <MaterialReactTable table={table} />
          </Grid>
      </Grid>
    </>
  );
}