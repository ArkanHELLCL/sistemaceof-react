import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';

export default function Footer () {
  return (
    <footer className="footer text-white bg-black bg-opacity-30 pl-4 py-4">
      <div className='flex justify-between align-top'>
        <h2 className="opacity-30">Autenticado como:</h2>
        <div className="align-middle flex items-center gap-1 opacity-30 text-gray-300 hover:text-red-500 hover:opacity-100 cursor-pointer pr-4">
          <PowerSettingsNewIcon />
          <a href="#" className="text-gray-300 no-underline text-lg">Salir</a>
        </div>
      </div>
      <h2 className="opacity-30">Luis Castillo</h2>      
    </footer>
  );
}