/* eslint-disable react/prop-types */
import Menu from './menu.jsx'

export default function Sidebar ({setTitle, user, setMenu, empresa}) {    
    return (
      user ?
        <section className="sidebar text-white pl-4 pt-4">
          <div className='text-center pr-4'>
              <img src={`${empresa?.EMP_UrlLogo ? empresa?.EMP_UrlLogo : '../../images/logo-BLANCO-400px.png'}`} className="w-full"/>
              <span>{empresa?.label ? empresa?.label : user?.EMP_Descripcion}</span>
              <div className="pt-4 mt-4 space-y-2 font-medium border-t border-purple-500"></div>
          </div>
          <div className='flex flex-col h-full pb-[150px] pt-2 gap-2'>
              <Menu setTitle={setTitle} user={user} setMenu={setMenu}/>            
          </div>
        </section>
      : 
        <div className="flex justify-center items-center h-96">
          <p className="text-2xl font-semibold">No hay datos para mostrar</p>
        </div>
    );
  }