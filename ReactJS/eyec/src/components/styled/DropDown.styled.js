import styled from "styled-components";

export const ToggleHolder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
`;

export const ToggleListHolder = styled(ToggleHolder)`

  width: 128px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.dark};
  color: ${({ theme }) => theme.colors.light};
  opacity: 0.8;
`;

export const ToggleList = styled.ul`
  padding-top:8px;
  width: 128px;
  box-shadow: 2px 2px 5px ${({ theme }) => theme.colors.dark};
  background-color: ${({ theme }) => theme.colors.dark};
  border-radius: 10px;
  opacity: 0.8;
  z-index: 2  ;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  list-style: none;
  &:first-child {
    padding-top: 8px;
  }
`;

export const ToggleListItem = styled.li`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: medium;
  margin: 8px;
  width:100%;
  &:hover {
    background-color: ${({ theme }) => theme.colors.light};
    color: ${({ theme }) => theme.colors.dark};
  }
`;
