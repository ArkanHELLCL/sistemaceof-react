/* eslint-disable react/prop-types */
import ListItemAnimated from "../graficos/listItemAnimated";
const meses = [
    { value: 1, label: 'Enero' },
    { value: 2, label: 'Febrero' },
    { value: 3, label: 'Marzo' },
    { value: 4, label: 'Abril' },
    { value: 5, label: 'Mayo' },
    { value: 6, label: 'Junio' },
    { value: 7, label: 'Julio' },
    { value: 8, label: 'Agosto' },
    { value: 9, label: 'Septiembre' },
    { value: 10, label: 'Octubre' },
    { value: 11, label: 'Noviembre' },
    { value: 12, label: 'Diciembre' }
];

const DataItemMes = (anio, mes, data) => {
    const year = data.filter(item => item.year === anio[0])[0]
    //Ingresos mes
    let ingresosMesActual = year ? parseFloat(year['nivel1']['1.1.']?.months?.slice(0,12).filter((item, idx) => idx === mes-1)[0]) : 0
    ingresosMesActual = ingresosMesActual ? ingresosMesActual : 0;
    //Ingresos mes anterior
    let ingresosMesAnterior = year ? parseFloat(year['nivel1']['1.1.']?.months?.slice(0,12).filter((item, idx) => idx === mes-2)[0]) : 0
    ingresosMesAnterior = ingresosMesAnterior ? ingresosMesAnterior : 0;
    //Variacion
    let ingresosVariacion = 0;
    if(ingresosMesAnterior === 0)
        ingresosVariacion = 0
    else
        ingresosVariacion = (ingresosMesActual-ingresosMesAnterior) / Math.abs(ingresosMesAnterior) 
    
    ingresosVariacion = ingresosVariacion ? ingresosVariacion : 0;

    //Costos Directos mes
    let costosMesActual = year ? parseFloat(year['nivel2']['1.2.1.']?.months?.slice(0,12).filter((item, idx) => idx === mes-1)[0]) : 0
    costosMesActual = costosMesActual ? costosMesActual : 0;
    //Costos Directos mes anterior
    let costosMesAnterior = year ? parseFloat(year['nivel2']['1.2.1.']?.months?.slice(0,12).filter((item, idx) => idx === mes-2)[0]) : 0
    costosMesAnterior = costosMesAnterior ? costosMesAnterior : 0;
    //Variacion
    let costosVariacion = 0;
    if(costosMesAnterior === 0)
        costosVariacion = 0
    else
        costosVariacion = (costosMesActual-costosMesAnterior) / Math.abs(costosMesAnterior)

    costosVariacion = costosVariacion ? costosVariacion : 0;

    //Otros Costos mes
    let otrosCostosMesActual = year ? parseFloat(year['nivel2']['1.2.2.']?.months?.slice(0,12).filter((item, idx) => idx === mes-1)[0]) : 0
    otrosCostosMesActual = otrosCostosMesActual ? otrosCostosMesActual : 0;
    //Otros Costos mes anterior
    let otrosCostosMesAnterior = year ? parseFloat(year['nivel2']['1.2.2.']?.months?.slice(0,12).filter((item, idx) => idx === mes-2)[0]) : 0
    otrosCostosMesAnterior = otrosCostosMesAnterior ? otrosCostosMesAnterior : 0;
    //Variacion
    let otrosCostosVariacion = 0;
    if(otrosCostosMesAnterior === 0)
        otrosCostosVariacion = 0
    else
        otrosCostosVariacion = (otrosCostosMesActual-otrosCostosMesAnterior) / Math.abs(otrosCostosMesAnterior)

    otrosCostosVariacion = otrosCostosVariacion ? otrosCostosVariacion : 0;

    //Costos Directos serie 6 ultimos meses
    let totalMeses = mes - 6;
    totalMeses = totalMeses < 0 ? mes : totalMeses;
    const costosMesSeries = year ? year['nivel2']['1.2.1.']?.months?.slice(totalMeses, mes) : Array(totalMeses).fill(0);
    const labels = meses.slice(totalMeses, mes).map(item => item.label);

    //Otros Costos seria 6 ultimos meses
    const otrosCostosMesSeries = year ? year['nivel2']['1.2.2.']?.months?.slice(totalMeses, mes) : Array(totalMeses).fill(0);

    //Porcentajes
    //% Margen de explotacion=
    //Ingresos de explotacion / Margen de explotacion
    //Margen de expltacion =
    //Ingresos de explotacion + costos de explotacion
    let ingresoExplotacionMesActual = year ? parseFloat(year['nivel1']['1.1.']?.months?.slice(0,12).filter((item, idx) => idx === mes-1)[0]) : 0
    ingresoExplotacionMesActual = ingresoExplotacionMesActual ? ingresoExplotacionMesActual : 0;
    let costosExplotacionMesActual = year ? parseFloat(year['nivel1']['1.2.']?.months?.slice(0,12).filter((item, idx) => idx === mes-1)[0]) : 0
    costosExplotacionMesActual = costosExplotacionMesActual ? costosExplotacionMesActual : 0;
    let margenExplotacionMesActual = ingresoExplotacionMesActual + costosExplotacionMesActual
    let porcentageMargenExplotacionMesActual  = 0;
    if(ingresoExplotacionMesActual === 0)
        porcentageMargenExplotacionMesActual = 0
    else
        porcentageMargenExplotacionMesActual = (margenExplotacionMesActual/ingresoExplotacionMesActual) * 100

    //% ROP
    let resultadoMesActual = year ? parseFloat(year['resultado']['1.']?.months?.slice(0,12).filter((item, idx) => idx === mes-1)[0]) : 0
    let ropMesActual = 0;
    if(ingresoExplotacionMesActual   === 0)
        ropMesActual = 0
    else
        ropMesActual = (resultadoMesActual/ingresoExplotacionMesActual) * 100

    //Utilidad  = 
    //Resultado operacional + resultado no operacional
    const resultadoNoOperMesActual = year ? parseFloat(year['resultado']['2.']?.months?.slice(0,12).filter((item, idx) => idx === mes-1)[0]) : 0
    const utilidadMesActual = resultadoMesActual + resultadoNoOperMesActual
    //% Utilidad =
    //Ingresos de explotacion  + Utilidad
    let utilidadPorcentajeMesActual = 0;
    if(ingresoExplotacionMesActual === 0)
        utilidadPorcentajeMesActual = 0
    else
        utilidadPorcentajeMesActual = (utilidadMesActual/ingresoExplotacionMesActual) * 100
    //Ratio Costos de Explotacion =
    //Ingresos de explotacion / Costos de explotacion
    let ratioCostosExplotacionMesActual = 0;
    if(ingresoExplotacionMesActual === 0)
        ratioCostosExplotacionMesActual = 0
    else
        ratioCostosExplotacionMesActual = (costosExplotacionMesActual / ingresoExplotacionMesActual) * -100

    //Ratio M.O.Total =
    //Ingresos de explotacion / Gastos de remuneraciones
    let gastosRemuneracionesMesActual = year ? parseFloat(year['nivel2']['1.3.1.']?.months?.slice(0,12).filter((item, idx) => idx === mes-1)[0]) : 0
    let ratioMOTotalMesActual = 0;
    if(ingresoExplotacionMesActual === 0)
        ratioMOTotalMesActual = 0
    else
        ratioMOTotalMesActual = (gastosRemuneracionesMesActual / ingresoExplotacionMesActual) * -100

    //Ratio GOA =
    //Ingresos de explotacion / gastos de administracion
    let gastosAdministracionMesActual = year ? parseFloat(year['nivel1']['1.3.']?.months?.slice(0,12).filter((item, idx) => idx === mes-1)[0]) : 0
    let ratioGOAMesActual = 0;
    if(ingresoExplotacionMesActual === 0)
        ratioGOAMesActual = 0
    else
        ratioGOAMesActual = (gastosAdministracionMesActual / ingresoExplotacionMesActual) * -100

    return {
        dataset: [
            {
                labels : labels,
                datasets : [
                    {
                        label: "Costos Directos",
                        data:costosMesSeries?.map(item => parseFloat(item)) || Array(totalMeses).fill(0),
                        //data:[],
                        pointStyle: false,                        
                        borderWidth: 1,
                        tension: 0.5
                    }]
            },
            {
                labels : labels,
                datasets : [
                    {
                        label: "Otros Costos",
                        data:otrosCostosMesSeries?.map(item => parseFloat(item)) || Array(6).fill(0),
                        //data:[],
                        borderWidth: 1,
                        minBarLength: 5
                    }]
            }
        ],
        data: [
            {
                titulo: 'INGRESOS ' + meses[mes-1].label.toUpperCase(),
                subtitulo: parseFloat(ingresosVariacion).toLocaleString?.('en-EN', {
                    style: 'percent'                           
                    }).replaceAll(',', '.') + ' respecto al mes pasado',
                valor: ingresosMesActual,
                variacion: ingresosVariacion
            },
            {
                titulo: 'COSTOS DIRECTOS ' + meses[mes-1].label.toUpperCase(),
                subtitulo: parseFloat(costosVariacion).toLocaleString?.('en-EN', {
                    style: 'percent'                           
                    }).replaceAll(',', '.') + ' respecto al mes pasado',
                valor: costosMesActual,
                variacion: costosVariacion
            },
            {
                titulo: 'OTROS COSTOS ' + meses[mes-1].label.toUpperCase(),
                subtitulo: parseFloat(otrosCostosVariacion).toLocaleString?.('en-EN', {
                    style: 'percent'                           
                    }).replaceAll(',', '.') + ' respecto al mes pasado',
                valor: otrosCostosMesActual,
                variacion: otrosCostosVariacion
            }
        ],
        items : [
            { title: 'Margen Explotación', percentage: porcentageMargenExplotacionMesActual },
            { title: 'ROP', percentage: ropMesActual },
            { title: 'Utilidad', percentage: utilidadPorcentajeMesActual },
            { title: 'Ratio Cost. Explotación', percentage: ratioCostosExplotacionMesActual },
            { title: 'Ratio M.O. Total', percentage: ratioMOTotalMesActual },
            { title: 'Ratio GOA', percentage: ratioGOAMesActual },
        ]
    }
}

