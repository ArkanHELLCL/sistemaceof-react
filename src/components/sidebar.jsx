/* eslint-disable react/prop-types */
import Menu from './menu.jsx'

export default function Sidebar ({setTitle, user}) {
    return (
      <section className="sidebar text-white pl-4 pt-4">
        <div className='text-center pr-4'>
            <img src={user?.logo} className="h-16 w-auto"/>
            <span>{user?.empresa}</span>
            <div className="pt-4 mt-4 space-y-2 font-medium border-t border-purple-500"></div>
        </div>
        <div className='flex flex-col h-full pb-[150px] pt-2 gap-2'>
            <Menu setTitle={setTitle} user={user}/>            
        </div>
      </section>
    );
  }