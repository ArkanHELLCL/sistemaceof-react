/* eslint-disable react/prop-types */
import Grid from '@mui/material/Grid2';
import CuboAnual from '../../grpemp/cuboAnual.jsx';
import UtilidadMes from '../../grpemp/utilidadMes.jsx';
import UtilidadMesAnual from '../../grpemp/utilidadMesAnual.jsx';
import VentasAnual3 from '../../grpemp/ventasAnual3.jsx';
import RemuneracionesAnual from '../../grpemp/remuneracionesAnual.jsx';
import GoaAnual from '../../grpemp/goaAnual.jsx';
import PanelFinancieroAnual from '../../grpemp/panelfinancieroAnual.jsx';

export default function Graphtype3({anioSelected, mes, datosFiltrados, sumaNiveles, sumaNivelesFitrado, Anios}){
    return (
        <>
        <Grid size={{ xs: 12, xl: 12 }} xl={6}>                    
            <UtilidadMes anio={[anioSelected[0]?.year]} mes={mes} data={sumaNivelesFitrado}/>
        </Grid>
        <Grid size={{ xs: 12, xl: 12 }} xl={6}>
            <UtilidadMesAnual anio={[anioSelected[0]?.year]} data={sumaNivelesFitrado}/>
        </Grid> 
        <Grid size={{ xs: 12, xl: 12 }}>
            <VentasAnual3 data={sumaNiveles} anios={Anios}/>
        </Grid>                                           
        <Grid size={{ xs: 12, xl: 12 }}>                    
            <RemuneracionesAnual anio={[anioSelected[0]?.year]} data={sumaNivelesFitrado}/>
        </Grid>
        <Grid size={{ xs: 12, xl: 12 }}>                    
            <GoaAnual anio={[anioSelected[0]?.year]} data={sumaNivelesFitrado}/>
        </Grid>
        <Grid size={{ xs: 12, xl: 12 }}>                    
            <PanelFinancieroAnual anio={[anioSelected[0]?.year]} mes={mes} data={sumaNiveles}/>
        </Grid>
        <Grid size={{ xs: 12, xl: 12 }}>
            <CuboAnual anio={[anioSelected[0]?.year]} data={datosFiltrados} sumaNiveles={sumaNivelesFitrado}/>
        </Grid>
    </>
    )
}