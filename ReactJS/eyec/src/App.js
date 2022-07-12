import Header from "./components/Header";
import { ThemeProvider } from "styled-components";
import SideNav from "./components/SideNav";
import GlobalStyles from "./components/styled/Global";
import Home from "./Pages/Home";
import HomeHeader from "./components/HomeHeader";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import {Routes, Route,Navigate } from "react-router-dom";
import {useSelector } from "react-redux";
import Access from "./Pages/Access";
import Chat from "./Pages/Chat";

const theme = {
  colors: {
    header: "#ebfbff",
    body: "#fff",
    footer: "#003333",
    darkCont: "#3B6EAD",
    dark: "#437FC7",
    light: "#FFFFFF",
    darker: "#17252A",
    primart: "#3AAFA9",
    fatal: "#FFDF14",
    lightBackground:"#EDF6FF",
  },
};
/*
 font-family: 'Abril Fatface', cursive;
  font-family: 'BioRhyme', serif;
*/
function App() {

  var loggedIn = useSelector((state)=>state.isLoggedIn)
 
  const ProtectedRoute = ({ isLogged, children }) => {
    if (!isLogged) {
      return <Navigate to="/" replace />;
    }
    return children;
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <div style={{ backgroundColor: theme.colors.lightBackground, padding: "0px" }}>
        <Routes>
          <Route path="/chat" element={<Chat />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route
            path="/"
            element={
              <>
                <HomeHeader />
                <Home />
              </>
            }
          ></Route>
          
          <Route
            path="/main"
            element={
              <ProtectedRoute isLogged={loggedIn}>  
               <Access/>
              </ProtectedRoute>
            }
          ></Route>
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
