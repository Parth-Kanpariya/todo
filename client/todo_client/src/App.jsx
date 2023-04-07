import './App.css';
import PrivateRoute from './helper/PrivateRoutes';
import Home from './pages/Home';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/SignUp';
import SetAuthToken from './helper/SetAuthToken';
if (localStorage.token && localStorage.userId) {
  SetAuthToken(localStorage.token);
  // console.log(localStorage.userId)
}
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
