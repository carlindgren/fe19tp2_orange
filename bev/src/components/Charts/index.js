import React, { Component } from 'react';
import { withAuthorization } from '../Session'

import { Bar, Line } from 'react-chartjs-2';
import { accPastSevenDaysCrimes, accPastThirtyDaysCrimes, accPastDayCrimes, countPerDay, countPerHour, groupByType, responsePerCounty } from './objectFunctions'
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
box-shadow: 0px 3px 3px rgba(0,0,0,0.5);
border: 1px solid black;
`

//***  antal brott / län i sverige.  ***/
let obj = responsePerCounty.filter(it => {
    return !(it.numEvents < 5)
})
const transferedArray = data =>
    data.reduce((acc, item) => {
        acc[item.administrative_area_level_1] = item.numEvents
        return acc;
    }, {});
let transferedObj = transferedArray(obj)

//räknar alla values och returnerar totalen.
let totalAmountCrimes = Object.values(transferedObj).reduce((acc, cur) => {
    return acc + cur
}, 0)

const myData = groupByType();
Object.keys(myData).forEach(key => {
    if (myData[key] <= 2) delete myData[key];
});

const state1 = {
    labels: Object.keys(transferedObj),
    datasets: [
        {
            label: '',
            fill: false,
            lineTension: 0.5,
            backgroundColor: 'rgba(50,200,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: Object.values(transferedObj)
        }
    ]
}
const stateHour = {
    labels: [...Object.keys(countPerHour)],
    datasets: [
        {
            label: 'Händelser senaste 24h /h',
            fill: false,
            lineTension: 0.5,
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: [...Object.values(countPerHour)]
        }
    ]
}
const stateDay = {
    labels: [...Object.keys(countPerDay)],
    datasets: [
        {
            label: 'Händelser senaste 7 dagarna / dag',
            fill: false,
            lineTension: 0.5,
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: [...Object.values(countPerDay)]
        }
    ]
}

class Charts extends Component {
    constructor(props) {
        super(props);
        //this.todaysCrimes = todaysCrimes();
        //this.pastWeeksCrimes = pastWeeksCrimes();
        //this.pastMonthsCrimes = pastMonthsCrimes()
    }
    render() {
        return (
            <div>
                <Container>
                    <DateCard
                        data={accPastDayCrimes}
                        date={'dagen'} />
                    <DateCard
                        data={accPastSevenDaysCrimes}
                        date={'veckan'} />
                    <DateCard
                        data={accPastThirtyDaysCrimes}
                        date={'månaden'} />
                </Container>
                <Container>
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
                                    position: 'top'
                                }
                            }}
                        />
                    </ChartCard>
                    <ChartCard>
                        <Line
                            data={stateHour}
                            width={50}
                            height={50}
                            options={{
                                maintainAspectRatio: false,
                                title: {
                                    display: true,
                                    text: 'Brott senaste 24h.',
                                    fontSize: 20,
                                    responsive: true,
                                },
                                legend: {
                                    display: true,
                                    position: 'top'
                                }
                            }}
                        />
                    </ChartCard>
                    <ChartCard>
                        <Line
                            data={stateDay}
                            width={50}
                            height={50}
                            options={{
                                maintainAspectRatio: false,
                                title: {
                                    display: true,
                                    text: 'Brott senaste 7dagarna.',
                                    fontSize: 20,
                                    responsive: true,
                                },
                                legend: {
                                    display: true,
                                    position: 'top'
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