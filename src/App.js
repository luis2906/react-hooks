// React
import React from 'react';
import {
  BrowserRouter as Router, Route, Switch
} from 'react-router-dom';
// ---------- Style
import { ToastProvider, useToasts } from 'react-toast-notifications'
import 'bootstrap/dist/css/bootstrap.css';
import './App.scss';
// ---------- Views
import Pedidos from './views/Pedidos';
import Home from './views/Home';
import Template from './template';

const App = () => (
    <Router>
      <Switch>
      <ToastProvider
      placement='top-center'
      >
        <Route exact path="/" render={(props) => <Template><Home {...props}/></Template>} />  
        <Route exact path="/home" render={(props) => <Template><Home {...props}/></Template>} />
        <Route exact path="/pedidos" render={(props) => <Template><Pedidos {...props}/></Template>} />
        </ToastProvider>
      </Switch>
    </Router>
);

export default App;
