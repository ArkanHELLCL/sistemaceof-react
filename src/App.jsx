/* eslint-disable react/prop-types */
import Header from './components/header.jsx'
import Sidebar from './components/sidebar.jsx'
import Footer from './components/footer.jsx'
import { useState } from 'react';
import Main from './components/main.jsx';

function App() {
  const [title, setTitle] = useState('Dashboard');

  return (
    <main className="dashtemplate">
      <Header title={title}/>
      <Sidebar setTitle={setTitle}/>
      <Footer />
      <Main />
    </main>  
  );
}

export default App;