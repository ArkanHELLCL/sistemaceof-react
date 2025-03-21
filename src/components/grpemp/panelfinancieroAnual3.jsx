/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid2';
import PanelFinancieroTable3 from '../graficos/panelfinancieroTable3';

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

export default function PanelFinancieroAnual3({data, anio, mes}){    
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

        let valor = year ? parseFloat(year[nivel][item]?.months?.slice(0,12).filter((item, idx) => idx === mes-1)[0]) : 0
        valor = valor ? valor : 0;
        col.push({"id" : 2, "valor" : valor ? valor : 0});

        if(mes === 1){
            valor = yearant ? parseFloat(yearant[nivel][item]?.months?.slice(0,12).filter((item, idx) => idx === 11)[0]) || 0 : 0
        }else{
            valor = year ? parseFloat(year[nivel][item]?.months?.slice(0,12).filter((item, idx) => idx === mes-2)[0]) || 0 : 0
        }
        valor = valor ? valor : 0;
        col.push({"id" : 3, "valor" : valor ? valor : 0});

        if(col[2].valor === 0)
            valor = 0
        else
            valor = (col[1].valor-col[2].valor) / Math.abs(col[2].valor) 
        
        valor = valor ? valor : 0;
        col.push({"id" : 4, "valor" : valor});

        valor = yearant ? parseFloat(yearant[nivel][item]?.months?.slice(0,12).filter((item, idx) => idx === mes-1)[0]) : 0
        valor = valor ? valor : 0;
        col.push({"id" : 5, "valor" : valor ? valor : 0});

        if(col[4].valor === 0)
            valor = 0
        else
            valor = ((col[1].valor-col[4].valor) / Math.abs(col[4].valor )) 

        valor = valor ? valor : 0;
        col.push({"id" : 6, "valor" : valor});

        //Acumular por el maximo de meses cargados actualmente - todo
        valor = year ? parseFloat(year[nivel][item]?.months?.slice(0,mes).reduce((acc, val) => acc + val, 0)) : 0
        valor = valor ? valor : 0
        col.push({"id" : 7, "valor" : valor ? valor : 0});

        valor = yearant ? parseFloat(yearant[nivel][item]?.months?.slice(0,mes).reduce((acc, val) => acc + val, 0)) : 0
        valor = valor ? valor : 0
        col.push({"id" : 8, "valor" : valor ? valor : 0});

        if(col[7].valor === 0)
            valor = 0
        else
            valor = ((col[6].valor-col[7].valor) / Math.abs(col[7].valor)) 
                
        valor = valor ? valor : 0;
        col.push({"id" : 9, "valor" : valor});

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
            valor = ((col[1].valor-col[2].valor) / Math.abs(col[2].valor )) 

        valor = valor ? valor : 0;
        col.push({"id" : 4, "valor" : valor});

        valor = array1[4].valor + array2[4].valor;
        col.push({"id" : 5, "valor" : valor ? valor : 0});

        if(col[4].valor === 0)
            valor = 0
        else
            valor = ((col[1].valor-col[4].valor) / Math.abs(col[4].valor )) 

        valor = valor ? (valor) : 0;
        col.push({"id" : 6, "valor" : valor});

        valor = array1[6].valor + array2[6].valor;
        col.push({"id" : 7, "valor" : valor ? valor : 0});

        valor = array1[7].valor + array2[7].valor;
        col.push({"id" : 8, "valor" : valor ? valor : 0});

        if(col[7].valor === 0)
            valor = 0
        else
            valor = (((col[6].valor-col[7].valor) / Math.abs(col[7].valor )) )

        valor = valor ? valor : 0;
        col.push({"id" : 6, "valor" : valor});
      
        return col;
    };

    const restar2Columnas = (label, array1, array2) => {
        let valor = 0;
        const col = [];
        col.push({"id" : 1, "valor" : label});
        
        valor = array1[1].valor - array2[1].valor;
        col.push({"id" : 2, "valor" : valor ? valor : 0});

        valor = array1[2].valor - array2[2].valor;
        col.push({"id" : 3, "valor" : valor ? valor : 0});

        if(col[2].valor === 0)
            valor = 0
        else
            valor = ((col[1].valor-col[2].valor) / Math.abs(col[2].valor )) 

        valor = valor ? valor : 0;
        col.push({"id" : 4, "valor" : valor});

        valor = array1[4].valor - array2[4].valor;
        col.push({"id" : 5, "valor" : valor ? valor : 0});

        if(col[4].valor === 0)
            valor = 0
        else
            valor = ((col[1].valor-col[4].valor) / Math.abs(col[4].valor )) 

        valor = valor ? valor : 0;
        col.push({"id" : 6, "valor" : valor});

        valor = array1[6].valor - array2[6].valor;
        col.push({"id" : 7, "valor" : valor ? valor : 0});

        valor = array1[7].valor - array2[7].valor;
        col.push({"id" : 8, "valor" : valor ? valor : 0});

        if(col[7].valor === 0)
            valor = 0
        else
            valor = ((col[6].valor-col[7].valor) / Math.abs(col[7].valor )) 

        valor = valor ? valor : 0;
        col.push({"id" : 6, "valor" : valor});
      
        return col;
    };

    const restar4Columnas = (label, array1, array2, array3, array4) => {
        let valor = 0;
        const col = [];
        col.push({"id" : 1, "valor" : label});
        
        valor = array1[1].valor - array2[1].valor - array3[1].valor - array4[1].valor;
        col.push({"id" : 2, "valor" : valor ? valor : 0});

        valor = array1[2].valor - array2[2].valor - array3[2].valor - array4[2].valor;
        col.push({"id" : 3, "valor" : valor ? valor : 0});

        if(col[2].valor === 0)
            valor = 0
        else
            valor = ((col[1].valor-col[2].valor) / Math.abs(col[2].valor )) 

        valor = valor ? valor : 0;
        col.push({"id" : 4, "valor" : valor});

        valor = array1[4].valor - array2[4].valor - array3[4].valor - array4[4].valor;
        col.push({"id" : 5, "valor" : valor ? valor : 0});

        if(col[4].valor === 0)
            valor = 0
        else
            valor = ((col[1].valor-col[4].valor) / Math.abs(col[4].valor )) 

        valor = valor ? valor : 0;
        col.push({"id" : 6, "valor" : valor});

        valor = array1[6].valor - array2[6].valor - array3[6].valor - array4[6].valor;
        col.push({"id" : 7, "valor" : valor ? valor : 0});

        valor = array1[7].valor - array2[7].valor - array3[7].valor - array4[7].valor;
        col.push({"id" : 8, "valor" : valor ? valor : 0});

        if(col[7].valor === 0)
            valor = 0
        else
            valor = ((col[6].valor-col[7].valor) / Math.abs(col[7].valor )) 

        valor = valor ? valor : 0;
        col.push({"id" : 6, "valor" : valor});
      
        return col;
    };

    const percentajeColumns = (label, array1, array2, negativo) => {
        let valor = 0;
        const col = [];
        col.push({"id" : 1, "valor" : label});

        if(array1[1].valor === 0)
            valor = 0
        else
            valor = ((array2[1].valor / array1[1].valor )  );
        
        valor = negativo ? valor * - 1 : valor ;
        col.push({"id" : 2, "valor" : valor});

        if(array1[2].valor === 0)
            valor = 0
        else
            valor = ((array2[2].valor / array1[2].valor )  );
        valor = negativo ? valor * - 1 : valor ;
        col.push({"id" : 3, "valor" : valor});

        if(parseFloat(col[2].valor) === 0)
            valor = 0
        else
            valor = (((parseFloat(col[1].valor)-parseFloat(col[2].valor)) / Math.abs((parseFloat(col[2].valor)))  ));
        //valor = negativo ? valor * - 1 : valor ;
        col.push({"id" : 4, "valor" : valor});
        if(array1[4].valor === 0)
            valor = 0
        else
            valor = ((array2[4].valor / array1[4].valor )  );
        valor = negativo ? valor * - 1 : valor ;
        col.push({"id" : 5, "valor" : valor});

        if(parseFloat(col[4].valor) === 0)
            valor = 0
        else
            valor = (((parseFloat(col[1].valor)-parseFloat(col[4].valor)) / Math.abs((parseFloat(col[4].valor)))  ));
        //valor = negativo ? valor * - 1 : valor ;
        col.push({"id" : 6, "valor" : valor});

        if(array1[6].valor === 0)
            valor = 0
        else
            valor = ((array2[6].valor / array1[6].valor )  );
        valor = negativo ? valor * - 1 : valor ;
        col.push({"id" : 7, "valor" :valor});

        if(array1[7].valor === 0)
            valor = 0
        else
            valor = ((array2[7].valor / array1[7].valor )  );
        valor = negativo ? valor * - 1 : valor ;
        col.push({"id" : 8, "valor" : valor});

        if(parseFloat(col[7].valor) === 0)
            valor = 0
        else
            valor = ((parseFloat(col[6].valor)-parseFloat(col[7].valor)) / Math.abs((parseFloat(col[7].valor)))  );
        //valor = negativo ? valor * - 1 : valor ;
        col.push({"id" : 6, "valor" : valor});

        return col;
    }

    const tabla = (mes) => {
        const rows=[];
        //Row 1            
        rows.push({
            "row": column("Ventas Nacionales", data, 'nivel2', '1.1.1.', mes)
        })
        //Row 2     
        rows.push({
            "row": column("Ventas PayPal", data, 'nivel2', '1.1.2.', mes)
        })
        //Row 3   
        rows.push({
            "row": column("Ingresos de Explotación", data, 'nivel1', '1.1.', mes)
        })            
        //Row 4
        rows.push({
            "row": column("Costos Directos", data, 'nivel2', '1.2.1.', mes)
        })
        //Row 5
        rows.push({
            "row": column("Otros Costos", data, 'nivel2', '1.2.2.', mes)
        })
        //Row 6
        rows.push({
            "row": column("Costos de Explotación", data, 'nivel1', '1.2.', mes)
        })
        //Row 7
        //Fila 2 - 5
        rows.push({
            "row": sumarColumnas("Margen de Explotación",rows[2].row, rows[5].row)
        })
        //Row 8
        //Fila 2 - 6
        rows.push({
            "row": percentajeColumns("% Margen de Explotación",rows[2].row, rows[6].row,0)
        })
        //Row 9
        rows.push({
            "row": column("Gasto de Remuneraciones", data, 'nivel2', '1.3.1.', mes)
        })
        //Row 10
        rows.push({
            "row": column("Gasto Mantención", data, 'nivel2', '1.3.4.', mes)
        })
        //Row 11
        //rows.push({
        //    "row": column("Gastos Financieros", data, 'nivel2', '1.3.6.', mes)
        //})
        //Row 12
        rows.push({
            "row" : emptyColumn("Otros Gastos")
        })
        //Row 13
        rows.push({
            "row": column("Gastos de Administración y Ventas", data, 'nivel1', '1.3.', mes)
        })      
        
        //Actualizando Otros Gastos 8-9-10-12
        //rows[11].row = restar4Columnas("Otros Gastos", rows[12].row, rows[10].row, rows[9].row, rows[8].row)
        rows[10].row = restar2Columnas("Otros Gastos", rows[11].row, rows[8].row)

        //Row 14
        rows.push({
            "row": column("Resultado Operacional", data, 'resultado', '1.', mes)
        })
        //Row 15
        //Fila 2 - 13
        rows.push({
            "row": percentajeColumns("% ROP",rows[2].row, rows[12].row,0)
        })
        //Row 16
        rows.push({
            "row": column("Ingresos no Operacionales", data, 'nivel2', '2.1.1.', mes)
        })
        //Row 17
        rows.push({
            "row": column("Impuesto a la Renta", data, 'nivel2', '2.2.3.', mes)
        })
        //Row 18
        rows.push({
            "row": column("Intereses", data, 'nivel2', '2.2.4.', mes)
        })
        //Row 19
        rows.push({
            "row" : emptyColumn("Otros No Operacional")
        })            
        //Row 20
        rows.push({
            "row": column("Resultadado No Operacional", data, 'resultado', '2.', mes)
        })

        //Actualizando Otros Gastos 19-15-16-17
        rows[17].row = restar4Columnas("Otros No Operacional", rows[18].row, rows[16].row, rows[15].row, rows[14].row)

        //Row 21
        //Fila 13 - 19
        rows.push({
            "row": sumarColumnas("Utilidad",rows[12].row, rows[18].row,1)
        })
        //Row 22
        //Fila 2 - 20
        rows.push({
            "row": percentajeColumns("% Utilidad",rows[2].row, rows[19].row,1)
        })
        //Row 23
        //Fila 2 - 5
        rows.push({
            "row": percentajeColumns("Ratio Costos Expl.",rows[2].row, rows[5].row,0,true)
        })
        //Row 24
        //Fila 2 - 8
        rows.push({
            "row": percentajeColumns("Ratio M.O. Total.",rows[2].row, rows[8].row,0,true)
        })
        //Row 25
        //Fila 2 - 12
        rows.push({
            "row": percentajeColumns("Ratio GOA.",rows[2].row, rows[11].row,0,true)
        })
        const rowsCurrencyFormatted = rows.map((item, index) => item.row.map((item, idx) => {
                if((index === 23 || index === 22 || index === 21 || index === 20) && (idx > 0)) return parseFloat(item.valor * -1).toLocaleString?.('en-EN', {
                    style: 'percent'                           
                    }).replaceAll(',', '.')
                if((index === 13 || index === 7) && (idx > 0)) return parseFloat(item.valor).toLocaleString?.('en-EN', {
                style: 'percent'                           
                }).replaceAll(',', '.')
                if(idx === 0) return item.valor
                if(idx === 1 || idx === 2 || idx === 4 || idx === 6 || idx === 7)                       
                    return item.valor.toLocaleString?.('en-ES', {
                        style: 'currency',
                        currency: 'USD',
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                        }).replaceAll(',', '.')
                else
                    return parseFloat(item.valor).toLocaleString?.('en-EN', {
                        style: 'percent'                           
                        }).replaceAll(',', '.')
            }))
        setResultData(rowsCurrencyFormatted);                
        const MesAnt = mes === 1 ? meses[11].label : meses[mes-2].label;        
        setMesant(MesAnt);
        setRangoMes(`${meses[0].label} a ${meses[mes-1].label}`)
    }

    useEffect(() => {
        if(data?.length>0 && anio.length === 1 && mes[0] > 0){
            tabla(mes[0]);
        }
    }, [mes, anio]);
    
    useEffect(() => {
        if(data?.length>0 && anio.length === 1 && mes[0] > 0){
            tabla(mes[0]);
        }
        
    }, [data, anio, mes]);

    useEffect(() => {
        if(anio.length === 1){
            setTitle('Panel Financiero ' + ' mes ' + meses[mes[0]-1].label + ' año ' + anio[0]);
        }        
        else{
           setTitle('Panel Financiero');
        }
    }, [anio, mes]);

    useEffect(() => {
        if(anio.length === 1){
            setAnioant(anio[0]-1);
        }
    },[anio]);

    return (
        resultData && rangoMes && anioant && mesant &&
        <>
            <Grid container spacing={2} className='pb-20'>
                <Grid size={{ xs: 12, xl: 12 }} className='pb-4'>
                    <div className="flex justify-center rounded-xl bg-[#4cbab5] text-white shadow-md py-4 align-middle">
                        <h2 className="text-2xl font-light text-center">{title}</h2>
                    </div>
                </Grid>                        
                <Grid size={{ xs: 12, xl: 12 }}>
                    <PanelFinancieroTable3 anio={anio[0]} mes={mes} anioant={anioant} mesant={mesant} rangomes={rangoMes} data={resultData} />
                </Grid>
            </Grid>            
        </>
    )
}