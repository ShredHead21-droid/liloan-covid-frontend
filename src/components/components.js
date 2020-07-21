import React, { useContext } from 'react'
import { CovidContext } from '../context/api-context';
/** For Card Component */
import {Card, CardContent, Typography, Grid, FormControl, NativeSelect} from '@material-ui/core'
import CountUp from 'react-countup'
/** For Chart Component */
import {Line, Bar} from 'react-chartjs-2'
import axios from 'axios';
import BarangayBarChart from './BarangayBarChart';
import { Route } from 'react-router-dom';


const Cards = () => {
    const {totalData, theme, dailyData} = useContext(CovidContext);

    const currentTheme = theme.isLightTheme ? theme.lightTheme : theme.darkTheme
    
    if (!totalData.confirmed) {
        return 'Fetching Data...'
    }

    const date = new Date(totalData.lastUpdate).toDateString()

    //console.log(totalData)
  
    
    return ( 
        <div className= 'cards-container'>
            <Grid container spacing = {3} justify='flex-start'>
                <Grid item component = {Card} className = 'card infected' xs={12} md={3} style={{background: currentTheme.cardColor}}>
                    <CardContent>
                        <Typography color = 'textSecondary' gutterBottom> Infected </Typography>
                        <Typography variant ='h4'> 
                            <CountUp start={0} 
                                    end={totalData.confirmed} 
                                    duration={3} 
                                    separator=','
                            />
                        </Typography>
                        <Typography color = 'textSecondary' > <b>{dailyData[dailyData.length - 1].newConfirmed}</b> New Case/s as of {date} </Typography>
                        
                    </CardContent>
                </Grid>
                <Grid item component = {Card} className = 'card recovered' xs={12} md={3} style={{background: currentTheme.cardColor}}>
                    <CardContent>
                        <Typography color = 'textSecondary' gutterBottom> Recovered </Typography>
                        <Typography variant ='h4'> 
                        <CountUp start={0} 
                                    end={totalData.recovered} 
                                    duration={3} 
                                    separator=','
                            />
                        </Typography>
                        <Typography color = 'textSecondary'> <b>{dailyData[dailyData.length - 1].newRecovered}</b> New Case/s as of {date} </Typography>
                    </CardContent>
                </Grid>
                <Grid item component={Card} className = 'card deaths' xs={12} md={3} style={{background: currentTheme.cardColor}}>
                    <CardContent>
                        <Typography color = 'textSecondary' gutterBottom> Deaths </Typography>
                        <Typography variant = 'h4'>  
                            <CountUp start={0} 
                                    end={totalData.deaths} 
                                    duration={3} 
                                    separator=','
                            />
                        </Typography>
                        <Typography color = 'textSecondary'> <b>{dailyData[dailyData.length - 1].newDeath}</b> New Case/s as of {date} </Typography>
                    </CardContent>
                </Grid>
            </Grid>
        </div>
     );
}

const Chart = () => {

    const {dailyData, currentCountry} = useContext(CovidContext);

   /*  const lineChart = (

        dailyData.length ?
       
        (<Line data = {
                {
                labels: dailyData.map( ({reportDate} ) => reportDate),
                datasets:[{
                    data: dailyData.map(({confirmed}) => confirmed.total), // should be an array of values
                    label:'Infected',
                    borderColor:'rgb(194, 243, 61, 0.7)',
                    fill: true
                    }, {
                    data: dailyData.map(({deaths}) => deaths.total),
                    label:'Deaths',
                    borderColor:'red',
                    backgroundColor:'rgb(255, 0, ,0, 0.7)',
                    fill: true
                }]
                } 
            }
        />)  : null
    ) */
    const lineChart = (

        dailyData.length ?
       
        ( 
            <Line data = {
                    {
                    labels: dailyData.map( data => data.reportDate),
                    datasets:[{
                        data: dailyData.map( data => data.totalConfirmed), // should be an array of values
                        label:'Infected',
                        borderColor:'rgb(194, 243, 61, 0.7)',
                        fill: true
                        }, {
                        data: dailyData.map( data => data.totalDeath),
                        label:'Deaths',
                        borderColor:'red',
                        backgroundColor:'rgb(191, 73, 85, 0.5)',
                        fill: true
                        },{
                        data: dailyData.map( data => data.totalRecovered),
                        label:'Recovery',
                        borderColor:'#0a9135',
                        backgroundColor:'rgb(36, 143, 87, 0.5)',
                        fill: true
                    }]
                    } 
                }
            />
    
        )  : null
    )
    
    const barChart = currentCountry ? ( 
        <Bar data={{
            labels:['Infected', 'Recovered', 'Death'],
            datasets:[
                        {
                        label:'People',
                        backgroundColor: [
                            'rgba(194, 243, 61, 0.7)',
                            'rgba(12, 184, 112, 0.9)',
                            'rgba(247, 6, 6, 0.6)'
                            ], 
                        data:[currentCountry.confirmed.value, currentCountry.recovered.value, currentCountry.deaths.value]
                        }
                    ]
        }} 
        options = {{
            legend:{display:false},
            title:{display:false}
        }} />
    ): null

    //console.log(dailyData)
    //console.log(lineChart);
    return (
        <div className='chart-container'> 
            {currentCountry? barChart:lineChart}
        </div>
    );
}

const Chart2 = () => {

    const {dailyData} = useContext(CovidContext);

    //console.log(lineChart);
    return ( dailyData.length ? 
        <div className='chart-container2'> 
           <Line data = {
                    {
                    labels: dailyData.map( data => data.reportDate),
                    datasets:[{
                        data: dailyData.map( data => data.newConfirmed), // should be an array of values
                        label:'Infected',
                        borderColor:'rgb(194, 243, 61, 0.7)',
                        fill: true
                        }, {
                        data: dailyData.map( data => data.newDeath),
                        label:'Deaths',
                        borderColor:'red',
                        backgroundColor:'rgb(191, 73, 85, 0.5)',
                        fill: true
                        },{
                        data: dailyData.map( data => data.newRecovered),
                        label:'Recovery',
                        borderColor:'#0a9135',
                        backgroundColor:'rgb(36, 143, 87, 0.5)',
                        fill: true
                    }]
                    } 
                }
            />
        </div> : <div>Loading...</div>
    );
}

const CountryPicker = (props) => {

    const {countries, fetchCountry, setStats, setDailyData, setCountry} = useContext(CovidContext);
    const countryList = countries.length ? countries.map((country, i) => {
        return (
            <option value={country.iso2} key={i}>{country.name}</option>
        )
    }) : 'Loading options'

    const handleChange = (e) => {
    
        if (e.target.value === 'Municipality Data'){
            axios
            .get(`/api/covid/daily`)
            .then( res => {
                const data = res.data
                const total = data[data.length-1]
                setDailyData(data)
                setStats({
                    confirmed: total.totalConfirmed,
                    recovered: total.totalRecovered,
                    deaths: total.totalDeath,
                    lastUpdate: total.reportDate
                })
                //console.log(res.data)
                setCountry(null)
            })
        } else {
            //fetch data from selected country value (ex. iso2)
            axios
            .get(`https://covid19.mathdro.id/api/countries/${e.target.value}`)
            .then(res => {
                fetchCountry(res.data)
            })
        }

    }

    return (
        <div> 
            <FormControl className='form-control'>
                <NativeSelect onChange={handleChange}>
                    <option>Municipality Data</option>
                    {countryList}
                </NativeSelect>
            </FormControl>
        </div>
    );
}


export {Cards,
        Chart,
        CountryPicker,
        Chart2,
        BarangayBarChart
}