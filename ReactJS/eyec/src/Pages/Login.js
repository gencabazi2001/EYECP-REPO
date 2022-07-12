import React, { useEffect } from "react";
import { InsideNavButton, LoginButton } from "../components/styled/Button.styled";
import {
  LoginColContainer,
  LoginContainer,
} from "../components/styled/Container.styled";
import {
  FormGroup,
  Input,
  Label,
} from "../components/styled/Form.styled";
import { Link ,useNavigate} from "react-router-dom";
import {useState} from "react";
import axios from "axios";
import {useDispatch} from 'react-redux'
import {login} from '../state/actions/isLoggedIn'
import { setToken } from "../state/actions/tokenAction";


function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({ email: "", password: "" });
  const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};
  
  const dispatch = useDispatch()



  const handleLogin = (e) =>{
    e.preventDefault()
    axios.post(process.env.React_App_API +"user/login",{
      Email : data.email,
      Password : data.password
    }
    ).then(res => {
      console.log(res.data)
      dispatch(login())
      dispatch(setToken(res.data.Resp.data.myToken))
      navigate("/main")
    }).catch(err => {
      console.log(err)
    })
  }



  

  return (
    <LoginColContainer w="95%">
      <LoginContainer w="35%">
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <FormGroup>
            <Label >Email</Label>
            <Input placeholder="Please enter your email..." type="email" name="email" defaultValue = {data.email} onChange={handleChange} />
            {/* <Message>This is the validation message</Message> */}
          </FormGroup>
          <FormGroup>
            <Label>Password</Label>
            <Input placeholder="Please enter your password..." type="password" name="password" defaultValue = {data.password} onChange={handleChange} />
            {/* <Message>This is the validation message</Message> */}
            <LoginButton radius="10px" w="256px" type="submit">
              Login
            </LoginButton>
          </FormGroup>
        </form>
        <h3>
          Don't have an account?
        </h3>
        <Link to="/register" style={{textDecoration:"none"}}>
        <InsideNavButton radius="10px" w="128px">Register Here!</InsideNavButton>
        </Link>
        <br></br>
      </LoginContainer>
    </LoginColContainer>
  );
}

export default Login;
