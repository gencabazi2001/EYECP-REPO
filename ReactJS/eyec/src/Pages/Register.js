import { ArrowBack } from "@material-ui/icons";
import React, { useState } from "react";
import {
  InsideNavButton,
  LoginButton,
  ProfileButton,
} from "../components/styled/Button.styled";
import {
  LoginColContainer,
  RegisterContainer,
  SideRowContainer,
} from "../components/styled/Container.styled";
import {
  Form,
  FormGroup,
  Input,
  Label,
  Message,
} from "../components/styled/Form.styled";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";

function Register() {
  const navigate = useNavigate();
  const [data, setData] = useState({ email: "", password: "" });
  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  // const dispatch = useDispatch()
  const handleRegister = (e) => {
    e.preventDefault();
    console.log(data)
    axios.post(process.env.React_App_API + "user/register", {
        name: data.name,
        email: data.email,
        password: data.password,
        uuid: data.uuid,
        macaddress: data.macaddress,
      })
      .then(() => {
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <LoginColContainer w="95%">
      <RegisterContainer w="35%">
        <SideRowContainer w="100%">
          <SideRowContainer w="33.33%">
            <Link to="/login" style={{ textDecoration: "none" }}>
              <ProfileButton w="50px" radius="50%">
                <ArrowBack fontSize="medium" />
              </ProfileButton>
            </Link>
          </SideRowContainer>
          <SideRowContainer w="33.33%">
            <h2>Register</h2>
          </SideRowContainer>
          <SideRowContainer w="33.33%"></SideRowContainer>
        </SideRowContainer>
        <form onSubmit={handleRegister}>
          <FormGroup>
            <Label>Full Name</Label>
            <Input
              placeholder="Please enter your full name..."
              name="name"
              type="text"
              defaultValue={data.name}
              onChange={handleChange}
            />
            {/* <Message>This is the validation message</Message> */}
          </FormGroup>
          <FormGroup>
            <Label>Email</Label>
            <Input
              placeholder="Please enter your email..."
              name="email"
              type="email"
              defaultValue={data.email}
              onChange={handleChange}
            />
            {/* <Message>This is the validation message</Message> */}
          </FormGroup>
          <FormGroup>
            <Label>Password</Label>
            <Input
              placeholder="Please enter your password..."
              name="password"
              type="password"
              defaultValue={data.password}
              onChange={handleChange}
            />
            {/* <Message>This is the validation message</Message> */}
          </FormGroup>
          <FormGroup>
            <Label>UUID</Label>
            <Input
              placeholder="Please enter your uuid(optional)..."
              name="uuid"
              type="text"
              defaultValue={data.uuid}
              onChange={handleChange}
            />
            {/* <Message>This is the validation message</Message> */}
          </FormGroup>
          <FormGroup>
            <Label>MAC Address</Label>
            <Input
              placeholder="Please enter your mac address..."
              name="macaddress"
              type="text"
              defaultValue={data.macaddress}
              onChange={handleChange}
            />
            {/* <Message>This is the validation message</Message> */}
            <LoginButton radius="10px" w="256px" type="submit">
              Register
            </LoginButton>
          </FormGroup>
        </form>
        <h4>Already have an account?</h4>
        <Link to="/login" style={{ textDecoration: "none" }}>
          <InsideNavButton radius="10px" w="128px">
            Login
          </InsideNavButton>
        </Link>
      </RegisterContainer>
    </LoginColContainer>
  );
}

export default Register;
