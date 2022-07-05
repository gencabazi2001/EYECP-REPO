import StreamCard from "../components/StreamCard";
import { FeedColContainer } from "../components/styled/Container.styled";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

function Feed() {
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
  function compare(a,b){
    
    let time1 = a.timestamp.split('-')
    let time2 = b.timestamp.split('-')

    let con1 = ""
    let con2 = ""
    for (let i = 0; i< 5 ; i++){
      if(time1[3].length != 2) {
        time1[3] = "0"+time1[3]
      }
      if(time2[3].length != 2) {
        time2[3] = "0"+time2[3]
      }
      if(time1[2].length != 2) {
        time1[2] = "0"+time1[2]
      }
      if(time2[2].length != 2) {
        time2[2] = "0"+time2[2]
      }
      con1 += time1[i]
      con2 += time2[i]
    }
    let sum1 = parseInt(con1)
    let sum2 = parseInt(con2)

  


    
    console.log(a.timestamp,"sum1: ", sum1,"||",b.timestamp, "sum2: ", sum2)
    if (sum1>sum2){
      return -1;
    }
    if (sum1< sum2){
      return 1;
    }
    return 0;
  }

  function sleep() {
    new Promise((resolve) => setTimeout(resolve, 1000));
    
    console.log("sorted",streams.sort(compare))
  }
  useEffect(() => {
    getStreams();
  }, []);

  let mystreams = [
    { uuid: "DGK154140UKJUP", timestamp: "2022-4-23-11-19", id: 1 },
    { uuid: "DGK154140UKJUP", timestamp: "2022-4-22-17-17", id: 2 },
  ];

  return (
    <FeedColContainer w="50%">
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
      {/* {mystreams.map((stream) => {
        return (
          <StreamCard
            key={stream.id}
            uuid={stream.uuid}
            timestamp={stream.timestamp}
          />
        );
      })} */}
    </FeedColContainer>
  );
}

export default Feed;
