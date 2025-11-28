/*
  Copyright (c) 2025 Diksha Pal
  All rights reserved.

  Unauthorized copying, modification, or redistribution is prohibited.
*/

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
