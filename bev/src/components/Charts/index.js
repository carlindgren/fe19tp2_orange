import React, { Component } from 'react';
import { withAuthorization } from '../Session'

import { Bar } from 'react-chartjs-2';
import { pastMonthsCrimes, pastWeeksCrimes, todaysCrimes, groupByType, responsePerCounty } from './data.js'
import Styled from 'styled-components';
import DateCard from './DateCard'


const Container = Styled.div`
display: flex;
justify-content: space-around;
flex-direction: row-reverse;
`

const ChartCard = Styled.div`
margin-bottom:10px;
width: 400px;
height:400px;
box-shadow: 0px 3px 3px black;
border: 1px solid black;
`

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
            label: '',
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
        super(props);
        this.todaysCrimes = todaysCrimes();
        this.pastWeeksCrimes = pastWeeksCrimes();
        this.pastMonthsCrimes = pastMonthsCrimes()
    }

    render() {
        return (
            <div>
                <Container>
                    <DateCard
                        data={this.todaysCrimes}
                        date={'dagen'} />
                    <DateCard
                        data={this.pastWeeksCrimes}
                        date={'veckan'} />
                    <DateCard
                        data={this.pastMonthsCrimes}
                        date={'månaden'} />
                </Container>
                <Container>
                    <ChartCard>
                        <Bar
                            data={state2}
                            width={50}
                            height={50}
                            options={{
                                maintainAspectRatio: false,
                                title: {
                                    display: true,
                                    text: 'Brott',
                                    fontSize: 20,
                                    responsive: true,
                                },
                                legend: {
                                    display: true,
                                    position: 'right'
                                }
                            }}
                        />
                    </ChartCard>
                    <ChartCard>
                        <Bar
                            data={state1}
                            width={50}
                            height={50}
                            options={{
                                maintainAspectRatio: false,
                                title: {
                                    display: true,
                                    text: 'antalet brott/län i sverige sedan 2016-10-14, totalt: ' + totalAmountCrimes,
                                    fontSize: 20,
                                    responsive: true,
                                },
                                legend: {
                                    display: true,
                                    position: 'right'
                                }
                            }}
                        />
                    </ChartCard>
                </Container>
            </div>
        );
    }
}

const condition = AuthUser => AuthUser != null;

export default withAuthorization(condition)(Charts);