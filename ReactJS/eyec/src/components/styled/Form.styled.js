import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const PublishForm = styled(Form)`
  border:1px solid lightgray;
  border-radius: 10%;
  height:400px;
`;

export const CommentFormGroup = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 8px;
  color: ${({ theme }) => theme.colors.light};
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60%;
  margin: 0px;
  color: ${({ theme }) => theme.colors.light};
`;

export const EditFormGroup = styled(FormGroup)`
  color: ${({ theme }) => theme.colors.dark};
  justify-content: center;
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

export const PublishLabel = styled(Label)`
  margin-bottom: 16px;
  @media (max-width: 816px) {
    font-size: small;
  }
  @media (max-width: 640px) {
    font-size: x-small;
  }
  @media (max-width: 520px) {
    font-size: xx-small;
  }
  @media (max-width: 420px) {
    font-size: xx-small;
  }
`;

export const CommentInput = styled.input`
  border: 1px solid gray;
  border-radius: 5px;
  width: 100%;
  height:40px;
  background-color: ${({ theme }) => theme.colors.light};
  &:hover {
    transition: all 200ms;
    transform: scale(1.01);
  }
  &:focus {
    border: 1px solid ${({ theme }) => theme.colors.light};
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

export const EditInput = styled(Input)`
  padding: 0;
  margin: 0;
  border: 1px dotted gray;
  justify-content: center;
  align-items: center;

  &:hover {
    transition: all 200ms;
    transform: scale(1.01);
  }
  &:focus {
    border: 1px solid ${({ theme }) => theme.colors.dark};
    outline: none;
  }
`;

export const Message = styled.label`
  margin-bottom: 8px;
  color: ${({ theme }) => theme.colors.fatal};
  display: block;
`;
