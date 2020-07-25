import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { CovidContextProvider } from './context/api-context'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(
<BrowserRouter>
<CovidContextProvider>
<App />
</CovidContextProvider>
</BrowserRouter>
, document.getElementById('root'))   