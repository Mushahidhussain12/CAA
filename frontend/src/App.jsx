import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './pages/Login'
import Home from './pages/Home'
import Header from './Components/Header';
import { Navigate, Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Sidebar from './Components/Sidebar'
import Form from './Components/Form'
import DisplayPostlist from './Components/DisplaypostList'
import AirlineDisplay from './Components/AirlineDisplay'
import AirlineAdd from './Components/AirlineAdd'
import BayAdd from './Components/BayAdd'
import BayDisplay from './Components/BayDisplay'
import { ChakraProvider, ScaleFade } from '@chakra-ui/react'
import ScheduleFlights from './Components/ScheduleFlights'
import Flights from './Components/flights'





function App() {

  
  const[user,setUser] = useState('');

  useEffect(() => {
    const userData = localStorage.getItem('user-Threads');
    if (userData) {
      const userObj = JSON.parse(userData);
      setUser(userObj);
    }
  }, []);



  let [sidebarstate, setsidebarstate] = useState("airport");

  return (
    <ChakraProvider>
    <Routes>


  <Route
              path="/"
              element={ !user? <Login></Login>:<Navigate to={"/Home"}></Navigate>}
            />

<Route
              path="/Home"
              element={  
              
               
              <div className="main-body">
              <Sidebar
                sidebarstate={sidebarstate}
                setsidebarstate={setsidebarstate}
              ></Sidebar>
              <div className="semi-main">
                <Header setsidebarstate={setsidebarstate} ></Header>
                 {sidebarstate === "airport" ? (
                  <DisplayPostlist></DisplayPostlist>
                ) : (
                  sidebarstate === "addAirline" ? 
                  (<AirlineAdd></AirlineAdd>) : sidebarstate === "airline"?(
                  <AirlineDisplay></AirlineDisplay>) : sidebarstate === "BayAdd"? <BayAdd></BayAdd>:
                  sidebarstate === "BayDisplay"?  <BayDisplay></BayDisplay>   :  sidebarstate === "schedule"?
                  <ScheduleFlights></ScheduleFlights>:  sidebarstate === "flights"? <Flights></Flights> :
                  <Form></Form>
                  
                )}
      
              </div>
              </div>
              }
              
            />
        
        

      
      
      </Routes>
      </ChakraProvider>


  )
}

export default App
