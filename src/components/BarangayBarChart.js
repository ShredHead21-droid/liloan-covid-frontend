import React from 'react';
import {Bar} from 'react-chartjs-2'

const BarangayBarChart = (props) => {

    const labels = props.labels
    const data = props.data
    const barColors = props.barColors


    return (
    <div className="chart-container">
        <Bar data={{
            labels: labels,
            datasets:[
                        {
                        label:'People',
                        backgroundColor: barColors, 
                        data:data,
                        }
                    ]
        }} 
        options = {{
            legend:{display:false},
            title:{display:true}
        }} /> 
        
    </div> 
    );
}
 
export default BarangayBarChart;