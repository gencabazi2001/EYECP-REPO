import styled from "styled-components";

export const StyledHeader = styled.header`
  background-color: ${({ theme }) => theme.colors.light};
  padding: 20px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  margin-left: 16px;
  margin-right: 16px;
  border-radius: 5px;
`;
export const StyledHomeHeader = styled(StyledHeader)`
  @media (max-width: 1590px) {
    max-width: 99%;
  }
  @media (max-width: 2000px) {
    width: 98%;
  }

  @media (max-width: 1270px) {
    max-width: 97%;
  }
  @media (max-width: 1060px) {
    max-width: 96%;
  }
  @media (max-width: 910px) {
    max-width: 96%;
  }

  @media (max-width: 816px) {
    max-width: 95%;
  }
  @media (max-width: 710px) {
    justify-content: space-around;
    max-width: 95%;
  }
  @media (max-width: 640px) {
    justify-content: space-around;

    max-width: 94%;
  }
  @media (max-width: 580px) {
    max-width: 93%;
  }
  @media (max-width: 490px) {
    max-width: 92%;
  }
  @media (max-width: 480px) {
    max-width: 91%;
  }
  @media (max-width: 320px) {
    max-width: 90%;
  }
  h3 {
    @media (max-width: 490px) {
      font-size: small;
    }
    @media (max-width: 480px) {
      font-size: small;
    }
    @media (max-width: 320px) {
      font-size: small;
    }
  }
  a {
    @media (max-width: 710px) {
      display: flex;
      justify-content: space-around;
      font-size: x-small;
      max-width: 50px;
    }
    @media (max-width: 640px) {
      justify-content: space-around;

      font-size: x-small;
      max-width: 50px;
    }
  }
  a {
    button {
      @media (max-width: 1590px) {
        max-width: 100px;
      }
      @media (max-width: 2000px) {
        width: 100px;
      }
      @media (max-width: 1270px) {
        max-width: 100px;
      }
      @media (max-width: 1060px) {
        max-width: 90px;
      }
      @media (max-width: 910px) {
        max-width: 70px;
      }
      @media (max-width: 816px) {
        font-size: x-small;
        max-width: 60px;
      }
      @media (max-width: 710px) {
        font-size: x-small;
        max-width: 50px;
      }
      @media (max-width: 640px) {
        font-size: x-small;
        max-width: 50px;
        visibility: collapse;
      }
      @media (max-width: 580px) {
        font-size: x-small;
        max-width: 50px;
      }
      @media (max-width: 490px) {
        font-size: x-small;
        max-width: 50px;
      }
      @media (max-width: 480px) {
        font-size: xx-small;
        max-width: 40px;
      }
      @media (max-width: 320px) {
        font-size: xx-small;
        max-width: 30px;
      }
    }
  }
`;
export const StyledMainHeader = styled(StyledHeader)`
  margin-left: 0;
  margin-right: 0;
  width: 100%;
  div {
    input {
      @media (max-width: 640px) {
        font-size: x-small;
        max-width: 50px;
        visibility: collapse;
      }
    }
  }
`;
export const HeaderEmptyDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60%;
  cursor: pointer;
  font-family: "Abril Fatface", cursive;
  font-family: "BioRhyme", serif;
  font-size: large;
  height: 5vh;
`;

export const SearchBox = styled.div`
  display: flex;
  height: fit-content;
  justify-content: center;
  align-items: center;
  width: 50vw;
  @media (max-width: 640px) {
    max-width: 0px;
    visibility: collapse;
    visibility:  ${({ v }) => v};
    max-width: ${({ mw }) =>mw} ;
  }
  input {
    height: 40px;
    width: 100%;
    border: 1px solid gray;
    font-size: 18px;
    border-radius: 16px;
    transition: transform 0.5s;
    background-color: white;
    color: #000;
    padding-left: 10px;
    margin-right: 10px;

    &:hover {
      transition: all 200ms;
      transform: scale(1.01);
    }

    &:focus {
      border: 1px solid #00381f;
      outline: none;
    }
  }
`;

export const Navigator = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.light};
`;

export const BurgerMenu = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  visibility: ${({ v }) => v};
  height: ${({ w }) => w};
  width: 100%;
  position: fixed;
  z-index: 1;
  top: 100px;
  left: 0;
  background-color: white;
  overflow-x: hidden;
  transition: 0.5s;
  padding-top: 60px;
`;