const DataItemAcumulado = (anio, mes, data) => {
    const year = data.filter(item => item.year === anio[0])[0]
    const yearant = data.filter(item => item.year === anio[0]-1)[0]
    //Ingresos acumulado
    let ingresosAcumulado = year ? parseFloat(year['nivel1']['1.1.']?.months?.slice(0,mes).reduce((acc, val) => acc + val, 0)) : 0
    ingresosAcumulado = ingresosAcumulado ? ingresosAcumulado : 0;
    //Ingresos acumlado anterior
    let ingresosAcumuladoAnterior = yearant ? parseFloat(yearant['nivel1']['1.1.']?.months?.slice(0,mes).reduce((acc, val) => acc + val, 0)) : 0
    ingresosAcumuladoAnterior = ingresosAcumuladoAnterior ? ingresosAcumuladoAnterior : 0;
    //Variacion acumulado
    let ingresosVariacionAcumulada = 0;
    if(ingresosAcumuladoAnterior === 0)
        ingresosVariacionAcumulada = 0
    else
        ingresosVariacionAcumulada = (ingresosAcumulado-ingresosAcumuladoAnterior) / Math.abs(ingresosAcumuladoAnterior) 
    
    ingresosVariacionAcumulada = ingresosVariacionAcumulada ? ingresosVariacionAcumulada : 0;
    //Costos Directos acumulado
    let costosAcumulado = year ? parseFloat(year['nivel2']['1.2.1.']?.months?.slice(0,mes).reduce((acc, val) => acc + val, 0)) : 0
    costosAcumulado = costosAcumulado ? costosAcumulado : 0;
    //Costos Directos acumulado anterior
    let costosAcumuladoAnterior = yearant ? parseFloat(yearant['nivel2']['1.2.1.']?.months?.slice(0,mes).reduce((acc, val) => acc + val, 0)) : 0
    costosAcumuladoAnterior = costosAcumuladoAnterior ? costosAcumuladoAnterior : 0;
    //Variacion acumulada
    let costosVariacionAcumulado = 0;
    if(costosAcumuladoAnterior === 0)
        costosVariacionAcumulado = 0
    else
    costosVariacionAcumulado = (costosAcumulado-costosAcumuladoAnterior) / Math.abs(costosAcumuladoAnterior)

    costosVariacionAcumulado = costosVariacionAcumulado ? costosVariacionAcumulado : 0;

    //Otros Costos Acumulado
    let otrosCostosAcumulado = year ? parseFloat(year['nivel2']['1.2.2.']?.months?.slice(0,mes).reduce((acc, val) => acc + val, 0)) : 0
    otrosCostosAcumulado = otrosCostosAcumulado ? otrosCostosAcumulado : 0;
    //Otros Costos Acumulado anterior
    let otrosCostosAcumuladoAnterior = yearant ? parseFloat(yearant['nivel2']['1.2.2.']?.months?.slice(0,mes).reduce((acc, val) => acc + val, 0)) : 0
    otrosCostosAcumuladoAnterior = otrosCostosAcumuladoAnterior ? otrosCostosAcumuladoAnterior : 0;
    //Variacion Acumulado
    let otrosCostosVariacionAcumulado = 0;
    if(otrosCostosAcumuladoAnterior === 0)
        otrosCostosVariacionAcumulado = 0
    else
        otrosCostosVariacionAcumulado = (otrosCostosAcumulado-otrosCostosAcumuladoAnterior) / Math.abs(otrosCostosAcumuladoAnterior)

    otrosCostosVariacionAcumulado = otrosCostosVariacionAcumulado ? otrosCostosVariacionAcumulado : 0;

    //Porcentajes
    //% Margen de explotacion=
    //Ingresos de explotacion / Margen de explotacion
    //Margen de expltacion =
    //Ingresos de explotacion + costos de explotacion
    let ingresoExplotacionAcumulado = year ? parseFloat(year['nivel1']['1.1.']?.months?.slice(0,mes).reduce((acc, val) => acc + val, 0)) : 0
    ingresoExplotacionAcumulado = ingresoExplotacionAcumulado ? ingresoExplotacionAcumulado : 0;
    let costosExplotacionAcumulado = year ? parseFloat(year['nivel1']['1.2.']?.months?.slice(0,mes).reduce((acc, val) => acc + val, 0)) : 0
    costosExplotacionAcumulado = costosExplotacionAcumulado ? costosExplotacionAcumulado : 0;
    let margenExplotacionMesActual = ingresoExplotacionAcumulado + costosExplotacionAcumulado
    let porcentageMargenExplotacionAcumulado  = 0;
    if(ingresoExplotacionAcumulado === 0)
        porcentageMargenExplotacionAcumulado = 0
    else
        porcentageMargenExplotacionAcumulado = (margenExplotacionMesActual/ingresoExplotacionAcumulado) * 100

    //% ROP
    let resultadoAcumulado = year ? parseFloat(year['resultado']['1.']?.months?.slice(0,mes).reduce((acc, val) => acc + val, 0)) : 0
    let ropMesAcumulado = 0;
    if(ingresoExplotacionAcumulado   === 0)
        ropMesAcumulado = 0
    else
    ropMesAcumulado = (resultadoAcumulado/ingresoExplotacionAcumulado) * 100

    
    //Utilidad  = 
    //Resultado operacional + resultado no operacional
    const resultadoNoOperAcumulado = year ? parseFloat(year['resultado']['2.']?.months?.slice(0,mes).reduce((acc, val) => acc + val, 0)) : 0
    const utilidadAcumulado = resultadoAcumulado + resultadoNoOperAcumulado
    //% Utilidad =
    //Ingresos de explotacion  + Utilidad
    let utilidadPorcentajeAcumulado = 0;
    if(ingresoExplotacionAcumulado === 0)
        utilidadPorcentajeAcumulado = 0
    else
        utilidadPorcentajeAcumulado = (utilidadAcumulado/ingresoExplotacionAcumulado) * 100

    //Ratio Costos de Explotacion =
    //Ingresos de explotacion / Costos de explotacion
    let ratioCostosExplotacionAcumulado = 0;
    if(ingresoExplotacionAcumulado === 0)
        ratioCostosExplotacionAcumulado = 0
    else
        ratioCostosExplotacionAcumulado = (costosExplotacionAcumulado / ingresoExplotacionAcumulado) * -100

    //Ratio M.O.Total =
    //Ingresos de explotacion / Gastos de remuneraciones
    let gastosRemuneracionesAcumulado = year ? parseFloat(year['nivel2']['1.3.1.']?.months?.slice(0,mes).reduce((acc, val) => acc + val, 0)) : 0
    let ratioMOTotalAcumulado = 0;
    if(ingresoExplotacionAcumulado === 0)
        ratioMOTotalAcumulado = 0
    else
        ratioMOTotalAcumulado = (gastosRemuneracionesAcumulado / ingresoExplotacionAcumulado) * -100
    
    //Ratio GOA =
    //Ingresos de explotacion / gastos de administracion
    let gastosAdministracionAcumulado = year ? parseFloat(year['nivel1']['1.3.']?.months?.slice(0,mes).reduce((acc, val) => acc + val, 0)) : 0
    let ratioGOAAcumulado = 0;
    if(ingresoExplotacionAcumulado === 0)
        ratioGOAAcumulado = 0
    else
        ratioGOAAcumulado = (gastosAdministracionAcumulado / ingresoExplotacionAcumulado) * -100

    return {
        dataset: [
            {
                labels : [
                    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
                ],
                datasets : [
                    {
                        label: "Ventas Mensuales",
                        data:[10,40,50,13,60,-5],
                        pointStyle: false,                        
                        borderWidth: 1,
                        tension: 0.5
                    }]
            },
            {
                labels : [
                    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
                ],
                datasets : [
                    {
                        label: "Costoa Mensuales",
                        data:[70,20,-4,20,10,30],
                        borderWidth: 1,                        
                    }]
            }
        ],
        data: [
            {
                titulo: 'INGRESOS ACUMULADO A ' + meses[mes-1].label.toUpperCase(),
                subtitulo: parseFloat(ingresosVariacionAcumulada).toLocaleString?.('en-EN', {
                    style: 'percent'                           
                    }).replaceAll(',', '.') + ' respecto al acumlado pasado',
                valor: ingresosAcumulado,
                variacion: ingresosVariacionAcumulada
            },
            {
                titulo: 'COSTO DIRECTOS A ' + meses[mes-1].label.toUpperCase(),
                subtitulo: parseFloat(costosVariacionAcumulado).toLocaleString?.('en-EN', {
                    style: 'percent'                           
                    }).replaceAll(',', '.') + ' respecto al acumlado pasado',
                valor: costosAcumulado,
                variacion: costosVariacionAcumulado
            },
            {
                titulo: 'OTROS COSTOS A ' + meses[mes-1].label.toUpperCase(),
                subtitulo: parseFloat(otrosCostosVariacionAcumulado).toLocaleString?.('en-EN', {
                    style: 'percent'                           
                    }).replaceAll(',', '.') + ' respecto al acumlado pasado',
                valor: otrosCostosAcumulado,
                variacion: otrosCostosVariacionAcumulado
            }
        ],
        items : [
            { title: 'Margen Explotación', percentage: porcentageMargenExplotacionAcumulado },
            { title: 'ROP', percentage: ropMesAcumulado },
            { title: 'Utilidad', percentage: utilidadPorcentajeAcumulado },
            { title: 'Ratio Cost. Explotación', percentage: ratioCostosExplotacionAcumulado },
            { title: 'Ratio M.O. Total', percentage: ratioMOTotalAcumulado },
            { title: 'Ratio GOA', percentage: ratioGOAAcumulado },
        ]
    }
}

export default function ResumenPanel({anio, mes, data, type}) {
        
    const dataitemMes = DataItemMes(anio, mes, data);
    const dataItemAcumulado = DataItemAcumulado(anio, mes, data);
    return (
        data && anio && mes &&
            type === 1 ?
                <ListItemAnimated data={dataitemMes} color={'mo'} />
            :
            type === 2 ?
                <ListItemAnimated data={dataItemAcumulado} color={'mo'} />
            :
                null        
    );
}