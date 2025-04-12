/* eslint-disable react/prop-types */
import DashBoard from "./pages/dashboard.jsx";
import Download from "./pages/download.jsx";
import Upload from "./pages/upload.jsx";
import Contact from "./pages/contact.jsx";
import Enterprise from "./maintainers/enterprise.jsx";
import User from "./maintainers/user.jsx";
import { Suspense } from "react";
import Loading from "./loading.jsx";

export default function Main ({data, mes, user, menu, empresas, graficos, setGraficos, empresa, setEmpresa, setNuevaEmpresa}) {
  return (
    <section className="main bg-white w-full px-10 pt-4 pb-20 relative">
      {
        menu.Dashboard &&
          <Suspense fallback={<Loading />}>
            <DashBoard data={data} mes={mes} user={user} empresas={user.PER_Id === 1 ? empresas.slice(1) : empresas } graficos={graficos} setGraficos={setGraficos} empresa={empresa} setEmpresa={setEmpresa} menu={menu}/>
          </Suspense>
      }{
        menu.Download &&
          <Suspense fallback={<Loading />}>
            <Download user={user} empresas={user.PER_Id === 1 ? empresas.slice(1).sort((a, b) => a.label.localeCompare(b.label)) : empresas.sort((a, b) => a.label.localeCompare(b.label))} empresa={empresa}/>
          </Suspense>
      }{
        menu.Upload &&
          <Suspense fallback={<Loading />}>
            <Upload user={user} empresas={user.PER_Id === 1 ? empresas.slice(1).sort((a, b) => a.label.localeCompare(b.label)) : empresas.sort((a, b) => a.label.localeCompare(b.label))}/>
          </Suspense>
      }{
        menu.Contacto &&
          <Suspense fallback={<Loading />}>
            <Contact user={user} empresa={empresa} empresas={empresas.sort((a, b) => a.label.localeCompare(b.label))}/>
          </Suspense>
      }{
        menu.Empresas &&
          <Suspense fallback={<Loading />}>
            <Enterprise user={user} setNuevaEmpresa={setNuevaEmpresa}/>
          </Suspense>
      }{
        menu.Usuarios &&
          <Suspense fallback={<Loading />}>
            <User user={user} empresas={empresas.sort((a, b) => a.label.localeCompare(b.label))} />
          </Suspense>
      }
    </section>
  );
}