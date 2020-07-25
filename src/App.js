import React, { useContext, useState } from 'react'
import './app.css'
import {Cards, Chart, Chart2, BarangayBarChart} from './components/components'
import {CovidContext} from './context/api-context'
import { getGeocodeURL } from './util/utils'
import Axios from 'axios'
import { BrowserRouter, Route, withRouter, Link } from 'react-router-dom'


const App = (props) => {

    const {theme, barangaysData, barangayData} = useContext(CovidContext);
    const currentTheme = theme.isLightTheme ? theme.lightTheme : theme.darkTheme;
    const [currentLocation, setCurrentLocation] = useState(null)

    /*  const openMenu = (e) => {
        document.querySelector('.sidebar').classList.add("open")
    } */
    const closeMenu = (e) => {
        document.querySelector('.sidebar').classList.remove("open")
    }
    const getLocation = (e) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                //console.log(latitude, longitude)
                
                Axios.get(getGeocodeURL(latitude, longitude)).then(res => {
                    const contexts = res.data.features[0].context
                    if(!contexts) return setCurrentLocation(res.data.features[0])
                    if(contexts.length === 4){
                        return setCurrentLocation(
                            {...res.data.features[0], 
                            barangay:contexts[0].text,
                            municipality:contexts[1].text,
                            province:contexts[2].text}
                        )
                    }
                    if(contexts.length === 5){
                        return setCurrentLocation(
                            {...res.data.features[0], 
                            barangay:contexts[1].text,
                            municipality:contexts[2].text,
                            province:contexts[3].text}
                        )
                    }
                    if(contexts.length === 6){
                        return setCurrentLocation(
                            {...res.data.features[0], 
                            barangay:contexts[2].text,
                            municipality:contexts[3].text,
                            province:contexts[4].text}
                        )
                    } 
                })
                
            },
            (error) => {alert('Please enable your GPS position feature.');},
            {maximumAge:10000, timeout:5000, enableHighAccuracy: true});
            // end of getCurrentPosition

        } else {
            alert("Geolocation API is not supported in your browser.");
        } 
        console.log('location')
    }
    const locationDetails = barangayData && currentLocation && currentLocation.barangay ? 
                        (<div>
                            <h1>{`You are currently located in Barangay ${currentLocation.barangay}, ${currentLocation.municipality}, ${currentLocation.province}`}</h1>
                            <h4><Link to='/'>Click here </Link>to display covid data around you.<Link to = '/' onClick = {e=> setCurrentLocation(null)}>Back</Link></h4>
                            <h4>Wrong location? Try again <Link to = '/' onClick = {getLocation}>here</Link></h4>
                        </div>) :
                        !barangayData && currentLocation && currentLocation.barangay ? 
                        (<div>
                            <h1>{`You are currently located in Barangay ${currentLocation.barangay}, ${currentLocation.municipality}, ${currentLocation.province}`}</h1>
                            <h4>Unfortunately, we don't have covid data available around you. <Link to = '/' onClick = {e=> setCurrentLocation(null)}>Back</Link></h4>
                            <h4>Wrong location? Try again <Link to = '/' onClick = {getLocation}>here</Link></h4>
                        </div>) :
                        currentLocation && !currentLocation.barangay ?
                        (<div>
                            <h1>{`You are currently located in ${currentLocation.place_name}`}</h1>
                            <h4>Unfortunately, we don't have covid data available around you. <Link to = '/' onClick = {e=> setCurrentLocation(null)}>Back</Link></h4>
                            <h4>Wrong location? Try again <Link to = '/' onClick = {getLocation}>here</Link></h4>
                        </div>) : null
    
    return(
        <BrowserRouter>
        <div className = 'App'>
        
        <div>
            {/* Navbar or Header */}
           <header className='header'>
                <div className="brand">
                    <button onClick = {getLocation}>
                        {/* <Link to = {`/barangay/${currentLocation.barangay}`}> */}&#9776;
                    </button>
                    <a href= '/'>COVID-19 CURVE </a>
                </div>
                <div className="header-links">
                    
                    <a href="/">Liloan, Cebu</a>
                    {/* {
                        userInfo? 
                        <Link to = '/profile'>{userInfo.name}</Link>:
                        <Link to="/signin">Signin</Link>
                    } */}
                      
                </div>
            </header>

            <div className = 'flex-container-main' >
                <div className = 'flex-item-one' >
        
                </div>

                <div className='flex-item-two' style={{background: currentTheme.containerColor}}>
                {/* <div className='flex-item-two'> */}

                    {/* Sidebar */}
                    <aside className="sidebar">
                        <h3>   Other Data</h3>
                        <button className="sidebar-close-button" onClick={closeMenu}>x</button>
                        <ul>
                            <li>
                                <a href="index.html">Show Table Data</a>
                            </li>
                            <li>
                                <a href="index.html">Show Other Data</a>
                            </li>
                        </ul>
                    </aside>
                    {currentLocation && locationDetails}
                    <Route exact path = '/barangay/:barangay' component = {Cards} />
                    <Route exact path = '/around' component = {Chart} />
                    <Cards/>
                    {/* <CountryPicker/> */}

                    <h3>Total Cases</h3>
                    <Chart/>

                    <br/>
                    <h3>Daily Cases</h3>
                    <Chart2/>
                    <br/>
                    <h3>Barangay Confirmed Cases</h3>
                    <BarangayBarChart 
                        labels = {barangaysData.map(item => item.name)} 
                        data = {barangaysData.map(item => item.totalConfirmed)}
                        barColors = {'rgba(194, 243, 61, 0.7)'}
                        />

                    <br/>
                    <h3>Barangay Recovery Cases</h3>
                    <BarangayBarChart 
                        labels = {barangaysData.map(item => item.name)} 
                        data = {barangaysData.map(item => item.totalRecovered)}
                        barColors = {'rgba(12, 184, 112, 0.9)'}
                        />
                    
                    <br/>
                    <h3>Barangay Death Cases</h3>
                    <BarangayBarChart 
                        labels = {barangaysData.map(item => item.name)} 
                        data = {barangaysData.map(item => item.totalDeath)}
                        barColors = {'rgba(247, 6, 6, 0.6)'}
                        />
                    <p>Van Darrell Ponce. July 2020. </p>
                    {/* <p>{currentLocation.place_name} </p>
                    <p>{`${currentLocation.barangay}, ${currentLocation.municipality}, ${currentLocation.province} `}</p> */}

                    
                </div>

                <div className='flex-item-three' >

                </div>
            </div>
        </div> 

        
        </div>
        </BrowserRouter>
    )
}

export default withRouter(App);