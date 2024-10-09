import './App.css';
import { Route, Routes } from 'react-router-dom';
import Homepage from './Pages/Homepage';
import Trekkerpage from './Pages/Trekkerpage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' Component={Homepage} exact />
        <Route path='/trekker' Component={Trekkerpage} />
      </Routes>
    </div>
  );
}

export default App;
