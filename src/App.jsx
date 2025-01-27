/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import Header from './components/header.jsx'
import Sidebar from './components/sidebar.jsx'
import Footer from './components/footer.jsx'
import Main from './components/main.jsx';

import { data } from '../mock/usuario.json';

function App() {
  const [title, setTitle] = useState('Dashboard');
  const [user, setUser] = useState();

  useEffect(() => {
    setUser(data);
  }, []);

  return (
    <main className="dashtemplate">
      <Header title={title}/>
      <Sidebar setTitle={setTitle} user={user}/>
      <Footer user={user}/>
      <Main user={user}/>
    </main>  
  );
}

export default App;