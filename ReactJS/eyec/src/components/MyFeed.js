import React, { useEffect, useState } from "react";
import { ColContainer, RowContainer } from "./styled/Container.styled";
import StreamCard from "./StreamCard";
import axios from "axios";
import { useSelector } from "react-redux";
function MyFeed() {
  const userUuid = useSelector((state) => state.user.uuid);

  const [streams, setStreams] = useState([]);
  const [activeStream, setActiveStream] = useState({});

  const getStreams = () => {
    axios
      .post(process.env.React_App_API + "userStream/getUserStream", {
        uuid: "DGK154140UKJUP",
      })
      .then((res) => {
        setStreams(res.data.streams);
      })
      .catch((err) => console.log(err));
  };

  function sleep() {
    new Promise((resolve) => setTimeout(resolve, 1000));
  }
  useEffect(() => {
    getStreams();
  }, []);

  let mystreams = [
    { uuid: "DGK154140UKJUP", timestamp: "2022-4-23-11-19", id: 1 },
    { uuid: "DGK154140UKJUP", timestamp: "2022-4-22-17-17", id: 2 },
  ];

  return (
    <ColContainer w="60%">
      {sleep()}
      {streams.map(function (stream) {
        return (
          <StreamCard
            key={stream._id}
            uuid={stream.uuid}
            timestamp={stream.timestamp}
          />
        );
      })}
      {mystreams.map((stream) => {
        return (
          <StreamCard
            key={stream.id}
            uuid={stream.uuid}
            timestamp={stream.timestamp}
          />
        );
      })}
    </ColContainer>
  );
}

export default MyFeed;
