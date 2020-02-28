import React from "react";
import styled from "styled-components";
import SignUpButton from "./SignUpButton";

const Landing = () => (
  <LandingPage>
    <Container>
      <Title>Brottskollen</Title>
      <InfoText>
        Få exakta platsdata och färsk information om brott som sker i ditt
        område.
      </InfoText>
      <SignUpButton />
    </Container>
  </LandingPage>
);

const LandingPage = styled.div`
  background: url("https://images.unsplash.com/photo-1560575193-c2c9e886aefe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  overflow:hidden;
  opacity: 0.7;
`;

const Title = styled.h1`
  color: white;
  margin-top: 40%;
  margin-bottom: 0;
  font-family: "Montserrat Subrayada", sans-serif;
`;

const InfoText = styled.p`
  margin-top: 0px;
  font-size: 25px;
  font-weight: bold;
`;

const Container = styled.div`
  text-align: center;
  color: white;
  font-size: 30px;
  text-shadow: 2px 2px black;
  width: 60%;
  margin: auto;
`;

export default Landing;
