import React from "react";
// main.jsx
import { StrictMode } from 'react' // Keep this import
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'


import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  // Use StrictMode to wrap everything
  <StrictMode> 
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)