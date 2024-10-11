import React,{useState} from 'react';
import styled from 'styled-components';
import { counts } from '../utils/data';
import CountsCard from '../Components/cards/CountsCard';
import WeeklyStats from '../Components/cards/WeeklyStats';
import AddWorkout from '../Components/Addworkout';
import CategoryChart from '../Components/cards/CategoryChart';
import WorkoutCard from '../Components/cards/WorkoutCard';

const Container = styled.div`
    fles:1;
    height:100%;
    display:flex;
    justify-content:center;
    padding:22px 0px;
    overflow-y:scroll;
`;
const FlexWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 22px;
  padding: 0px 16px;
  @media (max-width: 600px) {
    gap: 12px;
  }
`;
const Title = styled.div`
  padding: 0px 16px;
  font-size: 22px;
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
`;
const Wrapper = styled.div`
flex: 1;
max-width: 1400px;
display: flex;
flex-direction: column;
gap: 22px;
@media (max-width: 600px) {
  gap: 12px;
}
`;
const Section = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 16px;
  gap: 22px;
  padding: 0px 16px;
  @media (max-width: 600px) {
    gap: 12px;
  }
`;
const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-bottom: 100px;
  @media (max-width: 600px) {
    gap: 12px;
  }
`;

const Dashboard = () => {
  const [workout, setWorkout] = useState(`#Legs
    -Back Squat
    -5 setsX15 reps
    -30 kg
    -10 min`);
    const data={
        totalCaloriesBurnt:13500,
        totalWorkouts:6,
        avdCaloriesBurntPerWorkout:2250,
        totalWeeksCaloriesBurnt:{
            weeks:["17th", "18th", "19th", "20th", "21st"],
            caloriesBurnt:[13500, 12500, 0, 0, 13000]
        },
        pieChartData:[
            {
                id:0,
                value:6000,
                label:"legs"
            },
            {
                id:1,
                value:1500,
                label:"Back"
            },
            {
                id:2,
                value:3700,
                label:"Shoulder"
            },
            {
                id:3,
                value:4000,
                label:"ABS"
            },

        ]

    }
  return (
    <Container>
        <Wrapper>
            <Title>Dashboard</Title>
            <FlexWrap>
                {counts.map((item)=>(
                    <CountsCard item={item} data={data} />
                ))}
            </FlexWrap>
            <FlexWrap>
                <WeeklyStats data={data} />
                <CategoryChart />
                <AddWorkout workout={workout} setWorkout={setWorkout} />
            </FlexWrap>

            <Section>
                <Title>Today's workouts</Title>
                <CardWrapper>
                  <WorkoutCard />
                  <WorkoutCard />
                  <WorkoutCard />
                  <WorkoutCard />

                </CardWrapper>

            </Section>
        </Wrapper>
    </Container>
  )
}

export default Dashboard