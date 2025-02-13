import React from "react";
import { RiShare2Line } from "react-icons/ri";
import styled from "styled-components";

const ShareDiv = styled.div`
  display: grid;
`;

const IoIosShareStyled = styled(RiShare2Line)`
  color: #202020;
  width: 22px;
  height: 22px;
`;

const Share = () => {
  return (
    <ShareDiv>
      <IoIosShareStyled />
    </ShareDiv>
  );
};

export default Share;
