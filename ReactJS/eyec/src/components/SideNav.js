import React from "react";
import {
  InsideNavButton,
  ProfileButton,
  TextButton,
} from "./styled/Button.styled";
import {
  SideRowContainer,
  SideColContainer,
  SideSectionContainer,
  MainColContainer,
  RowContainer,
  SideMainRowContainer
} from "./styled/Container.styled";
import { StyledSideNav } from "./styled/SideNav.styled";
import { Face } from "@material-ui/icons";
import Feed from "../Pages/Feed";
import UserProfile from "../Pages/UserProfile";
import { useState, useEffect } from "react";
import Tags from "../Pages/Tags";
import Map from "../Pages/Map";
import {useSelector } from "react-redux";

function SideNav() {
  const [active, setActive] = useState("");

  const [loading, setLoading] = useState(true);

  const component = (active) => {
    switch (active) {
      case "Home":
        return <Feed />;
        break;
      case "MyProfile":
        return <UserProfile />;
        break;
      case "Tags":
        return <Tags />;
        break;
      case "Map":
        return <Map />;
        break;
      default:
        return <Feed />;
        break;
    }
  };

  const user = useSelector((state) => state.user);
  useEffect(() => {
  });

  return (
    <SideMainRowContainer>
      <StyledSideNav>
        <SideColContainer>
          <SideSectionContainer>
            <SideRowContainer>
              <ProfileButton
                w="50px"
                radius="50%"
                onClick={() => {
                  setActive("MyProfile");
                }}
              >
                <Face fontSize="medium" />
              </ProfileButton>
              {/* <h4>Genc Abazi</h4> */}
              <TextButton
                w="100px"
                radius="10px"
                onClick={() => {
                  setActive("MyProfile");
                }}
              >
                {(() => {
                  if (user != null || user != undefined) {
                    return <>{user.name}</>;
                  } else {
                    return <>loading</>;
                  }
                })()}
              </TextButton>
            </SideRowContainer>
            <hr />
          </SideSectionContainer>
          <SideSectionContainer>
            <InsideNavButton
              w="80%"
              radius="10px"
              onClick={() => {
                setActive("Home");
              }}
            >
              Home
            </InsideNavButton>
            <InsideNavButton
              w="80%"
              radius="10px"
              onClick={() => {
                setActive("Map");
              }}
            >
              Map View
            </InsideNavButton>

            <InsideNavButton
              w="80%"
              radius="10px"
              onClick={() => {
                setActive("Tags");
              }}
            >
              Tags
            </InsideNavButton>
            <hr />
          </SideSectionContainer>
        </SideColContainer>
      </StyledSideNav>
      <MainColContainer w="73%">{component(active)}</MainColContainer>
    </SideMainRowContainer>
  );
}

export default SideNav;
