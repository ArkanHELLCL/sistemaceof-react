/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import ProgressList from './progressitem.jsx';
import LineChartSimple from './lineChartSimple.jsx';
import BarChartSimple from './barChartSimple.jsx';
import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid2';

export default function ListItemAnimated({ data, color }) {
    const [displayValue1, setDisplayValue1] = useState(0);
    const [displayValue2, setDisplayValue2] = useState(0);
    const [displayValue3, setDisplayValue3] = useState(0);
    const isPositive1 = data?.data[0]?.valor >= 0;    

    const easeOutQuad = (t) => t * (2 - t);

    useEffect(() => {
        const startAnimation = () => {
            let start = 0;
            const end = data?.data[0]?.valor;
            const duration = 2000;
            const startTime = performance.now();

            const animateValue1 = (currentTime) => {
                const elapsedTime = currentTime - startTime;
                const progress = Math.min(elapsedTime / duration, 1);
                const easedProgress = easeOutQuad(progress);
                const currentValue = start + (end - start) * easedProgress;

                setDisplayValue1(currentValue);

                if (progress < 1) {
                    requestAnimationFrame(animateValue1);
                }
            };

            requestAnimationFrame(animateValue1);
        };

        const timer = setTimeout(startAnimation, 1000);
        return () => clearTimeout(timer);
    }, [data?.data[0]?.valor]);

    useEffect(() => {
        const startAnimation = () => {
            let start = 0;
            const end = data?.data[1]?.valor;
            const duration = 2500;
            const startTime = performance.now();

            const animateValue2 = (currentTime) => {
                const elapsedTime = currentTime - startTime;
                const progress = Math.min(elapsedTime / duration, 1);
                const easedProgress = easeOutQuad(progress);
                const currentValue = start + (end - start) * easedProgress;

                setDisplayValue2(currentValue);

                if (progress < 1) {
                    requestAnimationFrame(animateValue2);
                }
            };

            requestAnimationFrame(animateValue2);
        };

        const timer = setTimeout(startAnimation, 1000);
        return () => clearTimeout(timer);
    }, [data?.data[1]?.valor]);

    useEffect(() => {
        const startAnimation = () => {
            let start = 0;
            const end = data?.data[2]?.valor;
            const duration = 3000;
            const startTime = performance.now();

            const animateValue3 = (currentTime) => {
                const elapsedTime = currentTime - startTime;
                const progress = Math.min(elapsedTime / duration, 1);
                const easedProgress = easeOutQuad(progress);
                const currentValue = start + (end - start) * easedProgress;

                setDisplayValue3(currentValue);

                if (progress < 1) {
                    requestAnimationFrame(animateValue3);
                }
            };

            requestAnimationFrame(animateValue3);
        };

        const timer = setTimeout(startAnimation, 1000);
        return () => clearTimeout(timer);
    }, [data?.data[2]?.valor]);

    return (
        <section className={`${color === 'mo' ? 'bg-[#5D4889]' : color === 've' ? 'bg-[#4CBAB5]' : 'bg-transparent'} grid col-1 w-full h-full p-4 rounded-md relative`}>
            <div>
                <h3 className={`${color === 'mo' ? 'text-gray-400' : 'text-gray-300'} font-bold text-base pb-3`}>{data?.data[0]?.titulo}</h3>
                <div className='flex gap-2 items-center align-middle'>
                    <span
                        className={`${data?.data[0]?.valor > 0 ? 'text-green-500' : data?.data[0]?.valor < 0 ? 'text-red-600' : 'text-white'} font-bold text-sm`}
                        style={{
                            position: 'relative',
                            animation: `${isPositive1 ? 'moveUp' : 'moveDown'} 2s forwards`,
                        }}
                    >
                        {`${data?.data[0]?.valor > 0 ? '▲' : data?.data[0]?.valor < 0 ? '▼' : '◆'}`}
                    </span>
                    <h2 className='text-white font-bold text-2xl pb-0 mb-0'>
                        {new Intl.NumberFormat('en-ES', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(displayValue1).replaceAll(',', '.')}
                    </h2>
                </div>
                <div className='leading-none pl-5 mb-0 pb-0'>
                    <span className={`${color === 'mo' ? 'text-gray-400' : 'text-gray-300'} font-bold text-xs`}>{data?.data[0]?.subtitulo}</span>
                </div>
                <div className={`${color === 'mo' ? 'border-gray-500' : 'border-gray-300'} pt-4 broder border-b-0 border-l-0 border-r-0 border-t-2 w-full mt-3`}></div>
                <img src='/images/img-1.svg' alt='personas' className='w-auti h-24 absolute top-1 right-1' />

                <ProgressList items={data?.items} color={color} />
                <Grid container spacing={0} className='mt-4'>
                    <Grid size={{ xs: 6, xl: 6 }} className='items-start flex justify-start'>
                        <div>
                            <h2 className={`${color === 'mo' ? 'text-gray-400' : 'text-gray-300'} font-bold text-xs`}>{data?.data[1]?.titulo}</h2>
                            <h2 className='text-white font-bold text-2xl pb-0 mb-0'>
                                {new Intl.NumberFormat('en-ES', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(displayValue2).replaceAll(',', '.')}
                            </h2>
                            <div className='leading-none pl-0 mb-0 pb-0'>
                                <span className={`${color === 'mo' ? 'text-gray-400' : 'text-gray-300'} font-bold text-xs`}>{`${data?.data[1]?.valor > 0 ? '▲' : data?.data[1]?.valor < 0 ? '▼' : '◆'}`} {data?.data[1]?.subtitulo}</span>
                            </div>
                        </div>
                    </Grid>
                    <Grid size={{ xs: 6, xl: 6 }} sx={{ height: '100px' }}>
                        <LineChartSimple chartData={data?.dataset[0]} />
                    </Grid>
                    <Grid size={{ xs: 6, xl: 6 }} className='items-start flex justify-start'>
                        <div>
                            <h2 className={`${color === 'mo' ? 'text-gray-400' : 'text-gray-300'} font-bold text-xs`}>{data?.data[2]?.titulo}</h2>
                            <h2 className='text-white font-bold text-2xl pb-0 mb-0'>
                                {new Intl.NumberFormat('en-ES', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(displayValue3).replaceAll(',', '.')}
                            </h2>
                            <div className='leading-none pl-0 mb-0 pb-0'>
                                <span className={`${color === 'mo' ? 'text-gray-400' : 'text-gray-300'} font-bold text-xs`}>{`${data?.data[2]?.valor > 0 ? '▲' : data?.data[2]?.valor < 0 ? '▼' : '◆'}`} {data?.data[2]?.subtitulo}</span>
                            </div>
                        </div>
                    </Grid>
                    <Grid size={{ xs: 6, xl: 6 }} sx={{ height: '100px' }}>
                        <BarChartSimple chartData={data?.dataset[1]} />
                    </Grid>
                </Grid>
            </div>            
        </section>
    );
}