/* eslint-disable react/prop-types */
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
export default function PanelFinancieroTable({anio, mes, anioant, rangomes, data}) {
    const mesant = mes[0] === 1 ? 12 : mes[0] - 1;
    const Tablehead = ({anio, mes, anioant, mesant}) => {
        return (
            <thead>
                <tr>
                    <th rowSpan="2" className="bg-[#4cbab5] rounded-tl-xl">Panel de Finanzas</th>
                    <th colSpan="5" className="bg-[#4cbab5]">RESULTADO DE {meses[mes[0]-1].label.toUpperCase()}</th>
                    <th colSpan="3" className="bg-[#4cbab5] rounded-tr-xl">YTD_{meses[mesant-1].label.toUpperCase().slice(0,3)}</th>
                </tr>
                <tr>
                    
                    <th rowSpan="2" className="bg-[#4cbab5]">Real {anio}</th>
                    <th rowSpan="2" className="bg-[#4cbab5]">Mes Ant. {meses[mesant-1].label.toUpperCase()}</th>
                    <th rowSpan="2" className="bg-[#4cbab5]">Crec. Mes Ant.</th>
                    <th rowSpan="2" className="bg-[#4cbab5]">Real {anioant}</th>
                    <th rowSpan="2" className="bg-[#4cbab5]">Crec. Año Ant.</th>
                    <th colSpan="3" className="bg-[#4cbab5]">Acumulado de {rangomes}</th>
                </tr>
                <tr>
                    <th className="bg-[#4cbab5]">(Pesos)</th>
                    <th className="bg-[#4cbab5]">Real {anio}</th>
                    <th className="bg-[#4cbab5]">Año {anioant}</th>
                    <th className="bg-[#4cbab5]">Crec.</th>
                </tr>
            </thead>
        )
    }
    const Tablebody = ({data}) => {
        return (
            <tbody>{
                data?.map((item, idx)  => {
                    return (
                        <tr key={'row-'+ idx} className={`${idx === 2 || idx === 5 || idx === 6 || idx === 12 || idx === 13 || idx === 19 || idx === 20 ? 'bg-[#36a2eb33] font-bold text-black' : idx === 7 || idx === 14 || idx === 19 || idx === 21? ' bg-[#9966ff33] font-bold text-black' : idx === 20 || idx === 23 || idx === 22 || idx === 24 ? 'bg-[#4bc0c033] font-bold text-black' : ''}`}>
                            {
                                item?.map((item, index) => {
                                    return (
                                        <td key={'r-' + idx + '-' + index} className={`${index===0 ? 'text-left' : 'text-center'} text-wrap`}>{item}</td>
                                    )
                                })
                            }
                        </tr>
                    )
                })                           
            }
            </tbody>
        )
    }

    return (
        <div className="bg-[#ebebeb] p-4 rounded-md">
            <table id="panelfinanciero" className="w-full">
                <Tablehead anio={anio} mes={mes} anioant={anioant} mesant={mesant} rangomes={rangomes}/>
                <Tablebody data={data}/>
            </table>
        </div>
    )
}