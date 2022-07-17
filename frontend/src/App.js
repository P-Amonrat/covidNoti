import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import Central from './Components/Central';
import North from './Components/North';
import South from './Components/South';
import East from './Components/East';
import NorthEast from './Components/NorthEast';
import West from './Components/West';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route index element={<Home />} />
        <Route path="central" element={<Central />} />
        <Route path="north" element={<North />} />
        <Route path="south" element={<South />} />
        <Route path="east" element={<East />} />
        <Route path="northEast" element={<NorthEast />} />
        <Route path="west" element={<West/>} />
      </Route>
    </Routes>
  );
}

export default App;
