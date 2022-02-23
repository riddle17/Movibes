import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./Registration";
import Login from "./Login";
import Error from "./Error";
import SetPreference from "./SetPreference";
import HomePage from "./HomePage";
import NavBar from "./NavBar";
import NavBar1 from "./NavBar1";
import NavBar2 from "./NavBar2";

const App = (props) => {
  return (
    <>
      <Router>
        {props.userloggedIn ? <NavBar2 /> : <NavBar1 />}
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/reg" element={<Register />} />
          <Route path="/home-page" element={<HomePage />} />
          <Route path="/set-preference" element={<SetPreference />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
