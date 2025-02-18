/* eslint-disable react/prop-types */
import Grid from '@mui/material/Grid2';
import VentasAnual  from '../../grpemp/ventasAnual.jsx';
import CuboAnual from '../../grpemp/cuboAnual.jsx';
import UtilidadMes2 from '../../grpemp/utilidadMes2.jsx';
import UtilidadMesAnual2 from '../../grpemp/utilidadMesAnual2.jsx';
import RemuneracionesAnual2 from '../../grpemp/remuneracionesAnual2.jsx';
import GoaAnual from '../../grpemp/goaAnual.jsx';
import PanelFinancieroAnual2 from '../../grpemp/panelfinancieroAnual2.jsx';

export default function Graphtype2({anioSelected, mes, datosFiltrados, sumaNiveles, sumaNivelesFitrado, Anios}){
    return (
        <>
            <Grid size={{ xs: 12, xl: 12 }} xl={6}>                    
                <UtilidadMes2 anio={[anioSelected[0]?.year]} mes={mes} data={sumaNivelesFitrado}/>
            </Grid>
            <Grid size={{ xs: 12, xl: 12 }} xl={6}>
                <UtilidadMesAnual2 anio={[anioSelected[0]?.year]} data={sumaNivelesFitrado}/>
            </Grid>
            <Grid size={{ xs: 12, xl: 12 }}>
                <VentasAnual data={sumaNiveles} anios={Anios}/>
            </Grid>
            <Grid size={{ xs: 12, xl: 12 }}>                    
                <RemuneracionesAnual2 anio={[anioSelected[0]?.year]} data={sumaNivelesFitrado}/>
            </Grid>
            <Grid size={{ xs: 12, xl: 12 }}>                    
                <GoaAnual anio={[anioSelected[0]?.year]} data={sumaNivelesFitrado}/>
            </Grid>
            <Grid size={{ xs: 12, xl: 12 }}>                    
                <PanelFinancieroAnual2 anio={[anioSelected[0]?.year]} mes={mes} data={sumaNiveles}/>
            </Grid>
            <Grid size={{ xs: 12, xl: 12 }}>
                <CuboAnual anio={[anioSelected[0]?.year]} data={datosFiltrados} sumaNiveles={sumaNivelesFitrado}/>
            </Grid>
        </>
    )
}