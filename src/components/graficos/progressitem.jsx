/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';

const ProgressItem = ({ title, percentage, index, color }) => {
    const [displayPercentage, setDisplayPercentage] = useState(0);

    useEffect(() => {
        let start = 0;
        const end = percentage;
        const duration = 1000;
        const increment = end / (duration / 16);

        const animateValue = () => {
            start += increment;
            if (start >= end) {
                setDisplayPercentage(end);
            } else {
                setDisplayPercentage(start);
                requestAnimationFrame(animateValue);
            }
        };

        requestAnimationFrame(animateValue);
    }, [percentage]);

    const getColor = (index) => {
        return index % 2 === 0
            ? 'linear-gradient(90deg, rgba(144,238,144,1) 0%, rgba(34,193,195,1) 100%)'
            : 'linear-gradient(90deg, rgba(173,216,230,1) 0%, rgba(34,193,195,1) 100%)';
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', mb: 1 }}>
            <Typography variant="subtitle2" component="div" className={`${color === 'mo' ? '!text-gray-400' : '!text-gray-200'} !font-bold !text-xs pl-2`}>
                {title}
            </Typography>
            <Typography variant="body2" component="div" sx={{ minWidth: 35 }} className={`text-white font-bold !text-xl pl-2`}>
                {Math.round(displayPercentage)}%
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <Box sx={{ width: '100%', ml: 1 }}>
                    <LinearProgress
                        variant="determinate"
                        value={displayPercentage}
                        sx={{
                            height: 5,
                            borderRadius: 5,
                            background: getColor(index),
                        }}
                    />
                </Box>
            </Box>
        </Box>
    );
};

const ProgressList = ({ items, color }) => {
    return (
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 0 }}>
            {items.map((item, index) => (
                <ProgressItem key={index} title={item.title} percentage={item.percentage} index={index} color={color}/>
            ))}
        </Box>
    );
};

export default ProgressList;