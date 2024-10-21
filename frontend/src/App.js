import './App.css';
import { Route, Routes } from 'react-router-dom';
import Homepage from './Pages/Homepage';
import Trekkerpage from './Pages/Trekkerpage';
import Dashboard from './Pages/Dashboard';
import PrivateRoute from './components/Authentication/PrivateRoute';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Homepage />} exact />
        <Route path='/trekker' element={<Trekkerpage />} />
        <Route path='/dashboard/*' element={ <PrivateRoute> <Dashboard /> </PrivateRoute> } /> {/* Using /* as there are nested routes */}
      </Routes>
    </div>
  );
}

export default App;
