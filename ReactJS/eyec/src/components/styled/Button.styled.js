import styled from "styled-components";

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: ${({ w }) => w};
  border-style: none;
  font-weight: bold;
  cursor: pointer;
  border-radius: ${({ radius }) => radius};
  /* background-color: ${({ variant }) => variant}; */
  background-color: ${({ theme }) => theme.colors.dark};
  pointer-events: painted;
  transition: transform 0.5s;
  color: white;

  &:hover {
    transform: scale(1.1);
  }
`;

export const IconButton = styled(Button)``;

export const InsideNavButton = styled(Button)`
  height: 40px;
  width: ${({ w }) => w};
  border-radius: ${({ radius }) => radius};
  /* background-color: ${({ variant }) => variant}; */
  background-color: ${({ theme }) => theme.colors.dark};
  color: ${({ theme }) => theme.colors.light};
  transition: 0.5s;
  margin: ${({ m }) => m || "16px"};
  &:hover {
    background-color: ${({ theme }) => theme.colors.light};
    color: ${({ theme }) => theme.colors.dark};
    transition: 0.5s;
    border: 1px solid ${({ theme }) => theme.colors.dark};
  }
`;

export const TextButton = styled(InsideNavButton)`
  color: ${({ theme }) => theme.colors.dark};
  background-color: ${({ theme }) => theme.colors.light};
  font-weight: bolder;
  font-size: medium;
  &:hover {
    background-color: ${({ theme }) => theme.colors.light};
    /* color:${({ variant }) => variant}; */
    border: none;
  }
  @media (max-width: 910px) {
    visibility: collapse;
    max-width: 0px;
  }
`;

export const ProfileButton = styled(InsideNavButton)`
  height: ${({ w }) => w};
  margin: 8px;
`;

export const RegisterBackButton = styled(ProfileButton)`
  height: ${({ w }) => w};
  margin: 8px;
`;

export const Tab = styled(TextButton)`
  margin: 8px;
  width: 30%;
  border-radius: 5px;
  cursor: pointer;
  opacity: 0.5;
  color: ${({ theme }) => theme.colors.light};
  background-color: ${({ theme }) => theme.colors.dark};
  border: 0;
  outline: 0;
  ${({ active }) =>
    active &&
    `
  opacity: 1;
`}
  &:hover {
    background-color: ${({ theme }) => theme.colors.light};
    transition: 0.5s;
    border: 1px solid ${({ theme }) => theme.colors.dark};
    color: ${({ theme }) => theme.colors.dark};
  }
`;

export const LoginButton = styled(InsideNavButton)`
  @media (max-width: 640px) {
    max-width: 150px;
  }
`;
export const HamButton = styled(Button)`
  visibility: collapse;
  margin: 0px;
  @media (max-width: 640px) {
    visibility: visible;
    margin-right: 20px;
  }
`;
