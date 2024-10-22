import "./App.css";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import Homepage from "./Pages/Homepage";
import Trekkerpage from "./Pages/Trekkerpage";
import Dashboard from "./Pages/Dashboard";
import PrivateRoute from "./components/Authentication/PrivateRoute";
import Notifications from "./Pages/Notification";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} exact />
        <Route path="/login" element={<Homepage />} />
        <Route path="/trekker" element={<Trekkerpage />} />
        <Route
          path="/dashboard/*"
          element={
            <PrivateRoute>
              {" "}
              <Dashboard />{" "}
            </PrivateRoute>
          }
        />{" "}
        {/* Using /* as there are nested routes */}
        <Route path="/notification" element={<Notifications />} />
      </Routes>
    </div>
  );
}

export default App;
