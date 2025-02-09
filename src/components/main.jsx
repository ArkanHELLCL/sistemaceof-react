/* eslint-disable react/prop-types */

import DashBoard from "./pages/dashboard.jsx";
import Download from "./pages/download.jsx";
import Upload from "./pages/upload.jsx";
import Contact from "./pages/contact.jsx";
import Enterprise from "./maintainers/enterprise.jsx";
import User from "./maintainers/user.jsx";

export default function Main ({data, mes, user, menu}) {
  return (
    <section className="main bg-white w-full px-10 pt-4 pb-20 relative">
      {
        menu.Dashboard &&
          <DashBoard data={data} mes={mes} user={user}/>
      }{
        menu.Download &&
          <Download data={data} mes={mes} user={user}/>
      }{
        menu.Upload &&
          <Upload data={data} mes={mes} user={user}/>
      }{
        menu.Contacto &&
          <Contact data={data} mes={mes} user={user}/>
      }{
        menu.Empresas &&
          <Enterprise data={data} mes={mes} user={user}/>
      }{
        menu.Usuarios &&
          <User data={data} mes={mes} user={user}/>
      }
    </section>
  );
}