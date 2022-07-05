import React from "react";
import { InsideNavButton } from "../components/styled/Button.styled";
import {
  ColContainer,
  RowContainer,
  RowHomeContainer,
  HomeColContainer,
  LandingColContainer
} from "../components/styled/Container.styled";
import { HomeImage } from "../components/styled/Logo.styled";
import HomeHeader from "../components/HomeHeader";

function Home() {
  return (
    <HomeColContainer h="90vh">
      <RowHomeContainer>
        <LandingColContainer w="30%">
          <HomeImage w="120%" src="./images/eye.png" />
        </LandingColContainer>
        <LandingColContainer>
          <p>The Newest Social Media</p>
          <p>Share Your Own Prespective</p>
          <p>Get Rewarded For Everything You Share</p>
        </LandingColContainer>
      </RowHomeContainer>
      <RowHomeContainer>
        <LandingColContainer w="30%">
          <p>Join Us Now!</p>
          <InsideNavButton m="48px" w="128px" radius="5px">
            Learn More
          </InsideNavButton>
        </LandingColContainer>
        <LandingColContainer w="30%">
          <HomeImage w="100%" src="./images/connected.png" />
        </LandingColContainer>
      </RowHomeContainer>
      <RowHomeContainer bg="#EDF8F7"></RowHomeContainer>
    </HomeColContainer>
  );
}

export default Home;
