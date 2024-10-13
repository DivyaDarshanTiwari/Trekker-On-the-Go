import './App.css';
import { Route, Routes } from 'react-router-dom';
import Homepage from './Pages/Homepage';
import Trekkerpage from './Pages/Trekkerpage';
import Dashboard from './Pages/Dashboard';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' Component={Homepage} exact />
        <Route path='/trekker' Component={Trekkerpage} />
        <Route path='/dashboard' Component={Dashboard} />
      </Routes>
    </div>
  );
}

export default App;
