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
          <Download data={data} mes={mes} user={user} menu={menu} empresas={empresas} empresa={empresa}/>
      }{
        menu.Upload &&
          <Upload data={data} mes={mes} user={user} menu={menu} empresas={empresas}/>
      }{
        menu.Contacto &&
          <Contact data={data} mes={mes} user={user} menu={menu} empresa={empresa}/>
      }{
        menu.Empresas &&
          <Enterprise data={data} mes={mes} user={user} menu={menu} empresas={empresas}/>
      }{
        menu.Usuarios &&
          <User data={data} mes={mes} user={user} menu={menu}/>
      }
    </section>
  );
}