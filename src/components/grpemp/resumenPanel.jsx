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

export default function ResumenPanel({anio, mes, data, type}) {
    const year = data.filter(item => item.year === anio[0])[0]
    //Ingresos mes
    let ingresosMesActual = year ? parseFloat(year['nivel2']['1.1.1.']?.months?.slice(0,12).filter((item, idx) => idx === mes-1)[0]) : 0
    ingresosMesActual = ingresosMesActual ? ingresosMesActual : 0;
    //Ingresos mes anterior
    let ingresosMesAnterior = year ? parseFloat(year['nivel2']['1.1.1.']?.months?.slice(0,12).filter((item, idx) => idx === mes-2)[0]) : 0
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
    let totalMeses = mes - 5;
    totalMeses = totalMeses < 0 ? mes : totalMeses;
    const costosMesSeries = year ? year['nivel2']['1.2.1.']?.months?.slice(totalMeses, mes) : Array(totalMeses).fill(0);
    const labels = meses.slice(totalMeses, mes).map(item => item.label);

    //Otros Costos seria 6 ultimos meses
    const otrosCostosMesSeries = year ? year['nivel2']['1.2.2.']?.months?.slice(totalMeses, mes) : Array(totalMeses).fill(0);

    const dataItem = {
        dataset: [
            {
                labels : labels,
                datasets : [
                    {
                        label: "Costos Directos",
                        data:costosMesSeries.map(item => parseFloat(item)),
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
                        data:otrosCostosMesSeries.map(item => parseFloat(item)),
                        borderWidth: 1,
                        minBarLength: 5
                    }]
            }
        ],
        data: [
            {
                titulo: 'TOTAL INGRESOS ' + meses[mes-1].label.toUpperCase(),
                subtitulo: parseFloat(ingresosVariacion).toLocaleString?.('en-EN', {
                    style: 'percent'                           
                    }).replaceAll(',', '.') + ' respecto al mes pasado',
                valor: ingresosMesActual,
                variacion: ingresosVariacion
            },
            {
                titulo: 'TOTAL COSTOS DIRECTOS ' + meses[mes-1].label.toUpperCase(),
                subtitulo: parseFloat(costosVariacion).toLocaleString?.('en-EN', {
                    style: 'percent'                           
                    }).replaceAll(',', '.') + ' respecto al mes pasado',
                valor: costosMesActual,
                variacion: costosVariacion
            },
            {
                titulo: 'TOTAL OTROS COSTOS ' + meses[mes-1].label.toUpperCase(),
                subtitulo: parseFloat(otrosCostosVariacion).toLocaleString?.('en-EN', {
                    style: 'percent'                           
                    }).replaceAll(',', '.') + ' respecto al mes pasado',
                valor: otrosCostosMesActual,
                variacion: otrosCostosVariacion
            }
        ],
        items : [
            { title: 'Ventas', percentage: 75 },
            { title: 'Ingresos', percentage: 50 },
            { title: 'Gastos', percentage: 30 },
            { title: 'Beneficios', percentage: 90 },
            { title: 'Ratio Costos', percentage: 17 },
            { title: 'Ratio M.O.', percentage: 83 },
        ]
    }

    const dataItem2 = {
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
                titulo: 'TOTAL INGRESOS NOVIEMBRE',
                subtitulo: '-15% respecto al mes pasado',
                valor: 23434135
            },
            {
                titulo: 'TOTAL INGRESOS 2024',
                subtitulo: '35% respecto al mes pasado',
                valor: -5678000
            },
            {
                titulo: 'Ventas Nacionales Noviembre',
                subtitulo: '25% respecto al mes pasado',
                valor: 250000
            }
        ],
        items : [
            { title: 'Ventas', percentage: 75 },
            { title: 'Ingresos', percentage: 50 },
            { title: 'Gastos', percentage: 30 },
            { title: 'Beneficios', percentage: 90 },
            { title: 'Ratio Costos', percentage: 17 },
            { title: 'Ratio M.O.', percentage: 83 },
        ]
    }
    return (
        data && anio && mes &&
            type === 1 ?
                <ListItemAnimated data={dataItem} color={'mo'} />
            :
            type === 2 ?
                <ListItemAnimated data={dataItem2} color={'mo'} />
            :
                null        
    );
}