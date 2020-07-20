import React from 'react'
import './app.css'
import { MainContainer} from './components'
import { CovidContextProvider} from './api-context'


const CovidTrackerApp = () => {

    return(
        <div className = 'App'>
         
            <CovidContextProvider>
              <MainContainer />
            </CovidContextProvider>
         
        </div>
    )
}

export default CovidTrackerApp;