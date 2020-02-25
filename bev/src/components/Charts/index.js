import React, { Component } from 'react';
import { withAuthorization } from '../Session'
import { } from 'date-fns'
import { Pie, Line } from 'react-chartjs-2';
import { accPastSevenDaysCrimes, accPastThirtyDaysCrimes, accPastDayCrimes, countPerMonth, countPerDay, countPerHour, pieChartObjects } from './objectFunctions'
import { lastTwentyfour, lastSeven, lastThirty, pieChartObjectsSeven, pieChartObjectsThirty, pieChartObjectsTwentyFour } from './objectFunctions' // visar antal olika brott / tidsperiod.
import Styled from 'styled-components';
import DateCard from './DateCard'

const colorSet = ['#b7eb8f', '#871400', '#fadb14', '#5c0011']
const Container = Styled.div`
display: flex;
justify-content: space-around;
flex-direction: row;
`

const ChartCard = Styled.div`
margin-bottom:10px;
width: 400px;
height:400px;
box-shadow: 0px 3px 3px rgba(0,0,0,0.5);
border: 1px solid black;
`
/* const myData = groupByType();
Object.keys(myData).forEach(key => {
    if (myData[key] <= 2) delete myData[key];
}); */
const stateLine = (label, interval, bgColor, values) => {
    return {
        labels: label,
        datasets: [
            {
                label: 'händelser senaste' + interval,
                fill: false,
                lineTension: 0.5,
                backgroundColor: bgColor,
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 0,
                data: values
            }
        ]
    }
}
const statePie = (label, interval, colorSet, values) => {
    return {
        labels: label,
        datasets: [
            {
                label: 'händelser senaste ' + interval,
                fill: false,
                lineTension: 0.5,
                backgroundColor: colorSet,
                borderWidth: 0,
                data: values,
            }
        ]
    }
}

class Charts extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <Container>
                    <DateCard
                        data={accPastDayCrimes}
                        date={'24h'} />
                    <DateCard
                        data={accPastSevenDaysCrimes}
                        date={'7 dagarna'} />
                    <DateCard
                        data={accPastThirtyDaysCrimes}
                        date={'30 dagarna'} />
                </Container>
                <Container>
                    <ChartCard>
                        <Line
                            data={
                                stateLine([...Object.keys(countPerHour)], '24h / h', 'rgba(75, 192, 192, 1)', [...Object.values(countPerHour)])

                            }
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
                            data={
                                stateLine([...Object.keys(countPerDay)], '7dagarna / dag', 'rgba(75, 192, 192, 1)', [...Object.values(countPerDay)])
                            }
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
                    <ChartCard>
                        <Line
                            data={
                                stateLine([...Object.keys(countPerMonth)], 'månaden / dag', 'rgba(75, 192, 192, 1)', [...Object.values(countPerMonth)])

                            }
                            width={50}
                            height={50}
                            options={{
                                maintainAspectRatio: false,
                                title: {
                                    display: true,
                                    text: 'Brott senaste 30dagarna / dag',
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
                <Container>
                    <ChartCard>
                        <Pie
                            data={
                                statePie(
                                    pieChartObjectsTwentyFour.map(elem => Object.keys(elem)),
                                    '24 timmarna',
                                    colorSet,
                                    pieChartObjectsTwentyFour.map(elem => Object.values(elem))
                                )}
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
                                    display: false,
                                    position: 'top'
                                }
                            }} />
                    </ChartCard>
                    <ChartCard>
                        <Pie
                            data={
                                statePie(
                                    pieChartObjectsSeven.map(elem => Object.keys(elem)),
                                    '7 dagarna',
                                    colorSet,
                                    pieChartObjectsSeven.map(elem => Object.values(elem))
                                )}
                            width={50}
                            height={50}
                            options={{
                                maintainAspectRatio: false,
                                title: {
                                    display: true,
                                    text: 'Brott senaste 7 dagar.',
                                    fontSize: 20,
                                    responsive: true,
                                },
                                legend: {
                                    display: false,
                                    position: 'top'
                                }
                            }} />
                    </ChartCard>
                    <ChartCard>
                        <Pie
                            data={
                                statePie(
                                    pieChartObjectsThirty.map(elem => Object.keys(elem)),
                                    '30 dagarna',
                                    colorSet,
                                    pieChartObjectsThirty.map(elem => Object.values(elem))
                                )}
                            width={50}
                            height={50}
                            options={{
                                maintainAspectRatio: false,
                                title: {
                                    display: true,
                                    text: 'Brott senaste 30 dagarna.',
                                    fontSize: 20,
                                    responsive: true,
                                },
                                legend: {
                                    display: false,
                                    position: 'top'
                                }
                            }} />
                    </ChartCard>
                </Container>

            </div>
        );
    }
}

const condition = AuthUser => AuthUser != null;

export default withAuthorization(condition)(Charts);