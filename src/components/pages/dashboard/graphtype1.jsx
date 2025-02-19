/* eslint-disable react/prop-types */
import Grid from '@mui/material/Grid2';
import VentasAnual  from '../../grpemp/ventasAnual.jsx';
import UtilidadMesAnual from '../../grpemp/utilidadMesAnual.jsx';
import UtilidadMes from '../../grpemp/utilidadMes.jsx';
import RemuneracionesAnual from '../../grpemp/remuneracionesAnual.jsx';
import GoaAnual from '../../grpemp/goaAnual.jsx';
import PanelFinancieroAnual from '../../grpemp/panelfinancieroAnual.jsx';
import CuboAnual from '../../grpemp/cuboAnual.jsx';
import ResumenPanel from '../../grpemp/resumenPanel.jsx';

export default function Graphtype1({anioSelected, mes, datosFiltrados, sumaNiveles, sumaNivelesFitrado, Anios}){
    return (
        <>
            <Grid size={{ xs: 12, xl: 8 }}>
                <UtilidadMes anio={[anioSelected[0]?.year]} mes={mes} data={sumaNivelesFitrado}/>
            </Grid>
            <Grid size={{ xs: 12, xl: 4 }}>
                <ResumenPanel anio={[anioSelected[0]?.year]} mes={mes} data={sumaNiveles} type={1} anios={Anios}/>
            </Grid>            
            <Grid size={{ xs: 12, xl: 4 }}>
                <ResumenPanel anio={[anioSelected[0]?.year]} mes={mes} data={sumaNiveles} type={2} anios={Anios}/>
            </Grid>
            <Grid size={{ xs: 12, xl: 8 }}>
                <UtilidadMesAnual anio={[anioSelected[0]?.year]} data={sumaNivelesFitrado}/>
            </Grid> 
            <Grid size={{ xs: 12, xl: 12 }}>
                <VentasAnual data={sumaNiveles} anios={Anios}/>
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