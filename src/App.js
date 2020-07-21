import React, { useContext } from 'react'
import './app.css'
import {Cards, Chart, Chart2, BarangayBarChart} from './components/components'
import {CovidContext} from './context/api-context'
import MainView from './components/MainView'
import { Route, BrowserRouter } from 'react-router-dom'



const App = () => {

    const {theme, currentCountry, barangayData} = useContext(CovidContext);
    const currentTheme = theme.isLightTheme ? theme.lightTheme : theme.darkTheme;

    /*  const openMenu = (e) => {
        document.querySelector('.sidebar').classList.add("open")
    } */
    const closeMenu = (e) => {
        document.querySelector('.sidebar').classList.remove("open")
    }

    return(
        <div className = 'App'>
        
        <div>
            {/* Navbar or Header */}
           <header className='header'>
                <div className="brand">
                    <button>
                        &#9776;
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
                    <BrowserRouter>
                        <Route exact path = '/' component={MainView} />
                    </BrowserRouter>
                    <br/>
                    <h3>Barangay Confirmed Cases</h3>
                    <BarangayBarChart 
                        barangayNames = {barangayData.map(item => item.name)} 
                        barangayCounts = {barangayData.map(item => item.totalConfirmed)}
                        barColor = {'rgba(194, 243, 61, 0.7)'}
                        />

                    <br/>
                    <h3>Barangay Recovery Cases</h3>
                    <BarangayBarChart 
                        barangayNames = {barangayData.map(item => item.name)} 
                        barangayCounts = {barangayData.map(item => item.totalRecovered)}
                        barColor = {'rgba(12, 184, 112, 0.9)'}
                        />
                    
                    <br/>
                    <h3>Barangay Death Cases</h3>
                    <BarangayBarChart 
                        barangayNames = {barangayData.map(item => item.name)} 
                        barangayCounts = {barangayData.map(item => item.totalDeath)}
                        barColor = {'rgba(247, 6, 6, 0.6)'}
                        />
                    <h5>Van Darrell Ponce. July 2020. </h5>
                    
                </div>

                <div className='flex-item-three' >

                </div>
            </div>
        </div> 

        
        </div>
    )
}

export default App;