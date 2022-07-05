import React, { useState } from "react";
import { ProfileButton, Tab } from "../components/styled/Button.styled";
import {
  ColContainer,
  RowContainer,
  ProfileColContainer,
  NavigatorContainer,
  BackgroundImageContainer,
} from "../components/styled/Container.styled";
import { Navigator } from "../components/styled/Header.styled";
import MyFeed from "../components/MyFeed";
import MyFavorites from "../components/MyFavorites";
import MyLikes from "../components/MyActivity";
import MyWallet from "../components/MyWallet";
import { useSelector } from "react-redux";

const types = ["My Feed", "My Activity", "My Favorites", "My Wallet"];



function UserProfile() {
  const theUser = useSelector(state=>state.user)
  const [active, setActive] = useState(types[0]);
  const component = (active) => {
    switch (active) {
      case "My Feed":
        return <MyFeed />;
        break;
      case "My Activity":
        return <MyLikes />;
        break;
      case "My Favorites":
        return <MyFavorites />;
        break;
      case "My Wallet":
        return <MyWallet />;
        break;
    }

  };
    
  

  return (
    <ColContainer w="70%">
      <RowContainer w="100%">
        <BackgroundImageContainer>
         <img height="100%" width="100%" src="images/back.jpg"></img>
        </BackgroundImageContainer>
      </RowContainer>
      <RowContainer w="100%">
        <ProfileButton w="100px" radius="50%">
          Pic
        </ProfileButton>
      </RowContainer>
      <RowContainer>
        <ProfileColContainer>
        {(() => {
                  if (theUser != null || theUser != undefined) {
                    return <> <h5>{theUser.name}</h5>
                    <h6>{theUser.username}</h6></>;
                  } else {
                    return <> <h5>loading</h5>
                    <h6>@loading</h6></>;
                  }
                })()}
         
          <hr></hr>
        </ProfileColContainer>
      </RowContainer>
      <RowContainer w="100%">
        <Navigator>
          {types.map((type) => (
            <Tab
              key={type}
              active={active === type}
              onClick={() => {
                setActive(type);
              }}
            >
              {type}
            </Tab>
          ))}
        </Navigator>
      </RowContainer>
      <NavigatorContainer>{component(active)}</NavigatorContainer>
    </ColContainer>
  );
}

export default UserProfile;
