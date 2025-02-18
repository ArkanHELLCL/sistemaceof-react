/* eslint-disable react/prop-types */
import ListItemAnimated from "../graficos/listItemAnimated";

export default function ResumenPanel({anio, mes, data, type}) {
    const dataItem = {
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
                <ListItemAnimated data={dataItem} color={'mo'} />
            :
                null        
    );
}