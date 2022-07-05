import styled from "styled-components";
import { device } from "./breakpoints";


export const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  background-color: ${({ bg }) => bg};
  font-family: "Abril Fatface", cursive;
  font-family: "BioRhyme", serif;
  font-size: larger;
  color: ${({ theme }) => theme.colors.darker};
  p {
    cursor: pointer;
    margin: 0;
  }
  width: ${({ w }) => w};
`;

export const SideMainRowContainer= styled(RowContainer)`
  /* background-color: red; */
  width: 100%;
  justify-content: center;
`

export const RowHomeContainer = styled(RowContainer)`
  margin-top: 64px;
  margin-bottom: 32px;
  width: 80%;
  justify-content: space-between;
  @media (max-width: 640px) {
   flex-direction: column;
   align-items: center;
  }
 
`;

export const SideRowContainer = styled(RowContainer)`
  align-items: center;

  @media (max-width: 910px) {
  }
`;

export const SideRowRegisterContainer = styled(RowContainer)`
  align-items: center;
`;

export const ColContainer = styled.div`
  display: flex;
  padding-right: 32px;
  padding-left: 32px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: ${({ w }) => w};
  background-color: ${({ theme }) => theme.colors.light};
  margin: 16px;
  border-radius: 5px;
  height: ${({ h }) => h};
  hr {
    color: ${({ theme }) => theme.colors.dark};
    opacity: 0.2;
    width: 80%;
  }
  font-family: "Abril Fatface", cursive;
  font-family: "BioRhyme", serif;
`;

export const FeedColContainer = styled(ColContainer)`
  background-color: ${({ theme }) => theme.colors.lightBackground};
  @media (max-width: 910px) {
    width: 80%;
  }

`;

export const HomeColContainer = styled(ColContainer)`
  margin-bottom: 0px;
`;

export const MainColContainer = styled(ColContainer)`
  padding: 0;
  justify-content: start;
  background-color: ${({ theme }) => theme.colors.lightBackground};
`;

export const SideColContainer = styled(ColContainer)`
  width: 70%;
  padding-right: 32px;
  padding-left: 32px;
  justify-content: center;
  hr {
    color: ${({ theme }) => theme.colors.dark};
    width: 100%;
    opacity: 0.2;
  }
`;

export const SideSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  hr {
    color: ${({ theme }) => theme.colors.dark};
    opacity: 0.2;
    width: 80%;
  }
`;

export const ProfileColContainer = styled(ColContainer)`
  h5,
  h6 {
    margin: 8px;
  }
  h6 {
    opacity: 0.5;
  }
`;
export const NavigatorContainer = styled(ColContainer)`
  border: 1px solid ${({ theme }) => theme.colors.header};
  width: 100%;
`;

export const CardContainer = styled(ColContainer)`
  box-shadow: 1px 1px 5px ${({ theme }) => theme.colors.dark};
  width: 100%;

  h5,
  h6 {
    margin: 8px;
  }
  h6 {
    opacity: 0.5;
  }
`;
export const CardRowLeftContainer = styled(RowContainer)`
  align-items: center;
  justify-content: start;
`;

export const CardRowRightContainer = styled(CardRowLeftContainer)`
  align-items: center;
  justify-content: end;
`;

export const CardRowContainer = styled(CardRowLeftContainer)`
  justify-content: center;
`;

export const CardRowBetweenContainer = styled(CardRowContainer)`
  justify-content: space-between;
  h6 {
    font-size: ${({ fSize }) => fSize};
    &:last-child {
      font-size: small;
    }
  }
`;

export const CardHeaderContainer = styled(CardRowBetweenContainer)`
  justify-content: space-between;
`;
export const CardVideoContainer = styled(ColContainer)`
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.dark};
  padding: 10px;
`;

export const LoginColContainer = styled(ColContainer)`
  width: 96.5%;
  margin-top: 0px;
  margin-bottom: 0px;
  margin-right: 0px;
  margin-left: 0px;
  justify-content: center;
  align-items: center;
  height: 100vh;

  @media (max-width: 1590px) {
    max-width: 95%;
  }
  @media (max-width: 2000px) {
    width: 96%;
  }

  @media (max-width: 1270px) {
    max-width: 94%;
  }
  @media (max-width: 1060px) {
    max-width: 93%;
  }
  @media (max-width: 910px) {
    max-width: 92%;
  }

  @media (max-width: 816px) {
    max-width: 91%;
  }
  @media (max-width: 710px) {
    max-width: 90%;
  }
  @media (max-width: 640px) {
    max-width: 89%;
  }
  @media (max-width: 580px) {
    max-width: 87%;
  }
  @media (max-width: 490px) {
    max-width: 83%;
  }
  @media (max-width: 480px) {
    max-width: 80%;
  }
  @media (max-width: 320px) {
    max-width: 78%;
  }
`;

export const LoginContainer = styled(ColContainer)`
  @media (max-width: 640px) {
    min-width: 95%;
    height: 80%;
    align-items: center;
    justify-content: center;
    form{
      margin: 0;
      align-items: center;
      justify-content: space-around;
      height: 40% !important;
      
    }
  }

  border: 1px solid ${({ theme }) => theme.colors.dark};
  border-radius: 15px;
  background-color: ${({ theme }) => theme.colors.dark};
  h1,
  h3,
  a,
  h2,
  h4,
  h5 {
    color: ${({ theme }) => theme.colors.light};
    @media (max-width: 816px) {
      font-size: medium;
    }
  }
  h3 {
    @media (max-width: 640px) {
      font-size: small;
    }
    @media (max-width: 520px) {
      font-size: x-small;
    }
    @media (max-width: 420px) {
      font-size: xx-small;
    }
  }
  h1 {
    margin-top: 32px;
  }
  h4 {
    margin-bottom: 0;
  }
  form {
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export const CardColLeftContainer = styled(ColContainer)`
  padding-left: 0px;
  margin: 0;
  justify-content: center;
  align-items: start;
  h6 {
    margin: 0;
    @media (max-width: 816px) {
      font-size: medium;
    }
    @media (max-width: 640px) {
      font-size: small;

      
    }
    @media (max-width: 520px) {
      font-size: x-small;
    }
    @media (max-width: 420px) {
      font-size: xx-small;
    }
  }
`;

export const RegisterContainer = styled(LoginContainer)`
@media (max-width: 640px) {
    form{
      height: 70% !important;  
    }
    input{
      margin: 0;
    }
    label{
      margin:0;
    }
  }
  h4{
    @media (max-width: 816px) {
    font-size: medium;
  }
  @media (max-width: 640px) {
    font-size: small;
   
  }
  @media (max-width: 520px) {
    font-size: x-small;
  }
  @media (max-width: 420px) {
    font-size: xx-small;
  }
  }
`;

export const BackgroundImageContainer = styled(ColContainer)`
  height: 100%;
  width: 100%;
  img {
    border-radius: 10px;
  }
  transition: all 300ms;
  :hover {
    height: 95%;
    transition: all 300ms;
  }
`;

export const LandingColContainer = styled(ColContainer)`
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

  img {
    @media (max-width: 640px) {
    max-width: 80%;
  }
  
  @media (max-width: 580px) {
    max-width: 70%;
  }
  @media (max-width: 490px) {
    max-width: 60%;
  }
  @media (max-width: 480px) {
    max-width: 50%;
  }
  }
  p{
    @media (max-width: 816px) {
    font-size: small;
  }
  }
  button{
    @media (max-width: 816px) {
    max-width:100px;
  }
  }


`;
