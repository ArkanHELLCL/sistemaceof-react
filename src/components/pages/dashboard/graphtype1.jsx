/* eslint-disable react/prop-types */
import Grid from '@mui/material/Grid';
import VentasAnual  from '../../grpemp/ventasAnual.jsx';
import UtilidadMesAnual from '../../grpemp/utilidadMesAnual.jsx';
import UtilidadMes from '../../grpemp/utilidadMes.jsx';
import RemuneracionesAnual from '../../grpemp/remuneracionesAnual.jsx';
import GoaAnual from '../../grpemp/goaAnual.jsx';
import PanelFinancieroAnual from '../../grpemp/panelfinancieroAnual.jsx';
import CuboAnual from '../../grpemp/cuboAnual.jsx';

export default function Graphtype1({anioSelected, mes, datosFiltrados, sumaNiveles, sumaNivelesFitrado, Anios}){
    return (
        <>
            <Grid item xs={12} xl={6}>                    
                <UtilidadMes anio={[anioSelected[0]?.year]} mes={mes} data={sumaNivelesFitrado}/>
            </Grid>
            <Grid item xs={12} xl={6}>
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