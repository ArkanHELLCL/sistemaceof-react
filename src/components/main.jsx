/* eslint-disable react/prop-types */
import DashBoard from "./pages/dashboard.jsx";
import Download from "./pages/download.jsx";
import Upload from "./pages/upload.jsx";
import Contact from "./pages/contact.jsx";
import Enterprise from "./maintainers/enterprise.jsx";
import User from "./maintainers/user.jsx";
import { Suspense } from "react";
import Loading from "./loading.jsx";

export default function Main ({data, mes, user, menu, empresas, graficos, setGraficos, empresa, setEmpresa}) {
  return (
    <section className="main bg-white w-full px-10 pt-4 pb-20 relative">
      {
        menu.Dashboard &&
          <Suspense fallback={<Loading />}>
            <DashBoard data={data} mes={mes} user={user} empresas={empresas.slice(1)} graficos={graficos} setGraficos={setGraficos} empresa={empresa} setEmpresa={setEmpresa} menu={menu}/>
          </Suspense>
      }{
        menu.Download &&
          <Suspense fallback={<Loading />}>
            <Download user={user} empresas={empresas.slice(1)} empresa={empresa}/>
          </Suspense>
      }{
        menu.Upload &&
          <Suspense fallback={<Loading />}>
            <Upload user={user} empresas={empresas.slice(1)}/>
          </Suspense>
      }{
        menu.Contacto &&
          <Suspense fallback={<Loading />}>
            <Contact user={user} empresa={empresa} empresas={empresas.slice(1)}/>
          </Suspense>
      }{
        menu.Empresas &&
          <Suspense fallback={<Loading />}>
            <Enterprise user={user} />
          </Suspense>
      }{
        menu.Usuarios &&
          <Suspense fallback={<Loading />}>
            <User user={user} empresas={empresas} />
          </Suspense>
      }
    </section>
  );
}