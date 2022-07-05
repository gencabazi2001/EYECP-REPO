import React from "react";
import { ColContainer } from "./styled/Container.styled";

import StreamCard from "./StreamCard";

function MyFavorites() {
  return (
    <ColContainer w="60%">
    <StreamCard/>
    <StreamCard/>
    <StreamCard/>
    </ColContainer>
  );
}

export default MyFavorites;
