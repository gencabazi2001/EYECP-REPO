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
import { Button } from "@material-ui/core";
import {
  Form,
  FormGroup,
  Input,
  EditInput,
  EditFormGroup,
  Label,
  Message,
} from "../components/styled/Form.styled";
import {
  InsideNavButton,
  LoginButton,
} from "../components/styled/Button.styled";
import axios from "axios";

const types = ["My Feed", "My Activity", "My Favorites", "My Wallet"];

function UserProfile() {
  const theUser = useSelector((state) => state.user);
  const userid = useSelector((state) => state.userID);
  const [edit, setEdit] = useState(false);
  const [active, setActive] = useState(types[0]);
  const [data, setData] = useState({ profileImage: "" });
  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };
  const [selectedImage, setSelectedImage] = useState(null);

  const component = (active) => {
    switch (active) {
      case "My Feed":
        return <MyFeed />;
      case "My Activity":
        return <MyLikes />;
      case "My Favorites":
        return <MyFavorites />;
      case "My Wallet":
        return <MyWallet />;
    }
  };

  function handleEdit() {
    if (edit) {
      setEdit(false);
    } else {
      setEdit(true);
    }
  }
  var url = require("../../../../files/"+userid+"/"+userid+".jpg")

  function handleEditReq(e) {
    const formData = new FormData()
    formData.append('profileImage', selectedImage)
    formData.append('UserID',userid)
    axios.put(
      "http://localhost:3000/user/putDetails",formData
    ).then((res) => console.log(res));
  }

  return (
    <ColContainer w="70%">
      <RowContainer w="100%">
        <BackgroundImageContainer>
          <img height="100%" width="100%" src="images/back.jpg"></img>
        </BackgroundImageContainer>
      </RowContainer>
      <RowContainer w="100%">
        <ProfileButton w="100px" radius="50%" onClick={handleEdit}>
        <img src={url} height="100px" width="100px" style={{borderRadius:"50%"}} />
        </ProfileButton>
      </RowContainer>
      {edit ? (
        <ColContainer w="80%">
          {" "}
          <Form onSubmit={handleEditReq}>
            <EditFormGroup>
              <Label>Edit Profile Pic</Label>
              <EditInput
                type="file"
                onChange={(event) => {
                  console.log(event.target.files[0]);
                  setSelectedImage(event.target.files[0]);
                }}
              />
              {/* <Message>This is the validation message</Message> */}
            </EditFormGroup>
            <EditFormGroup>
              <LoginButton radius="10px" w="20%" type="submit">
                Edit
              </LoginButton>
            </EditFormGroup>
          </Form>
        </ColContainer>
      ) : null}
      <RowContainer>
        <ProfileColContainer>
          {(() => {
            if (theUser != null || theUser != undefined) {
              return (
                <>
                  {" "}
                  <h5>{theUser.Name}</h5>
                  <h6>@{theUser.username}</h6>
                </>
              );
            } else {
              return (
                <>
                  {" "}
                  <h5>loading</h5>
                  <h6>@loading</h6>
                </>
              );
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
