import React from 'react';
import './App.css';
import Homepage from './pages/Homepage/Homepage';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import SingleData from './pages/SIngleData/SingleData';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          <Route path="/singledata" element={<SingleData />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
