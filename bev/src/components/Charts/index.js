import React, { Component } from 'react';
import { withAuthorization } from '../Session'

import { Bar } from 'react-chartjs-2';
import { groupByType } from './data.js'




const myData = groupByType();
console.log("keys: " + Object.keys(myData));
console.log("values: " + Object.values(myData));
Object.keys(myData).forEach(key => {
    if (myData[key] <= 2) delete myData[key];
});
console.log(myData)


const state = {
    labels: [...Object.keys(myData)],
    datasets: [
        {
            label: 'antal brott',
            fill: false,
            lineTension: 0.5,
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: [...Object.values(myData)]
        }
    ]
}

class Charts extends Component {
    render() {
        return (
            <div>
                <Bar
                    data={state}
                    options={{
                        title: {
                            display: true,
                            text: 'Average Rainfall per month',
                            fontSize: 20,
                            responsive: true,
                        },
                        legend: {
                            display: true,
                            position: 'right'
                        }
                    }}
                />
            </div>
        );
    }
}

const condition = AuthUser => AuthUser != null;

export default withAuthorization(condition)(Charts);