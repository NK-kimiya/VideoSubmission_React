import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Login from './components/Login';
import { CookiesProvider } from 'react-cookie';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CookiesProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/youtube" element={<App />} />
        </Routes>
      </CookiesProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
