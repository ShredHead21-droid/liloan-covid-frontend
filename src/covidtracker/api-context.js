import axios from 'axios'
import React, {createContext, useState, useEffect} from 'react'

const url = 'https://covid19.mathdro.id/api';

const CovidContext = createContext();

const CovidContextProvider = (props) => {
    /** COVID DATA FROM API */
    // used by Cards
    const [covidData, setStats] = useState({})      // covidData.confirmed.value, etc, covidData.lastUpdate
    // used by Chart
    const [dailyData, setDailyData] = useState([]) //dailyData[x].confirmed.total, dailyData[x].deaths.total
    // used by CountryPicker
    const [countries, setCountries] = useState([])  // countries: [{name, iso2, iso3}]  ex. countries[x].name, countries[x].iso2, countries[x].iso3
    // Fetching General Data 
    useEffect( () => {
      /*  axios
       .get(url)     
        // deconstruct the data from response, then deconstruct attrributes from data
        // this is a modified data, since we only need these attributes from the original data
       .then( ({data : { confirmed, recovered, deaths, lastUpdate}}) => {    
                setStats({confirmed, recovered, deaths, lastUpdate});       
            }) */


        // fetch daily data 
       /*  axios
        .get(`${url}/daily`)
        .then( res => {
            setDailyData(res.data)
        }) */
        axios
        .get(`https://cors-anywhere.herokuapp.com/https://liloan-covid-api.herokuapp.com/api/covid/daily`)
        .then( res => {
            const data = res.data
            const total = data[data.length-1]
            setDailyData(data)
            setStats({
                confirmed: total.totalConfirmed,
                recovered: total.totalRecovered,
                deaths: total.totalDeath,
                lastUpdate: total.reportDate
            }

            )
            //console.log(res.data)
        })

        // fetch countries 
        axios
        .get(`${url}/countries`)
        .then(res => {
            setCountries(res.data.countries)
        })
       
    },[])
    // fetchCountry used by CountryPicker
    const [currentCountry, setCountry] = useState(null) // country: {confirmed:{value, detail}, recovered:{value, detail}, deaths, lastUpdate}
    const fetchCountry = (country) => { 
        setCountry(country)
        if (country!==null){
            setStats({confirmed:{value:country.confirmed.value}, 
                    recovered:{value:country.recovered.value}, 
                    deaths:{value:country.deaths.value}, 
                    lastUpdate:country.lastUpdate})
        }
    }
    // used by searchbar, MainContainer
    const [theme, setTheme] = useState({
        darkTheme:{appbarColor:'#262526', containerColor:'#2c2d2e', cardColor:'#4a4b4d'},
        lightTheme:{appbarColor:'#ad0317', containerColor:'rgb(231, 230, 230)', cardColor:'#ffffff'},
        isLightTheme:true
    })
    const toggleTheme =()=>{
        setTheme({...theme, isLightTheme:!theme.isLightTheme})
        //console.log(!theme.isLightTheme)
    }


    if(countries.length){
        //console.log(countries)
    }
    return(
        <CovidContext.Provider value={{covidData,
                                       setStats,
                                       dailyData, 
                                       theme, 
                                       toggleTheme, 
                                       countries,
                                       currentCountry,
                                       fetchCountry,
                                       setDailyData,
                                       setCountry}}>
            {props.children}
        </CovidContext.Provider>
    )
}

export {CovidContext , CovidContextProvider};
