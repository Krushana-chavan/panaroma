// import logo from './logo.svg';
// import './App.css';
import { Route, Routes } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import { Loading } from "./components/Loading";
import {HomePage} from "./components/HomePage";
import SignIn from "./components/SignIn";
import PrivateRoutes from "./components/PrivateRouter/Privateroute";
import SignupComponent from "./components/Signup";
function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoutes>
            <HomePage />
          </PrivateRoutes>
        }
      />
      <Route path="/signUp" element={<SignupComponent />} />
      <Route path="/login" element={<SignIn />} />
    </Routes>
  );
}

export default App;
