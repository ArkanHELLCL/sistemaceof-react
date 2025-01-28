/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { UserData } from '../../../mock/data.js';
import BarChart from '../graficos/barChart.jsx';

const anios =[
    { "title": "2022", "year": 2022 },
    { "title": "2023", "year": 2023 },
    { "title": "2024", "year": 2024 },
    { "title": "2025", "year": 2025 }
]

export default function VentasAnual({empresa, anio}){
    const [totalData, setTotalData] = useState([]);
    const [grpdata, setGrpdata] = useState([]);
    const [grpconfig, setGrpconfig] = useState({});
    //const fixedOptions = [graficos[1]];
    const fixedOptions = [];
    const selectedAnios = anios?.filter(item => anio?.includes(item.year)).sort((a, b) => a.year - b.year)
    const [aniosSelected, setAniosSelected] = useState(selectedAnios);

    useEffect(() => {
        const orderedData = UserData?.sort((a, b) => a.anio - b.anio);
        const filteredArray = orderedData?.filter(item => anio?.includes(item.anio));
        const resultData = filteredArray.flatMap(item => item.data);

        setTotalData(
           resultData 
        );
        setGrpdata(resultData)
        setGrpconfig({
            labels: resultData.map(data => data.month),
            datasets: [
              {
                label: "Ventas Anuales",
                data: resultData?.map(data => data.venta),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 205, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(201, 203, 207, 0.2)',
                    'rgba(233, 180, 257, 0.2)'
                ],
                borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)',
                    'rgb(201, 203, 207)',
                    'rgb(233, 180, 257)'
                ],
                borderWidth: 1
              }
            ]
        })
    }, [UserData, empresa, anio]);
    let title;
    if(anio.length === 1){
        title = 'Gráfico de Ventas año ' + anio[0];
    }
    else if(anio.length > 1){
        title = 'Gráfico de Ventas años ' + anio[0] + ' a ' + anio[anio.length-1];
    }
    else{
        title = 'Gráfico de Ventas';
    }

    return grpconfig ? 
        <>
            <Autocomplete
                        multiple
                        id="anios-ventas"
                        value={aniosSelected}
                        onChange={(event, newValue) => {
                            setAniosSelected([
                            ...newValue.filter((option) => !fixedOptions.includes(option)),
                            ]);
                        }}
                        options={anios}
                        getOptionLabel={(option) => option.title}
                        renderTags={(tagValue, getTagProps) =>
                            tagValue.map((option, index) => {
                            const { key, ...tagProps } = getTagProps({ index });
                            return (
                                <Chip
                                    key={key}
                                    label={option.title}
                                    {...tagProps}
                                    disabled={fixedOptions.includes(option)}
                                />
                            );
                            })
                        }
                        style={{ width: '100%' }}
                        renderInput={(params) => (
                            <TextField {...params} label="Años seleccionados" placeholder="Año" variant="standard"/>
                        )}
                    />
            <BarChart chartData={grpconfig} title={title}/> 
        </> : null
}