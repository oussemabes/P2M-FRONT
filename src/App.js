import "./App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import CreateEvent from "./components/CreateEvent";
import Navbar from "./components/Navbar";
import Event from "./components/Event";
import Footer from "./components/Footer";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import NoAccess from "./components/NoAccess";
import PlaceBid from "./components/PlaceBid";
import DisplayByCategory from "./components/DisplayByCategory";
import Shop from "./components/shop";
import About from "./components/About";
import * as io from "socket.io-client";

function App() {

  const socket = io.connect(`http://194-195-247-34.ip.linodeusercontent.com/backend/bid`);
  console.log("socket",socket)
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [userId, setUserId] = React.useState(0);
  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      console.log(token);
      const user = jwtDecode(token);
      if (user.exp < Date.now() / 1000) {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
      }

      if (!user) {
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        setUserId(user.id);
        setIsAuthenticated(!isAuthenticated);
      }
    }
  }, []);
  return (
    <>
      <Navbar isAuthenticated={isAuthenticated} />
      <Routes>
        {/* <Route path="/" element={isAuthenticated===true ? <Home /> : <NoAccess/>} /> */}
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/create"
          element={
            isAuthenticated === true ? (
              <CreateEvent userId={userId} isAuthenticated={isAuthenticated} />
            ) : (
              <NoAccess />
            )
          }
        />
        <Route path="/index" element={<Event />} />
        <Route
          path="/bid/:product_id"
          element={
            <PlaceBid isAuthenticated={isAuthenticated} socket={socket} />
          }
        />

        <Route
          path="/category/:category_id"
          element={<DisplayByCategory isAuthenticated={isAuthenticated} />}
        />
        <Route path="/contact" element={<About />} />

        <Route path="*" element={<NoAccess />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
