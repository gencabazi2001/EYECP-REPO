import StreamCard from "../components/StreamCard";
import { FeedColContainer } from "../components/styled/Container.styled";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

function Feed() {
  const [streams, setStreams] = useState([]);
  const [activeStream, setActiveStream] = useState({});
  const usrid = useSelector((state)=>state.userID)

  const getStreams = () => {
    axios
      .get("http://localhost:3001/pub/filfeed/"+usrid)
      .then((res) => {
        console.log("posts",res.data.Resp.data.respOrm)
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
    <FeedColContainer w="50%">
      {sleep()}
      {streams.map(function (stream) {
        return (
          <StreamCard
            key={stream.post._id}
            post={stream}
          />
        );
      })}
    </FeedColContainer>
  );
}

export default Feed;
