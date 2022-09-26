import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter, Routes, Route
} from 'react-router-dom';
import { AppProvider } from './context.';
import './index.css';
import Home from './pages/Home/Home';
import About from "./pages/About/About";
import PizzaList from "./components/PizzaList/PizzaList";
import PizzaDetails from "./components/PizzaDetails/PizzaDetails";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AppProvider>
    <BrowserRouter>
      <Routes>
        <Route path = "/" element = {<Home />}>
          <Route path = "about" element = {<About />} />
          <Route path = "pizza" element = {<PizzaList />} />
          <Route path = "/pizza/:id" element = {<PizzaDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </AppProvider>
);
