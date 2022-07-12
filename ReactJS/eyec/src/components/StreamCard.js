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
  RowContainer,
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
import {
  FormGroup,
  CommentInput,
  Input,
  CommentFormGroup,
  Label,
} from "../components/styled/Form.styled";
import { useState } from "react";
import PostComment from "./Comment";
import ReactHlsPlayer from "react-hls-player";
import { useSelector } from "react-redux";
import axios from "axios";



function StreamCard({ post }) {
  const userid = useSelector((state)=> state.userID)
  function getTags(){
    var tags = []
    for (let i = 0; i < post.post.tags.length; i++) {
      tags.push(<h6 key={i}> #{post.post.tags[i]} </h6>)
    }
    return <RowContainer>{tags}</RowContainer>
  }
  const [showComments,setShowComments] = useState(false);
  const showComm = () => {
    if (showComments) {
      setShowComments(false);
    } else {
      setShowComments(true);
    }
  };
  const [data, setData] = useState({ comment: ""});
  const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};


  const handleComment = (e) =>{
    e.preventDefault()
    axios.post("http://localhost:3001/pub/comment",{
      UserID : userid,
      PubID : post.post._id,
      Comment:data.comment
    }
    ).then(res => {
      console.log(res.data)
    }).catch(err => {
      console.log(err)
    })
  }
  var url = require("../../../../files/"+post.user._id+"/"+post.post.file)
  function like (){
    const body = {
      UserID:userid,
      PubID:post.post._id
    }
    axios
    .post("http://localhost:3001/pub/like",body)
    .then((res) => {
      console.log(res)
    })
    .catch((err) => console.log(err));
  }
  var profile = require("../../../../files/"+post.user._id+"/"+post.user._id+".jpg")
  const [isOpen, setIsOpen] = useState(false);
  const toggling = () => setIsOpen(!isOpen);
  return (
    <CardContainer>
      <CardHeaderContainer w="100%">
        <CardRowLeftContainer>
          <ProfileButton w="64px" radius="50%">
          <img src={profile} height="70px" width="70px" style={{borderRadius:"50%"}} />
          </ProfileButton>
          <CardColLeftContainer>
            <h6>@{post.user.username}</h6>
            <h6>{post.post.created_at}</h6>
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
      <ColContainer>
            <h5>
              {post.post.caption}
            </h5>
            {getTags()}
          
      </ColContainer>
      <CardVideoContainer w="90%">
      <img src={url} style={{borderRadius:"5%"}} />
      </CardVideoContainer>
      <CardRowBetweenContainer w="80%" fSize="small">
        <h6>{post.post.likes.length} Likes</h6>
        <h6>{post.post.comments.length} Comments</h6>
        <h6>1k Shares</h6>
      </CardRowBetweenContainer>
      <hr />
      <CardRowBetweenContainer w="90%">
        <InsideNavButton radius="10px" w="30%"onClick={like}>
          <Favorite />
        </InsideNavButton>
        <InsideNavButton radius="10px" w="30%" onClick={showComm}>
          <Comment/>
        </InsideNavButton>
        <InsideNavButton radius="10px" w="30%">
          <Visibility />
        </InsideNavButton>
      </CardRowBetweenContainer>
      <CardRowContainer w="100%">
      {showComments? <ColContainer w= "100%">
        {post.comments.map(function (com) {
          return<> <PostComment key={com.comment._id} comm = {com.comment} user = {com.user} pubid = {post.post._id}/>
          <hr></hr>
          </>
        })}
        <form onSubmit={handleComment}>
          <CommentFormGroup>
            <CommentInput placeholder="Add a comment..." type="text" name="comment" defaultValue = {""} onChange={handleChange} />
            <Button radius="10px" w="256px" type="submit">
              Comment
            </Button>
          </CommentFormGroup>
        </form>
        </ColContainer>:null}
      </CardRowContainer>
    </CardContainer>
  );
}

export default StreamCard;
