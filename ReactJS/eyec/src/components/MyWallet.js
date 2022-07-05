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
  const click = () => {
    if (clicked) {
      setClicked(false);
    } else {
      setClicked(true);
    }
  };
  const dispatch = useDispatch();

  const wallet = useSelector((state) => state.user.wallet);
  
  const getTransactions = () => {
    if (wallet != null || wallet != undefined) {
      axios
        .get(process.env.React_App_API + "transaction/" + wallet.walletid)
        .then((res) => dispatch(setTrans(res.data)));
    }
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
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{useSelector((state) => state.user.wallet.walletid)}</td>
            <td>{useSelector((state) => state.user.wallet.bilance)}CLEX</td>
          </tr>
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
