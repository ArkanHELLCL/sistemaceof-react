/* eslint-disable react/prop-types */
import Menu from './menu.jsx'

export default function Sidebar ({setTitle}) {
    return (
      <section className="sidebar text-white pl-4 pt-4">
        <div className='text-center pr-4'>
            <img src="https://ceofconsultores.com/wp-content/uploads/2025/01/logo-BLANCO-400px.png" className="h-16 w-auto"/>
            <span>CEOF Consultores</span>
            <div className="pt-4 mt-4 space-y-2 font-medium border-t border-purple-500"></div>
        </div>
        <div className='flex flex-col justify-between h-full pb-[150px] pt-2'>
          <Menu setTitle={setTitle}/>        
        </div>
      </section>
    );
  }