/* eslint-disable react/prop-types */
import Grid from '@mui/material/Grid';
import VentasAnual  from '../../grpemp/ventasAnual.jsx';
import CuboAnual from '../../grpemp/cuboAnual.jsx';
import UtilidadMes2 from '../../grpemp/utilidadMes2.jsx';
import UtilidadMesAnual2 from '../../grpemp/utilidadMesAnual2.jsx';
import RemuneracionesAnual2 from '../../grpemp/remuneracionesAnual2.jsx';
import GoaAnual from '../../grpemp/goaAnual.jsx';

export default function Graphtype2({anioSelected, mes, datosFiltrados, sumaNiveles, sumaNivelesFitrado, Anios}){
    return (
        <>
            <Grid item xs={12} xl={6}>                    
                <UtilidadMes2 anio={[anioSelected[0]?.year]} mes={mes} data={sumaNivelesFitrado}/>
            </Grid>
            <Grid item xs={12} xl={6}>
                <UtilidadMesAnual2 anio={[anioSelected[0]?.year]} data={sumaNivelesFitrado}/>
            </Grid>
            <Grid item xs={12} xl={12}>
                <VentasAnual data={sumaNiveles} anios={Anios}/>
            </Grid>
            <Grid item xs={12} xl={12}>                    
                <RemuneracionesAnual2 anio={[anioSelected[0]?.year]} data={sumaNivelesFitrado}/>
            </Grid>
            <Grid item xs={12} xl={12}>                    
                <GoaAnual anio={[anioSelected[0]?.year]} data={sumaNivelesFitrado}/>
            </Grid>
            <Grid item lg={12} xs={12}>
                <CuboAnual anio={[anioSelected[0]?.year]} data={datosFiltrados} sumaNiveles={sumaNivelesFitrado}/>
            </Grid>
        </>
    )
}