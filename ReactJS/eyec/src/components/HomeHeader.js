import React, { useEffect, useState } from "react";
import {
  StyledHeader,
  StyledHomeHeader,
  HeaderEmptyDiv,
  SearchBox,
  HamMenu,
  BurgerMenu,
} from "./styled/Header.styled";
import { Button, HamButton, InsideNavButton } from "./styled/Button.styled";
import { Search, Notifications } from "@material-ui/icons";
import { Face } from "@material-ui/icons";
import { HomeImage } from "./styled/Logo.styled";
import { Link } from "react-router-dom";
import { Menu } from "@material-ui/icons";

function HomeHeader() {
  const [visible, setVisible] = useState(false);
  function controlmenu() {
    setVisible(!visible);
  }

  function bMenu(b) {
    let width;
    let vis;
    if (b == true) {
      width = "100px";
      vis = "visible";
    } else {
      vis = "collapse";
      width = "0px";
    }
    console.log("returned" + b);
    return (
      <BurgerMenu w={width} v={vis}>
        <Link to="/login" style={{ textDecoration: "none" }}>
          <Button w="100px" radius="10px">
            Log In
          </Button>
        </Link>
        <Link to="/register" style={{ textDecoration: "none" }}>
          <Button w="100px" radius="10px">
            Sign Up
          </Button>
        </Link>
      </BurgerMenu>
    );
  }

  useEffect(() => {});

  return (
    <>
      <StyledHomeHeader>
        <HomeImage w="150px" src="./images/eye.png" />
        <HeaderEmptyDiv>
          <h3>EYEC</h3>
        </HeaderEmptyDiv>
        <Link to="/login" style={{ textDecoration: "none" }}>
          <Button w="100px" radius="10px">
            Log In
          </Button>
        </Link>
        <Link to="/register" style={{ textDecoration: "none" }}>
          <Button w="100px" radius="10px">
            Sign Up
          </Button>
        </Link>
        <HamButton radius="50%" onClick={controlmenu}>
          <Menu />
        </HamButton>
      </StyledHomeHeader>
      <>{bMenu(visible)}</>
    </>
  );
}

export default HomeHeader;
