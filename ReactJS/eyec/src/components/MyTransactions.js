import { Button, InsideNavButton } from "./styled/Button.styled";
import React, { useEffect, useState } from "react";
import { ColContainer } from "./styled/Container.styled";
import { StyledTable } from "./styled/Table.styled";
import { useSelector } from "react-redux";

function MyTransactions() {

 const transactions =  useSelector(state=>state.transactions.transaction);


 
  return (
    <StyledTable w="100%">
    <colgroup>
      <col />
      <col />
    </colgroup>
    <thead>
      <tr>
        <th>WalletId</th>
        <th>Credited</th>
      </tr>
    </thead>
    <tbody>
      {transactions.map((trans) =>
        <tr key={trans._id}>
          <td>System</td>
          <td>{trans.value}</td>
        </tr>
      )}

    </tbody>
  </StyledTable>
  )
}

export default MyTransactions