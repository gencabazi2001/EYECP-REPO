import { Button, InsideNavButton } from "./styled/Button.styled";
import React, { useEffect, useState } from "react";
import { ColContainer } from "./styled/Container.styled";
import { StyledTable } from "./styled/Table.styled";
import MyTransactions from "./MyTransactions";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setTrans } from "../state/actions/transactions";
function MyWallet() {

  const [clicked, setClicked] = useState(false);
  const [wallets, setWallets] = useState([]);

  const click = () => {
    if (clicked) {
      setClicked(false);
    } else {
      setClicked(true);
    }
  };

  const userid = useSelector((state) => state.userID);

  const getTransactions = () => {
    axios
      .get("http://localhost:3002/wallet/get/" + userid)
      .then((res) =>{ console.log(res.data.Resp.data.respOrm)
        setWallets(res.data.Resp.data.respOrm)}
      );
  };
  useEffect(() => {
    getTransactions();
  }, []);

  return (
    <ColContainer w="60%">
      <StyledTable w="100%">
        <colgroup>
          <col />
          <col />
        </colgroup>
        <thead>
          <tr>
            <th>WalletId</th>
            <th>Bilance</th>
            <th>Active</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {wallets.map((wallet)=>{
            return (
            <tr key = {wallet._id}> 
            <td>{wallet._id}</td>
            <td>{wallet.balance}CLEX</td> 
            <td>{wallet.active?<>true</>:<>false</>}</td>
            <td>{wallet.created_at}</td>
            </tr>)
          })}
        </tbody>
      </StyledTable>
      <hr></hr>
      <InsideNavButton onClick={click} radius="10px" w="190px">
        {clicked ? <>Hide Transactions</> : <>See Transactions</>}
      </InsideNavButton>

      {clicked ? <MyTransactions /> : null}
    </ColContainer>
  );
}

export default MyWallet;
