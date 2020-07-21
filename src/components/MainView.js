import React, { useContext } from 'react';
import { Chart2, Chart, Cards } from './components';
import BarangayBarChart from './BarangayBarChart';
import { CovidContext } from '../context/api-context';



const MainView = (props) => {    

    const {theme, currentCountry, barangayData} = useContext(CovidContext);
    const currentTheme = theme.isLightTheme ? theme.lightTheme : theme.darkTheme;

    return ( 
    <div>
        <Cards /> 
        {/* <CountryPicker/> */}

        <h3>Total Cases</h3>
        <Chart/>

        <br/>
        <h3>Daily Cases</h3>
        <Chart2/>
    
</div> );
}
 
export default MainView; 