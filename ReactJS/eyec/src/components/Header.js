import React from "react";
import { StyledHeader,StyledMainHeader, SearchBox, BurgerMenu } from "./styled/Header.styled";
import { Button, ProfileButton, HamButton } from "./styled/Button.styled";
import { Search, Notifications, Iso } from "@material-ui/icons";
import { useState } from "react";
import {
  ToggleHolder,
  ToggleList,
  ToggleListHolder,
  ToggleListItem,
} from "./styled/DropDown.styled";
import {useDispatch} from 'react-redux'
import {logout} from '../state/actions/isLoggedIn'
import { useNavigate } from "react-router-dom";
import { Menu } from "@material-ui/icons";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const toggling = () => setIsOpen(!isOpen);
  const [visible, setVisible] = useState(false);
  function controlmenu() {
    setVisible(!visible);
  }

  const dispatch = useDispatch()

  const navigate = useNavigate()
  const logOut = () => {
    dispatch(logout())
    sessionStorage.removeItem("token")
    navigate("/login")
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
        <SearchBox v="visible" mw="50%">
        <input type="text" className="input-search" placeholder="Search" />
        <Button w="40px" radius="50%">
          <Search fontSize="medium" />
        </Button>
      </SearchBox>
      </BurgerMenu>
    );
  }

  return (
    <>
    <StyledMainHeader>
      <SearchBox>
        <input type="text" className="input-search" placeholder="Search" />
        <Button w="40px" radius="50%">
          <Search fontSize="medium" />
        </Button>
      </SearchBox>
      <Button w="40px" radius="50%">
        <Notifications fontSize="medium" />
      </Button>
      <ToggleHolder>
        <Button w="128px" radius="10px" onClick={toggling}>
          My Account
        </Button>
        {isOpen && (
          <ToggleListHolder>
            <ToggleList>
              <ToggleListItem>Settings</ToggleListItem>
              <ToggleListItem onClick={logOut}>
                Log Out
                </ToggleListItem>
            </ToggleList>
          </ToggleListHolder>
        )}
      </ToggleHolder>
      <HamButton radius="50%" onClick={controlmenu}>
          <Menu />
        </HamButton>
    </StyledMainHeader>
    <>{bMenu(visible)}</>
    </>      

  );
}

export default Header;
