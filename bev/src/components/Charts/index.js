import React, { Component } from 'react';
import { withAuthorization } from '../Session'
import { Line, Doughnut } from 'react-chartjs-2';
import { accPastSevenDaysCrimes, accPastThirtyDaysCrimes, accPastDayCrimes, countPerMonth, countPerDay, countPerHour, pieChartObjects } from './objectFunctions'
import { pieChartObjectsSeven, pieChartObjectsThirty, pieChartObjectsTwentyFour } from './objectFunctions' // visar antal olika brott / tidsperiod.
import Styled from 'styled-components';
import DateCard from './DateCard'
import TabContainer from '../Tabs/TabContainer'

const colorSet = ['#b7eb8f', '#871400', '#fadb14', '#5c0011']

const Container = Styled.div`
display:flex;
flex-direction: row;
justify-content: space-around;
`

const IntervalContainer = Styled.div`
border: 3px solid rgba(250,250,250,0.8);
display: flex;
flex-direction:column;

`

const ChartCard = Styled.div`
display:flex;
flex-direction: row;
margin-bottom:40px;
width: 400px;
height:250px;

`

const stateLine = (label, interval, bgColor, values) => {
    return {
        labels: label,
        datasets: [
            {
                label: ''/* 'händelser senaste' + interval */,
                fill: true,
                steppedLine: false,
                lineTension: 0,
                backgroundColor: bgColor,
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 0,
                data: values
            }
        ]
    }
}
const stateDoghnut = (label, interval, colorSet, values) => {
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
            <div><TabContainer />
                <Container>

                    <IntervalContainer>
                        <DateCard
                            data={accPastDayCrimes}
                            date={'24h'} />
                        <ChartCard>
                            <Line
                                data={
                                    stateLine([...Object.keys(countPerHour)], '24h / h', 'rgba(105, 192, 255,1)', [...Object.values(countPerHour)])
                                }
                                width={50}
                                height={50}
                                options={{
                                    scales: {
                                        yAxes: [{
                                            display: false,
                                            gridLines: {
                                                color: 'rgba(0,0,0,0)',
                                            },
                                        }],
                                        xAxes: [{
                                            display: false,
                                            gridLines: {
                                                color: 'rgba(0,0,0,0)',
                                            },
                                        }]
                                    },
                                    maintainAspectRatio: false,
                                    title: {
                                        display: false,
                                        text: 'Brott senaste 24h.',
                                        fontSize: 20,
                                        responsive: true,
                                    },
                                    legend: {
                                        display: false,
                                        position: 'top'
                                    }
                                }}
                            />
                        </ChartCard>
                        <ChartCard>
                            <Doughnut
                                data={
                                    stateDoghnut(
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
                                        display: false,
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
                    </IntervalContainer>
                    {/*lägg in chart och doghnut för 1 dag*/}
                    <IntervalContainer>
                        <DateCard
                            data={accPastSevenDaysCrimes}
                            date={'7 dagarna'} />
                        <ChartCard>
                            <Line
                                data={
                                    stateLine([...Object.keys(countPerDay)], '7dagarna / dag', 'rgba(75, 192, 192, 1)', [...Object.values(countPerDay)])
                                }
                                width={50}
                                height={50}
                                options={{
                                    scales: {
                                        yAxes: [{
                                            display: false,
                                            gridLines: {
                                                color: 'rgba(0,0,0,0)',
                                            },
                                        }],
                                        xAxes: [{
                                            display: false,
                                            gridLines: {
                                                color: 'rgba(0,0,0,0)',
                                            },
                                        }]
                                    },
                                    maintainAspectRatio: false,
                                    title: {
                                        display: false,
                                        text: 'Brott senaste 7dagarna.',
                                        fontSize: 20,
                                        responsive: true,
                                    },
                                    legend: {
                                        display: false,
                                        position: 'top'
                                    }
                                }}
                            />
                        </ChartCard>
                        <ChartCard>
                            <Doughnut
                                data={
                                    stateDoghnut(
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
                                        display: false,
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
                    </IntervalContainer>
                    {/*lägg in chart och doghnut för a v*/}
                    <IntervalContainer>
                        <DateCard
                            data={accPastThirtyDaysCrimes}
                            date={'30 dagarna'} />
                        {/*lägg in chart och doghnut för 30 dagar*/}
                        <ChartCard>
                            <Line
                                data={
                                    stateLine([...Object.keys(countPerMonth)], 'månaden / dag', 'rgba(75, 192, 192, 1)', [...Object.values(countPerMonth)])

                                }
                                width={50}
                                height={50}
                                options={{
                                    scales: {
                                        yAxes: [{
                                            display: false,
                                            gridLines: {
                                                color: 'rgba(0,0,0,0)',
                                            },
                                        }],
                                        xAxes: [{
                                            display: false,
                                            gridLines: {
                                                color: 'rgba(0,0,0,0)',
                                            },
                                        }]
                                    },
                                    maintainAspectRatio: false,
                                    title: {
                                        display: false,
                                        text: 'Brott senaste 30dagarna / dag',
                                        fontSize: 20,
                                        responsive: true,
                                    },
                                    legend: {
                                        display: false,
                                        position: 'top'
                                    }
                                }}
                            />
                        </ChartCard>
                        <ChartCard>
                            <Doughnut
                                data={
                                    stateDoghnut(
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
                                        display: false,
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
                    </IntervalContainer>

                </Container>
            </div>
        );
    }
}

const condition = AuthUser => AuthUser != null;

export default withAuthorization(condition)(Charts);