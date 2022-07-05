import styled from 'styled-components';

export const StyledTable = styled.table`
  margin-top: 64px;
  color: ${({theme})=>theme.colors.light};
  font-size: large;
  width: ${({w})=>w};
  caption-side: top;
  border: 1px solid  ${({theme})=>theme.colors.light};
  border-collapse: collapse;
  border-spacing: 5px 10px;
  tr{
    background-color:${({theme})=>theme.colors.dark};
  }
  td,
  th {
    border: 2px solid  ${({theme})=>theme.colors.light};
    padding-top: 16px;
    padding-bottom: 16px;
  }
  td {
    padding: 5px 10px;
    padding-left: 16px;
  }
  tbody tr {
    :nth-of-type(odd) {
      background-color: ${({theme})=>theme.colors.darkCont};
    }
    :hover {
      opacity: 0.8;
    }
  }
  thead > tr {
    background-color:${({theme})=>theme.colors.dark};
  }
`;