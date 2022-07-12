import { Button, InsideNavButton } from "./styled/Button.styled";
import React, { useEffect, useState } from "react";
import { ColContainer } from "./styled/Container.styled";
import { StyledTable } from "./styled/Table.styled";
import { useSelector } from "react-redux";
import axios from "axios";

function MyTransactions() {

//  const transactions =  useSelector(state=>state.transactions.transaction);
  const userid = useSelector((state)=> state.userID)
  const [transactions, setTransactions]  = useState([])

  function getTransactions(){
    axios.get("http://localhost:3002/wallet/transaction/get/"+userid)
    .then((res) =>{ console.log(res.data.Resp.data.respOrm)
       setTransactions(res.data.Resp.data.respOrm)
    }
    );
  }
useEffect(() => {
   getTransactions();
}, []);

 
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
      {/* <tr>
        <td>System Transaction</td>
        <td>ammount</td>
      </tr> */}

    </tbody>
  </StyledTable>
  )
}

export default MyTransactions