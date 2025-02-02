/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useMemo, useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
//const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

export default function CuboAnual({anio, data, sumaNiveles}){
    const [title, setTitle] = useState('Gráfico de Ventas');
    //const [resultData, setResultData] = useState();       //Datos filtrados por año(s) seleccionado(s)

    console.log(sumaNiveles, 'sumaNiveles');
    const xx = sumaNiveles//[0]?.['resultado']['1. OPERACIONAL']['months']

    console.log('xx', xx);

    console.log('dataCubo123456', data, anio);
    const dataCubo = useMemo(() => {
      return data.map((item,idx) => ({        
        id: idx,
        'cuenta': item['Resultado'],
        'enero' : sumaNiveles[0]?.['resultado'][item['Resultado'].toUpperCase()]['months'][0].toLocaleString?.('en-ES', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).replaceAll(',', '.'),
        'febrero': sumaNiveles[0]?.['resultado'][item['Resultado'].toUpperCase()]['months'][1].toLocaleString?.('en-ES', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).replaceAll(',', '.'),
        'marzo': sumaNiveles[0]?.['resultado'][item['Resultado'].toUpperCase()]['months'][2].toLocaleString?.('en-ES', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).replaceAll(',', '.'),
        'abril': sumaNiveles[0]?.['resultado'][item['Resultado'].toUpperCase()]['months'][3].toLocaleString?.('en-ES', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).replaceAll(',', '.'),
        'mayo': sumaNiveles[0]?.['resultado'][item['Resultado'].toUpperCase()]['months'][4].toLocaleString?.('en-ES', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).replaceAll(',', '.'),
        'junio': sumaNiveles[0]?.['resultado'][item['Resultado'].toUpperCase()]['months'][5].toLocaleString?.('en-ES', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).replaceAll(',', '.'),
        'julio': sumaNiveles[0]?.['resultado'][item['Resultado'].toUpperCase()]['months'][6].toLocaleString?.('en-ES', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).replaceAll(',', '.'),
        'agosto': sumaNiveles[0]?.['resultado'][item['Resultado'].toUpperCase()]['months'][7].toLocaleString?.('en-ES', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).replaceAll(',', '.'),
        'septiembre': sumaNiveles[0]?.['resultado'][item['Resultado'].toUpperCase()]['months'][8].toLocaleString?.('en-ES', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).replaceAll(',', '.'),
        'octubre': sumaNiveles[0]?.['resultado'][item['Resultado'].toUpperCase()]['months'][9].toLocaleString?.('en-ES', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).replaceAll(',', '.'),
        'noviembre': sumaNiveles[0]?.['resultado'][item['Resultado'].toUpperCase()]['months'][10].toLocaleString?.('en-ES', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).replaceAll(',', '.'),
        'diciembre': sumaNiveles[0]?.['resultado'][item['Resultado'].toUpperCase()]['months'][11].toLocaleString?.('en-ES', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).replaceAll(',', '.'),
        'totalesanual': sumaNiveles[0]?.['resultado'][item['Resultado'].toUpperCase()]['months'][12].toLocaleString?.('en-ES', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).replaceAll(',', '.'),
        subRows: item.data.map((n1item) => ({
          'cuenta': n1item['Nivel 1'],
          'enero': sumaNiveles[0]?.['nivel1'][n1item['Nivel 1'].toUpperCase()]['months'][0].toLocaleString?.('en-ES', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }).replaceAll(',', '.'),
          'febrero': sumaNiveles[0]?.['nivel1'][n1item['Nivel 1'].toUpperCase()]['months'][1].toLocaleString?.('en-ES', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }).replaceAll(',', '.'),
          'marzo': sumaNiveles[0]?.['nivel1'][n1item['Nivel 1'].toUpperCase()]['months'][2].toLocaleString?.('en-ES', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }).replaceAll(',', '.'),
          'abril': sumaNiveles[0]?.['nivel1'][n1item['Nivel 1'].toUpperCase()]['months'][3].toLocaleString?.('en-ES', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }).replaceAll(',', '.'),
          'mayo': sumaNiveles[0]?.['nivel1'][n1item['Nivel 1'].toUpperCase()]['months'][4].toLocaleString?.('en-ES', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }).replaceAll(',', '.'),
          'junio': sumaNiveles[0]?.['nivel1'][n1item['Nivel 1'].toUpperCase()]['months'][5].toLocaleString?.('en-ES', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }).replaceAll(',', '.'),
          'julio': sumaNiveles[0]?.['nivel1'][n1item['Nivel 1'].toUpperCase()]['months'][6].toLocaleString?.('en-ES', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }).replaceAll(',', '.'),
          'agosto': sumaNiveles[0]?.['nivel1'][n1item['Nivel 1'].toUpperCase()]['months'][7].toLocaleString?.('en-ES', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }).replaceAll(',', '.'),
          'septiembre': sumaNiveles[0]?.['nivel1'][n1item['Nivel 1'].toUpperCase()]['months'][8].toLocaleString?.('en-ES', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }).replaceAll(',', '.'),
          'octubre': sumaNiveles[0]?.['nivel1'][n1item['Nivel 1'].toUpperCase()]['months'][9].toLocaleString?.('en-ES', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }).replaceAll(',', '.'),
          'noviembre': sumaNiveles[0]?.['nivel1'][n1item['Nivel 1'].toUpperCase()]['months'][10].toLocaleString?.('en-ES', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }).replaceAll(',', '.'),
          'diciembre': sumaNiveles[0]?.['nivel1'][n1item['Nivel 1'].toUpperCase()]['months'][11].toLocaleString?.('en-ES', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }).replaceAll(',', '.'),
          'totalesanual': sumaNiveles[0]?.['nivel1'][n1item['Nivel 1'].toUpperCase()]['months'][12].toLocaleString?.('en-ES', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }).replaceAll(',', '.'),          
          subRows: n1item.data.map((n2item) => ({
            'cuenta': n2item['Nivel 2'],
            'enero': sumaNiveles[0]?.['nivel2'][n2item['Nivel 2'].toUpperCase()]['months'][0].toLocaleString?.('en-ES', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).replaceAll(',', '.'),
            'febrero': sumaNiveles[0]?.['nivel2'][n2item['Nivel 2'].toUpperCase()]['months'][1].toLocaleString?.('en-ES', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).replaceAll(',', '.'),
            'marzo': sumaNiveles[0]?.['nivel2'][n2item['Nivel 2'].toUpperCase()]['months'][2].toLocaleString?.('en-ES', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).replaceAll(',', '.'),
            'abril': sumaNiveles[0]?.['nivel2'][n2item['Nivel 2'].toUpperCase()]['months'][3].toLocaleString?.('en-ES', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).replaceAll(',', '.'),
            'mayo': sumaNiveles[0]?.['nivel2'][n2item['Nivel 2'].toUpperCase()]['months'][4].toLocaleString?.('en-ES', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).replaceAll(',', '.'),
            'junio': sumaNiveles[0]?.['nivel2'][n2item['Nivel 2'].toUpperCase()]['months'][5].toLocaleString?.('en-ES', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).replaceAll(',', '.'),
            'julio': sumaNiveles[0]?.['nivel2'][n2item['Nivel 2'].toUpperCase()]['months'][6].toLocaleString?.('en-ES', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).replaceAll(',', '.'),
            'agosto': sumaNiveles[0]?.['nivel2'][n2item['Nivel 2'].toUpperCase()]['months'][7].toLocaleString?.('en-ES', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).replaceAll(',', '.'),
            'septiembre': sumaNiveles[0]?.['nivel2'][n2item['Nivel 2'].toUpperCase()]['months'][8].toLocaleString?.('en-ES', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).replaceAll(',', '.'),
            'octubre': sumaNiveles[0]?.['nivel2'][n2item['Nivel 2'].toUpperCase()]['months'][9].toLocaleString?.('en-ES', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).replaceAll(',', '.'),
            'noviembre': sumaNiveles[0]?.['nivel2'][n2item['Nivel 2'].toUpperCase()]['months'][10].toLocaleString?.('en-ES', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).replaceAll(',', '.'),
            'diciembre': sumaNiveles[0]?.['nivel2'][n2item['Nivel 2'].toUpperCase()]['months'][11].toLocaleString?.('en-ES', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).replaceAll(',', '.'),
            'totalesanual': sumaNiveles[0]?.['nivel2'][n2item['Nivel 2'].toUpperCase()]['months'][12].toLocaleString?.('en-ES', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).replaceAll(',', '.'),  
            subRows: n2item.data.map((cuentaitem) => {
              const cuentaRow = {
                'cuenta': cuentaitem['Cuenta'],
                'enero': cuentaitem.data.filter((mesitem) => mesitem.month === anio[0] + '-1')[0]?.value.toLocaleString?.('en-ES', {
                  style: 'currency',
                  currency: 'USD',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }).replaceAll(',', '.'),
                'febrero': cuentaitem.data.filter((mesitem) => mesitem.month === anio[0] + '-2')[0]?.value.toLocaleString?.('en-ES', {
                  style: 'currency',
                  currency: 'USD',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }).replaceAll(',', '.'),
                'marzo': cuentaitem.data.filter((mesitem) => mesitem.month === anio[0] + '-3')[0]?.value.toLocaleString?.('en-ES', {
                  style: 'currency',
                  currency: 'USD',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }).replaceAll(',', '.'),
                'abril': cuentaitem.data.filter((mesitem) => mesitem.month === anio[0] + '-4')[0]?.value.toLocaleString?.('en-ES', {
                  style: 'currency',
                  currency: 'USD',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }).replaceAll(',', '.'),
                'mayo': cuentaitem.data.filter((mesitem) => mesitem.month === anio[0] + '-5')[0]?.value.toLocaleString?.('en-ES', {
                  style: 'currency',
                  currency: 'USD',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }).replaceAll(',', '.'),
                'junio': cuentaitem.data.filter((mesitem) => mesitem.month === anio[0] + '-6')[0]?.value.toLocaleString?.('en-ES', {
                  style: 'currency',
                  currency: 'USD',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }).replaceAll(',', '.'),
                'julio': cuentaitem.data.filter((mesitem) => mesitem.month === anio[0] + '-7')[0]?.value.toLocaleString?.('en-ES', {
                  style: 'currency',
                  currency: 'USD',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }).replaceAll(',', '.'),
                'agosto': cuentaitem.data.filter((mesitem) => mesitem.month === anio[0] + '-8')[0]?.value.toLocaleString?.('en-ES', {
                  style: 'currency',
                  currency: 'USD',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }).replaceAll(',', '.'),
                'septiembre': cuentaitem.data.filter((mesitem) => mesitem.month === anio[0] + '-9')[0]?.value.toLocaleString?.('en-ES', {
                  style: 'currency',
                  currency: 'USD',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }).replaceAll(',', '.'),
                'octubre': cuentaitem.data.filter((mesitem) => mesitem.month === anio[0] + '-10')[0]?.value.toLocaleString?.('en-ES', {
                  style: 'currency',
                  currency: 'USD',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }).replaceAll(',', '.'),
                'noviembre': cuentaitem.data.filter((mesitem) => mesitem.month === anio[0] + '-11')[0]?.value.toLocaleString?.('en-ES', {
                  style: 'currency',
                  currency: 'USD',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }).replaceAll(',', '.'),
                'diciembre': cuentaitem.data.filter((mesitem) => mesitem.month === anio[0] + '-12')[0]?.value.toLocaleString?.('en-ES', {
                  style: 'currency',
                  currency: 'USD',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }).replaceAll(',', '.')
              }
              cuentaRow['totalesanual'] = Object.values(cuentaRow).slice(1, 12).reduce((acc, val) => acc + parseInt(val.replaceAll("$","").replaceAll(".","")), 0).toLocaleString?.('en-ES', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }).replaceAll(',', '.');
              return cuentaRow;
            })
          }))
        }))
      }))    
    }, [data]);

    //Agregando los totales por mes (columnas)
    dataCubo.push({
      id: dataCubo.length,
      'cuenta': 'Total Mes',
      'enero': sumaNiveles[0]?.['total']['months'][0].toLocaleString?.('en-ES', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).replaceAll(',', '.'),
      'febrero': sumaNiveles[0]?.['total']['months'][1].toLocaleString?.('en-ES', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).replaceAll(',', '.'),
      'marzo': sumaNiveles[0]?.['total']['months'][2].toLocaleString?.('en-ES', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).replaceAll(',', '.'),
      'abril': sumaNiveles[0]?.['total']['months'][3].toLocaleString?.('en-ES', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).replaceAll(',', '.'),
      'mayo': sumaNiveles[0]?.['total']['months'][4].toLocaleString?.('en-ES', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).replaceAll(',', '.'),
      'junio': sumaNiveles[0]?.['total']['months'][5].toLocaleString?.('en-ES', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).replaceAll(',', '.'),
      'julio': sumaNiveles[0]?.['total']['months'][6].toLocaleString?.('en-ES', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).replaceAll(',', '.'),
      'agosto': sumaNiveles[0]?.['total']['months'][7].toLocaleString?.('en-ES', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).replaceAll(',', '.'),
      'septiembre': sumaNiveles[0]?.['total']['months'][8].toLocaleString?.('en-ES', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).replaceAll(',', '.'),
      'octubre': sumaNiveles[0]?.['total']['months'][9].toLocaleString?.('en-ES', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).replaceAll(',', '.'),
      'noviembre': sumaNiveles[0]?.['total']['months'][10].toLocaleString?.('en-ES', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).replaceAll(',', '.'),
      'diciembre': sumaNiveles[0]?.['total']['months'][11].toLocaleString?.('en-ES', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).replaceAll(',', '.'),
      'totalesanual': sumaNiveles[0]?.['total']['months'][12].toLocaleString?.('en-ES', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).replaceAll(',', '.'),      
    })
    
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
          size: 50, //small column
          grow: false, //don't allow this column to grow (if layoutMode is grid)
          muiTableHeadCellProps: {
            //simple styling with the `sx` prop, works just like a style prop in this example
            sx: {
              fontWeight: '100',
              fontSize: '12px',
            },
          },
        },
        {
          accessorKey: 'enero',
          header: 'Enero',
          size: 50, //small column
          muiTableHeadCellProps: {
            //simple styling with the `sx` prop, works just like a style prop in this example
            sx: {
              fontWeight: '100',
              fontSize: '12px',
            },
          },
        },

        {
          accessorKey: 'febrero',
          header: 'Febereo',
          size: 50, //small column
          muiTableHeadCellProps: {
            //simple styling with the `sx` prop, works just like a style prop in this example
            sx: {
              fontWeight: '100',
              fontSize: '12px',
            },
          },
        },
        {
          accessorKey: 'marzo',
          header: 'Marzo',
          size: 50, //small column
          muiTableHeadCellProps: {
            //simple styling with the `sx` prop, works just like a style prop in this example
            sx: {
              fontWeight: '100',
              fontSize: '12px',
            },
          },
        },
        {
          accessorKey: 'abril',
          header: 'Abril',
          size: 50, //small column
          muiTableHeadCellProps: {
            //simple styling with the `sx` prop, works just like a style prop in this example
            sx: {
              fontWeight: '100',
              fontSize: '12px',
            },
          },
        },
        {
          accessorKey: 'mayo',
          header: 'Mayo',
          size: 50, //small column
          muiTableHeadCellProps: {
            //simple styling with the `sx` prop, works just like a style prop in this example
            sx: {
              fontWeight: '100',
              fontSize: '12px',
            },
          },
        },
        {
          accessorKey: 'junio',
          header: 'Junio',
          size: 50, //small column
          muiTableHeadCellProps: {
            //simple styling with the `sx` prop, works just like a style prop in this example
            sx: {
              fontWeight: '100',
              fontSize: '12px',
            },
          },
        },
        {
          accessorKey: 'julio',
          header: 'Julio',
          size: 50, //small column
          muiTableHeadCellProps: {
            //simple styling with the `sx` prop, works just like a style prop in this example
            sx: {
              fontWeight: '100',
              fontSize: '12px',
            },
          },
        },
        {
          accessorKey: 'agosto',
          header: 'Agosto',
          size: 50, //small column
          muiTableHeadCellProps: {
            //simple styling with the `sx` prop, works just like a style prop in this example
            sx: {
              fontWeight: '100',
              fontSize: '12px',
            },
          },
        },
        {
          accessorKey: 'septiembre',
          header: 'Septiembre',
          size: 50, //small column
          muiTableHeadCellProps: {
            //simple styling with the `sx` prop, works just like a style prop in this example
            sx: {
              fontWeight: '100',
              fontSize: '12px',
            },
          },
        },
        {
          accessorKey: 'octubre',
          header: 'Octubre',
          size: 50, //small column
          muiTableHeadCellProps: {
            //simple styling with the `sx` prop, works just like a style prop in this example
            sx: {
              fontWeight: '100',
              fontSize: '12px',
            },
          },
        },
        {
          accessorKey: 'noviembre',
          header: 'Noviembre',
          size: 50, //small column
          muiTableHeadCellProps: {
            //simple styling with the `sx` prop, works just like a style prop in this example
            sx: {
              fontWeight: '100',
              fontSize: '12px',
            },
          },
        },
        {
          accessorKey: 'diciembre',
          header: 'Diciembre',
          size: 50, //small column
          muiTableHeadCellProps: {
            //simple styling with the `sx` prop, works just like a style prop in this example
            sx: {
              fontWeight: '100',
              fontSize: '12px',
            },
          },
        },
        {
          accessorKey: 'totalesanual',
          header: 'Totales Anual',
          size: 50, //small column
          muiTableHeadCellProps: {
            //simple styling with the `sx` prop, works just like a style prop in this example
            sx: {
              fontWeight: '100',
              fontSize: '12px',
            },
          },
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
      enablePagination: false,
      initialState: { 
          expanded: initialExpandedRootRows,
          density: 'compact'
      }, //only expand the root rows by default
      muiTableHeadCellProps: {
        //simple styling with the `sx` prop, works just like a style prop in this example
        sx: {
          fontWeight: '100',
          fontSize: '12px',
        },
      },

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
          <Grid item xs={12} sx={{height: '100%'}}> 
              <MaterialReactTable table={table} />
          </Grid>
      </Grid>
    </>
  );
}