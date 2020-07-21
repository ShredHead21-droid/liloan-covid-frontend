import React from 'react';
import {Bar} from 'react-chartjs-2'

const BarangayBarChart = (props) => {

    const barangayNames = props.barangayNames
    const barangayCounts = props.barangayCounts
    const barColor = props.barColor

    return (
    <div className="chart-container">
        <Bar data={{
            labels:barangayNames,
            datasets:[
                        {
                        label:'People',
                        backgroundColor: barColor, 
                        data:barangayCounts
                        }
                    ]
        }} 
        options = {{
            legend:{display:false},
            title:{display:false}
        }} /> 
        
    </div> 
    );
}
 
export default BarangayBarChart;