/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/material/Grid';
import PanelFinancieroTable from '../graficos/panelfinancieroTable';

const meses = [
    { "label": "Enero", "month": 1 },
    { "label": "Febrero", "month": 2 },
    { "label": "Marzo", "month": 3 },
    { "label": "Abril", "month": 4 },
    { "label": "Mayo", "month": 5 },
    { "label": "Junio", "month": 6 },
    { "label": "Julio", "month": 7 },
    { "label": "Agosto", "month": 8 },
    { "label": "Septiembre", "month": 9 },
    { "label": "Octubre", "month": 10 },
    { "label": "Noviembre", "month": 11 },
    { "label": "Diciembre", "month": 12 }
]

export default function PanelFinancieroAnual({data, anio, mes}){
    const selectdMes = meses?.filter(item => item.month === mes[0])
    const [mesSelected, setMesSelected] = useState(selectdMes);
    const [title, setTitle] = useState('Panel Financiero');
    const [resultData, setResultData] = useState([]);
    const [rangoMes, setRangoMes] = useState([]);
    const [anioant, setAnioant] = useState(anio[0]-1);
    const [mesant, setMesant] = useState();

    const emptyColumn = (label) => {
        const col = [];
        col.push({"id" : 1, "valor" : label});
        col.push({"id" : 2, "valor" : ''});
        col.push({"id" : 3, "valor" : ''});
        col.push({"id" : 4, "valor" : ''});
        col.push({"id" : 5, "valor" : ''});
        col.push({"id" : 6, "valor" : ''});
        col.push({"id" : 7, "valor" : ''});
        col.push({"id" : 8, "valor" : ''});
        col.push({"id" : 9, "valor" : ''});
        return col;
    }

    const column = (label, data, nivel, item, mes) =>{
        const col = [];
        const year = data.filter(item => item.year === anio[0])[0]
        const yearant = data.filter(item => item.year === anio[0]-1)[0]

        col.push({"id" : 1, "valor" : label});

        let valor = year ? parseInt(year[nivel][item]?.months?.slice(0,12).filter((item, idx) => idx === mes-1)[0]) : 0
        valor = valor ? valor : 0;
        col.push({"id" : 2, "valor" : valor ? valor : 0});

        valor = year ? parseInt(year[nivel][item]?.months?.slice(0,12).filter((item, idx) => idx === mes-2)[0]) : 0
        valor = valor ? valor : 0;
        col.push({"id" : 3, "valor" : valor ? valor : 0});

        if(col[2].valor === 0)
            valor = 0
        else
            valor = (col[1].valor-col[2].valor) / Math.abs(col[2].valor) * 100
        
        valor = valor ? Math.round(valor) : 0;
        col.push({"id" : 4, "valor" : `${valor ? valor : 0}%`});

        valor = yearant ? parseInt(yearant[nivel][item]?.months?.slice(0,12).filter((item, idx) => idx === mes-1)[0]) : 0
        valor = valor ? valor : 0;
        col.push({"id" : 5, "valor" : valor ? valor : 0});

        if(col[4].valor === 0)
            valor = 0
        else
            valor = ((col[1].valor-col[4].valor) / Math.abs(col[4].valor )) * 100

        valor = valor ? Math.round(valor) : 0;
        col.push({"id" : 6, "valor" : `${valor ? valor : 0}%`});

        //Acumular por el maximo de meses cargados actualmente - todo
        valor = year ? parseInt(year[nivel][item]?.months?.slice(0,mes).reduce((acc, val) => acc + val, 0)) : 0
        valor = valor ? valor : 0
        col.push({"id" : 7, "valor" : valor ? valor : 0});

        valor = yearant ? parseInt(yearant[nivel][item]?.months?.slice(0,mes).reduce((acc, val) => acc + val, 0)) : 0
        valor = valor ? valor : 0
        col.push({"id" : 8, "valor" : valor ? valor : 0});

        if(col[7].valor === 0)
            valor = 0
        else
            valor = ((col[6].valor-col[7].valor) / Math.abs(col[7].valor)) * 100
                
        valor = valor ? Math.round(valor) : 0;
        col.push({"id" : 9, "valor" : `${valor ? valor : 0}%`});

        return col
    }

    const sumarColumnas = (label, array1, array2) => {
        if (array1.length !== array2.length) {
          throw new Error('Los arrays deben tener la misma longitud');
        }
        let valor = 0;
        const col = [];
        col.push({"id" : 1, "valor" : label});
        
        valor = array1[1].valor + array2[1].valor;
        col.push({"id" : 2, "valor" : valor ? valor : 0});

        valor = array1[2].valor + array2[2].valor;
        col.push({"id" : 3, "valor" : valor ? valor : 0});

        if(col[2].valor === 0)
            valor = 0
        else
            valor = ((col[1].valor-col[2].valor) / Math.abs(col[2].valor )) * 100

        valor = valor ? Math.round(valor) : 0;
        col.push({"id" : 4, "valor" : `${valor ? valor : 0}%`});

        valor = array1[4].valor + array2[4].valor;
        col.push({"id" : 5, "valor" : valor ? valor : 0});

        if(col[4].valor === 0)
            valor = 0
        else
            valor = ((col[1].valor-col[4].valor) / Math.abs(col[4].valor )) * 100

        valor = valor ? Math.round(valor) : 0;
        col.push({"id" : 6, "valor" : `${valor ? valor : 0}%`});

        valor = array1[6].valor + array2[6].valor;
        col.push({"id" : 7, "valor" : valor ? valor : 0});

        valor = array1[7].valor + array2[7].valor;
        col.push({"id" : 8, "valor" : valor ? valor : 0});

        if(col[7].valor === 0)
            valor = 0
        else
            valor = ((col[6].valor-col[7].valor) / Math.abs(col[7].valor )) * 100

        valor = valor ? Math.round(valor) : 0;
        col.push({"id" : 6, "valor" : `${valor ? valor : 0}%`});
      
        return col;
    };

    const restar3Columnas = (label, array1, array2, array3) => {
        let valor = 0;
        const col = [];
        col.push({"id" : 1, "valor" : label});
        
        valor = array1[1].valor - array2[1].valor - array3[1].valor;
        col.push({"id" : 2, "valor" : valor ? valor : 0});

        valor = array1[2].valor - array2[2].valor - array3[2].valor;
        col.push({"id" : 3, "valor" : valor ? valor : 0});

        if(col[2].valor === 0)
            valor = 0
        else
            valor = ((col[1].valor-col[2].valor) / Math.abs(col[2].valor )) * 100

        valor = valor ? Math.round(valor) : 0;
        col.push({"id" : 4, "valor" : `${valor ? valor : 0}%`});

        valor = array1[4].valor - array2[4].valor - array3[4].valor;
        col.push({"id" : 5, "valor" : valor ? valor : 0});

        if(col[4].valor === 0)
            valor = 0
        else
            valor = ((col[1].valor-col[4].valor) / Math.abs(col[4].valor )) * 100

        valor = valor ? Math.round(valor) : 0;
        col.push({"id" : 6, "valor" : `${valor ? valor : 0}%`});

        valor = array1[6].valor - array2[6].valor - array3[6].valor;
        col.push({"id" : 7, "valor" : valor ? valor : 0});

        valor = array1[7].valor - array2[7].valor - array3[7].valor;
        col.push({"id" : 8, "valor" : valor ? valor : 0});

        if(col[7].valor === 0)
            valor = 0
        else
            valor = ((col[6].valor-col[7].valor) / Math.abs(col[7].valor )) * 100

        valor = valor ? Math.round(valor) : 0;
        col.push({"id" : 6, "valor" : `${valor ? valor : 0}%`});
      
        return col;
    };

    const percentajeColumns = (label, array1, array2, decimal) => {
        if (array1.length !== array2.length) {
            throw new Error('Los arrays deben tener la misma longitud');
        }
        let valor = 0;
        const col = [];
        col.push({"id" : 1, "valor" : label});

        if(array1[1].valor === 0)
            valor = 0
        else
            valor = ((array2[1].valor / array1[1].valor ) * 100 ).toFixed(decimal);
        col.push({"id" : 2, "valor" : `${valor ? valor : 0}%`});

        if(array1[2].valor === 0)
            valor = 0
        else
            valor = ((array2[2].valor / array1[2].valor ) * 100 ).toFixed(decimal);
        col.push({"id" : 3, "valor" : `${valor ? valor : 0}%`});

        if(parseInt(col[2].valor.replace('%','')) === 0)
            valor = 0
        else
            valor = (((parseInt(col[1].valor.replace('%',''))-parseInt(col[2].valor.replace('%',''))) / (parseInt(col[2].valor.replace('%','')))) * 100 );
        col.push({"id" : 4, "valor" : `${valor ? (valor).toFixed(decimal) : 0}%`});

        if(array1[4].valor === 0)
            valor = 0
        else
            valor = ((array2[4].valor / array1[4].valor ) * 100 ).toFixed(decimal);
        col.push({"id" : 5, "valor" : `${valor ? valor : 0}%`});

        if(parseInt(col[4].valor.replace('%','')) === 0)
            valor = 0
        else
            valor = (((parseInt(col[1].valor.replace('%',''))-parseInt(col[4].valor.replace('%',''))) / (parseInt(col[4].valor.replace('%','')))) * 100 );
        col.push({"id" : 6, "valor" : `${valor ? (valor).toFixed(decimal) : 0}%`});

        if(array1[6].valor === 0)
            valor = 0
        else
            valor = ((array2[6].valor / array1[6].valor ) * 100 ).toFixed(decimal);
        col.push({"id" : 7, "valor" : `${valor ? valor : 0}%`});

        if(array1[7].valor === 0)
            valor = 0
        else
            valor = ((array2[7].valor / array1[7].valor ) * 100 ).toFixed(decimal);
        col.push({"id" : 8, "valor" : `${valor ? valor : 0}%`});

        if(parseInt(col[7].valor.replace('%','')) === 0)
            valor = 0
        else
            valor = (((parseInt(col[6].valor.replace('%',''))-parseInt(col[7].valor.replace('%',''))) / (parseInt(col[7].valor.replace('%','')))) * 100 );
        col.push({"id" : 6, "valor" : `${valor ? (valor).toFixed(decimal) : 0}%`});

        return col;
    }

    useEffect(() => {
        if(data?.length>0 && anio.length === 1 && mesSelected[0].month > 0){
            const rows=[];
            //Row 1            
            rows.push({
                "data": column("Ventas Nacionales", data, 'nivel2', '1.1.1. VENTAS NACIONALES', mesSelected[0].month)
            })
            //Row 2     
            rows.push({
                "data": column("Otros Ingresos", data, 'nivel2', '1.1.3. OTROS INGRESOS', mesSelected[0].month)
            })
            //Row 3   
            rows.push({
                "data": column("Ingresos de Explotación", data, 'nivel1', '1.1. INGRESO DE EXPLOTACION', mesSelected[0].month)
            })            
            //Row 4
            rows.push({
                "data": column("Costos Directos", data, 'nivel2', '1.2.1. COSTOS DIRECTOS', mesSelected[0].month)
            })
            //Row 5
            rows.push({
                "data": column("Otros Costos", data, 'nivel2', '1.2.2. OTROS COSTOS EXPLOTACION', mesSelected[0].month)
            })
            //Row 6
            rows.push({
                "data": column("Costos de Explotación", data, 'nivel1', '1.2. COSTOS DE EXPLOTACION', mesSelected[0].month)
            })
            //Row 7
            //Fila 4 - 6
            rows.push({
                "data": sumarColumnas("Margen de Explotación",rows[2].data, rows[5].data)
            })
            //Row 8
            //Row 9
            rows.push({
                "data": column("Gasto de Remuneraciones", data, 'nivel2', '1.3.1. REMUNERACION Y HONORARIOS', mesSelected[0].month)
            })
            //Row 10
            rows.push({
                "data": column("Gasto Mantención", data, 'nivel2', '1.3.4. GASTOS MANTENCION', mesSelected[0].month)
            })
            //Row 11
            rows.push({
                "data": column("Gastos Financieros", data, 'nivel2', '1.3.6. GASTOS FINANCIEROS', mesSelected[0].month)
            })
            //Row 12
            //Row 13
            rows.push({
                "data": column("Gastos de Administración y Ventas", data, 'nivel1', '1.3. GASTOS DE ADMINISTRACION Y VENTAS', mesSelected[0].month)
            })                      
            //Row 14
            rows.push({
                "data": column("Resultado Operacional", data, 'resultado', '1. OPERACIONAL', mesSelected[0].month)
            })
            //Row 15
            //Row 16
            rows.push({
                "data": column("Ingresos no Operacionales", data, 'nivel2', '2.1.1. INGRESOS NO OPERACIONALES', mesSelected[0].month)
            })
            //Row 17
            rows.push({
                "data": column("Impuesto a la Renta", data, 'nivel2', '2.2.3. IMPUESTO A LA RENTA', mesSelected[0].month)
            })
            //Row 18
            rows.push({
                "data": column("Intereses", data, 'nivel2', '2.2.4. INTERERES', mesSelected[0].month)
            })
            //Row 19
            rows.push({
                "data": column("Otros No Operacional", data, 'nivel2', '2.2.5. OTROS GASTOS Y VARIOS', mesSelected[0].month)
            })
            //Row 20
            rows.push({
                "data": column("Resultadado No Operacional", data, 'resultado', '2. NO OPERACIONAL', mesSelected[0].month)
            })
            setResultData(rows);    
            
            const MesAnt = mesSelected[0].month === 1 ? meses[11].label : meses[mesSelected[0].month-1].label; //meses[mesSelected[0].month-2].label
            const AnioAnt = mesSelected[0].month > 1 ? anio[0]-1 : anio[0]-2;
            setAnioant(AnioAnt);
            setMesant(MesAnt);
            setRangoMes(`${meses[0].label} a ${meses[mesSelected[0].month-1].label}`)
        }
    }, [mesSelected, anio]);

    
    
    useEffect(() => {
        if(data?.length>0 && anio.length === 1 && mes[0] > 0){
            const rows=[];
            //Row 1            
            rows.push({
                "data": column("Ventas Nacionales", data, 'nivel2', '1.1.1. VENTAS NACIONALES', mes[0])
            })
            //Row 2     
            rows.push({
                "data": column("Otros Ingresos", data, 'nivel2', '1.1.3. OTROS INGRESOS', mes[0])
            })
            //Row 3   
            rows.push({
                "data": column("Ingresos de Explotación", data, 'nivel1', '1.1. INGRESO DE EXPLOTACION', mes[0])
            })            
            //Row 4
            rows.push({
                "data": column("Costos Directos", data, 'nivel2', '1.2.1. COSTOS DIRECTOS', mes[0])
            })
            //Row 5
            rows.push({
                "data": column("Otros Costos", data, 'nivel2', '1.2.2. OTROS COSTOS EXPLOTACION', mes[0])
            })
            //Row 6
            rows.push({
                "data": column("Costos de Explotación", data, 'nivel1', '1.2. COSTOS DE EXPLOTACION', mes[0])
            })
            //Row 7
            //Fila 2 - 5
            rows.push({
                "data": sumarColumnas("Margen de Explotación",rows[2].data, rows[5].data)
            })
            //Row 8
            //Fila 2 - 6
            rows.push({
                "data": percentajeColumns("% Margen de Explotación",rows[2].data, rows[6].data,0)
            })
            //Row 9
            rows.push({
                "data": column("Gasto de Remuneraciones", data, 'nivel2', '1.3.1. REMUNERACION Y HONORARIOS', mes[0])
            })
            //Row 10
            rows.push({
                "data": column("Gasto Mantención", data, 'nivel2', '1.3.4. GASTOS MANTENCION', mes[0])
            })
            //Row 11
            rows.push({
                "data": column("Gastos Financieros", data, 'nivel2', '1.3.6. GASTOS FINANCIEROS', mes[0])
            })
            //Row 12
            rows.push({
                "data" : emptyColumn("Otros Gastos")
            })
            //Row 13
            rows.push({
                "data": column("Gastos de Administración y Ventas", data, 'nivel1', '1.3. GASTOS DE ADMINISTRACION Y VENTAS', mes[0])
            })      
            
            //Actualizando Otros Gastos
            rows[11].data = restar3Columnas("Otros Gastos", rows[12].data, rows[9].data, rows[8].data)

            //Row 14
            rows.push({
                "data": column("Resultado Operacional", data, 'resultado', '1. OPERACIONAL', mes[0])
            })
            //Row 15
            //Fila 2 - 13
            rows.push({
                "data": percentajeColumns("% ROP",rows[2].data, rows[13].data,0)
            })
            //Row 16
            rows.push({
                "data": column("Ingresos no Operacionales", data, 'nivel2', '2.1.1. INGRESOS NO OPERACIONALES', mes[0])
            })
            //Row 17
            rows.push({
                "data": column("Impuesto a la Renta", data, 'nivel2', '2.2.3. IMPUESTO A LA RENTA', mes[0])
            })
            //Row 18
            rows.push({
                "data": column("Intereses", data, 'nivel2', '2.2.4. INTERERES', mes[0])
            })
            //Row 19
            rows.push({
                "data": column("Otros No Operacional", data, 'nivel2', '2.2.5. OTROS GASTOS Y VARIOS', mes[0])
            })
            //Row 20
            rows.push({
                "data": column("Resultadado No Operacional", data, 'resultado', '2. NO OPERACIONAL', mes[0])
            })
            //Row 21
            //Fila 13 - 19
            rows.push({
                "data": sumarColumnas("Utilidad",rows[13].data, rows[19].data)
            })
            //Row 22
            //Fila 2 - 20
            rows.push({
                "data": percentajeColumns("% Utilidad",rows[2].data, rows[20].data,1)
            })

            setResultData(rows);    
            const MesAnt = mes[0] === 1 ? meses[11].label : meses[mes[0]-2].label;
            const AnioAnt = mes[0] > 1 ? anio[0]-1 : anio[0]-2;
            setAnioant(AnioAnt);
            setMesant(MesAnt);
            setRangoMes(`${meses[0].label} a ${meses[mes-1].label}`)
        }
        
    }, [data, anio, mes]);

    useEffect(() => {
        if(anio.length === 1){
            setTitle('Panel Financiero ' + ' mes ' + mesSelected[0].label + ' año ' + anio[0]  );
        }        
        else{
           setTitle('Panel Financiero');
        }
    }, [anio, mesSelected]);

    return (
        resultData && rangoMes && anioant && mesant &&
        <>
            <Grid container spacing={2} className='pb-20'>
                <Grid item xs={12} className='pb-4'>
                    <div className="flex justify-center rounded-xl bg-[#4cbab5] text-white shadow-md py-4 align-middle">
                        <h2 className="text-2xl font-light text-center">{title}</h2>
                    </div>
                </Grid>
                <Grid item xs={3}>
                    <Autocomplete
                        disablePortal
                        disableClearable={true}
                        id="utilidad-meses"
                        value={mesSelected[0].label}
                        options={meses}
                        sx={{ width: "100%"}}
                        onChange={(event, newValue) => {
                            setMesSelected([
                                newValue,
                            ]);
                        }}

                        renderInput={(params) => <TextField {...params} label="Mes" variant="standard"/>}
                    />
                </Grid>            
                <Grid item xs={12}>
                    <PanelFinancieroTable anio={anio[0]} mes={mesSelected[0].label} anioant={anioant} mesant={mesant} rangomes={rangoMes} data={resultData} />
                </Grid>
            </Grid>            
        </>
    )
}