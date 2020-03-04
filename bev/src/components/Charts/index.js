import React, { Component } from 'react';
import { withAuthorization } from '../Session'
import { Line, Doughnut } from 'react-chartjs-2';
import { accPastSevenDaysCrimes, accPastThirtyDaysCrimes, accPastDayCrimes, countPerMonth, countPerDay, countPerHour, } from './objectFunctions'
import { pieChartObjectsSeven, pieChartObjectsThirty, pieChartObjectsTwentyFour } from './objectFunctions' // visar antal olika brott / tidsperiod.
import { crimesTwoDaysAgo, crimesPastFourteen, crimesPastSixty, customCrimeFilter } from './objectFunctions'
import Styled from 'styled-components';
import DateCard from './DateCard'
import { stateDoghnut, doghnutOptions, stateLine, lineOptions, colorSet } from './options'
import { Icon } from 'antd'

import { withFirebase } from '../Firebase';

const Container = Styled.div`
margin-left: 14%;
display:flex;
flex-direction: row;
justify-content: space-around;
height: 100vh;
`

const IntervalContainer = Styled.div`
display: flex;
flex-direction:column;
`

const ChartCard = Styled.div`
display:flex;
flex-direction: row;
margin-bottom:40px;
width: 420px;
height:250px;
border: 3px solid rgba(230,230,230,0.2);
border-radius: 2%;
    &hover: {
        background-color: black;
    }
`
class Charts extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userObject: null
        }


    }
    render() {
        //console.log(customCrimeFilter(['Sandviken', 'Stockholm'], ['Våldsbrott', 'Stöld']))
        return (
            <div>
                <Container>
                    <IntervalContainer>
                        <DateCard
                            pastData={crimesTwoDaysAgo}
                            data={accPastDayCrimes}
                            date={'24h'} />
                        <ChartCard>
                            <Line
                                data={
                                    stateLine([...Object.keys(countPerHour)], '24h / h', 'rgba(105, 192, 255,1)', [...Object.values(countPerHour)])
                                }
                                width={50}
                                height={50}
                                options={lineOptions}
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
                                options={doghnutOptions} />
                        </ChartCard>
                    </IntervalContainer>
                    {/*lägg in chart och doghnut för 1 dag*/}
                    <IntervalContainer>
                        <DateCard
                            pastData={crimesPastFourteen}
                            data={accPastSevenDaysCrimes}
                            date={'7 dagar'} />
                        <ChartCard>
                            <Line
                                data={
                                    stateLine([...Object.keys(countPerDay)], '7dagarna / dag', 'rgba(75, 192, 192, 1)', [...Object.values(countPerDay)])
                                }
                                width={50}
                                height={50}
                                options={lineOptions}
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
                                options={doghnutOptions} />
                        </ChartCard>
                    </IntervalContainer>
                    <IntervalContainer>
                        <DateCard
                            pastData={crimesPastSixty}
                            data={accPastThirtyDaysCrimes}
                            date={'30 dagar'} />

                        <ChartCard>
                            <Line
                                data={
                                    stateLine([...Object.keys(countPerMonth)], 'månaden / dag', 'rgba(75, 192, 192, 1)', [...Object.values(countPerMonth)])

                                }
                                width={50}
                                height={50}
                                options={lineOptions}
                            />
                        </ChartCard>
                        <ChartCard>
                            <Doughnut
                                data={
                                    stateDoghnut(
                                        pieChartObjectsThirty.map(elem => Object.keys(elem)),
                                        '30 dagar',
                                        colorSet,
                                        pieChartObjectsThirty.map(elem => Object.values(elem))
                                    )}
                                width={50}
                                height={50}
                                options={doghnutOptions} />
                        </ChartCard>
                    </IntervalContainer>
                </Container>
            </div>
        );
    }
}

const condition = AuthUser => AuthUser != null;

export default withFirebase(withAuthorization(condition)(Charts));
