import './App.css';
import { Route, Routes } from 'react-router-dom';
import Homepage from './Pages/Homepage';
import Trekkerpage from './Pages/Trekkerpage';
import Dashboard from './Pages/Dashboard';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Homepage />} exact />
        <Route path='/trekker' element={<Trekkerpage />} />
        <Route path='/dashboard/*' element={<Dashboard />} /> {/* Using /* as there are nested routes */}
      </Routes>
    </div>
  );
}

export default App;
