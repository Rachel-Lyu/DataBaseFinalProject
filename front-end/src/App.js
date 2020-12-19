import logo from './logo.svg';
import './App.css';
import LoginPage from "./page/LoginPage";
import {BrowserRouter, HashRouter, Redirect, Route, Switch} from 'react-router-dom';
import RegisterPage from "./page/RegisterPage";
import React from "react";
import TicketInfoPage from "./page/TicketInfoPage";
import TicketDetailPage from "./page/TicketDetailPage";
import MyOrderPage from "./page/MyOrderPage";

function App() {
  return (
      <BrowserRouter>
        <Route path={'/login'} component={LoginPage}/>
        <Route path={'/register'} component={RegisterPage}/>
        <Route path={'/tickets'} component={TicketInfoPage}/>
        <Redirect path={'/'} to={localStorage.getItem("log")==null?'/login':'/tickets'}/>
        <Route path={"/ticketDetail/:ticketId"} component={TicketDetailPage}/>
        <Route path={"/myOrders"} component={MyOrderPage}/>
      </BrowserRouter>
  );
}

export default App;
