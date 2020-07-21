import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { CovidContextProvider } from './context/api-context'

ReactDOM.render(
<CovidContextProvider>
<App />
</CovidContextProvider>
, document.getElementById('root'))   