import React from "react";
import { ColContainer } from "./styled/Container.styled";

import StreamCard from "./StreamCard";

function MyLikes() {
  return (
    <ColContainer w="60%">
    <StreamCard/>
    <StreamCard/>
    </ColContainer>
  );
}

export default MyLikes;
