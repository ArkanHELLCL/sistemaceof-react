/* eslint-disable react/prop-types */

import DashBoard from "./pages/dashboard.jsx";
import Download from "./pages/download.jsx";
import Upload from "./pages/upload.jsx";
import Contact from "./pages/contact.jsx";
import Enterprise from "./maintainers/enterprise.jsx";
import User from "./maintainers/user.jsx";

export default function Main ({data, mes, user, menu, empresas, graficos, setGraficos, empresa, setEmpresa}) {
  return (
    <section className="main bg-white w-full px-10 pt-4 pb-20 relative">
      {
        menu.Dashboard &&
          <DashBoard data={data} mes={mes} user={user} empresas={empresas} graficos={graficos} setGraficos={setGraficos} empresa={empresa} setEmpresa={setEmpresa} menu={menu}/>
      }{
        menu.Download &&
          <Download user={user} empresas={empresas} empresa={empresa}/>
      }{
        menu.Upload &&
          <Upload user={user} empresas={empresas}/>
      }{
        menu.Contacto &&
          <Contact user={user} empresa={empresa} empresas={empresas}/>
      }{
        menu.Empresas &&
          <Enterprise user={user}/>
      }{
        menu.Usuarios &&
          <User user={user}/>
      }
    </section>
  );
}