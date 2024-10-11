import React,{useState} from "react";
import {ThemeProvider,styled} from "styled-components";
import {lightTheme} from "./utils/Theme";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Authentication from "./pages/Authentication"
import Navbar from "./Components/Navbar";
import Workouts from "./pages/Workouts";
import Dashboard from "./pages/Dashboard";

const Container = styled.div`
width: 100%;
height:100vh;
display:flex;
flex-direction: column;
background: ${({theme}) => theme.bg};
color:${({theme})=> theme.text_primary};
overflow: hidden;
transition: all 0.2 ease`;




function App() {
  const [user,setUser]=useState(true);
  return (
    <ThemeProvider theme={lightTheme}>
      <BrowserRouter>
      {user ? (
        <Container>
          <Navbar />
          <Routes>
          <Route  path ="/" exact element ={<Dashboard />}/>
          <Route  path ="/workouts" exact element ={<Workouts />}/>
          </Routes>
        </Container>
      ):(
      <Container>
        <Authentication />
      </Container>
  )}

      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
