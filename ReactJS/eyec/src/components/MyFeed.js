import React, { useEffect, useState } from "react";
import { ColContainer, RowContainer } from "./styled/Container.styled";
import StreamCard from "./StreamCard";
import axios from "axios";
import { useSelector } from "react-redux";
function MyFeed() {

  const [streams, setStreams] = useState([]);
  const usrid = useSelector((state)=>state.userID)

  const getStreams = () => {
    axios
      .get("http://localhost:3001/pub/getpubs/"+usrid)
      .then((res) => {
        setStreams(res.data.Resp.data.respOrm);
      })
      .catch((err) => console.log(err));
  };

  function sleep() {
    new Promise((resolve) => setTimeout(resolve, 1000));
  }
  useEffect(() => {
    getStreams();
  }, []);

  return (
    <ColContainer w="60%">
      {sleep()}
      {streams.map(function (stream) {
        return (
          <StreamCard
            key={stream.post._id}
            post={stream}
          />
        );
      })}
    
    </ColContainer>
  );
}

export default MyFeed;
