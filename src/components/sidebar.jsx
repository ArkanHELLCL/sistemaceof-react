/* eslint-disable react/prop-types */
import Menu from './menu.jsx'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function Sidebar ({setTitle}) {
    return (
      <section className="sidebar text-white pl-4 pt-4">
        <div className='text-center pr-4'>
            <img src="https://ceofconsultores.com/wp-content/uploads/2025/01/logo-BLANCO-400px.png" className="h-16 w-auto"/>
            <span>CEOF Consultores</span>
            <div className="pt-4 mt-4 space-y-2 font-medium border-t border-purple-500"></div>
        </div>
        <div className='flex flex-col h-full pb-[150px] pt-2 gap-2'>
            <Menu setTitle={setTitle}/>       
            <div className='grid grid-cols-2 gap-4 p-4 border-t border-b border-purple-500'>
                <FormGroup className='truncate w-full'>
                    <FormControlLabel control={<Checkbox defaultChecked />} label="Panel Financiero" className=''/>
                    <FormControlLabel required control={<Checkbox />} label="Required" className='!truncate !text-nowrap'/>
                    <FormControlLabel disabled control={<Checkbox />} label="Disabled" className='!truncate !text-nowrap'/>
                </FormGroup>
                <FormGroup>
                    <FormControlLabel control={<Checkbox defaultChecked />} label="Label" className='!truncate !text-nowrap'/>
                    <FormControlLabel required control={<Checkbox />} label="Required" className='!truncate !text-nowrap'/>
                    <FormControlLabel disabled control={<Checkbox />} label="Disabled" className='!truncate !text-nowrap'/>
                </FormGroup>                
            </div>
        </div>
      </section>
    );
  }