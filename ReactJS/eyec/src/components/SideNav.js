import React from "react";
import {
  Button,
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
import { Face, PostAdd } from "@material-ui/icons";
import Feed from "../Pages/Feed";
import UserProfile from "../Pages/UserProfile";
import { useState, useEffect } from "react";
import Tags from "../Pages/Tags";
import Map from "../Pages/Map";
import {useSelector } from "react-redux";
import {
  Form,
  FormGroup,
  Input,
  EditInput,
  EditFormGroup,
  Label,
  Message,
  PublishForm,
  PublishLabel,
} from "../components/styled/Form.styled";
import {
  LoginButton,
} from "../components/styled/Button.styled";
import axios from "axios";

function SideNav() {
  const [active, setActive] = useState("");

  const [loading, setLoading] = useState(true);
  const [post,setPost] = useState(false)

  function publish(){
    if (post){
      setPost(false)
    } else{
      setPost(true)
    }
  }

  const [data, setData] = useState({ caption: "", tags: "" });
  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const component = (active) => {
    switch (active) {
      case "Home":
        return <Feed />;
      case "MyProfile":
        return <UserProfile />;
      case "Tags":
        return <Tags />;
      case "Map":
        return <Map />;
      default:
        return <Feed />;
    }
  };

  const user = useSelector((state) => state.user);
  const userid = useSelector(state=>state.userID)
  useEffect(() => {
  });
  const [selectedImage, setSelectedImage] = useState(null);

  function handlePublish(e) {
    let tags = data.tags.split(",")
    const formData = new FormData()
    formData.append('postFile', selectedImage)
    formData.append('UserID',userid)
    formData.append('Tags',tags)
    formData.append('Caption',data.caption)
    formData.append('Latitude',42.2)
    formData.append('Longitude',42.2)
    axios.post(
      "http://localhost:3001/pub/publish",formData
    ).then((res) => console.log(res));
  }
  var url = require("../../../../files/"+userid+"/"+userid+".jpg")

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
                   <img src={url} height="50px" width="50px" style={{borderRadius:"50%"}} />
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
                    return <>{user.Name}</>;
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
          <SideSectionContainer>
            <ProfileButton w="50px" radius="50%" onClick={publish}>
              <PostAdd >

              </PostAdd>
            </ProfileButton>
            {post?<>
              <PublishForm onSubmit={handlePublish}>
            <EditFormGroup>
              <br></br>
              <PublishLabel>Image</PublishLabel>
              <EditInput
                type="file"
                onChange={(event) => {
                  console.log(event.target.files[0]);
                  setSelectedImage(event.target.files[0]);
                }}
              />  
            </EditFormGroup>
            <EditFormGroup>
            <hr></hr>
              <PublishLabel>Caption</PublishLabel>
              <EditInput
              placeholder="Please enter the caption"
              name="caption"
              type="text"
              defaultValue={data.name}
              onChange={handleChange}
              />
            </EditFormGroup>
            <EditFormGroup>
            <hr></hr>
              <PublishLabel>Tags</PublishLabel>
              <EditInput
              placeholder="Please enter some tags comma separated"
              name="tags"
              type="text"
              defaultValue={data.name}
              onChange={handleChange}
              />
            </EditFormGroup>
            <EditFormGroup>
              <LoginButton radius="10px" w="50%" type="submit">
                Publish
              </LoginButton>
            </EditFormGroup>
          </PublishForm>
            </>:null}
          </SideSectionContainer>
        </SideColContainer>
      </StyledSideNav>
      <MainColContainer w="73%">{component(active)}</MainColContainer>
    </SideMainRowContainer>
  );
}

export default SideNav;
