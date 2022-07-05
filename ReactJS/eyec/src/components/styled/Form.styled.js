import styled from "styled-components";

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60%;
  margin: 0px;
  color: ${({ theme }) => theme.colors.light};
`;

export const Label = styled.label`
  margin-bottom: 16px;
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
`;

export const Input = styled.input`
  padding: 8px;
  border: none;
  border-radius: 5px;
  width: 100%;
  margin-bottom: 8px;
  background-color: ${({ theme }) => theme.colors.light};
  &:hover {
    transition: all 200ms;
    transform: scale(1.01);
  }
  &:focus {
    border: 1px solid ${({ theme }) => theme.colors.light};
    outline: none;
  }
`;

export const Message = styled.label`
  margin-bottom: 8px;
  color: ${({ theme }) => theme.colors.fatal};
  display: block;
`;
