import React from 'react'
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import CovidTrackerApp from './covidtracker/covidtrackerapp';
import YoutubeApp from './youtubeclone/YoutubeApp';



const MainApp = () => {
    return (  
        <BrowserRouter>
           <Switch>
                <Route exact path='/' component={CovidTrackerApp} />
                <Route path='/youtube' component={YoutubeApp} />
            </Switch>
      </BrowserRouter>
    );
}
 
export default MainApp;