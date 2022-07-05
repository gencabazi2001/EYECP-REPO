import styled from "styled-components";

export const StyledSideNav = styled.div`
  top: 0;
  position: sticky;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-right: 16px;
  padding-left: 16px;
  background-color: ${({ theme }) => theme.colors.light};
  width: 20%;
  height: 100%;
  margin-left: 16px;
  margin-top: 16px;
  margin-bottom: 16px;
  border-radius: 5px;
  position: sticky;

  @media (max-width: 910px) {
    font-size: x-small;
  }
  @media (max-width: 910px) {
   visibility: collapse;
   max-width: 0px;
  margin: 0;
  padding: 0;
  }
`;
