/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import VentasAnual  from '../../grpemp/ventasAnual.jsx';
import UtilidadMesAnual from '../../grpemp/utilidadMesAnual.jsx';
import UtilidadMes from '../../grpemp/utilidadMes.jsx';
import RemuneracionesAnual from '../../grpemp/remuneracionesAnual.jsx';
import GoaAnual from '../../grpemp/goaAnual.jsx';
import PanelFinancieroAnual from '../../grpemp/panelfinancieroAnual.jsx';
import CuboAnual from '../../grpemp/cuboAnual.jsx';
import ProgressList from '../../graficos/progressitem.jsx';

const items = [
    { title: 'Ventas', percentage: 75 },
    { title: 'Ingresos', percentage: 50 },
    { title: 'Gastos', percentage: 30 },
    { title: 'Beneficios', percentage: 90 },
    { title: 'Ratio Costos', percentage: 17 },
    { title: 'Ratio M.O.', percentage: 83 },
];

const ListItemAnimated = ({ titulo, subtitulo, color, valor }) => {
    const [displayValue, setDisplayValue] = useState(0);
    const isPositive = valor >= 0;

    useEffect(() => {
        let start = 0;
        const end = valor;
        const duration = 1000;
        const increment = end / (duration / 16);

        const animateValue = () => {
            start += increment;
            if ((isPositive && start >= end) || (!isPositive && start <= end)) {
                setDisplayValue(end);
            } else {
                setDisplayValue(start);
                requestAnimationFrame(animateValue);
            }
        };

        requestAnimationFrame(animateValue);
    }, [valor, isPositive]);

    return (
        <section className={`${color === 'mo' ? 'bg-[#5D4889]' : color === 've' ? 'bg-[#4CBAB5]' : 'bg-transparent'} grid col-1 w-full h-full p-4 rounded-md relative`}>
            <div>
                <h3 className={`${color === 'mo' ? 'text-gray-400' : 'text-gray-300'} font-bold text-base pb-3`}>{titulo}</h3>
                <div className='flex gap-2 items-center align-middle'>
                    <span
                        className={`${valor > 0 ? 'text-green-500' : valor < 0 ? 'text-red-600' : 'text-white'} font-bold text-sm`}
                        style={{
                            position: 'relative',
                            animation: `${isPositive ? 'moveUp' : 'moveDown'} 2s forwards`,
                        }}
                    >
                        {`${valor > 0 ? '▲' : valor < 0 ? '▼' : '◆'}`}
                    </span>
                    <h2 className='text-white font-bold text-2xl pb-0 mb-0'>
                        {new Intl.NumberFormat('en-ES', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(displayValue).replaceAll(',', '.')}
                    </h2>                    
                </div>
                <div className='leading-none pl-5 mb-0 pb-0'>
                    <span className={`${color === 'mo' ? 'text-gray-400' : 'text-gray-300'} font-bold text-xs`}>{subtitulo}</span>
                </div>
                <div className={`${color === 'mo' ? 'border-gray-500' : 'border-gray-300'} py-4 broder border-b-0 border-l-0 border-r-0 border-t-2 w-full mt-3`}></div>
                <img src='/images/img-1.svg' alt='personas' className='w-auti h-24 absolute top-1 right-1' />

                <ProgressList items={items} color={color}/>
            </div>            
            <style>
                {`
                    @keyframes moveUp {
                        from { transform: translateY(100%); }
                        to { transform: translateY(0); }
                    }
                    @keyframes moveDown {
                        from { transform: translateY(-100%); }
                        to { transform: translateY(0); }
                    }
                `}
            </style>
        </section>
    );
};

export default function Graphtype1({anioSelected, mes, datosFiltrados, sumaNiveles, sumaNivelesFitrado, Anios}){
    return (
        <>
            <Grid item xs={12} xl={8}>
                <UtilidadMes anio={[anioSelected[0]?.year]} mes={mes} data={sumaNivelesFitrado}/>
            </Grid>
            <Grid item xs={12} xl={4}>
                <ListItemAnimated titulo={'TOTAL INGRESOS NOVIEMBRE'} subtitulo={'-15% respecto al mes pasado'} color={'mo'} valor={23434135}/>
            </Grid>            
            <Grid item xs={12} xl={4}>
                <ListItemAnimated titulo={'TOTAL INGRESOS 2024'} subtitulo={'-15% respecto al mes pasado'} color={'ve'} valor={-354600}/>
            </Grid>
            <Grid item xs={12} xl={8}>
                <UtilidadMesAnual anio={[anioSelected[0]?.year]} data={sumaNivelesFitrado}/>
            </Grid> 
            <Grid item xs={12} xl={12}>
                <VentasAnual data={sumaNiveles} anios={Anios}/>
            </Grid>                                           
            <Grid item xs={12} xl={12}>                    
                <RemuneracionesAnual anio={[anioSelected[0]?.year]} data={sumaNivelesFitrado}/>
            </Grid>
            <Grid item xs={12} xl={12}>                    
                <GoaAnual anio={[anioSelected[0]?.year]} data={sumaNivelesFitrado}/>
            </Grid>
            <Grid item xs={12} xl={12}>                    
                <PanelFinancieroAnual anio={[anioSelected[0]?.year]} mes={mes} data={sumaNiveles}/>
            </Grid>
            <Grid item lg={12} xs={12}>
                <CuboAnual anio={[anioSelected[0]?.year]} data={datosFiltrados} sumaNiveles={sumaNivelesFitrado}/>
            </Grid>
        </>
    )
}