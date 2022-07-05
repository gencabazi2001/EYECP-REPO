import React, { useEffect } from "react";
import {
  CardContainer,
  CardRowLeftContainer,
  CardVideoContainer,
  CardRowContainer,
  CardRowRightContainer,
  ColContainer,
  CardColLeftContainer,
  CardRowBetweenContainer,
  CardHeaderContainer,
} from "./styled/Container.styled";

import { Button, InsideNavButton, ProfileButton } from "./styled/Button.styled";
import {
  ToggleHolder,
  ToggleListHolder,
  ToggleListItem,
  ToggleList,
} from "./styled/DropDown.styled";
import {
  Favorite,
  More,
  MoreHoriz,
  MoreVert,
  Comment,
  Visibility,
} from "@material-ui/icons";
import { useState } from "react";
import ReactHlsPlayer from "react-hls-player";
import { useSelector } from "react-redux";
import axios from "axios";

function StreamCard({uuid,timestamp}) {
  let streamUrl;

  const [user,setUser] = useState({});
  function getuserbyuuid(){
    axios.get(process.env.React_App_API + "user/getuserbyuuid/"+uuid)
    .then((res) => {
      setUser(res.data.user)
    }).catch((err)=>console.log(err))
  }

  useEffect(() => {
    getuserbyuuid();
  },[])
  
  streamUrl =
  "http://82.114.65.84:17083/streams/" + uuid + "/" +timestamp + "/stream.m3u8";
  const [isOpen, setIsOpen] = useState(false);
  const toggling = () => setIsOpen(!isOpen);
  return (
    <CardContainer>
      <CardHeaderContainer w="100%">
        <CardRowLeftContainer>
          <ProfileButton w="64px" radius="50%"></ProfileButton>
          <CardColLeftContainer>
            <h6>@{user.name}</h6>
            <h6>{timestamp}</h6>
          </CardColLeftContainer>
        </CardRowLeftContainer>

        <ToggleHolder>
          <Button radius="50%" w="40px" onClick={toggling}>
            <MoreHoriz />
          </Button>

          {isOpen && (
            <ToggleListHolder>
              <ToggleList>
                <ToggleListItem>Share</ToggleListItem>
                <ToggleListItem>Details</ToggleListItem>
              </ToggleList>
            </ToggleListHolder>
          )}
        </ToggleHolder>
      </CardHeaderContainer>
      <CardVideoContainer w="90%">
        {/* <img alt="The Eye" src="./images/eye.png"></img> */}
        <ReactHlsPlayer
          src={streamUrl}
          width="100%"
          height="auto"
          controls={true}
          style={{ overflow: "hidden" }}
          className="px-0 mx-0 "
        />
        
      </CardVideoContainer>
      <CardRowBetweenContainer w="80%" fSize="small">
        <h6>12.3k Likes</h6>
        <h6>12.3k Comments</h6>
        <h6>1k Shares</h6>
      </CardRowBetweenContainer>
      <hr />
      <CardRowBetweenContainer w="90%">
        <InsideNavButton radius="10px" w="30%">
          <Favorite />
        </InsideNavButton>
        <InsideNavButton radius="10px" w="30%">
          <Comment />
        </InsideNavButton>
        <InsideNavButton radius="10px" w="30%">
          <Visibility />
        </InsideNavButton>
      </CardRowBetweenContainer>
      <CardRowContainer></CardRowContainer>
    </CardContainer>
  );
}

export default StreamCard;
