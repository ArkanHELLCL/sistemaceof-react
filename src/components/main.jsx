import { useEffect, useState } from 'react';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { empresas as emps } from '../../mock/empresas.json';
import { graficos } from '../../mock/graficos.json';

export default function Main () {    
    const [empresas, setEmpresas] = useState([]);
    const [empresa, setEmpresa] = useState('');
    //const fixedOptions = [graficos[1]];
    const fixedOptions = [];
    const [value, setValue] = useState([...fixedOptions, graficos[6], graficos[2]]);

    useEffect(() => {
        setEmpresas(emps);
        setEmpresa(emps[0]);
    }, []);

    return (
        <section className="main bg-white w-full p-4 py-4">
            <h2 className="text-2xl font-light">Personalización del Dashboard </h2>
            <div className="pt-4 mt-4 space-y-2 font-medium border-t border-purple-300 pb-4"></div>
            <div className='flex align-bottom gap-6 pb-4'>
                <Autocomplete
                    disablePortal
                    id="empresas"
                    value={empresa}
                    options={empresas}
                    sx={{ width: 300}}
                    renderInput={(params) => <TextField {...params} label="Empresa" variant="standard"/>}
                />
            
                <Autocomplete
                    multiple
                    id="fixed-tags-demo"
                    value={value}
                    onChange={(event, newValue) => {
                        setValue([
                        ...fixedOptions,
                        ...newValue.filter((option) => !fixedOptions.includes(option)),
                        ]);
                    }}
                    options={graficos}
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
                    style={{ width: 500 }}
                    renderInput={(params) => (
                        <TextField {...params} label="Gráficos autorizados" placeholder="Gráfico" variant="standard"/>
                    )}
                />

                <button className="bg-[#68488a] hover:bg-[#424685] transition-all text-white font-bold py-2 px-10 rounded"> Guardar </button>
            </div>
            <h2 className="text-2xl font-light pb-2 pt-4">Visualización del Dashboard </h2>
            <div className="pt-4 mt-4 space-y-2 font-medium border-t border-purple-300"></div>
        </section>
    );
}