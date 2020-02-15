import React, { Component } from 'react';
import { withAuthorization } from '../Session'

import { Bar } from 'react-chartjs-2';
import { groupByType, titleTypes, responsePerCounty } from './data.js'


//***  antal brott / län i sverige.  ***/
let obj = responsePerCounty.filter(it => {
    return !(it.numEvents < 5)
})
let numOfEvents = []
obj.filter(it => {
    return numOfEvents.push(it.numEvents)
})  // skapar en array för att spara events antal.

//totala antalet brott.
let totalAmountCrimes = 0
numOfEvents.forEach(num => {
    totalAmountCrimes += num
})
console.log(totalAmountCrimes)

let area = []
obj.filter(it => {
    return area.push(it.administrative_area_level_1)
}) // skapar en array för att spara plats 
//***    ***/


const myData = groupByType();
Object.keys(myData).forEach(key => {
    if (myData[key] <= 2) delete myData[key];
});
console.log(myData)

const state1 = {
    labels: area,
    datasets: [
        {
            label: 'Totala antalet brott / LÄN i sverige',
            fill: false,
            lineTension: 0.5,
            backgroundColor: 'rgba(50,200,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: numOfEvents
        }
    ]
}
const state2 = {
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
    constructor(props) {
        super(props)

    }
    render() {
        return (
            <div>
                <Bar
                    data={state2}
                    width={50}
                    height={10}
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

                <Bar
                    data={state1}
                    width={50}
                    height={10}
                    options={{
                        title: {
                            display: true,
                            text: 'totalt: ' + totalAmountCrimes,
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