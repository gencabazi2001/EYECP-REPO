import React, { useEffect } from "react";
import {
  CardContainer,
  CardRowLeftContainer,
  CardVideoContainer,
  CardRowContainer,
  CardRowRightContainer,
  ColContainer,
  CommentRowContainer,
  CardColLeftContainer,
  CommentColLeftContainer,
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

function PostComment({ comm,user,pubid }) {

  function like (){
    const body = {
      UserID:user._id,
      PubID:pubid,
      CommentID: comm._id
    }
    axios
    .post("http://localhost:3001/pub/like/comment",body)
    .then((res) => {
      console.log(res)
    })
    .catch((err) => console.log(err));
  }
  var profile = require("../../../../files/"+user._id+"/"+user._id+".jpg")

  return (
    
    <CardRowBetweenContainer w="90%" fSize="small">
      <CardHeaderContainer w="100%">
        <CommentRowContainer w = "100%">
          <ProfileButton w="64px" radius="50%">
          <img src={profile} height="65px" width="65px" style={{borderRadius:"50%"}} />
          </ProfileButton>
          <CommentColLeftContainer fSize= "small">
            <h6>@{user.username}/{comm.created_at}</h6>
            <h6>{comm.comment}</h6>
          </CommentColLeftContainer >
          <CardRowBetweenContainer w="20%">
          <InsideNavButton radius="50%" w="40%" onClick={like}>
          <Favorite />
        </InsideNavButton>
        <h6>{comm.likes.length}</h6>
        </CardRowBetweenContainer>
        </CommentRowContainer>
      </CardHeaderContainer>
      <br></br>
    </CardRowBetweenContainer>

  );
}

export default PostComment;
