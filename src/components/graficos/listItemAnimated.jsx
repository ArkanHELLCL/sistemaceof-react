/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import ProgressList from './progressitem.jsx';
import LineChartSimple from './lineChartSimple.jsx';
import BarChartSimple from './barChartSimple.jsx';
import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
    

export default function ListItemAnimated ({ data, color }) {
    console.log(data);
    const [displayValue, setDisplayValue] = useState([0,0,0]);
    //const isPositive = valor >= 0;
    const isPositive = data?.data?.map(item => {
        if(item.valor>=0) return true 
        else false
    });

    /*useEffect(() => {        
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
    }, [isPositive]);*/

    return (
        <section className={`${color === 'mo' ? 'bg-[#5D4889]' : color === 've' ? 'bg-[#4CBAB5]' : 'bg-transparent'} grid col-1 w-full h-full p-4 rounded-md relative`}>
            <div>
                <h3 className={`${color === 'mo' ? 'text-gray-400' : 'text-gray-300'} font-bold text-base pb-3`}>{data?.data[0]?.titulo}</h3>
                <div className='flex gap-2 items-center align-middle'>
                    <span
                        className={`${data?.data[0]?.valor > 0 ? 'text-green-500' : data?.data[0]?.valor < 0 ? 'text-red-600' : 'text-white'} font-bold text-sm`}
                        style={{
                            position: 'relative',
                            animation: `${isPositive ? 'moveUp' : 'moveDown'} 2s forwards`,
                        }}
                    >
                        {`${data?.data[0]?.valor > 0 ? '▲' : data?.data[0]?.valor < 0 ? '▼' : '◆'}`}
                    </span>
                    <h2 className='text-white font-bold text-2xl pb-0 mb-0'>
                        {new Intl.NumberFormat('en-ES', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(displayValue[0]).replaceAll(',', '.')}
                    </h2>                    
                </div>
                <div className='leading-none pl-5 mb-0 pb-0'>
                    <span className={`${color === 'mo' ? 'text-gray-400' : 'text-gray-300'} font-bold text-xs`}>{data?.data[0]?.subtitulo}</span>
                </div>
                <div className={`${color === 'mo' ? 'border-gray-500' : 'border-gray-300'} pt-4 broder border-b-0 border-l-0 border-r-0 border-t-2 w-full mt-3`}></div>
                <img src='/images/img-1.svg' alt='personas' className='w-auti h-24 absolute top-1 right-1' />

                <ProgressList items={data?.items} color={color}/>
                <Grid container spacing={0} className='mt-4'>
                    <Grid item xs={6} xl={6} className='items-start flex justify-start'>
                        <div>
                            <h2 className={`${color === 'mo' ? 'text-gray-400' : 'text-gray-300'} font-bold text-xs`}>{data?.data[1]?.titulo}</h2>
                            <h2 className='text-white font-bold text-2xl pb-0 mb-0'>
                                {new Intl.NumberFormat('en-ES', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(displayValue[1]).replaceAll(',', '.')}
                            </h2>
                            <div className='leading-none pl-0 mb-0 pb-0'>
                                <span className={`${color === 'mo' ? 'text-gray-400' : 'text-gray-300'} font-bold text-xs`}>{`${data?.data[1]?.valor > 0 ? '▲' : data?.data[1]?.valor < 0 ? '▼' : '◆'}`} {data?.data[1]?.subtitulo}</span>
                            </div>
                        </div>                        
                    </Grid>
                    <Grid item xs={6} xl={6} sx={{height: '100px'}}>
                        <LineChartSimple chartData={data?.dataset[0]}/>
                    </Grid>
                    <Grid item xs={6} xl={6} className='items-start flex justify-start'>
                        <div>
                            <h2 className={`${color === 'mo' ? 'text-gray-400' : 'text-gray-300'} font-bold text-xs`}>{data?.data[2]?.titulo}</h2>
                            <h2 className='text-white font-bold text-2xl pb-0 mb-0'>
                                {new Intl.NumberFormat('en-ES', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(displayValue[2]).replaceAll(',', '.')}
                            </h2>
                            <div className='leading-none pl-0 mb-0 pb-0'>
                                <span className={`${color === 'mo' ? 'text-gray-400' : 'text-gray-300'} font-bold text-xs`}>{`${data?.data[2]?.valor > 0 ? '▲' : data?.data[2]?.valor < 0 ? '▼' : '◆'}`} {data?.data[2]?.subtitulo}</span>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={6} xl={6} sx={{height: '100px'}}>
                        <BarChartSimple chartData={data?.dataset[1]}/>
                    </Grid>                    
                </Grid>                
            </div>           
        </section>
    )
}